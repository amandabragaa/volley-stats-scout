import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) navigate("/scout");
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/scout");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-8 p-8">
        <div className="space-y-2">
          <h1 className="text-6xl text-primary">VOLLEY SCOUT</h1>
          <p className="text-lg text-muted-foreground">Sistema de Scout para Voleibol</p>
        </div>
        <div className="flex justify-center">
          <div className="w-24 h-1 bg-primary rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Login;
