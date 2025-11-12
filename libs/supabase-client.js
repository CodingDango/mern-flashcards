import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://peqflsauphdzoghrdvzm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlcWZsc2F1cGhkem9naHJkdnptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NTU4NzgsImV4cCI6MjA3ODQzMTg3OH0.SM3TVTCVMUYIUPyQyXmbpUpzqYieHaATdwhmlbeuHQI';
export const supabase = createClient(supabaseUrl, supabaseKey);