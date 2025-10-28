import * as fs from "node:fs";
import path from "node:path";

interface Version {
    versions: Record<string, string>;
}

const getLatestVersion: (appKey: string) => Promise<string> = async (appKey: string): Promise<string> => {
    try {
        const filePath: string = path.join(process.cwd(), "public/projects/versions.json");
        const fileData: string = fs.readFileSync(filePath, "utf-8");
        const data: Version = JSON.parse(fileData);
        return data.versions[appKey] ?? "N/A";
    } catch {
        return "N/A";
    }
};

export {
    getLatestVersion
};
