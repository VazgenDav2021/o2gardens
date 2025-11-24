"use client";

import { useState } from "react";
import { Lock, User } from "lucide-react";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { useToast } from "@/hooks/useToast";
import { login } from "@/services/authService";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Ошибка входа",
        description:
          "Пожалуйста, заполните все поля.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await login({ email, password });
      
      if (response.success) {
        toast({
          title: "Успешный вход",
          description: "Добро пожаловать!",
        });
        window.location.href = "/admin-side/dashboard/hero/";
      } else {
        toast({
          title: "Ошибка входа",
          description: "Неверные учетные данные.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Ошибка входа",
        description: error?.response?.data?.message || "Не удалось войти. Попробуйте снова.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Пароль</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Вход..." : "Войти"}
      </Button>
    </form>
  );
};

export default LoginForm;
