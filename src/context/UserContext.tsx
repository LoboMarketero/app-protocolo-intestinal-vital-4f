import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import type { Database } from '../lib/supabase'

type Profile = Database['public']['Tables']['users']['Row'] // Renamed User to Profile

interface UserContextType {
  authUser: SupabaseUser | null // User from supabase.auth
  userProfile: Profile | null // User data from public.users table
  loading: boolean // For initial auth check
  // login function will be replaced by fetchUserProfile logic
  logout: () => Promise<void>
  permissions: UserPermissions
  fetchUserProfile: (userId: string) => Promise<void>; // To fetch profile data
  advanceDay: () => Promise<void>; // Function to advance the current_day
}

interface UserPermissions {
  canAccessBasicTracker: boolean
  canAccessAdvancedTracker: boolean
  canAccessMaintenanceGuide: boolean
  canAccessExtraRecipes: boolean
  canAccessTurboProtocol: boolean
  canAccessAICoach: boolean
  canAccessVIPCommunity: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authUser, setAuthUser] = useState<SupabaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  console.log('[UserContext] Initializing: loading = true');

  const calculatePermissions = (plan: string): UserPermissions => {
    return {
      canAccessBasicTracker: true,
      canAccessAdvancedTracker: ['completo', 'premium'].includes(plan),
      canAccessMaintenanceGuide: ['completo', 'premium'].includes(plan),
      canAccessExtraRecipes: ['completo', 'premium'].includes(plan),
      canAccessTurboProtocol: plan === 'premium',
      canAccessAICoach: plan === 'premium',
      canAccessVIPCommunity: plan === 'premium'
    }
  }

  const permissions = userProfile ? calculatePermissions(userProfile.plan) : { // Use userProfile
    canAccessBasicTracker: false,
    canAccessAdvancedTracker: false,
    canAccessMaintenanceGuide: false,
    canAccessExtraRecipes: false,
    canAccessTurboProtocol: false,
    canAccessAICoach: false,
    canAccessVIPCommunity: false
  }

  const fetchUserProfileImpl = async (userId: string) => { // Renamed from login, takes userId
    console.log('[UserContext] fetchUserProfileImpl() called for userId:', userId);
    if (!userId) {
      console.log('[UserContext] fetchUserProfileImpl - userId is null/undefined, clearing profile.');
      setUserProfile(null);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('users') // This is public.users, type Profile
        .select('*')
        .eq('id', userId)
        .single()

      console.log('[UserContext] fetchUserProfileImpl() - fetch from public.users - data:', data, 'error:', error);
      if (error) {
        console.error('[UserContext] fetchUserProfileImpl() - Error fetching from public.users:', error);
        setUserProfile(null); // Clear profile on error
        // We might not want to throw here to break the auth flow,
        // instead let parts of the app handle missing profile.
        // For now, let it proceed and log.
        return; // Or throw if profile is critical for app to function beyond basic auth
      }

      setUserProfile(data);
      console.log('[UserContext] fetchUserProfileImpl() - setUserProfile complete. Profile:', data);
    } catch (error) {
      console.error('[UserContext] fetchUserProfileImpl() - Generic error:', error);
      setUserProfile(null);
    }
  }

  const logout = async () => {
    console.log('[UserContext] logout() called.');
    await supabase.auth.signOut();
    setAuthUser(null);
    setUserProfile(null);
    console.log('[UserContext] logout() - authUser and userProfile set to null.');
  }

  useEffect(() => {
    console.log('[UserContext] useEffect[] - Setting up auth state listener.');
    setLoading(true);
    console.log('[UserContext] useEffect - setLoading(true) for initial auth resolution.');

    let initialAuthResolved = false;

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('[UserContext] onAuthStateChange - Event:', event, 'Session:', session);
        
        setAuthUser(session?.user ?? null);

        if (session?.user) {
          console.log('[UserContext] onAuthStateChange - authUser set/updated. Fetching profile for ID:', session.user.id);
          fetchUserProfileImpl(session.user.id); // Fire-and-forget
        } else {
          console.log('[UserContext] onAuthStateChange - No authUser, clearing profile.');
          setUserProfile(null);
        }

        // Set loading to false once the initial auth state is determined by the first event from onAuthStateChange
        // This handles both initial load (no session) and initial load (session exists from storage).
        if (!initialAuthResolved) {
          setLoading(false);
          initialAuthResolved = true;
          console.log('[UserContext] onAuthStateChange - Initial auth state resolved, setLoading(false).');
        }
        console.log('[UserContext] onAuthStateChange - Processed event.');
      }
    );

    return () => {
      console.log('[UserContext] useEffect[] cleanup - Unsubscribing from auth changes.');
      authListener.subscription.unsubscribe();
    };
  }, []); // Empty dependency array ensures this runs once on mount

  const advanceDayImpl = async () => {
    if (!authUser || !userProfile) {
      console.error('[UserContext] advanceDayImpl - Cannot advance day, user or profile not loaded.');
      return;
    }
  
    const currentDay = userProfile.current_day;
    // Ensure current_day is a number before proceeding
    if (typeof currentDay !== 'number') { 
        console.error('[UserContext] advanceDayImpl - current_day is not a number or is null/undefined.');
        return;
    }
  
    if (currentDay >= 21) { // Assuming 21 is the max day
      console.log('[UserContext] advanceDayImpl - Already at max day (21), cannot advance further.');
      return;
    }
  
    const newCurrentDay = currentDay + 1;
  
    try {
      console.log(`[UserContext] advanceDayImpl - Advancing day for user ${authUser.id} from ${currentDay} to ${newCurrentDay}`);
      const { data, error } = await supabase
        .from('users')
        .update({ current_day: newCurrentDay })
        .eq('id', authUser.id)
        .select() 
        .single(); 
  
      if (error) {
        console.error('[UserContext] advanceDayImpl - Error updating current_day:', error);
        return;
      }
  
      if (data) {
        console.log('[UserContext] advanceDayImpl - Day advanced successfully. New profile data:', data);
        setUserProfile(data); 
      } else {
        // This case should ideally not be reached if .single() is used and the update is successful on a valid row.
        // If RLS prevents select but allows update, data could be null.
        console.warn('[UserContext] advanceDayImpl - Update might have succeeded but no data returned. Fetching profile again.');
        // Fallback to re-fetch profile to ensure consistency if data is unexpectedly null
        await fetchUserProfileImpl(authUser.id);
      }
    } catch (error) {
      console.error('[UserContext] advanceDayImpl - Generic error during day advancement:', error);
    }
  };

  return (
    <UserContext.Provider value={{ authUser, userProfile, loading, logout, permissions, fetchUserProfile: fetchUserProfileImpl, advanceDay: advanceDayImpl }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
