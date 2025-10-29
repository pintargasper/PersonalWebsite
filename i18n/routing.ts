import {defineRouting} from "next-intl/routing";

export const routing: { locales: readonly ["en", "sl"], defaultLocale: "en" | "sl" } = defineRouting({
    locales: ["en", "sl"],
    defaultLocale: "en"
});
