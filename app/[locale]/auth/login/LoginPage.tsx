"use client";

import React, {ChangeEvent, FormEvent, JSX, useState} from "react";
import {login, LoginResponse} from "@/utils/authApi";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

interface FormStatus {
    isLoading: boolean;
    errorMessage: string | null;
    successMessage: string | null | undefined;
}

const Login: React.FC = (): JSX.Element => {

    const router: AppRouterInstance = useRouter();

    const [usernameOrEmail, setUsernameOrEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [formStatus, setFormStatus] = useState<FormStatus>({
        isLoading: false,
        errorMessage: null,
        successMessage: null
    });

    const validateForm: () => string | null = (): string | null => {
        if (!usernameOrEmail.trim()) {
            return "Enter your email address or username.";
        }
        if (!password) {
            return "Enter password";
        }
        if (password.length < 10) {
            return "The password must be at least 10 characters long";
        }
        return null;
    };

    const handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void> = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const validationError: string | null = validateForm();
        if (validationError) {
            setFormStatus({
                isLoading: false,
                errorMessage: validationError,
                successMessage: null
            });
            return;
        }
        setFormStatus({
            isLoading: true,
            errorMessage: null,
            successMessage: null
        });
        try {
            const data: LoginResponse = await login(usernameOrEmail, password);
            setFormStatus({
                isLoading: false,
                errorMessage: null,
                successMessage: data.message
            });
            router.push("/panel");
        } catch (error) {
            setFormStatus({
                isLoading: false,
                errorMessage: (error instanceof Error ? error.message : "Network error. Please try again."),
                successMessage: null
            });
        }
    };

    return (
        <>
            {(formStatus.errorMessage || formStatus.successMessage) && (
                <div className={"login-toast"}>
                    {formStatus.errorMessage && (
                        <div className={"alert alert-danger shadow"} role={"alert"}>
                            {formStatus.errorMessage}
                        </div>
                    )}
                    {formStatus.successMessage && (
                        <div className={"alert alert-success shadow"} role={"status"}>
                            {formStatus.successMessage}
                        </div>
                    )}
                </div>
            )}
            <main className={"login-main"}>
                <div className={"login-card card shadow"}>
                    <div className={"card-body p-4"}>
                        <h1 className={"card-title mb-4 text-center"}>Login</h1>
                        <form onSubmit={handleSubmit} noValidate>
                            <div className={"mb-3"}>
                                <label htmlFor={"usernameOrEmail"} className={"form-label"}>
                                    Email/Username
                                </label>
                                <input
                                    id={"usernameOrEmail"}
                                    name={"usernameOrEmail"}
                                    type={"text"}
                                    value={usernameOrEmail}
                                    placeholder={"Enter email address or username"}
                                    onChange={(event: ChangeEvent<HTMLInputElement>): void => setUsernameOrEmail(event.target.value)}
                                    autoComplete={"username"}
                                    required
                                    className={"input"}
                                />
                            </div>
                            <div className={"mb-3"}>
                                <label htmlFor={"password"} className={"form-label"}>
                                    Password
                                </label>
                                <input
                                    id={"password"}
                                    name={"password"}
                                    type={"password"}
                                    value={password}
                                    placeholder={"Enter password"}
                                    onChange={(event: ChangeEvent<HTMLInputElement>): void => setPassword(event.target.value)}
                                    autoComplete={"current-password"}
                                    required
                                    className={"input"}
                                />
                            </div>
                            <button
                                type={"submit"}
                                className={"button w-100"}
                                disabled={formStatus.isLoading}
                            >
                                {formStatus.isLoading ? "Prijavljam ..." : "Login"}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Login;
