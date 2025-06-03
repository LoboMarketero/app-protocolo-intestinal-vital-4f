// Follow this setup guide to integrate the Deno runtime into your Node.js application:
// https://deno.com/manual/node/setup

import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.8.0';

// Constants
const API_TOKEN = "ProtocoloVital4F_2025_B7jN5pM8kW1x";

// Type definitions
interface RisePayPayload {
  orderId: string;
  platform: string;
  status: string;
  customer: {
    email: string;
    name: string;
    phone: string;
    document: string;
  };
  product: {
    id: string; // Added product ID for more precise mapping
    name: string;
    priceInCents: number;
  };
}

interface ProductPlanMapping {
  plan: 'essencial' | 'completo' | 'premium';
  vipTrial: boolean;
  isUpgrade: boolean;
  isSubscription: boolean;
  subscriptionType?: string;
}

// Enhanced product mapping function
function mapProductToPlan(productId: string, productName: string): ProductPlanMapping {
  // Default mapping
  const defaultMapping: ProductPlanMapping = { 
    plan: "essencial", 
    vipTrial: false,
    isUpgrade: false,
    isSubscription: false
  };
  
  // Check product ID first (more reliable than name)
  if (productId) {
    // Main plan products
    switch (productId) {
      // Initial purchases
      case "prod_essencial":
        return { ...defaultMapping, plan: "essencial" };
      case "prod_completo":
        return { ...defaultMapping, plan: "completo" };
      case "prod_premium":
        return { ...defaultMapping, plan: "premium", vipTrial: true };
        
      // Upgrades
      case "prod_essencial_to_completo":
        return { ...defaultMapping, plan: "completo", isUpgrade: true };
      case "prod_essencial_to_premium":
        return { ...defaultMapping, plan: "premium", isUpgrade: true, vipTrial: true };
      case "prod_completo_to_premium":
        return { ...defaultMapping, plan: "premium", isUpgrade: true, vipTrial: true };
        
      // Standalone subscriptions
      case "prod_vip_community":
        return { 
          ...defaultMapping, 
          isSubscription: true, 
          subscriptionType: "vip_community",
          vipTrial: false
        };
      case "prod_vip_community_trial":
        return { 
          ...defaultMapping, 
          isSubscription: true, 
          subscriptionType: "vip_community",
          vipTrial: true
        };
    }
  }
  
  // Fallback to name-based mapping if ID is not recognized
  if (productName.includes("Essencial")) {
    return { ...defaultMapping, plan: "essencial" };
  } else if (productName.includes("Completo")) {
    return { ...defaultMapping, plan: "completo" };
  } else if (productName.includes("Premium")) {
    return { ...defaultMapping, plan: "premium", vipTrial: true };
  } else if (productName.toLowerCase().includes("vip") || productName.toLowerCase().includes("comunidade")) {
    return { 
      ...defaultMapping, 
      isSubscription: true, 
      subscriptionType: "vip_community",
      vipTrial: productName.toLowerCase().includes("trial")
    };
  }
  
  // Final fallback
  return defaultMapping;
}

