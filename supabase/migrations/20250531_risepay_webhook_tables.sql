-- Create webhook_logs table to track all webhook requests
CREATE TABLE IF NOT EXISTS public.webhook_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT NOT NULL,
  status TEXT NOT NULL,
  payload JSONB NOT NULL,
  processed BOOLEAN DEFAULT FALSE,
  error TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for order_id to improve lookup performance
CREATE INDEX IF NOT EXISTS webhook_logs_order_id_idx ON public.webhook_logs(order_id);
CREATE INDEX IF NOT EXISTS webhook_logs_processed_idx ON public.webhook_logs(processed);

-- Create subscriptions table for VIP trials and other subscription types
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  trial_expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for subscription queries
CREATE INDEX IF NOT EXISTS subscriptions_user_id_idx ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS subscriptions_email_idx ON public.subscriptions(email);
CREATE INDEX IF NOT EXISTS subscriptions_type_idx ON public.subscriptions(type);

-- Add additional fields to users table if they don't exist
DO $$
BEGIN
  -- Add name column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'name') THEN
    ALTER TABLE public.users ADD COLUMN name TEXT;
  END IF;

  -- Add phone column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'phone') THEN
    ALTER TABLE public.users ADD COLUMN phone TEXT;
  END IF;

  -- Add document column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'document') THEN
    ALTER TABLE public.users ADD COLUMN document TEXT;
  END IF;

  -- Rename transaction_id to order_id if needed (for consistency with webhook payload)
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'transaction_id') 
  AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'order_id') THEN
    ALTER TABLE public.users RENAME COLUMN transaction_id TO order_id;
  END IF;
END
$$;

-- Create function to update timestamp on record update
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add update timestamp triggers
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'webhook_logs_update_timestamp') THEN
    CREATE TRIGGER webhook_logs_update_timestamp
    BEFORE UPDATE ON public.webhook_logs
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'subscriptions_update_timestamp') THEN
    CREATE TRIGGER subscriptions_update_timestamp
    BEFORE UPDATE ON public.subscriptions
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  END IF;

  -- Add trigger for users table if it doesn't have updated_at trigger
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'users_update_timestamp') 
  AND EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'updated_at') THEN
    CREATE TRIGGER users_update_timestamp
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  END IF;
END
$$;
