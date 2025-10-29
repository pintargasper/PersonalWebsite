import {defineRouting} from "next-intl/routing";

// https://app.i18nexus.com

export const routing: { locales: readonly ["en", "sl"], defaultLocale: "en" | "sl" } = defineRouting({
    locales: ["en", "sl"],
    defaultLocale: "en",
    localePrefix: "never",
    localeDetection: true
});
