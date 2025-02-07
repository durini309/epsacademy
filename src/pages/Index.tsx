import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/hub" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;
      
      // Store email for password change page
      localStorage.setItem("userEmail", email);

      // Check if it's first login
      const { data: userData, error: userError } = await supabase
        .from('user')
        .select('first_login')
        .eq('auth_id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (userError) throw userError;

      // Redirect based on first_login status
      if (userData.first_login) {
        navigate('/password');
      } else {
        navigate('/hub');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <img
            src="/eps-logo.png"
            alt="Logo"
            className="mx-auto h-32 w-auto"
          />
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Index;