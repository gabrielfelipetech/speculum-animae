var common = {
	brand: "Speculum Animae",
	actions: {
		enterRegister: "Entrar / Cadastrar",
		logout: "Sair",
		viewArticles: "Ver artigos",
		viewPlans: "Ver planos",
		viewTests: "Explorar testes",
		readArticle: "Ler artigo",
		startTest: "Iniciar teste",
		close: "Fechar"
	}
};
var menu = {
	title: "Menu",
	greeting: "Olá, {name}",
	items: {
		testsDone: "Testes feitos",
		articles: "Artigos",
		plan: "Planos"
	}
};
var shome = {
	kicker: "Speculum Animae",
	title: "Testes de personalidade, temperamento e virtudes em um só lugar.",
	description: "Escolha entre três testes principais: 12 camadas da personalidade, temperamentos clássicos e compatibilidade de temperamentos.",
	sections: {
		coreTests: "Testes principais",
		otherTests: "Outros testes",
		availableTests: "Testes disponíveis",
		articlesTitle: "Artigos",
		articlesCardTitle: "Leituras para aprofundar sua jornada",
		articlesCardDescription: "Explore artigos sobre personalidade, temperamentos, virtudes e relacionamentos."
	},
	faq: {
		kicker: "FAQ",
		title: "Perguntas frequentes",
		description: "Respostas rápidas para dúvidas comuns sobre a plataforma."
	}
};
var testsIndex = {
	kicker: "Speculum Animae",
	title: "Testes",
	description: "Escolha um teste para iniciar sua jornada de autoconhecimento."
};
var articlesIndex = {
	kicker: "Speculum Animae",
	title: "Artigos",
	description: "Leituras sobre personalidade, temperamentos, virtudes e relacionamentos para apoiar seu autoconhecimento.",
	emptyState: "Nenhum artigo encontrado. Tente outro termo ou ajuste os filtros."
};
var billing = {
	title: "Planos",
	subtitleLoggedHint: "Se estiver logado, usamos seu e-mail automaticamente no checkout."
};
var auth = {
	reset: {
		success: "Se este e-mail existir, enviaremos um link de recuperacao.",
		error: "Nao foi possivel enviar o e-mail de recuperacao."
	}
};
var theme = {
	light: "Modo claro",
	dark: "Modo escuro"
};
var language = {
	label: "Idioma",
	pt: "PT",
	en: "EN",
	es: "ES"
};
var footer = {
	legalContact: "Legal / Contato",
	terms: "Termos",
	privacy: "Privacidade",
	contact: "Contato",
	copyright: "{year} Speculum Animae. Todos os direitos reservados."
};
const ptBR = {
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

export { articlesIndex, auth, billing, common, ptBR as default, footer, language, menu, shome, testsIndex, theme };
//# sourceMappingURL=pt-BR.mjs.map
