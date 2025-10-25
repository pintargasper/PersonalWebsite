interface Version {
    versions: Record<string, string>;
}

const getLatestVersion: (appKey: string) => Promise<string> = async (appKey: string): Promise<string> => {
    try {
        const baseUrl: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
        const response: Response = await fetch(`${baseUrl}/projects/versions.json`);
        const data: Version = await response.json();
        return data.versions[appKey] ?? "N/A";
    } catch {
        return "N/A";
    }
};

export {
    getLatestVersion
};
