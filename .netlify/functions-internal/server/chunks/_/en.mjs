var common = {
	brand: "Speculum Animae",
	actions: {
		enterRegister: "Sign in / Sign up",
		logout: "Sign out",
		viewArticles: "View articles",
		viewPlans: "View plans",
		viewTests: "Explore tests",
		readArticle: "Read article",
		startTest: "Start test",
		close: "Close"
	}
};
var menu = {
	title: "Menu",
	greeting: "Hello, {name}",
	items: {
		testsDone: "Completed tests",
		articles: "Articles",
		plan: "Plans"
	}
};
var shome = {
	kicker: "Speculum Animae",
	title: "Personality, temperament, and virtue tests in one place.",
	description: "Choose between three core tests: 12 layers of personality, classic temperaments, and temperaments compatibility.",
	sections: {
		coreTests: "Core tests",
		otherTests: "Other tests",
		availableTests: "Available tests",
		articlesTitle: "Articles",
		articlesCardTitle: "Readings to deepen your journey",
		articlesCardDescription: "Explore articles about personality, temperaments, virtues, and relationships."
	},
	faq: {
		kicker: "FAQ",
		title: "Frequently asked questions",
		description: "Quick answers to common questions about the platform."
	}
};
var testsIndex = {
	kicker: "Speculum Animae",
	title: "Tests",
	description: "Choose a test to start your self-discovery journey."
};
var articlesIndex = {
	kicker: "Speculum Animae",
	title: "Articles",
	description: "Readings about personality, temperaments, virtues, and relationships to support your self-discovery.",
	emptyState: "No articles found. Try another term or adjust the filters."
};
var billing = {
	title: "Plans",
	subtitleLoggedHint: "If you're logged in, we use your email automatically at checkout."
};
var auth = {
	reset: {
		success: "If this email exists, we will send a recovery link.",
		error: "Could not send the recovery email."
	}
};
var theme = {
	light: "Light mode",
	dark: "Dark mode"
};
var language = {
	label: "Language",
	pt: "PT",
	en: "EN",
	es: "ES"
};
var footer = {
	legalContact: "Legal / Contact",
	terms: "Terms",
	privacy: "Privacy",
	contact: "Contact",
	copyright: "{year} Speculum Animae. All rights reserved."
};
const en = {
	common: common,
	menu: menu,
	shome: shome,
	testsIndex: testsIndex,
	articlesIndex: articlesIndex,
	billing: billing,
	auth: auth,
	theme: theme,
	language: language,
	footer: footer
};

export { articlesIndex, auth, billing, common, en as default, footer, language, menu, shome, testsIndex, theme };
//# sourceMappingURL=en.mjs.map
