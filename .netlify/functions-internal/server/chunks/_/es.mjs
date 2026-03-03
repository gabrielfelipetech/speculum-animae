var common = {
	brand: "Speculum Animae",
	actions: {
		enterRegister: "Iniciar sesión / Registrarse",
		logout: "Salir",
		viewArticles: "Ver artículos",
		viewPlans: "Ver planes",
		viewTests: "Explorar pruebas",
		readArticle: "Leer artículo",
		startTest: "Iniciar prueba",
		close: "Cerrar"
	}
};
var menu = {
	title: "Menú",
	greeting: "Hola, {name}",
	items: {
		testsDone: "Pruebas realizadas",
		articles: "Artículos",
		plan: "Planes"
	}
};
var shome = {
	kicker: "Speculum Animae",
	title: "Pruebas de personalidad, temperamento y virtudes en un solo lugar.",
	description: "Elige entre tres pruebas principales: 12 capas de la personalidad, temperamentos clásicos y compatibilidad de temperamentos.",
	sections: {
		coreTests: "Pruebas principales",
		otherTests: "Otras pruebas",
		availableTests: "Pruebas disponibles",
		articlesTitle: "Artículos",
		articlesCardTitle: "Lecturas para profundizar tu camino",
		articlesCardDescription: "Explora artículos sobre personalidad, temperamentos, virtudes y relaciones."
	},
	faq: {
		kicker: "FAQ",
		title: "Preguntas frecuentes",
		description: "Respuestas rápidas a dudas comunes sobre la plataforma."
	}
};
var testsIndex = {
	kicker: "Speculum Animae",
	title: "Pruebas",
	description: "Elige una prueba para comenzar tu camino de autoconocimiento."
};
var articlesIndex = {
	kicker: "Speculum Animae",
	title: "Artículos",
	description: "Lecturas sobre personalidad, temperamentos, virtudes y relaciones para apoyar tu autoconocimiento.",
	emptyState: "No se encontraron artículos. Prueba otro término o ajusta los filtros."
};
var billing = {
	title: "Planes",
	subtitleLoggedHint: "Si estás conectado, usamos tu correo automáticamente en el checkout."
};
var auth = {
	reset: {
		success: "Si este correo existe, enviaremos un enlace de recuperacion.",
		error: "No se pudo enviar el correo de recuperacion."
	}
};
var theme = {
	light: "Modo claro",
	dark: "Modo oscuro"
};
var language = {
	label: "Idioma",
	pt: "PT",
	en: "EN",
	es: "ES"
};
var footer = {
	legalContact: "Legal / Contacto",
	terms: "Términos",
	privacy: "Privacidad",
	contact: "Contacto",
	copyright: "{year} Speculum Animae. Todos los derechos reservados."
};
const es = {
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

export { articlesIndex, auth, billing, common, es as default, footer, language, menu, shome, testsIndex, theme };
//# sourceMappingURL=es.mjs.map
