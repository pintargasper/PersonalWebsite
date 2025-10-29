import {getRequestConfig, GetRequestConfigParams} from "next-intl/server";
import {hasLocale} from "next-intl";
import {routing} from "@/i18n/routing";
import deepmerge from "deepmerge";

export default getRequestConfig(async ({ requestLocale }: GetRequestConfigParams): Promise<{ locale: "en" | "sl"; messages: Record<string, unknown> }> => {
    const requestedLocale: string | undefined = await requestLocale;
    const validatedLocale: "en" | "sl" = hasLocale(routing.locales, requestedLocale)
        ? requestedLocale as "en" | "sl"
        : routing.defaultLocale;

    let userMessages: Record<string, unknown>;
    try {
        userMessages = (await import(`../messages/${validatedLocale}.json`)).default;
    } catch {
        userMessages = {};
    }
    const defaultMessages: Record<string, unknown> = (await import("../messages/en.json")).default;
    const messages: Record<string, unknown> = validatedLocale === "en"
        ? defaultMessages
        : deepmerge(defaultMessages, userMessages);

    return {
        locale: validatedLocale,
        messages
    };
});
