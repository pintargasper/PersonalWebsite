import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "gasperpintar.com",
                port: "",
                pathname: "/**"
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "8080",
                pathname: "/**"
            }
        ],
    },
};

const withNextIntl: (nextConfig?: NextConfig | undefined) => NextConfig = createNextIntlPlugin();
export default withNextIntl(nextConfig);
