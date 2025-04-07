import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vtadludnpffsfeswxndb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0YWRsdWRucGZmc2Zlc3d4bmRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTk3MDEsImV4cCI6MjA1OTU5NTcwMX0.p2v3a0il8Xcl-j0rTRG3EZokkQBQR_XsZ1u9mYgnrjQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;