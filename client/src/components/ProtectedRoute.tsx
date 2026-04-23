import { useAuth } from "@/context/auth-context";
import { Link } from "@tanstack/react-router";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Link to="/login" replace />;
  return <>{children}</>;
}
