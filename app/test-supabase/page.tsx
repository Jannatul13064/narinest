import { createSupabaseServer } from "@/lib/supabase/server";

export default async function TestSupabase() {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.auth.getUser();

  return <pre>{JSON.stringify({ data, error }, null, 2)}</pre>;
}
