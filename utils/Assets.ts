import SmokingLogo70 from "@/public/images/projects/smoking-tracker/logo_70x70.webp";
import CardLogo70 from "@/public/images/projects/card-generator/logo_70x70.webp";
import ProfilePicture250 from "@/public/images/home/profile_250x250.webp";
import ScreenshotHome from "@/public/images/projects/smoking-tracker/screenshots/home.webp";
import ScreenshotGraph from "@/public/images/projects/smoking-tracker/screenshots/graph.webp";
import ScreenshotSettings from "@/public/images/projects/smoking-tracker/screenshots/settings.webp";
import ScreenshotGenerator from "@/public/images/projects/card-generator/screenshots/generator.webp";
import GetSignal from "@/public/images/projects/images/signal.webp";
import GetGitHub from "@/public/images/projects/images/github.webp";
import GetLinkedIn from "@/public/images/projects/images/linkedin.webp";
import GetEmail from "@/public/images/projects/images/email.webp";

interface TLink {
    label: string;
    img?: string;
    alt?: string;
    url: string;
    t?: boolean;
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
    image: string;
    alt: string;
    link: string;
}

interface Screenshot {
    src: string;
    alt: string;
    isHorizontal: boolean;
}

const projects: ProjectData[] = [
    {
        title: "smoking-tracker.title",
        image: SmokingLogo70.src,
        description: "smoking-tracker.description",
        links: [
            { label: "view", url: "/smoking-tracker", t: true },
            { label: "GitHub", url: "https://github.com/pintargasper/SmokingTracker" }
        ]
    },
    {
        title: "card-generator.title",
        image: CardLogo70.src,
        description: "card-generator.description",
        links: [
            { label: "view", url: "/card-generator", t: true },
            { label: "GitHub", url: "https://github.com/pintargasper/CardGenerator" }
        ]
    }
];

const contacts: TLink[] = [
    { label: "Signal", img: GetSignal.src, alt: "Signal logo", url: "https://signal.me/#eu/HJyeLq4yyhgpjZcg1a8yfwNw9pVj9s3FnX7MQqYL6IS052VbvqhFJocQ9cW76Tqk" },
    { label: "LinkedIn", img: GetLinkedIn.src, alt: "LinkedIn logo",  url: "https://www.linkedin.com/in/gasperpintar" },
    { label: "GitHub", img: GetGitHub.src, alt: "GitHub logo", url: "https://github.com/pintargasper" },
    { label: "Email", img: GetEmail.src, alt: "Email logo", url: "mailto:contact@gasperpintar.com" }
];

const cards: Card[] = [
    { title: "home.title", image: ProfilePicture250.src, alt: "Profile photo of Gašper Pintar", link: "/" },
    { title: "smoking-tracker.title", image: SmokingLogo70.src, alt: "Smoking Tracker logo", link: "/smoking-tracker" },
    { title: "card-generator.title", image: CardLogo70.src, alt: "Card Generator logo", link: "/card-generator" }
];

const screenshotsST: Screenshot[] = [
    { src: ScreenshotHome.src, alt: "smoking-tracker.home-page", isHorizontal: false },
    { src: ScreenshotGraph.src, alt: "smoking-tracker.graph-page", isHorizontal: false },
    { src: ScreenshotSettings.src, alt: "smoking-tracker.settings-page", isHorizontal: false },
];

const screenshotsCG: Screenshot[] = [
    { src: ScreenshotGenerator.src, alt: "card-generator.generator-page", isHorizontal: true },
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
