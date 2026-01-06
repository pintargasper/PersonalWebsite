import SmokingLogo70 from "@/public/images/projects/smoking-tracker/smoking-tracker-photo-size-70x70.webp";
import ItemWeightScannerLogo70 from "@/public/images/projects/item-weight-scanner/item-weight-scanner-photo-size-320x320.webp";
import CardLogo70 from "@/public/images/projects/card-generator/card-generator-photo-size-70x70.webp";
import CriogenLogo70 from "@/public/images/projects/criogen/criogen-logo.webp";
import AndroidLogo from "@/public/images/projects/images/platform/android-logo.webp";
import DesktopLogo from "@/public/images/projects/images/platform/desktop-logo.webp";
import ProfilePicture250 from "@/public/images/home/profile-photo.webp";
import ScreenshotHomeEnglish from "@/public/images/projects/smoking-tracker/screenshots/en/home-page-preview.webp";
import ScreenshotGraphEnglish from "@/public/images/projects/smoking-tracker/screenshots/en/graph-page-preview.webp";
import ScreenshotAnalyticsEnglish from "@/public/images/projects/smoking-tracker/screenshots/en/analytics-page-preview.webp";
import ScreenshotSettingsEnglish from "@/public/images/projects/smoking-tracker/screenshots/en/settings-page-preview.webp";
import ScreenshotCalculatorEnglish from "@/public/images/projects/smoking-tracker/screenshots/en/calculator-page-preview.webp";
import ScreenShotHomeSlovenian from "@/public/images/projects/smoking-tracker/screenshots/sl/home-page-preview.webp";
import ScreenShotGraphSlovenian from "@/public/images/projects/smoking-tracker/screenshots/sl/graph-page-preview.webp";
import ScreenShotAnalyticsSlovenian from "@/public/images/projects/smoking-tracker/screenshots/sl/analytics-page-preview.webp";
import ScreenShotSettingsSlovenian from "@/public/images/projects/smoking-tracker/screenshots/sl/settings-page-preview.webp";
import ScreenShotCalculatorSlovenian from "@/public/images/projects/smoking-tracker/screenshots/sl/calculator-page-preview.webp";

import ScreenShotIWSHomeEnglish from "@/public/images/projects/item-weight-scanner/screenshots/en/home-page-preview.webp";
import ScreenShotIWSHistoryEnglish from "@/public/images/projects/item-weight-scanner/screenshots/en/history-page-preview.webp";
import ScreenShotIWSHistorySingleEnglish from "@/public/images/projects/item-weight-scanner/screenshots/en/history-single-page-preview.webp";
import ScreenShotIWSEmailEnglish from "@/public/images/projects/item-weight-scanner/screenshots/en/email-page-preview.webp";
import ScreenShotIWSSettingsEnglish from "@/public/images/projects/item-weight-scanner/screenshots/en/settings-page-preview.webp";
import ScreenShotIWSHomeSlovenian from "@/public/images/projects/item-weight-scanner/screenshots/sl/home-page-preview.webp";
import ScreenShotIWSHistorySlovenian from "@/public/images/projects/item-weight-scanner/screenshots/sl/history-page-preview.webp";
import ScreenShotIWSHistorySingleSlovenian from "@/public/images/projects/item-weight-scanner/screenshots/sl/history-single-page-preview.webp";
import ScreenShotIWSEmailSlovenian from "@/public/images/projects/item-weight-scanner/screenshots/sl/email-page-preview.webp";
import ScreenShotIWSSettingsSlovenian from "@/public/images/projects/item-weight-scanner/screenshots/sl/settings-page-preview.webp";

import ScreenshotGeneratorEnglish from "@/public/images/projects/card-generator/screenshots/generator-page-preview-english.webp";
import ScreenshotGeneratorSlovenian from "@/public/images/projects/card-generator/screenshots/generator-page-preview-slovenian.webp";
import GetSignal from "@/public/images/projects/images/signal-photo.webp";
import GetGitHub from "@/public/images/projects/images/github-photo.webp";
import GetLinkedIn from "@/public/images/projects/images/linkedin-photo.webp";
import GetEmail from "@/public/images/projects/images/email-photo.webp";
import {faNewspaper, IconDefinition} from "@fortawesome/free-solid-svg-icons";

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

