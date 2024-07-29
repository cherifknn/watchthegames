// Initialize Supabase
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gfwzyioveiwwijhouiwa.supabase.co';
const supabaseKey = 'const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdmd3p5aW92ZWl3d2lqaG91aXdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyMDYzNzAsImV4cCI6MjAzNzc4MjM3MH0.F9kLHqbaKkFkzQOmp6P4gpEh1t0KgxviZM6b6M9pW2g';
const supabase = createClient(supabaseUrl, supabaseKey);

document.getElementById('google-signin').addEventListener('click', async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (error) {
    console.error('Error signing in with Google:', error.message);
  }
});

supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === 'SIGNED_IN' && session) {
    const user = session.user;
    const { id_token } = session.provider_token;

    try {
      // Verify the ID token
      const response = await fetch('https://oauth2.googleapis.com/tokeninfo?id_token=' + id_token);
      const tokenInfo = await response.json();

      // Check if it's a Google Workspace account
      if (tokenInfo.hd) {
        console.log('User signed in:', user);
        window.location.href = 'loggedin.html';
      } else {
        alert('Only Google Workspace accounts are allowed.');
        await supabase.auth.signOut();
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      await supabase.auth.signOut();
    }
  } else if (event === 'SIGNED_OUT') {
    console.log('User signed out');
    // Show sign-in form or message
  }
});
