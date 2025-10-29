import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true
};

const withNextIntl: (nextConfig?: NextConfig | undefined) => NextConfig = createNextIntlPlugin();
export default withNextIntl(nextConfig);
