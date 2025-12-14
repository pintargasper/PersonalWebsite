"use client";

import React, {createContext, useContext, useState, useEffect, ReactNode, JSX, Context} from "react";
import {authenticate, logout as apiLogout} from "@/api/authApi";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  authChecked: boolean;
  isProtectedRouteActive: boolean;
  setIsProtectedRouteActive: (value: boolean) => void;
}

const AuthContext: Context<AuthContextType | undefined> = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [isProtectedRouteActive, setIsProtectedRouteActive] = useState(false);

  const checkAuth: () => Promise<void> = async (): Promise<void> => {
    try {
      const result: boolean = await authenticate();
      setIsAuthenticated(result);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setAuthChecked(true);
    }
  };

  const logout: () => Promise<void> = async (): Promise<void> => {
    try {
      const result: boolean = await apiLogout();
      if (result) {
          setIsAuthenticated(false);
      }
    } catch {}
  };

  useEffect((): void => {
    authenticate().then((result: boolean): void => setIsAuthenticated(result))
      .catch((): void => setIsAuthenticated(false))
      .finally((): void => setAuthChecked(true));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, checkAuth, logout, authChecked, isProtectedRouteActive, setIsProtectedRouteActive }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export const useAuth: () => AuthContextType = (): AuthContextType => {
  const context: AuthContextType | undefined = useContext(AuthContext);
  if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
