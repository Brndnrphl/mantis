import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function AuthCheck() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        loginWithRedirect();
      }
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);
  return null;
}
