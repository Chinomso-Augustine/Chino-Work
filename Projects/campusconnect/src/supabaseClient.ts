
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nqtxacmxsvidaazqthvw.supabase.co';
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xdHhhY214c3ZpZGFhenF0aHZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNzgwMjIsImV4cCI6MjA2OTY1NDAyMn0.pUHiLUF-IrIppbqDdT3V45xfpbL89Wy_Kub3dMFKuUU"

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 