interface LoginResponse {
    message?: string;
    error?: string;
    [key: string]: unknown;
}

const authenticate: () => Promise<boolean> = async (): Promise<boolean> => {
    const response: Response = await fetch(process.env.NEXT_PUBLIC_AUTHENTICATE_API_URL!, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Authentication failed");
    }
    return await response.json();
};

const login: (usernameOrEmail: string, password: string) => Promise<LoginResponse> = async (usernameOrEmail: string, password: string): Promise<LoginResponse> => {
    const response: Response = await fetch(process.env.NEXT_PUBLIC_LOGIN_API_URL!, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            usernameOrEmail,
            password
        })
    });

    if (!response.ok) {
        const errorData: { message?: string; error?: string } = await response
            .json()
            .catch((): { message?: string; error?: string } => ({}));
        throw new Error(errorData.message || errorData.error);
    }
    return await response.json();
};

const logout: () => Promise<boolean> = async (): Promise<boolean> => {
    const response: Response = await fetch(process.env.NEXT_PUBLIC_LOGOUT_API_URL!, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        const errorData: { message?: string; error?: string } = await response
            .json()
            .catch((): { message?: string; error?: string } => ({}));
        throw new Error(errorData.message || errorData.error);
    }
    return await response.json();
};

export {
    authenticate,
    login,
    logout
}

export type {
    LoginResponse
}
