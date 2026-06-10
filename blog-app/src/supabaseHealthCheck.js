import { isSupabaseConfigured, supabase } from './supabaseClient.js';

const HEALTH_CHECK_STORAGE_KEY = 'rainy-mountain:supabase-health-check:last-run';
const HEALTH_CHECK_INTERVAL_MS = 3 * 24 * 60 * 60 * 1000;

function readLastRun() {
  try {
    return Number(window.localStorage.getItem(HEALTH_CHECK_STORAGE_KEY));
  } catch {
    return 0;
  }
}

function writeLastRun(timestamp) {
  try {
    window.localStorage.setItem(HEALTH_CHECK_STORAGE_KEY, String(timestamp));
  } catch {
    // Ignore private-mode or storage-quota failures; the check itself is optional.
  }
}

export async function runSupabaseHealthCheck() {
  if (!isSupabaseConfigured || !supabase || typeof window === 'undefined') {
    return false;
  }

  const now = Date.now();
  const lastRun = readLastRun();
  if (Number.isFinite(lastRun) && now - lastRun < HEALTH_CHECK_INTERVAL_MS) {
    return false;
  }

  writeLastRun(now);

  try {
    const { error } = await supabase
      .from('comments')
      .select('id', { count: 'exact', head: true })
      .limit(1);

    return !error;
  } catch {
    return false;
  }
}
