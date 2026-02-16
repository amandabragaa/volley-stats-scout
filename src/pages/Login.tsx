import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "/logo.png";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center space-y-6 p-6 max-w-md w-full">
        <div className="space-y-2">
          <img
            src={logo}
            alt="Logo Volley Scout"
            className="mx-auto w-24 sm:w-28 md:w-32"
          />
          <h1 className="text-6xl text-primary">VOLLEY SCOUT</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Sistema de Scout para Voleibol
          </p>
        </div>
        <div className="flex justify-center">
          <div className="w-24 h-1 bg-primary rounded-full" />
        </div>
        <Button
          onClick={() => navigate("/scout")}
          size="lg"
          className="text-lg px-8 py-6"
        >
          Acessar Scout
        </Button>
      </div>
    </div>
  );
};

export default Login;
