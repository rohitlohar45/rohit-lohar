import "@/styles/globals.css";
import { Metadata } from "next";
import NunitoFonts from "@/utils/fonts";
import {
	OFFICIAL_AUTHOR_URL,
	OFFICIAL_PLATOFORM_TWITTER_URL,
	OFFICIAL_TWITTER_IMAGE_URL,
} from "@/utils/constants";

/** @dev initialize nunito font */
const nunito = NunitoFonts;

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={nunito.className}>{children}</body>
		</html>
	);
}

export const metadata: Metadata = {
	title: "Rohit Lohar | Portfolio",
	description: "Full-stack Web Developer | Native App Developer",
	authors: {
		name: "Rohit",
		url: OFFICIAL_PLATOFORM_TWITTER_URL,
	},
	keywords: ["Rohit", "Rohit Lohar", "Portfolio", "Full-stack web developer portfolio"],
	icons: {
		icon: "/rohit-lohar.ico",
		shortcut: "/rohit-lohar.ico",
	},
	metadataBase: new URL(OFFICIAL_AUTHOR_URL),
	alternates: {
		canonical: "/",
	},

	// ######## OG ########
	openGraph: {
		siteName: "Rohit Lohar's Portfolio",
		title: "Rohit Lohar | Portfolio",
		description: "Full-stack Web Developer | Native App Developer",
		locale: "en_US",
		type: "website",
		url: "/",
		// images: {
		// 	url: OFFICIAL_OG_IMAGE_URL,
		// 	alt: "Rohit Lohar",
		// 	width: 240,
		// 	height: 240,
		// },
	},

	// ######## Twitter ########
	twitter: {
		card: "summary_large_image",
		site: OFFICIAL_AUTHOR_URL,
		creator: "@0xMalviya",
		creatorId: "1525316662429360131",
		title: "Rohit Lohar | Portfolio",
		description: "Full-stack Web Developer | Native App Developer",
		images: {
			url: OFFICIAL_TWITTER_IMAGE_URL,
			alt: "Syns Platform Social Image",
			width: 120,
			height: 120,
		},
	},
};