const androidProjects: ProjectData[] = [
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
        title: "item-weight-scanner.title",
        image: ItemWeightScannerLogo70.src,
        alt: "item-weight-scanner.logo-alt",
        description: "item-weight-scanner.description",
        links: [
            { label: "buttons.view", url: "/item-weight-scanner", t: true }
        ]
    }
];

const desktopProjects: ProjectData[] = [
    {
        title: "card-generator.title",
        image: CardLogo70.src,
        alt: "card-generator.logo-alt",
        description: "card-generator.description",
        links: [
            { label: "buttons.view", url: "/card-generator", t: true },
            { label: "GitHub", url: "https://github.com/pintargasper/CardGenerator" }
        ]
    },
    {
        title: "criogen.title",
        image: CriogenLogo70.src,
        alt: "criogen.logo-alt",
        description: "criogen.description",
        links: [
            { label: "buttons.view", url: "https://www.vet-center-trnje.si/criogen", t: true }
        ]
    }
];

const projects: ProjectData[] = [
    {
        title: "android.title",
        image: AndroidLogo.src,
        alt: "android.logo-alt",
        description: "android.description",
        links: [
            { label: "buttons.view", url: "/projects/android", t: true },
        ]
    },
    {
        title: "desktop.title",
        image: DesktopLogo.src,
        alt: "desktop.logo-alt",
        description: "desktop.description",
        links: [
            { label: "buttons.view", url: "/projects/desktop", t: true },
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
    { title: "screenshots.analytics.title", src: {en: ScreenshotAnalyticsEnglish.src, sl: ScreenShotAnalyticsSlovenian.src}, alt: "screenshots.analytics.alt", isHorizontal: false },
    { title: "screenshots.settings.title", src: {en: ScreenshotSettingsEnglish.src, sl: ScreenShotSettingsSlovenian.src}, alt: "screenshots.settings.alt", isHorizontal: false },
    { title: "screenshots.calculator.title", src: {en: ScreenshotCalculatorEnglish.src, sl: ScreenShotCalculatorSlovenian.src}, alt: "screenshots.calculator.alt", isHorizontal: false },
];

const screenshotsIWS: Screenshot[] = [
    { title: "screenshots.home.title", src: {en: ScreenShotIWSHomeEnglish.src, sl: ScreenShotIWSHomeSlovenian.src}, alt: "screenshots.home.alt", isHorizontal: false },
    { title: "screenshots.history.title", src: {en: ScreenShotIWSHistoryEnglish.src, sl: ScreenShotIWSHistorySlovenian.src}, alt: "screenshots.history.alt", isHorizontal: false },
    { title: "screenshots.history-single.title", src: {en: ScreenShotIWSHistorySingleEnglish.src, sl: ScreenShotIWSHistorySingleSlovenian.src}, alt: "screenshots.history-single.alt", isHorizontal: false },
    { title: "screenshots.email.title", src: {en: ScreenShotIWSEmailEnglish.src, sl: ScreenShotIWSEmailSlovenian.src}, alt: "screenshots.email.alt", isHorizontal: false },
    { title: "screenshots.settings.title", src: {en: ScreenShotIWSSettingsEnglish.src, sl: ScreenShotIWSSettingsSlovenian.src}, alt: "screenshots.settings.alt", isHorizontal: false },
];

const screenshotsCG: Screenshot[] = [
    { title: "screenshots.generator-page.title", src: {en: ScreenshotGeneratorEnglish.src, sl: ScreenshotGeneratorSlovenian.src}, alt: "screenshots.generator-page.alt", isHorizontal: true },
];

const adminCards: ({ id: number; title: string; icon: IconDefinition; link: string })[] = [
    {
        id: 1,
        title: "cards.news",
        icon: faNewspaper,
        link: "/panel/news"
    }
];

export {
    androidProjects,
    desktopProjects,
    projects,
    contacts,
    cards,
    screenshotsST,
    screenshotsIWS,
    screenshotsCG,
    adminCards
}

export type {
    TLink,
    ProjectData,
    Card,
    Screenshot
}
