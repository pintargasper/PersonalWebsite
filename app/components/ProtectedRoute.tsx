"use client";

import React, { useEffect, useState, JSX } from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { authenticate } from "@/utils/authApi";
import { useAuth } from "@/utils/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }: ProtectedRouteProps): JSX.Element | null => {

    const router: AppRouterInstance = useRouter();
    const [isChecking, setIsChecking] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const { setIsProtectedRouteActive } = useAuth();

    useEffect((): () => void => {
        setIsProtectedRouteActive(true);
        return (): void => setIsProtectedRouteActive(false);
    }, [setIsProtectedRouteActive]);

    useEffect((): void => {
        const checkAuth: () => Promise<void> = async (): Promise<void> => {
            try {
                const result: boolean = await authenticate();
                if (result) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    router.replace("/auth/login");
                }
            } catch {
                setIsAuthenticated(false);
                router.replace("/auth/login");
            } finally {
                setIsChecking(false);
            }
        };
        checkAuth().then((result: void): void => result);
    }, [router]);

    if (isChecking) {
        return (
            <div className={"protected-spinner-container"}>
                <div className={"protected-spinner-wrapper"}>
                    <div className={"protected-spinner"} />
                    <span className={"protected-spinner-text"}>Loading</span>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
