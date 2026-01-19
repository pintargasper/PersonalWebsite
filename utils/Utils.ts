import * as fs from "node:fs";
import path from "node:path";

interface VersionEntryObject {
    stable: string;
    latest: string;
}

type VersionEntry = string | VersionEntryObject;

interface VersionsFile {
    versions: Record<string, VersionEntry>;
}

const getVersions: (appKey: string) => Promise<VersionEntry | "N/A"> = async (appKey: string): Promise<VersionEntry | "N/A"> => {
    try {
        const filePath: string = path.join(process.cwd(), "public/projects/versions.json");
        const fileData: string = fs.readFileSync(filePath, "utf-8");
        const parsedData: VersionsFile = JSON.parse(fileData);

        const versionEntry: VersionEntry | undefined = parsedData.versions[appKey];

        if (typeof versionEntry === "string") {
            return versionEntry;
        }

        if (typeof versionEntry === "object" && versionEntry !== null) {
            return {
                stable: versionEntry.stable,
                latest: versionEntry.latest
            };
        }
        return "N/A";
    } catch {
        return "N/A";
    }
};

export {
    getVersions
};

export type {
    VersionEntryObject
}
