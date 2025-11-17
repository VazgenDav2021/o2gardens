import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import LoginForm from "@/components/admin/LoginForm";
import { Lock } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <Card className="w-full max-w-md shadow-[var(--shadow-primary)]">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-[var(--shadow-glow)]">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Админ Панель</CardTitle>
          <CardDescription>Введите данные для входа</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
