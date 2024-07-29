// Initialize Supabase
const supabaseUrl = 'https://gfwzyioveiwwijhouiwa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdmd3p5aW92ZWl3d2lqaG91aXdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyMDYzNzAsImV4cCI6MjAzNzc4MjM3MH0.F9kLHqbaKkFkzQOmp6P4gpEh1t0KgxviZM6b6M9pW2g';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.getElementById('google-signin').addEventListener('click', async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  if (error) {
    console.error('Error signing in with Google:', error.message);
  }
});

// Listen to auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    const user = session.user;
    const userMetadata = user.user_metadata;

    // Check if user has a Google Workspace account
    const isGoogleWorkspace = userMetadata && userMetadata.email_verified;

    if (!isGoogleWorkspace) {
      alert('Only users with Google Workspace accounts can sign up.');
      supabase.auth.signOut();
    } else {
      console.log('User signed in:', user);
      // Redirect to the success page after successful sign-in
      window.location.href ='loggedin.html'; // Redirect to the "You're in!" page
    }
  } else {
    console.log('User signed out');
    // Show sign-in form or message
  }
});
