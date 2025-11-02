import SmokingLogo70 from "@/public/images/projects/smoking-tracker/smoking-tracker-photo-size-70x70.webp";
import CardLogo70 from "@/public/images/projects/card-generator/card-generator-photo-size-70x70.webp";
import ProfilePicture250 from "@/public/images/home/profile-photo-size-250x250.webp";
import ScreenshotHome from "@/public/images/projects/smoking-tracker/screenshots/home-page-preview.webp";
import ScreenshotGraph from "@/public/images/projects/smoking-tracker/screenshots/graph-page-preview.webp";
import ScreenshotSettings from "@/public/images/projects/smoking-tracker/screenshots/settings-page-preview.webp";
import ScreenshotGenerator from "@/public/images/projects/card-generator/screenshots/generator-page-preview.webp";
import GetSignal from "@/public/images/projects/images/signal-photo.webp";
import GetGitHub from "@/public/images/projects/images/github-photo.webp";
import GetLinkedIn from "@/public/images/projects/images/linkedin-photo.webp";
import GetEmail from "@/public/images/projects/images/email-photo.webp";

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
    alt: string;
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
    title: string;
    src: string;
    alt: string;
    isHorizontal: boolean;
}

const projects: ProjectData[] = [
    {
        title: "smoking-tracker.title",
        image: SmokingLogo70.src,
        alt: "smoking-tracker.logo-alt",
        description: "smoking-tracker.description",
        links: [
            { label: "buttons.view", url: "/smoking-tracker", t: true },
            { label: "GitHub", url: "https://github.com/pintargasper/SmokingTracker" }
        ]
    },
    {
        title: "card-generator.title",
        image: CardLogo70.src,
        alt: "card-generator.logo-alt",
        description: "card-generator.description",
        links: [
            { label: "buttons.view", url: "/card-generator", t: true },
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
    { title: "screenshots.home.title", src: ScreenshotHome.src, alt: "screenshots.home.alt", isHorizontal: false },
    { title: "screenshots.graph.title", src: ScreenshotGraph.src, alt: "screenshots.graph.alt", isHorizontal: false },
    { title: "screenshots.settings.title", src: ScreenshotSettings.src, alt: "screenshots.settings.alt", isHorizontal: false },
];

const screenshotsCG: Screenshot[] = [
    { title: "screenshots.generator-page.title", src: ScreenshotGenerator.src, alt: "screenshots.generator-page.alt", isHorizontal: true },
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