// Main handler
serve(async (req) => {
  // Create Supabase client using Deno environment variables
  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { "Content-Type": "application/json" } }
    );
  }

  // Validate API token
  const token = req.headers.get("x-api-token");
  if (token !== API_TOKEN) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    // Parse request body
    const payload: RisePayPayload = await req.json();

    // Log webhook request
    const { data: logEntry, error: logError } = await supabase
      .from("webhook_logs")
      .insert({
        order_id: payload.orderId,
        status: payload.status,
        payload: payload
      })
      .select()
      .single();

    if (logError) {
      throw new Error(`Failed to log webhook: ${logError.message}`);
    }

    // Only process paid status
    if (payload.status !== "Paid") {
      await supabase
        .from("webhook_logs")
        .update({ 
          processed: true, 
          error: "Not a paid status" 
        })
        .eq("id", logEntry.id);

      return new Response(
        JSON.stringify({ message: "Webhook received but not processed (not a paid status)" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check for duplicate order
    const { data: existingOrder } = await supabase
      .from("webhook_logs")
      .select("id")
      .eq("order_id", payload.orderId)
      .eq("processed", true)
      .limit(1);

    if (existingOrder && existingOrder.length > 0) {
      await supabase
        .from("webhook_logs")
        .update({ 
          processed: true, 
          error: "Duplicate order" 
        })
        .eq("id", logEntry.id);

      return new Response(
        JSON.stringify({ message: "Webhook received but not processed (duplicate order)" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Map product to plan - use both id and name for better accuracy
    const productMapping = mapProductToPlan(
      payload.product.id || "", 
      payload.product.name
    );
    
    // First, check if user already exists by email
    const { data: existingUsers } = await supabase
      .from("users")
      .select("id, plan")
      .eq("email", payload.customer.email)
      .limit(1);
      
    const userExists = existingUsers && existingUsers.length > 0;
    let userId = userExists ? existingUsers[0].id : null;
    
    // CASE 1: New user - create auth account and profile
    if (!userExists) {
      // Create user account with Supabase Auth
      const userPassword = "Vital2025!";
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email: payload.customer.email,
        password: userPassword,
        email_confirm: true
      });

      if (authError) {
        throw new Error(`Failed to create auth user: ${authError.message}`);
      }
      
      userId = authUser.user.id;

      // Create user profile record
      const { error: userError } = await supabase
        .from("users")
        .insert({
          id: userId,
          email: payload.customer.email,
          plan: productMapping.plan,
          current_day: 1,
          transaction_id: payload.orderId,
          status: "active",
          name: payload.customer.name,
          phone: payload.customer.phone,
          document: payload.customer.document
        });

      if (userError) {
        throw new Error(`Failed to create user profile: ${userError.message}`);
      }
    } 
    // CASE 2: Existing user - handle plan upgrade or subscription
    else {
      const currentUserId = existingUsers[0].id;
      const currentPlan = existingUsers[0].plan;
      
      // Only update plan if this is a plan change (not just a subscription) 
      // AND the new plan is better than current plan
      const planPriority = { "essencial": 1, "completo": 2, "premium": 3 };
      const shouldUpgradePlan = 
        !productMapping.isSubscription && 
        planPriority[productMapping.plan] > planPriority[currentPlan];
      
      if (shouldUpgradePlan) {
        // Update user plan
        const { error: updateError } = await supabase
          .from("users")
          .update({
            plan: productMapping.plan,
            transaction_id: payload.orderId,
            updated_at: new Date().toISOString()
          })
          .eq("id", currentUserId);
          
        if (updateError) {
          throw new Error(`Failed to update user plan: ${updateError.message}`);
        }
      }
    }
    
    // Handle VIP subscription (trial or paid)
    if (productMapping.isSubscription && productMapping.subscriptionType === "vip_community") {
      // Check if user already has this subscription type
      const { data: existingSubscriptions } = await supabase
        .from("subscriptions")
        .select("id, status, trial_expires_at")
        .eq("user_id", userId)
        .eq("type", "vip_community")
        .limit(1);
        
      const hasExistingSubscription = existingSubscriptions && existingSubscriptions.length > 0;
      
      // Set expiration date for trial
      let trialExpiresAt: Date | null = null;
      if (productMapping.vipTrial) {
        trialExpiresAt = new Date();
        trialExpiresAt.setDate(trialExpiresAt.getDate() + 30); // 30-day trial
      }
      
      // CASE 1: Update existing subscription
      if (hasExistingSubscription) {
        const { error: updateSubscriptionError } = await supabase
          .from("subscriptions")
          .update({
            status: productMapping.vipTrial ? "trial" : "active",
            trial_expires_at: productMapping.vipTrial && trialExpiresAt ? trialExpiresAt.toISOString() : null,
            updated_at: new Date().toISOString()
          })
          .eq("id", existingSubscriptions[0].id);
          
        if (updateSubscriptionError) {
          throw new Error(`Failed to update subscription: ${updateSubscriptionError.message}`);
        }
      } 
      // CASE 2: Create new subscription
      else {
        const { error: newSubscriptionError } = await supabase
          .from("subscriptions")
          .insert({
            user_id: userId,
            email: payload.customer.email,
            type: "vip_community",
            status: productMapping.vipTrial ? "trial" : "active",
            trial_expires_at: productMapping.vipTrial && trialExpiresAt ? trialExpiresAt.toISOString() : null
          });
          
        if (newSubscriptionError) {
          throw new Error(`Failed to create subscription: ${newSubscriptionError.message}`);
        }
      }
    }
    
    // For Premium plan users who don't have VIP access, create it automatically
    if (productMapping.plan === "premium" && !productMapping.isSubscription) {
      // Check if user already has VIP community access
      const { data: vipSubscriptions } = await supabase
        .from("subscriptions")
        .select("id")
        .eq("user_id", userId)
        .eq("type", "vip_community")
        .limit(1);
        
      const hasVipAccess = vipSubscriptions && vipSubscriptions.length > 0;
      
      // If no VIP access yet, create it
      if (!hasVipAccess) {
        const { error: vipError } = await supabase
          .from("subscriptions")
          .insert({
            user_id: userId,
            email: payload.customer.email,
            type: "vip_community",
            status: "active" // Premium users get full VIP access, not trial
          });
          
        if (vipError) {
          throw new Error(`Failed to create VIP access for premium user: ${vipError.message}`);
        }
      }
    }

    // Update webhook log as processed
    await supabase
      .from("webhook_logs")
      .update({ processed: true })
      .eq("id", logEntry.id);

    // Return success
    return new Response(
      JSON.stringify({
        message: "Webhook processed successfully",
        user_id: userId,
        product_mapping: productMapping,
        order_id: payload.orderId
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    // Handle errors
    console.error("Error processing webhook:", error);

    return new Response(
      JSON.stringify({ 
        error: "Failed to process webhook", 
        details: error.message 
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
