import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import type { Database } from '../lib/supabase'

type Profile = Database['public']['Tables']['users']['Row'] // Renamed User to Profile
type Subscription = Database['public']['Tables']['subscriptions']['Row'] // Type alias for subscriptions table

interface UserContextType {
  authUser: SupabaseUser | null // User from supabase.auth
  userProfile: Profile | null // User data from public.users table
  userSubscriptions: Subscription[] | null // User subscriptions data
  loading: boolean // For initial auth check
  logout: () => Promise<void>
  permissions: UserPermissions
  fetchUserProfile: (userId: string) => Promise<void>; // To fetch profile data
  fetchUserSubscriptions: (userId: string) => Promise<void>; // To fetch subscription data
  refreshSubscriptions: () => Promise<void>; // To refresh subscription data
  refreshUserData: () => Promise<any>; // To refresh all user data after upgrade
  advanceDay: () => Promise<void>; // Function to advance the current_day
  isRefreshingUserData: boolean; // Flag to indicate if user data is being refreshed
}

interface UserPermissions {
  // Core features - always accessible once logged in
  canAccessDailyProtocol: boolean
  canAccessBasicTracker: boolean
  canAccessFAQ: boolean
  
  // Features by plan level
  canAccessAdvancedTracker: boolean
  canAccessMaintenanceGuide: boolean
  canAccessExtraRecipes: boolean
  canAccessTurboProtocol: boolean
  canAccessAICoach: boolean
  canAccessAnalyticsPremium: boolean
  
  // Subscription features
  canAccessVIPCommunity: boolean
  
  // New VIP trial fields
  hasVipTrial: boolean
  vipTrialExpires: Date | null
  vipTrialDaysLeft: number | null
  isVipActive: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authUser, setAuthUser] = useState<SupabaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [userSubscriptions, setUserSubscriptions] = useState<Subscription[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshingUserData, setIsRefreshingUserData] = useState(false);
  console.log('[UserContext] Initializing: loading = true');

  // Function to calculate days remaining of trial
  const calculateTrialDaysLeft = (expiresAt: string | null): number | null => {
    if (!expiresAt) return null;
    
    const today = new Date();
    const expirationDate = new Date(expiresAt);
    
    // Reset time to compare just dates
    today.setHours(0, 0, 0, 0);
    expirationDate.setHours(0, 0, 0, 0);
    
    const diffTime = expirationDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
  };
  
  // Function to check if there's an active VIP trial
  const getActiveVipTrial = (subscriptions: Subscription[] | null): {
    hasVipTrial: boolean;
    vipTrialExpires: Date | null;
    vipTrialDaysLeft: number | null;
    isVipActive: boolean;
  } => {
    if (!subscriptions || subscriptions.length === 0) {
      return {
        hasVipTrial: false,
        vipTrialExpires: null,
        vipTrialDaysLeft: null,
        isVipActive: false
      };
    }
    
    // Find VIP subscription with active trial or active status
    const vipSub = subscriptions.find(
      sub => sub.type === 'vip_community' && 
             (sub.status === 'trial' || sub.status === 'active')
    );
    
    if (!vipSub) {
      return {
        hasVipTrial: false,
        vipTrialExpires: null,
        vipTrialDaysLeft: null,
        isVipActive: false
      };
    }
    
    // If it's a trial, calculate expiration date and days left
    if (vipSub.status === 'trial') {
      const trialExpires = vipSub.trial_expires_at ? new Date(vipSub.trial_expires_at) : null;
      const daysLeft = calculateTrialDaysLeft(vipSub.trial_expires_at);
      
      return {
        hasVipTrial: true,
        vipTrialExpires: trialExpires,
        vipTrialDaysLeft: daysLeft,
        isVipActive: true
      };
    }
    
    // If it's active, it's a paid subscription (not trial)
    return {
      hasVipTrial: false,
      vipTrialExpires: null,
      vipTrialDaysLeft: null,
      isVipActive: true
    };
  };

const calculatePermissions = (plan: string, subscriptions: Subscription[] | null): UserPermissions => {
  // Get VIP trial information
  const vipTrialInfo = getActiveVipTrial(subscriptions);
  
  return {
    // Core features - always accessible once logged in
    canAccessDailyProtocol: true,
    canAccessBasicTracker: true,
    canAccessFAQ: true,
    
    // Features by plan level
    canAccessAdvancedTracker: ['completo', 'premium'].includes(plan),
    canAccessMaintenanceGuide: ['completo', 'premium'].includes(plan),
    canAccessExtraRecipes: ['completo', 'premium'].includes(plan),
    canAccessTurboProtocol: plan === 'premium',
    canAccessAICoach: plan === 'premium',
    canAccessAnalyticsPremium: plan === 'premium',
    
    // Subscription features
    canAccessVIPCommunity: plan === 'premium' || vipTrialInfo.isVipActive,
    
    // VIP trial fields
    ...vipTrialInfo
  }
}

