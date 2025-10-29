import {getRequestConfig, GetRequestConfigParams} from "next-intl/server";
import {hasLocale} from "next-intl";
import {routing} from "@/i18n/routing";

export default getRequestConfig(async ({ requestLocale }: GetRequestConfigParams): Promise<{ locale: "en" | "sl"; messages: Record<string, string> }> => {
    const requestedLocale: string | undefined = await requestLocale;

    const validatedLocale: "en" | "sl" = hasLocale(routing.locales, requestedLocale)
        ? requestedLocale as "en" | "sl"
        : routing.defaultLocale;

    return {
        locale: validatedLocale,
        messages: (await import(`../messages/${validatedLocale}.json`)).default as Record<string, string>
    };
});
