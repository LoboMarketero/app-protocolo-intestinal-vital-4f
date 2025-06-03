-- Create the checklist_progress table to store checklist item completion state
CREATE TABLE IF NOT EXISTS public.checklist_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    day INTEGER NOT NULL CHECK (day >= 1 AND day <= 21),
    checklist_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    
    -- Composite unique constraint to ensure one record per user per day
    UNIQUE (user_id, day)
);

-- Add RLS policies to checklist_progress table
ALTER TABLE public.checklist_progress ENABLE ROW LEVEL SECURITY;

-- Policy for users to read only their own checklist progress
CREATE POLICY "Users can read their own checklist progress"
    ON public.checklist_progress
    FOR SELECT
    USING (auth.uid() = user_id);

-- Policy for users to insert their own checklist progress
CREATE POLICY "Users can insert their own checklist progress"
    ON public.checklist_progress
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own checklist progress
CREATE POLICY "Users can update their own checklist progress"
    ON public.checklist_progress
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Create index on user_id and day for faster lookups
CREATE INDEX IF NOT EXISTS checklist_progress_user_id_day_idx 
    ON public.checklist_progress (user_id, day);

-- Add comment to the table
COMMENT ON TABLE public.checklist_progress IS 'Stores user progress on individual checklist items for daily protocol tasks';