const permissions = userProfile ? 
  calculatePermissions(userProfile.plan, userSubscriptions) : 
  { 
    // Core features
    canAccessDailyProtocol: false,
    canAccessBasicTracker: false,
    canAccessFAQ: false,
    
    // Features by plan level
    canAccessAdvancedTracker: false,
    canAccessMaintenanceGuide: false,
    canAccessExtraRecipes: false,
    canAccessTurboProtocol: false,
    canAccessAICoach: false,
    canAccessAnalyticsPremium: false,
    
    // Subscription features
    canAccessVIPCommunity: false,
    
    // VIP trial fields
    hasVipTrial: false,
    vipTrialExpires: null,
    vipTrialDaysLeft: null,
    isVipActive: false
  }

  // Function to fetch user subscriptions
  const fetchUserSubscriptionsImpl = async (userId: string) => {
    console.log('[UserContext] fetchUserSubscriptionsImpl() called for userId:', userId);
    if (!userId) {
      console.log('[UserContext] fetchUserSubscriptionsImpl - userId is null/undefined, clearing subscriptions.');
      setUserSubscriptions(null);
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId);
        
      console.log('[UserContext] fetchUserSubscriptionsImpl() - fetch from subscriptions - data:', data, 'error:', error);
      
      if (error) {
        console.error('[UserContext] fetchUserSubscriptionsImpl() - Error fetching subscriptions:', error);
        setUserSubscriptions(null);
        return;
      }
      
      setUserSubscriptions(data);
      console.log('[UserContext] fetchUserSubscriptionsImpl() - setUserSubscriptions complete. Subscriptions:', data);
    } catch (error) {
      console.error('[UserContext] fetchUserSubscriptionsImpl() - Generic error:', error);
      setUserSubscriptions(null);
    }
  };
  
  // Function to refresh subscriptions for current user
  const refreshSubscriptionsImpl = async () => {
    if (!authUser) {
      console.log('[UserContext] refreshSubscriptionsImpl - No authenticated user.');
      return;
    }
    
    await fetchUserSubscriptionsImpl(authUser.id);
  };

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
      
      // After fetching profile, also fetch subscriptions
      await fetchUserSubscriptionsImpl(userId);
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

  // Function to refresh all user data after an upgrade
  const refreshUserDataImpl = async () => {
    if (!authUser) {
      console.error('[UserContext] refreshUserDataImpl - Cannot refresh data, user not authenticated.');
      return null;
    }
  
    console.log('[UserContext] refreshUserDataImpl - Refreshing all user data for userId:', authUser.id);
    
    try {
      // Set refreshing state
      setIsRefreshingUserData(true);
      
      // Fetch fresh user profile
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single();
        
      if (profileError) {
        console.error('[UserContext] refreshUserDataImpl - Error fetching profile:', profileError);
        setIsRefreshingUserData(false);
        return null;
      }
      
      // Fetch fresh subscriptions
      const { data: subscriptions, error: subscriptionsError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', authUser.id);
        
      if (subscriptionsError) {
        console.error('[UserContext] refreshUserDataImpl - Error fetching subscriptions:', subscriptionsError);
        setIsRefreshingUserData(false);
        return null;
      }
      
      // Update state
      setUserProfile(profile);
      setUserSubscriptions(subscriptions);
      
      // Calculate new permissions
      const newPermissions = calculatePermissions(profile.plan, subscriptions);
      
      console.log('[UserContext] refreshUserDataImpl - User data refreshed successfully:', {
        profile,
        subscriptions,
        permissions: newPermissions
      });
      
      // Return the refreshed data for any components that need it
      return { profile, subscriptions, permissions: newPermissions };
    } catch (error) {
      console.error('[UserContext] refreshUserDataImpl - Generic error during refresh:', error);
      return null;
    } finally {
      // Always reset refreshing state
      setIsRefreshingUserData(false);
    }
  };

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
    <UserContext.Provider value={{ 
      authUser, 
      userProfile, 
      userSubscriptions, 
      loading, 
      logout, 
      permissions, 
      fetchUserProfile: fetchUserProfileImpl, 
      fetchUserSubscriptions: fetchUserSubscriptionsImpl,
      refreshSubscriptions: refreshSubscriptionsImpl,
      refreshUserData: refreshUserDataImpl,
      advanceDay: advanceDayImpl,
      isRefreshingUserData
    }}>
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
