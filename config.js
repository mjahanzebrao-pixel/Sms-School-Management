/* =====================================================================
   SMS — config.js
   The ONLY place your Supabase keys live. Every module reads from here.

   Find these two values in Supabase Dashboard → Project Settings →
   Data API (or API Keys). Use the *anon / publishable* key, never the
   service_role key — the service_role key bypasses Row Level Security
   and must never be shipped to a browser.
   ===================================================================== */

window.SMS_CONFIG = {
  url:     'https://plafewbpcbumnucrpzzj.supabase.co',
  anonKey: 'sb_publishable_MiM95vZvlsGuRzT24eQQhg_4r83v4j7',
};

/* ---------------------------------------------------------------------
   Shared client + session guard.
   Include this file before your module script and call smsBoot().
   --------------------------------------------------------------------- */

window.smsClient = function(){
  if (!window.SMS_CONFIG || SMS_CONFIG.url.includes('YOUR-PROJECT')) return null;
  if (!window._sb) window._sb = supabase.createClient(SMS_CONFIG.url, SMS_CONFIG.anonKey);
  return window._sb;
};

/* Redirects to login.html if there is no session. Returns the school row. */
window.smsBoot = async function(){
  const sb = smsClient();
  if (!sb) return {error: 'config'};

  const {data:{session}} = await sb.auth.getSession();
  if (!session) { location.href = 'login.html'; return {error: 'auth'}; }

  const {data:profile} = await sb.from('profiles')
    .select('id, name, role').limit(1).maybeSingle();
  if (!profile) { await sb.auth.signOut(); location.href = 'login.html'; return {error: 'profile'}; }

  const {data:school} = await sb.from('schools').select('*').limit(1).maybeSingle();
  return {sb, profile, school};
};

window.smsSignOut = async function(){
  await smsClient().auth.signOut();
  location.href = 'login.html';
};
