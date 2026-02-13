import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Login = () => {
  const navigate = useNavigate();


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
