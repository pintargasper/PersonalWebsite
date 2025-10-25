import SmokingLogo70 from "@/public/images/projects/smoking-tracker/logo_70x70.webp";
import SmokingLogo100 from "@/public/images/projects/smoking-tracker/logo_100x100.webp";
import SmokingLogo150 from "@/public/images/projects/smoking-tracker/logo_150x150.webp";
import CardLogo70 from "@/public/images/projects/card-generator/logo_70x70.webp";
import CardLogo100 from "@/public/images/projects/card-generator/logo_100x100.webp";
import CardLogo150 from "@/public/images/projects/card-generator/logo_150x150.webp";
import ProfilePicture250 from "@/public/images/home/profile_250x250.webp";
import ScreenshotHome from "@/public/images/projects/smoking-tracker/screenshots/home.webp";
import ScreenshotGraph from "@/public/images/projects/smoking-tracker/screenshots/graph.webp";
import ScreenshotSettings from "@/public/images/projects/smoking-tracker/screenshots/settings.webp";
import ScreenshotGenerator from "@/public/images/projects/card-generator/screenshots/generator.webp";

interface TLink {
    label: string;
    url: string;
}

interface ProjectData {
    title: string;
    image: string;
    imageSrcSet?: string;
    description: string;
    links: TLink[];
}

interface Card {
    title: string;
    alt: string;
    link: string;
    image: string;
}

interface Screenshot {
    src: string;
    alt: string;
    isHorizontal: boolean;
}

const projects: ProjectData[] = [
    {
        title: "Smoking Tracker",
        image: SmokingLogo70.src,
        imageSrcSet: `${SmokingLogo100} 480w, ${SmokingLogo150} 1080w`,
        description: "Smoking Tracker is a program that allows the user to easily track the number of cigarettes smoked. It also enables the display of data on weekly, monthly and yearly graphs",
        links: [
            { label: "View", url: "/smoking-tracker" },
            { label: "GitHub", url: "https://github.com/pintargasper/SmokingTracker" }
        ]
    },
    {
        title: "Card Generator",
        image: CardLogo70.src,
        imageSrcSet: `${CardLogo100} 480w, ${CardLogo150} 1080w`,
        description: "Card Generator allows the creation of any card and also its generation in png format. It also allows downloading images in pdf mode",
        links: [
            { label: "View", url: "/card-generator" },
            { label: "GitHub", url: "https://github.com/pintargasper/CardGenerator" }
        ]
    }
];

const contacts: TLink[] = [
    { label: "Signal", url: "https://signal.me/#eu/HJyeLq4yyhgpjZcg1a8yfwNw9pVj9s3FnX7MQqYL6IS052VbvqhFJocQ9cW76Tqk" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/gasperpintar" },
    { label: "GitHub", url: "https://github.com/pintargasper" },
    { label: "Email", url: "mailto:contact@gasperpintar.com" }
];

const cards: Card[] = [
    { title: "Home", alt: "Profile picture", link: "/", image: ProfilePicture250.src },
    { title: "Smoking Tracker", alt: "Smoking Tracker logo", link: "/smoking-tracker", image: SmokingLogo70.src },
    { title: "Card Generator", alt: "Card Generator logo", link: "/card-generator", image: CardLogo70.src }
];

const screenshotsST: Screenshot[] = [
    { src: ScreenshotHome.src, alt: "Home page", isHorizontal: false },
    { src: ScreenshotGraph.src, alt: "Graph page", isHorizontal: false },
    { src: ScreenshotSettings.src, alt: "Settings page", isHorizontal: false },
];

const screenshotsCG: Screenshot[] = [
    { src: ScreenshotGenerator.src, alt: "Generator", isHorizontal: true },
];

export {
    projects,
    contacts,
    cards,
    screenshotsST,
    screenshotsCG
}

export type {
    TLink,
    ProjectData,
    Card,
    Screenshot
}
