import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";

import googleIcons from "@/assets/svg/google.svg";

export const Route = createFileRoute("/_auth/login/")({
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: () => {
      navigate({ to: "/" });
    },
    onError: (err: Error) => {
      setErrorMsg(err.message);
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center px-4 dark:bg-neutral-950">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Log in</h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">Welcome back! Please enter your details.</p>

        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setErrorMsg(null);
            handleLogin();
          }}
        >
          <div className="space-y-1">
            <Label>Email</Label>
            <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="space-y-1">
            <Label>Password</Label>
            <div className="relative">
              <Input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <Checkbox checked={rememberMe} onCheckedChange={(v) => setRememberMe(Boolean(v))} />
              Remember me
            </label>
            <a href="#" className="underline text-neutral-600">
              Forgot password
            </a>
          </div>

          {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Loading..." : "Sign in"}
          </Button>

          <Button type="button" variant="outline" className="w-full flex items-center gap-2">
            <img src={googleIcons} alt="google" />
            Sign in with Google
          </Button>
        </form>
      </div>
    </div>
  );
}
