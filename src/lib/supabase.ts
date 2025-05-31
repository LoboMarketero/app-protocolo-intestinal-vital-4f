import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          plan: 'essencial' | 'completo' | 'premium'
          current_day: number
          transaction_id: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          email: string
          plan: 'essencial' | 'completo' | 'premium'
          current_day?: number
          transaction_id?: string | null
        }
        Update: {
          plan?: 'essencial' | 'completo' | 'premium'
          current_day?: number
          transaction_id?: string | null
        }
      }
      daily_progress: {
        Row: {
          id: number
          user_id: string
          day: number
          morning_completed: boolean
          afternoon_completed: boolean
          evening_completed: boolean
          completed_at: string | null
          created_at: string
        }
        Insert: {
          user_id: string
          day: number
          morning_completed?: boolean
          afternoon_completed?: boolean
          evening_completed?: boolean
        }
        Update: {
          morning_completed?: boolean
          afternoon_completed?: boolean
          evening_completed?: boolean
          completed_at?: string | null
        }
      }
      weight_tracking: {
        Row: {
          id: number
          user_id: string
          weight: number
          date: string
          type: 'initial' | 'current' | 'goal'
          created_at: string
        }
        Insert: {
          user_id: string
          weight: number
          date?: string
          type?: 'initial' | 'current' | 'goal'
        }
      }
    }
  }
}
