import { supabase } from "@/lib/supabaseClient";

type SignInOptions = {
  redirectUri?: string;
  extraParams?: Record<string, string>;
};

export const auth = {
  async signInWithOAuth(provider: "google" | "apple", opts?: SignInOptions) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: opts?.redirectUri || window.location.origin + "/dashboard",
        queryParams: opts?.extraParams,
      },
    });

    if (error) return { error };

    if (data?.url) {
      window.location.href = data.url;
      return { redirected: true };
    }

    return data;
  },

  async signOut() {
    return await supabase.auth.signOut();
  },
};
