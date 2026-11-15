import { useMemo, useRef } from 'react';
import { useSession } from '@clerk/react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

/**
 * Returns a Supabase client that forwards the signed-in Clerk session token.
 * Configure Clerk as a third-party auth provider in Supabase and enable RLS
 * before querying private tables, storage, or realtime channels.
 */
export const useSupabase = () => {
  const { session } = useSession();
  const sessionRef = useRef(session);
  sessionRef.current = session;

  return useMemo(() => {
    if (!supabaseUrl || !supabasePublishableKey) return null;

    return createClient(supabaseUrl, supabasePublishableKey, {
      accessToken: async () => sessionRef.current?.getToken() ?? null,
    });
  }, []);
};

