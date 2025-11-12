import SmokingLogo70 from "@/public/images/projects/smoking-tracker/smoking-tracker-photo-size-70x70.webp";
import CardLogo70 from "@/public/images/projects/card-generator/card-generator-photo-size-70x70.webp";
import ProfilePicture250 from "@/public/images/home/profile-photo-size-250x250.webp";

import ScreenshotHomeEnglish from "@/public/images/projects/smoking-tracker/screenshots/home-page-preview-english.webp";
import ScreenshotGraphEnglish from "@/public/images/projects/smoking-tracker/screenshots/graph-page-preview-english.webp";
import ScreenshotSettingsEnglish from "@/public/images/projects/smoking-tracker/screenshots/settings-page-preview-english.webp";
import ScreenShotHomeSlovenian from "@/public/images/projects/smoking-tracker/screenshots/home-page-preview-slovenian.webp";
import ScreenShotGraphSlovenian from "@/public/images/projects/smoking-tracker/screenshots/graph-page-preview-slovenian.webp";
import ScreenShotSettingsSlovenian from "@/public/images/projects/smoking-tracker/screenshots/settings-page-preview-slovenian.webp";

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
    alt: string;
    isHorizontal: boolean;
    src: {
        [locale: string]: string;
    };
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
    { title: "components.home.title", image: ProfilePicture250.src, alt: "components.home.alt", link: "/" },
    { title: "components.smoking-tracker.title", image: SmokingLogo70.src, alt: "components.smoking-tracker.alt", link: "/smoking-tracker" },
    { title: "components.card-generator.title", image: CardLogo70.src, alt: "components.card-generator.alt", link: "/card-generator" }
];

const screenshotsST: Screenshot[] = [
    { title: "screenshots.home.title", src: {en: ScreenshotHomeEnglish.src, sl: ScreenShotHomeSlovenian.src}, alt: "screenshots.home.alt", isHorizontal: false },
    { title: "screenshots.graph.title", src: {en: ScreenshotGraphEnglish.src, sl: ScreenShotGraphSlovenian.src}, alt: "screenshots.graph.alt", isHorizontal: false },
    { title: "screenshots.settings.title", src: {en: ScreenshotSettingsEnglish.src, sl: ScreenShotSettingsSlovenian.src}, alt: "screenshots.settings.alt", isHorizontal: false },
];

const screenshotsCG: Screenshot[] = [
    { title: "screenshots.generator-page.title", src: {en: ScreenshotGenerator.src}, alt: "screenshots.generator-page.alt", isHorizontal: true },
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
