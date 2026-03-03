const sources = [
    {
        "context": {
            "name": "sitemap:urls",
            "description": "Set with the `sitemap.urls` config."
        },
        "urls": [
            "/",
            "/testes/twelve-layers",
            "/testes/temperaments",
            "/testes/temperaments-compatibility",
            "/artigos",
            "/planos",
            "/artigos/temperamento-colerico-tracos-virtudes-riscos",
            "/artigos/temperamento-melancolico-forcas-sensibilidade-equilibrio",
            "/artigos/12-camadas-mapa-de-autoconhecimento",
            "/artigos/tracos-de-personalidade-observar-sem-rotulos",
            "/artigos/habitos-diarios-para-mais-clareza-mental",
            "/artigos/virtudes-praticas-para-equilibrio-emocional",
            "/artigos/linguagens-do-amor-como-identificar-no-dia-a-dia",
            "/artigos/conversas-dificeis-com-empatia-e-limites",
            "/artigos/temperamento-sanguineo-energia-social-virtudes-excessos",
            "/artigos/temperamento-fleumatico-constancia-paz-inercia",
            "/artigos/combinacoes-de-temperamentos-interpretacao-inicial",
            "/artigos/12-camadas-o-que-cada-camada-significa-e-o-que-nao-significa",
            "/artigos/12-camadas-como-interpretar-resultados-sem-rotulos"
        ],
        "sourceType": "user"
    },
    {
        "context": {
            "name": "@nuxt/content@v3:urls",
            "description": "Generated from your markdown files.",
            "tips": [
                "Parsing the following collections: "
            ]
        },
        "fetch": "/__sitemap__/nuxt-content-urls.json",
        "sourceType": "app"
    },
    {
        "context": {
            "name": "nuxt:pages",
            "description": "Generated from your static page files.",
            "tips": [
                "Can be disabled with `{ excludeAppSources: ['nuxt:pages'] }`."
            ]
        },
        "urls": [
            {
                "loc": "/"
            },
            {
                "loc": "/planos"
            },
            {
                "loc": "/termos"
            },
            {
                "loc": "/privacidade"
            },
            {
                "loc": "/testes"
            },
            {
                "loc": "/artigos"
            },
            {
                "loc": "/auth/callback"
            },
            {
                "loc": "/testes/historico"
            },
            {
                "loc": "/auth/reset-password"
            }
        ],
        "sourceType": "app"
    },
    {
        "context": {
            "name": "nuxt:route-rules",
            "description": "Generated from your route rules config.",
            "tips": [
                "Can be disabled with `{ excludeAppSources: ['nuxt:route-rules'] }`."
            ]
        },
        "urls": [
            "/testes/historico"
        ],
        "sourceType": "app"
    }
];

export { sources };
//# sourceMappingURL=global-sources.mjs.map
