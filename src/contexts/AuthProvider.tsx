import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {

  const [logado, setLogado] = useState(() => {
    return !!localStorage.getItem("@DragonApp:user");
  });

  function login(email: string, password: string): boolean {

    if (email === "admin@dragoes.com" && password === "SenhaForte@123") {

      localStorage.setItem(
        "@DragonApp:user",
        JSON.stringify({ email })
      );

      setLogado(true);
      return true;
    }

    return false;
  }

  function logout() {
    localStorage.removeItem("@DragonApp:user");
    setLogado(false);
  }

  return (
    <AuthContext.Provider value={{ logado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}