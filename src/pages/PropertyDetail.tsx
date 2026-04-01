import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Droplet, PiggyBank, Gem, MapPin, Dumbbell, Gamepad2, Coffee, Baby, TreePine, ShieldCheck, Layers, BedDouble, Square, ZoomIn, X } from 'lucide-react';
import './PropertyDetail.css';

// Centralised mock data to simulate DB fetch based on ID
const db = {
    "maranhao": {
        title: "Edifício Maranhão", location: "Rua Maranhão 1427 - Funcionários, Belo Horizonte",
        status: "Lançamento", progress: 36,
        progressStages: [
            { name: "Preparo do Terreno", v: 100 },
            { name: "Fundações", v: 100 },
            { name: "Superestrutura", v: 15 },
            { name: "Alvenaria", v: 0 },
            { name: "Instalações", v: 0 },
            { name: "Acabamento", v: 0 }
        ],
        images: [
            "/gallery/maranhao/maranhao1.jpg",
            "/gallery/maranhao/maranhao2.jpg",
            "/gallery/maranhao/maranhao3.jpg"
        ],
        specs: {
            area: "68m² a 182m²",
            beds: "2 e 3 Quartos",
            parking: "1 e 2 Vagas",
            floors: "9 Andares",
            units: "19 Unidades",
            leisure: "Lazer Completo"
        },
        desc: "O Edifício Maranhão é um dos lançamentos mais exclusivos da CHR. Redefinindo o conceito de morar bem no tradicional bairro Funcionários, este projeto de alto luxo oferece uma estrutura completa de lazer e convivência: espaço gourmet, jogos, fitness, sauna, coworking, terraço e playground, tudo amparado por uma portaria imponente.",
        differentials: [
            "19 Unidades",
            "9 Andares",
            "2 e 3 Quartos",
            "Espaço Gourmet e Terraço",
            "Espaço Fitness e Sauna",
            "Espaço de Jogos e Playground",
            "Sala de Coworking",
            "Portaria 24h"
        ],
        gallery: [
            "/gallery/maranhao/maranhao1.jpg",
            "/gallery/maranhao/maranhao2.jpg",
            "/gallery/maranhao/maranhao3.jpg",
            "/gallery/maranhao/maranhao4.jpg",
            "/gallery/maranhao/maranhao5.jpg",
            "/gallery/maranhao/maranhao6.jpg",
            "/gallery/maranhao/maranhao7.jpg",
            "/gallery/maranhao/maranhao8.jpg",
            "/gallery/maranhao/maranhao9.jpg",
            "/gallery/maranhao/maranhao10.jpg",
            "/gallery/maranhao/maranhao12.jpg",
            "/gallery/maranhao/maranhao13.jpg",
            "/gallery/maranhao/maranhao14.jpg",
            "/gallery/maranhao/maranhao15.jpg"
        ],
        plans: [
            { name: "Área Privativa 202", image: "/plants/maranhao/1.jpg" },
            { name: "Área Privativa 203", image: "/plants/maranhao/2.jpg" },
            { name: "Apartamento Tipo 302 a 502", image: "/plants/maranhao/3.jpg" },
            { name: "Apartamento Tipo 303 a 503", image: "/plants/maranhao/4.jpg" },
            { name: "Apartamento Tipo 201 a 501", image: "/plants/maranhao/5.jpg" },
            { name: "Área Privativa 601", image: "/plants/maranhao/6.jpg" },
            { name: "Área Privativa 602", image: "/plants/maranhao/7.jpg" },
            { name: "Apartamento Tipo 701", image: "/plants/maranhao/8.jpg" },
            { name: "Apartamento Tipo 702", image: "/plants/maranhao/9.jpg" },
            { name: "Cobertura 802 1º Nível", image: "/plants/maranhao/10.jpg" },
            { name: "Cobertura 802 2º Nível", image: "/plants/maranhao/11.jpg" },
            { name: "Cobertura 901 1º Nível", image: "/plants/maranhao/12.jpg" },
            { name: "Cobertura 901 2º Nível", image: "/plants/maranhao/13.jpg" },
            { name: "Planta Lazer", image: "/plants/maranhao/14.jpg" }
        ]
    },
    "sion-prime": {
        title: "Sion Prime", location: "Rua Laranjal 129 e 139, Bairro Sion, Belo Horizonte",
        status: "Lançamento", progress: 8,
        progressStages: [
            { name: "Preparo do Terreno", v: 50 },
            { name: "Fundações", v: 0 },
            { name: "Superestrutura", v: 0 },
            { name: "Alvenaria", v: 0 },
            { name: "Instalações", v: 0 },
            { name: "Acabamento", v: 0 }
        ],
        images: [
            "/gallery/sion-prime/1.jpg",
            "/gallery/sion-prime/2.jpg",
            "/gallery/sion-prime/3.jpg"
        ],
        specs: {
            area: "57 a 140m²",
            beds: "2 e 3 Quartos",
            parking: "2 Vagas",
            floors: "8 Andares",
            units: "14 Unidades",
            leisure: "Sem Área de Lazer"
        },
        desc: "O Sion Prime foi concebido desde sua origem com foco estratégico em geração de valor imobiliário, combinando arquitetura imponente, implantação qualificada e plantas altamente eficientes, de forma a maximizar o potencial de valorização, liquidez e atratividade comercial ao longo de todo o ciclo do investimento.",
        differentials: [
            "14 Unidades",
            "8 Andares",
            "2 e 3 Quartos",
            "Localização Estratégica",
            "Área Privativa e Cobertura",
            "Condomínio Econômico",
            "Água e Gás Individualizados",
            "Acabamento de Alto Padrão"
        ],
        gallery: [
            "/gallery/sion-prime/1.jpg",
            "/gallery/sion-prime/2.jpg",
            "/gallery/sion-prime/3.jpg",
            "/gallery/sion-prime/4.jpg",
            "/gallery/sion-prime/5.jpg"
        ],
        plans: [
            { name: "Planta Tipo - 2 Quartos (Final 01 e 04)", image: "/plants/sion-prime/planta-2-quartos-v1.png" },
            { name: "Planta Tipo - 2 Quartos (Final 02 e 03)", image: "/plants/sion-prime/planta-2-quartos-v2.png" },
            { name: "Planta Tipo - 2 Quartos (Variação)", image: "/plants/sion-prime/planta-2-quartos-v3.png" },
            { name: "Planta Tipo - 2 Quartos (Final 05 e 06)", image: "/plants/sion-prime/planta-2-quartos-v4.png" },
            { name: "Planta Tipo - 3 Quartos", image: "/plants/sion-prime/planta-3-quartos-v1.png" },
            { name: "Planta Referência Pilotis", image: "/plants/sion-prime/planta-pilotis.png" },
            { name: "Planta Referência Garagem", image: "/plants/sion-prime/planta-garagem.png" },
            { name: "Planta Tipo - 3 Quartos (Variação)", image: "/plants/sion-prime/planta-3-quartos-v2.png" },
            { name: "Cobertura - Inferior", image: "/plants/sion-prime/cobertura-01.png" },
            { name: "Cobertura - Superior", image: "/plants/sion-prime/cobertura-02.png" }
        ]
    },
    "sao-domingos": {
        title: "Edifício\nE. Pinheiro", location: "Rua São Domingos do Prata, 119 - São Pedro",
        status: "Em Obras", progress: 41,
        progressStages: [
            { name: "Preparo do Terreno", v: 100 },
            { name: "Fundações", v: 100 },
            { name: "Superestrutura", v: 30 },
            { name: "Alvenaria", v: 15 },
            { name: "Instalações", v: 0 },
            { name: "Acabamento", v: 0 }
        ],
        images: [
            "/gallery/sao-domingos/1.jpg",
            "/gallery/sao-domingos/2.jpg",
            "/gallery/sao-domingos/3.jpg"
        ],
        specs: {
            area: "36m² a 160m²",
            beds: "1, 2 e 3 Quartos",
            parking: "1 e 2 Vagas",
            floors: "A Definir",
            units: "17 Unidades",
            leisure: "Sem Área de Lazer"
        },
        desc: "Excelente localização no bairro São Pedro, a poucos metros do Shopping Pátio Savassi e do Colégio Marista. Um projeto que une a praticidade de metragens inteligentes com a exclusividade de poucas unidades, ideal para quem busca morar perto de tudo com conforto e sofisticação.",
        differentials: [
            "17 Unidades",
            "1, 2 e 3 Quartos",
            "Localização Estratégica",
            "Área Privativa e Cobertura",
            "Condomínio Econômico",
            "Água e Gás Individualizados",
            "Acabamento de Alto Padrão",
            "Próximo ao Pátio Savassi"
        ],
        gallery: [
            "/gallery/sao-domingos/1.jpg",
            "/gallery/sao-domingos/2.jpg",
            "/gallery/sao-domingos/3.jpg",
            "/gallery/sao-domingos/4.jpg"
        ],
        plans: [
            { name: "Planta 1", image: "/plants/sao-domingos/1.jpg" },
            { name: "Planta 2", image: "/plants/sao-domingos/2.jpg" },
            { name: "Planta 3", image: "/plants/sao-domingos/3.jpg" },
            { name: "Planta 4", image: "/plants/sao-domingos/4.jpg" },
            { name: "Planta 5", image: "/plants/sao-domingos/5.jpg" },
            { name: "Planta 6", image: "/plants/sao-domingos/6.jpg" },
            { name: "Planta 7", image: "/plants/sao-domingos/7.jpg" },
            { name: "Planta 8", image: "/plants/sao-domingos/8.jpg" },
            { name: "Planta 9", image: "/plants/sao-domingos/9.jpg" },
            { name: "Planta 10", image: "/plants/sao-domingos/10.jpg" }
        ]
    },
    "j-silva": {
        title: "Edifício J. Silva", location: "Rua Teixeira Magalhães, 130 - Floresta",
        status: "Lançamento", progress: 0,
        progressStages: [
            { name: "Preparo do Terreno", v: 0 },
            { name: "Fundações", v: 0 },
            { name: "Superestrutura", v: 0 },
            { name: "Alvenaria", v: 0 },
            { name: "Instalações", v: 0 },
            { name: "Acabamento", v: 0 }
        ],
        images: ["/gallery/j-silva/1.jpg"],
        specs: { area: "59m² a 124m²", beds: "2 Quartos", parking: "2 Vagas", floors: "5 Andares", units: "11 Unidades", leisure: "Sem Área de Lazer" },
        desc: "Uma joia no bairro Floresta, situada na Rua Teixeira Magalhães. O Edifício J. Silva oferece uma localização estratégica central, cercada por uma infraestrutura completa com mercados, escolas, bancos e centros comerciais. Viva a conveniência de estar a poucos passos de tudo o que você precisa, unida ao conforto de um projeto moderno e exclusivo.",
        differentials: [
            "11 Unidades",
            "5 Andares",
            "2 Quartos",
            "Localização Estratégica",
            "Área Privativa e Cobertura",
            "Condomínio Econômico",
            "Água e Gás Individualizados",
            "Acabamento de Alto Padrão"
        ],
        gallery: ["/gallery/j-silva/1.jpg", "/gallery/j-silva/2.jpg"],
        plans: [
            { name: "Planta Tipo 1", image: "/plants/j-silva/1.jpg" },
            { name: "Planta Tipo 2", image: "/plants/j-silva/2.jpg" },
            { name: "Planta Tipo 3", image: "/plants/j-silva/3.jpg" },
            { name: "Planta Tipo 4", image: "/plants/j-silva/4.jpg" },
            { name: "Planta Tipo 5", image: "/plants/j-silva/5.jpg" },
            { name: "Cobertura Linear", image: "/plants/j-silva/COBERTURA LINEAR.jpg" },
            { name: "Cobertura Pav 1", image: "/plants/j-silva/COBERTURA PAV 1.jpg" },
            { name: "Cobertura Pav 2", image: "/plants/j-silva/COBERTURA PAV 2.jpg" }
        ]
    },
    "m-faria": {
        title: "Edifício\nM. Faria", location: "Rua Itajubá, 108 - Floresta",
        status: "Lançamento", progress: 0,
        progressStages: [
            { name: "Preparo do Terreno", v: 0 },
            { name: "Fundações", v: 0 },
            { name: "Superestrutura", v: 0 },
            { name: "Alvenaria", v: 0 },
            { name: "Instalações", v: 0 },
            { name: "Acabamento", v: 0 }
        ],
        images: ["/gallery/m-faria/1.jpg"],
        specs: { area: "36m² a 90m²", beds: "1 Quarto", parking: "1 Vaga", floors: "5 Andares", units: "16 Unidades", leisure: "Sem Área de Lazer" },
        desc: "Oportunidade perfeita para jovens profissionais e investidores graças à localização estratégica do Floresta, ao lado do hipercentro. Com infraestrutura consolidada de comércio, cultura e ruas arborizadas, o edifício é um ativo inteligente e moderno, com alta liquidez para locação tradicional ou mid-stay corporativo.",
        differentials: [
            "16 Unidades",
            "5 Andares",
            "1 Quarto",
            "Localização Estratégica",
            "Área Privativa e Cobertura",
            "Condomínio Econômico",
            "Água e Gás Individualizados",
            "Acabamento de Alto Padrão"
        ],
        gallery: ["/gallery/m-faria/1.jpg", "/gallery/m-faria/2.jpg"],
        plans: [
            { name: "Planta 1", image: "/plants/m-faria/1.jpg" },
            { name: "Planta 2", image: "/plants/m-faria/2.jpg" },
            { name: "Planta 3", image: "/plants/m-faria/3.jpg" },
            { name: "Planta 4", image: "/plants/m-faria/4.jpg" },
            { name: "Planta 5", image: "/plants/m-faria/5.jpg" },
            { name: "Planta 6", image: "/plants/m-faria/6.jpg" },
            { name: "Planta 7", image: "/plants/m-faria/7.jpg" },
            { name: "Planta 8", image: "/plants/m-faria/8.jpg" },
            { name: "Planta 9", image: "/plants/m-faria/9.jpg" }
        ]
    },
    "silva-jardim": {
        title: "Edifício Silva Jardim", location: "Rua Silva Jardim, 192 - Floresta",
        status: "Lançamento", progress: 0,
        progressStages: [
            { name: "Preparo do Terreno", v: 0 },
            { name: "Fundações", v: 0 },
            { name: "Superestrutura", v: 0 },
            { name: "Alvenaria", v: 0 },
            { name: "Instalações", v: 0 },
            { name: "Acabamento", v: 0 }
        ],
        images: ["/gallery/silva-jardim/1.jpg"],
        specs: { area: "60m² a 191m²", beds: "2 a 4 Quartos", parking: "2 Vagas", floors: "5 Andares", units: "8 Unidades", leisure: "Sem Área de Lazer" },
        desc: "Viver no Edifício Silva Jardim é desfrutar de uma localização privilegiada e estratégica, a poucos passos de todo o comércio e conveniências do bairro Floresta, com acesso rápido a qualquer ponto da cidade. É sinônimo de qualidade de vida urbana em meio a calçadas arborizadas e áreas verdes. Uma oportunidade de manter o contato com a natureza e garantir mais bem-estar no coração da metrópole, sem abrir mão do conforto e da praticidade.",
        differentials: [
            "8 Unidades",
            "5 Andares",
            "2 a 4 Quartos",
            "Localização Estratégica",
            "Área Privativa e Cobertura",
            "Condomínio Econômico",
            "Água e Gás Individualizados",
            "Acabamento de Alto Padrão"
        ],
        gallery: ["/gallery/silva-jardim/1.jpg", "/gallery/silva-jardim/2.jpg"],
        plans: [
            { name: "Planta 1", image: "/plants/silva-jardim/1.jpg" },
            { name: "Planta 2", image: "/plants/silva-jardim/2.jpg" },
            { name: "Planta 3", image: "/plants/silva-jardim/3.jpg" },
            { name: "Planta 4", image: "/plants/silva-jardim/4.jpg" },
            { name: "Planta 5", image: "/plants/silva-jardim/5.jpg" },
            { name: "Planta 6", image: "/plants/silva-jardim/6.jpg" }
        ]
    },
    "studio-aimores": {
        title: "Studio\nAimorés", location: "Rua Aimorés - Funcionários",
        status: "Em Obras", progress: 0,
        progressStages: [
            { name: "Preparo do Terreno", v: 0 },
            { name: "Fundações", v: 0 },
            { name: "Superestrutura", v: 0 },
            { name: "Alvenaria", v: 0 },
            { name: "Instalações", v: 0 },
            { name: "Acabamento", v: 0 }
        ],
        images: ["/gallery/aimores/1.jpg"],
        specs: { area: "A Definir", beds: "Studio", parking: "A Definir", floors: "A Definir", units: "A Definir", leisure: "A Definir" },
        desc: "Lançamento exclusivo no coração do bairro Funcionários. O Studio Aimorés une design contemporâneo à praticidade urbana, oferecendo um estilo de vida dinâmico em uma das localizações mais nobres de Belo Horizonte. Ideal para quem busca liquidez, modernidade e estar perto de tudo.",
        differentials: [
            "Localização Estratégica",
            "Studio Inteligente",
            "Área Privativa e Cobertura",
            "Condomínio Econômico",
            "Água e Gás Individualizados",
            "Acabamento de Alto Padrão",
            "Design Contemporâneo",
            "No Coração do Funcionários"
        ],
        gallery: ["/gallery/aimores/1.jpg", "/gallery/aimores/2.jpg", "/gallery/aimores/3.jpg"],
        plans: []
    },
    "major-lopes": {
        title: "Edifício\nF. Duarte Vidigal", location: "Rua Major Lopes, 142 - São Pedro",
        status: "Em Obras", progress: 46,
        progressStages: [
            { name: "Preparo do Terreno", v: 100 },
            { name: "Fundações", v: 100 },
            { name: "Superestrutura", v: 75 },
            { name: "Alvenaria", v: 0 },
            { name: "Instalações", v: 0 },
            { name: "Acabamento", v: 0 }
        ],
        images: ["/gallery/major-lopes/1.jpg"],
        specs: { area: "34m² a 61m²", beds: "1 Quarto", parking: "1 Vaga", floors: "A Definir", units: "A Definir", leisure: "Sem Área de Lazer" },
        desc: "Uma nova referência de sofisticação no coração do bairro São Pedro. O Edifício Feliciano Duarte Vidigal traz a exclusividade de um projeto moderno em uma localização estratégica, próximo a toda a conveniência e charme da Rua Major Lopes.",
        differentials: [
            "Localização Estratégica",
            "1 Quarto",
            "Cobertura",
            "Condomínio Econômico",
            "Água e Gás Individualizados",
            "Acabamento de Alto Padrão",
            "Design Moderno",
            "No Coração do São Pedro"
        ],
        gallery: ["/gallery/major-lopes/1.jpg", "/gallery/major-lopes/2.jpg", "/gallery/major-lopes/3.jpg"],
        plans: []
    },
    "mar-de-espanha": {
        title: "Edifício\nMar de Espanha", location: "Rua Mar de Espanha, 422 - Santo Antônio",
        status: "Em Obras", progress: 92,
        progressStages: [
            { name: "Preparo do Terreno", v: 100 },
            { name: "Fundações", v: 100 },
            { name: "Superestrutura", v: 100 },
            { name: "Alvenaria", v: 100 },
            { name: "Instalações", v: 80 },
            { name: "Acabamento", v: 70 }
        ],
        images: ["/gallery/mar-de-espanha/1.jpg"],
        specs: { area: "60m² a 127,50m²", beds: "2 Quartos", parking: "2 Vagas", floors: "4 Andares", units: "A Definir", leisure: "Espaço Gourmet" },
        desc: "O Edifício Mar de Espanha destaca-se pela sua arquitetura imponente com detalhes em madeira no bairro Santo Antônio. Com apartamentos de 2 quartos e 60m², oferece o equilíbrio perfeito entre elegância, conforto e uma vida urbana prática em uma localização residencial nobre.",
        differentials: [
            "Localização Nobre no Santo Antônio",
            "Apartamentos de 2 Quartos",
            "Espaço Gourmet",
            "Acabamento de Alto Padrão",
            "Condomínio Econômico",
            "Água e Gás Individualizados",
            "Próximo a Restaurantes e Comércio",
            "Fachada Moderna com Detalhes em Madeira"
        ],
        gallery: ["/gallery/mar-de-espanha/1.jpg", "/gallery/mar-de-espanha/2.jpg"],
        plans: []
    },
    "stela-de-souza": {
        title: "Studio\nStela de Souza", location: "Rua Stela de Souza, 107 - Sagrada Família",
        status: "Em Obras", progress: 83,
        progressStages: [
            { name: "Preparo do Terreno", v: 100 },
            { name: "Fundações", v: 100 },
            { name: "Superestrutura", v: 100 },
            { name: "Alvenaria", v: 100 },
            { name: "Instalações", v: 50 },
            { name: "Acabamento", v: 50 }
        ],
        images: ["/gallery/stela-de-souza/1.jpg"],
        specs: { area: "37m² a 55m²", beds: "1 Quarto", parking: "1 Vaga", floors: "5 Andares", units: "15 Unidades", leisure: "Sem Área de Lazer" },
        desc: "Exclusividade e modernidade no bairro Sagrada Família. O Studio Stela de Souza oferece o equilíbrio perfeito entre design contemporâneo e funcionalidade, com plantas inteligentes de 37 a 55m². Um projeto pensado para quem busca praticidade em uma localização residencial consolidada.",
        differentials: [
            "Localização Residencial Nobre",
            "Plantas Inteligentes",
            "1 Quarto com Vaga",
            "Condomínio Econômico",
            "Água e Gás Individualizados",
            "Acabamento de Alto Padrão",
            "Apenas 15 Unidades",
            "Arquitetura Moderna"
        ],
        gallery: ["/gallery/stela-de-souza/1.jpg", "/gallery/stela-de-souza/2.jpg"],
        plans: []
    },
    "odilon-braga": {
        title: "Edifício\nOdilon Braga", location: "Rua Odilon Braga, 369 - Anchieta",
        status: "Em Obras", progress: 98,
        progressStages: [
            { name: "Preparo do Terreno", v: 100 },
            { name: "Fundações", v: 100 },
            { name: "Superestrutura", v: 100 },
            { name: "Alvenaria", v: 100 },
            { name: "Instalações", v: 100 },
            { name: "Acabamento", v: 90 }
        ],
        images: ["/gallery/odilon-braga/1.jpg"],
        specs: { area: "60 a 124m²", beds: "2 a 3 Quartos", parking: "2 Vagas", floors: "5 Andares", units: "8 Unidades", leisure: "Espaço Gourmet e Fitness" },
        desc: "Requinte e sofisticação no bairro Anchieta. O Edifício Odilon Braga oferece a exclusividade de apenas 8 unidades em uma das ruas mais desejadas da região. Com plantas versáteis de 2 a 3 quartos, este projeto une conforto, segurança e alto padrão em uma localização privilegiada.",
        differentials: [
            "Localização Nobre no Anchieta",
            "Apenas 8 Unidades",
            "Plantas Espaçosas",
            "2 Vagas de Garagem",
            "Acabamento de Alto Padrão",
            "Arquitetura Contemporânea",
            "Água e Gás Individualizados",
            "Segurança de Última Geração"
        ],
        gallery: ["/gallery/odilon-braga/1.jpg"],
        plans: []
    },
    "barao-de-cocais": {
        title: "Studio\nBarão de Cocais", location: "Rua Barão de Cocais, 54 - Sagrada Família",
        status: "Em Obras", progress: 93,
        progressStages: [
            { name: "Preparo do Terreno", v: 100 },
            { name: "Fundações", v: 100 },
            { name: "Superestrutura", v: 100 },
            { name: "Alvenaria", v: 100 },
            { name: "Instalações", v: 100 },
            { name: "Acabamento", v: 60 }
        ],
        images: ["/gallery/barao-de-cocais/1.jpg"],
        specs: { area: "37 a 100m²", beds: "1 Quarto", parking: "1 Vaga", floors: "5 Andares", units: "15 Unidades", leisure: "Sem Área de Lazer" },
        desc: "Arquitetura arrojada no coração da Sagrada Família. O Studio Barão de Cocais redefine o conceito de estúdio com metragens amplas e exclusivas, incluindo unidades com área privativa e duplex. Um projeto limitado a 15 unidades que une sofisticação e funcionalidade em um dos bairros mais tradicionais da cidade.",
        differentials: [
            "Localização Estratégica",
            "Duplex e Área Privativa",
            "Apenas 15 Unidades",
            "Design Contemporâneo",
            "Vaga de Garagem Coberta",
            "Acabamento Premium",
            "Água e Gás Individualizados",
            "Condomínio Inteligente"
        ],
        gallery: ["/gallery/barao-de-cocais/1.jpg", "/gallery/barao-de-cocais/2.jpg"],
        plans: []
    },
    "silvestre-ferraz": {
        title: "Studio\nSilvestre Ferraz", location: "Rua Silvestre Ferraz, 132 - Sagrada Família",
        status: "Em Obras", progress: 96,
        progressStages: [
            { name: "Preparo do Terreno", v: 100 },
            { name: "Fundações", v: 100 },
            { name: "Superestrutura", v: 100 },
            { name: "Alvenaria", v: 100 },
            { name: "Instalações", v: 100 },
            { name: "Acabamento", v: 75 }
        ],
        images: ["/gallery/silvestre-ferraz/1.jpg"],
        specs: { area: "37 a 75m²", beds: "1 Quarto", parking: "1 Vaga", floors: "5 Andares", units: "12 Unidades", leisure: "Sem Área de Lazer" },
        desc: "Viva a exclusividade no Studio Silvestre Ferraz. Localizado estrategicamente no bairro Sagrada Família, este projeto inovador traz apenas 12 unidades com acabamento de alto padrão. Unidades duplex e áreas privativas oferecem o espaço ideal para quem não abre mão do conforto em um ambiente compacto e moderno.",
        differentials: [
            "Localização Residencial Próxima ao Centro",
            "Unidades Duplex Exclusivas",
            "Áreas Privativas Amplas",
            "Apenas 12 Unidades",
            "Vaga de Garagem",
            "Design de Fachada Moderno",
            "Água e Gás Individualizados",
            "Acabamento Superior"
        ],
        gallery: ["/gallery/silvestre-ferraz/1.jpg", "/gallery/silvestre-ferraz/2.jpg", "/gallery/silvestre-ferraz/3.jpg"],
        plans: []
    },
    "gisa-araujo": {
        title: "Edifício\nGisa Araújo", location: "Rua Pium-í, 930 - Sion",
        status: "Últimas Unidades", progress: 100,
        progressStages: [
            { name: "Preparo do Terreno", v: 100 },
            { name: "Fundações", v: 100 },
            { name: "Superestrutura", v: 100 },
            { name: "Alvenaria", v: 100 },
            { name: "Instalações", v: 100 },
            { name: "Acabamento", v: 100 }
        ],
        images: ["/gallery/gisa-araujo/1.jpg"],
        specs: { area: "60 a 203m²", beds: "2, 3 e 4 Quartos", parking: "2 a 4 Vagas", floors: "7 Andares", units: "13 Unidades", leisure: "Sem Área de Lazer" },
        desc: "Exclusividade e sofisticação no coração do bairro Sion. O Edifício Gisa Araújo oferece uma variedade única de plantas, desde apartamentos tipo a coberturas lineares e áreas privativas, além de uma loja de conveniência no térreo. Com acabamento impecável e localização privilegiada, é o empreendimento ideal para quem busca versatilidade e conforto em uma das regiões mais valorizadas de BH.",
        differentials: [
            "Localização Privilegiada no Sion",
            "Plantas de 2, 3 e 4 Quartos",
            "Coberturas e Áreas Privativas",
            "Acabamento de Alto Padrão",
            "2 a 4 Vagas de Garagem",
            "Loja no Térreo",
            "Apenas 13 Unidades",
            "Arquitetura Contemporânea"
        ],
        gallery: ["/gallery/gisa-araujo/1.jpg", "/gallery/gisa-araujo/2.jpg", "/gallery/gisa-araujo/3.jpg", "/gallery/gisa-araujo/4.jpg"],
        plans: []
    },
    "costa-monteiro": {
        title: "Edifício\nCosta Monteiro", location: "Rua Costa Monteiro, 699 - Sagrada Família",
        status: "Últimas Unidades", progress: 100,
        progressStages: [
            { name: "Preparo do Terreno", v: 100 },
            { name: "Fundações", v: 100 },
            { name: "Superestrutura", v: 100 },
            { name: "Alvenaria", v: 100 },
            { name: "Instalações", v: 100 },
            { name: "Acabamento", v: 100 }
        ],
        images: ["/gallery/costa-monteiro/1.jpg"],
        specs: { area: "40 a 122m²", beds: "1, 2 e 3 Quartos", parking: "1 e 2 Vagas", floors: "4 Andares", units: "10 Unidades", leisure: "Sem Área de Lazer" },
        desc: "O Edifício Costa Monteiro é a escolha ideal para quem busca conforto e exclusividade no bairro Sagrada Família. Com apenas 10 unidades, o projeto oferece uma variedade de plantas que se adaptam ao seu estilo de vida, desde studios práticos a coberturas espaçosas. Tudo isso com o padrão de qualidade CHR e uma localização privilegiada e tranquila.",
        differentials: [
            "Apenas 10 Unidades",
            "Plantas Versáteis (1, 2 e 3 Qts)",
            "Localização Residencial Tranquila",
            "Área Privativa e Cobertura",
            "Acabamento de Alto Padrão",
            "Água e Gás Individualizados",
            "Vagas de Garagem Cobertas",
            "Condomínio Econômico"
        ],
        gallery: ["/gallery/costa-monteiro/1.jpg", "/gallery/costa-monteiro/2.jpg"],
        plans: []
    },
    "sao-manoel": {
        title: "Edifício\nSão Manoel", location: "Rua São Manoel, 263 - Bairro Floresta",
        status: "Concluído", progress: 100,
        progressStages: [
            { name: "Preparo do Terreno", v: 100 },
            { name: "Fundações", v: 100 },
            { name: "Superestrutura", v: 100 },
            { name: "Alvenaria", v: 100 },
            { name: "Instalações", v: 100 },
            { name: "Acabamento", v: 100 }
        ],
        images: ["/gallery/sao-manoel/1.jpg"],
        specs: { area: "A Definir", beds: "1 e 2 Quartos", parking: "1 e 2 Vagas", floors: "A Definir", units: "A Definir", leisure: "Área Privativa e Cobertura" },
        desc: "O Edifício São Manoel traz modernidade e elegância em uma das ruas mais tradicionais do bairro Floresta. Com opções de 1 e 2 quartos, o projeto contempla áreas privativas e coberturas que atendem aos mais altos padrões de exigência. Qualidade construtiva e localização privilegiada em um único lugar.",
        differentials: [
            "Localização Nobre no Floresta",
            "1 e 2 Quartos",
            "Vagas de 1 e 2 Veículos",
            "Área Privativa e Cobertura",
            "Acabamento de Alto Padrão",
            "Água e Gás Individualizados",
            "Design Contemporâneo",
            "Segurança e Praticidade"
        ],
        gallery: ["/gallery/sao-manoel/1.jpg", "/gallery/sao-manoel/2.jpg", "/gallery/sao-manoel/3.jpg", "/gallery/sao-manoel/4.jpg", "/gallery/sao-manoel/5.jpg", "/gallery/sao-manoel/6.jpg"],
        plans: []
    },
    "enio-soares": {
        title: "Edifício\nEnio Soares", location: "Rua Conselheiro Lafaiete, 497 - Sagrada Família",
        status: "Em Obras", progress: 0,
        progressStages: [
            { name: "Preparo do Terreno", v: 0 },
            { name: "Fundações", v: 0 },
            { name: "Superestrutura", v: 0 },
            { name: "Alvenaria", v: 0 },
            { name: "Instalações", v: 0 },
            { name: "Acabamento", v: 0 }
        ],
        images: ["/gallery/enio-soares/1.jpg"],
        specs: { area: "A Definir", beds: "2 e 3 Quartos", parking: "A Definir", floors: "A Definir", units: "A Definir", leisure: "Área Privativa e Cobertura" },
        desc: "Requinte e design na Rua Conselheiro Lafaiete. O Edifício Enio Soares é o novo marco da CHR na Sagrada Família, oferecendo apartamentos de 2 e 3 quartos com o máximo de conforto. Unidades exclusivas com área privativa e coberturas que proporcionam uma vista única da região, unindo qualidade construtiva e localização estratégica.",
        differentials: [
            "Localização Tradicional na Conselheiro Lafaiete",
            "Apartamentos de 2 e 3 Quartos",
            "Área Privativa e Cobertura",
            "Design Contemporâneo",
            "Acabamento Superior CHR",
            "Plantas Inteligentes",
            "Água e Gás Individualizados",
            "Infraestrutura de Alto Padrão"
        ],
        gallery: ["/gallery/enio-soares/1.jpg", "/gallery/enio-soares/2.jpg", "/gallery/enio-soares/3.jpg", "/gallery/enio-soares/4.jpg", "/gallery/enio-soares/5.jpg"],
        plans: []
    },
    "isabela-lima": {
        title: "Edifício\nIsabela Lima", location: "Rua Jaime Gomes, 76 - Floresta",
        status: "Em Obras", progress: 0,
        progressStages: [
            { name: "Preparo do Terreno", v: 0 },
            { name: "Fundações", v: 0 },
            { name: "Superestrutura", v: 0 },
            { name: "Alvenaria", v: 0 },
            { name: "Instalações", v: 0 },
            { name: "Acabamento", v: 0 }
        ],
        images: ["/gallery/isabela-lima/1.jpg"],
        specs: { area: "A Definir", beds: "A Definir", parking: "A Definir", floors: "A Definir", units: "A Definir", leisure: "A Definir" },
        desc: "Exclusividade e sofisticação no coração do bairro Floresta. O Edifício Isabela Lima traz o padrão de qualidade CHR para a Rua Jaime Gomes. Unidades projetadas para oferecer o máximo de conforto em uma localização repleta de história, comércio e facilidades. Descubra um novo conceito de moradias com acabamento superior e design atemporal.",
        differentials: [
            "Localização Nobre no Bairro Floresta",
            "Acabamento de Alto Padrão",
            "Design Contemporâneo",
            "Condomínio Econômico",
            "Sustentabilidade e Tecnologia",
            "Água e Gás Individualizados",
            "Vagas de Garagem Cobertas",
            "Próximo ao Centro de BH"
        ],
        gallery: ["/gallery/isabela-lima/1.jpg", "/gallery/isabela-lima/2.jpg"],
        plans: []
    },
    "sao-pedro": {
        title: "Edifício\nSão Pedro", location: "Rua Mestre Luiz, 76 - São Pedro",
        status: "Em Obras", progress: 0,
        progressStages: [
            { name: "Preparo do Terreno", v: 0 },
            { name: "Fundações", v: 0 },
            { name: "Superestrutura", v: 0 },
            { name: "Alvenaria", v: 0 },
            { name: "Instalações", v: 0 },
            { name: "Acabamento", v: 0 }
        ],
        images: ["/gallery/sao-pedro/1.jpg"],
        specs: { area: "A Definir", beds: "2 e 3 Quartos", parking: "A Definir", floors: "A Definir", units: "A Definir", leisure: "Área Privativa e Cobertura" },
        desc: "O Edifício São Pedro representa a harmonia entre modernidade e tradição no coração do bairro São Pedro. Localizado na Rua Mestre Luiz, o projeto oferece plantas de 2 e 3 quartos com acabamentos de altíssimo nível. Unidades com área privativa e coberturas que atendem aos mais refinados desejos de moradia e bem-estar.",
        differentials: [
            "Localização Privilegiada no São Pedro",
            "Plantas de 2 e 3 Quartos",
            "Área Privativa e Cobertura",
            "Acabamento de Alto Padrão",
            "Vagas de Garagem Cobertas",
            "Segurança de Última Geração",
            "Arquitetura Elegante",
            "Qualidade Construtiva CHR"
        ],
        gallery: ["/gallery/sao-pedro/1.jpg", "/gallery/sao-pedro/2.jpg", "/gallery/sao-pedro/3.jpg", "/gallery/sao-pedro/4.jpg"],
        plans: []
    },
    "chicago": {
        title: "Edifício\nChicago", location: "Rua Chicago, 295 - Sion",
        status: "Em Obras", progress: 0,
        progressStages: [
            { name: "Preparo do Terreno", v: 0 },
            { name: "Fundações", v: 0 },
            { name: "Superestrutura", v: 0 },
            { name: "Alvenaria", v: 0 },
            { name: "Instalações", v: 0 },
            { name: "Acabamento", v: 0 }
        ],
        images: ["/gallery/chicago/1.JPG"],
        specs: { area: "A Definir", beds: "2 e 3 Quartos", parking: "A Definir", floors: "A Definir", units: "A Definir", leisure: "Área Privativa e Cobertura" },
        desc: "O Edifício Chicago traz a sofisticação da arquitetura moderna para a Rua Chicago, no coração do bairro Sion. Com apartamentos amplos de 2 e 3 quartos, o projeto contempla áreas privativas e coberturas lineares que elevam o conceito de morar bem. Qualidade CHR em cada detalhe, em uma das localizações mais desejadas de BH.",
        differentials: [
            "Localização Privilegiada no Sion",
            "Plantas de 2 e 3 Quartos",
            "Área Privativa e Cobertura",
            "Acabamento de Alto Padrão",
            "Vagas de Garagem Cobertas",
            "Design Contemporâneo",
            "Água e Gás Individualizados",
            "Próximo ao Comércio e Lazer do Sion"
        ],
        gallery: ["/gallery/chicago/1.JPG", "/gallery/chicago/2.jpg"],
        plans: []
    },
    "dom-vital": {
        title: "Edifício\nDom Vital", location: "Rua Dom Vital, 47 - Anchieta",
        status: "Em Obras", progress: 0,
        progressStages: [
            { name: "Preparo do Terreno", v: 0 },
            { name: "Fundações", v: 0 },
            { name: "Superestrutura", v: 0 },
            { name: "Alvenaria", v: 0 },
            { name: "Instalações", v: 0 },
            { name: "Acabamento", v: 0 }
        ],
        images: ["/gallery/dom-vital/1.jpg"],
        specs: { area: "37 a 75m²", beds: "1 Quarto", parking: "1 a 2 Vagas", floors: "A Definir", units: "A Definir", leisure: "Área Privativa e Cobertura" },
        desc: "Exclusividade e estilo se encontram na Rua Dom Vital. No coração do bairro Anchieta, o Edifício Dom Vital oferece apartamentos de 1 quarto com plantas inteligentes e acabamento premium. Unidades exclusivas com área privativa e coberturas que proporcionam lazer e conforto para toda a família.",
        differentials: [
            "Localização Nobre no Anchieta",
            "Plantas de 2 e 3 Quartos",
            "Área Privativa e Cobertura",
            "Acabamento de Alto Padrão",
            "Vagas de Garagem Cobertas",
            "Design Contemporâneo",
            "Infraestrutura para Ar-Condicionado",
            "Água e Gás Individualizados"
        ],
        gallery: ["/gallery/dom-vital/1.jpg", "/gallery/dom-vital/2.jpg", "/gallery/dom-vital/3.jpg", "/gallery/dom-vital/4.jpg"],
        plans: []
    },
    "amaro-linari": {
        title: "Edifício Eng.\nAmaro Linari", location: "Rua Engenheiro Amaro Linari, 366 - Sion",
        status: "Em Obras", progress: 0,
        progressStages: [
            { name: "Preparo do Terreno", v: 0 },
            { name: "Fundações", v: 0 },
            { name: "Superestrutura", v: 0 },
            { name: "Alvenaria", v: 0 },
            { name: "Instalações", v: 0 },
            { name: "Acabamento", v: 0 }
        ],
        images: ["/gallery/amaro-linari/1.jpg"],
        specs: { area: "A Definir", beds: "2 e 3 Quartos", parking: "A Definir", floors: "A Definir", units: "A Definir", leisure: "Área Privativa e Cobertura" },
        desc: "Requinte e exclusividade no bairro Sion. O Edifício Eng. Amaro Linari é o novo marco de qualidade da CHR na região, oferecendo apartamentos de 2 e 3 quartos com acabamentos de alto padrão. Unidades amplas com área privativa e coberturas que proporcionam lazer e conforto incomparáveis, unindo sofisticação e localização privilegiada.",
        differentials: [
            "Localização Nobre no Sion",
            "Plantas de 2 e 3 Quartos",
            "Área Privativa e Cobertura",
            "Acabamento de Alto Padrão",
            "Vagas de Garagem Cobertas",
            "Design Contemporâneo",
            "Água e Gás Individualizados",
            "Infraestrutura para Ar-Condicionado"
        ],
        gallery: ["/gallery/amaro-linari/1.jpg", "/gallery/amaro-linari/2.jpg", "/gallery/amaro-linari/3.jpg", "/gallery/amaro-linari/4.JPG", "/gallery/amaro-linari/5.jpg", "/gallery/amaro-linari/6.jpg"],
        plans: []
    },
    "francisco-bressane": {
        title: "Edifício CHR\nFrancisco Bressane", location: "Rua Francisco Bressane, 119 - Floresta",
        status: "Em Obras", progress: 0,
        progressStages: [
            { name: "Preparo do Terreno", v: 0 },
            { name: "Fundações", v: 0 },
            { name: "Superestrutura", v: 0 },
            { name: "Alvenaria", v: 0 },
            { name: "Instalações", v: 0 },
            { name: "Acabamento", v: 0 }
        ],
        images: ["/gallery/francisco-bressane/1.jpg"],
        specs: { area: "A Definir", beds: "2 e 3 Quartos", parking: "A Definir", floors: "A Definir", units: "A Definir", leisure: "Área Privativa e Cobertura" },
        desc: "Modernidade e tradição se encontram no Edifício CHR Francisco Bressane. Localizado no charmoso bairro Floresta, este empreendimento oferece apartamentos de 2 e 3 quartos com plantas versáteis e acabamento de alto padrão. Unidades com área privativa e coberturas que proporcionam conforto absoluto e uma vivência urbana de excelência em Belo Horizonte.",
        differentials: [
            "Localização Tradicional no Floresta",
            "Plantas de 2 e 3 Quartos",
            "Área Privativa e Cobertura",
            "Acabamento Premium CHR",
            "Vagas de Garagem Cobertas",
            "Design Contemporâneo",
            "Água e Gás Individualizados",
            "Próximo ao Centro e Lazer Regional"
        ],
        gallery: ["/gallery/francisco-bressane/1.jpg", "/gallery/francisco-bressane/2.jpg", "/gallery/francisco-bressane/3.jpg", "/gallery/francisco-bressane/4.jpg", "/gallery/francisco-bressane/5.jpg", "/gallery/francisco-bressane/6.jpg", "/gallery/francisco-bressane/7.jpg", "/gallery/francisco-bressane/8.jpg", "/gallery/francisco-bressane/9.jpg"],
        plans: []
    },
    "machado-lima": {
        title: "Edifício\nMachado Lima", location: "Rua Francisco Bressane, 142 - Floresta",
        status: "Em Obras", progress: 0,
        progressStages: [
            { name: "Preparo do Terreno", v: 0 },
            { name: "Fundações", v: 0 },
            { name: "Superestrutura", v: 0 },
            { name: "Alvenaria", v: 0 },
            { name: "Instalações", v: 0 },
            { name: "Acabamento", v: 0 }
        ],
        images: ["/gallery/machado-lima/1.jpg"],
        specs: { area: "A Definir", beds: "2 e 3 Quartos", parking: "A Definir", floors: "A Definir", units: "A Definir", leisure: "Área Privativa e Cobertura" },
        desc: "O Edifício Machado Lima traz o requinte da CHR para a Rua Francisco Bressane, no bairro Floresta. Com arquitetura moderna e plantas versáteis de 2 e 3 quartos, o empreendimento oferece unidades com área privativa e coberturas espaçosas, garantindo conforto e qualidade de vida em uma localização tranquila e estratégica da capital mineira.",
        differentials: [
            "Localização Residencial Tranquila",
            "Plantas de 2 e 3 Quartos",
            "Área Privativa e Cobertura",
            "Qualidade Construtiva CHR",
            "Vagas de Garagem Cobertas",
            "Design Contemporâneo",
            "Acabamento de Alto Padrão",
            "Água e Gás Individualizados"
        ],
        gallery: ["/gallery/machado-lima/1.jpg", "/gallery/machado-lima/2.jpg", "/gallery/machado-lima/3.jpg", "/gallery/machado-lima/4.jpg", "/gallery/machado-lima/5.jpg", "/gallery/machado-lima/6.jpg"],
        plans: []
    },
    "jardins-do-prado": {
        title: "Edifício\nJardins do Prado", location: "Rua Contria, 444 - Prado",
        status: "Em Obras", progress: 0,
        progressStages: [
            { name: "Preparo do Terreno", v: 0 },
            { name: "Fundações", v: 0 },
            { name: "Superestrutura", v: 0 },
            { name: "Alvenaria", v: 0 },
            { name: "Instalações", v: 0 },
            { name: "Acabamento", v: 0 }
        ],
        images: ["/gallery/jardins-do-prado/1.jpg"],
        specs: { area: "A Definir", beds: "2 e 3 Quartos", parking: "A Definir", floors: "A Definir", units: "A Definir", leisure: "Jogos, Fitness, Gourmet, Spa, Festas" },
        desc: "O Edifício Jardins do Prado traz um novo patamar de exclusividade e lazer para o bairro Prado. Com infraestrutura completa que inclui sala de jogos, fitness, área gourmet, SPA e salão de festas, o projeto foi concebido para quem valoriza momentos de convivência e bem-estar. Unidades de 2 e 3 quartos com acabamento premium CHR e a sofisticação das coberturas e áreas privativas.",
        differentials: [
            "Lazer Completo (Fitness, SPA, Gourmet)",
            "Salão de Festas e Jogos",
            "Plantas de 2 e 3 Quartos",
            "Área Privativa e Cobertura",
            "Acabamento de Alto Padrão",
            "Vagas de Garagem Cobertas",
            "Localização Nobre no Prado",
            "Água e Gás Individualizados"
        ],
        gallery: ["/gallery/jardins-do-prado/1.jpg", "/gallery/jardins-do-prado/2.jpg", "/gallery/jardins-do-prado/3.jpg", "/gallery/jardins-do-prado/4.jpg", "/gallery/jardins-do-prado/5.jpg", "/gallery/jardins-do-prado/6.jpg", "/gallery/jardins-do-prado/7.jpg", "/gallery/jardins-do-prado/8.jpg", "/gallery/jardins-do-prado/9.jpg", "/gallery/jardins-do-prado/10.jpg", "/gallery/jardins-do-prado/11.jpg", "/gallery/jardins-do-prado/12.jpg", "/gallery/jardins-do-prado/13.jpg", "/gallery/jardins-do-prado/14.jpg", "/gallery/jardins-do-prado/15.jpg", "/gallery/jardins-do-prado/16.jpg"],
        plans: []
    },
    "arnaldo-xavier": {
        title: "Edifício\nArnaldo Xavier", location: "Rua Francisco Bressane, 152 - Floresta",
        status: "Em Obras", progress: 0,
        progressStages: [
            { name: "Preparo do Terreno", v: 0 },
            { name: "Fundações", v: 0 },
            { name: "Superestrutura", v: 0 },
            { name: "Alvenaria", v: 0 },
            { name: "Instalações", v: 0 },
            { name: "Acabamento", v: 0 }
        ],
        images: ["/gallery/arnaldo-xavier/1.jpg"],
        specs: { area: "A Definir", beds: "1 e 2 Quartos", parking: "1 e 2 Vagas", floors: "A Definir", units: "A Definir", leisure: "A Definir" },
        desc: "O Edifício Arnaldo Xavier localiza-se na Rua Francisco Bressane, no bairro Floresta. O novo projeto da CHR oferece apartamentos de 1 e 2 quartos com vagas para 1 e 2 veículos. Combinando modernidade e conforto em uma das localizações mais estratégicas de Belo Horizonte, o Arnaldo Xavier é sinônimo de praticidade urbana e acabamento de alto padrão.",
        differentials: [
            "Localização Tradicional no Floresta",
            "Apartamentos de 1 e 2 Quartos",
            "Vagas de 1 e 2 Veículos",
            "Qualidade Construtiva CHR",
            "Acabamento Superior",
            "Design Contemporâneo",
            "Água e Gás Individualizados",
            "Infraestrutura de Alto Padrão"
        ],
        gallery: ["/gallery/arnaldo-xavier/1.jpg", "/gallery/arnaldo-xavier/2.jpg"],
        plans: []
    },
    "sao-roque": {
        title: "Edifício\nSão Roque", location: "Rua São Roque, 620 - Sagrada Família",
        status: "Concluído", progress: 100,
        progressStages: [
            { name: "Preparo do Terreno", v: 100 },
            { name: "Fundações", v: 100 },
            { name: "Superestrutura", v: 100 },
            { name: "Alvenaria", v: 100 },
            { name: "Instalações", v: 100 },
            { name: "Acabamento", v: 100 }
        ],
        images: ["/gallery/sao-roque/1.jpg"],
        specs: { area: "A Definir", beds: "1 Quarto", parking: "1 e 2 Vagas", floors: "A Definir", units: "A Definir", leisure: "A Definir" },
        desc: "O Edifício São Roque é um empreendimento concluído pela CHR que reflete nosso compromisso com a qualidade e a satisfação dos nossos clientes. Localizado no bairro Sagrada Família, oferece apartamentos de 1 quarto com 1 a 2 vagas de garagem, em um projeto que prioriza a praticidade e o bem-estar urbano. Um endereço pronto para viver o melhor de Belo Horizonte.",
        differentials: [
            "Empreendimento Concluído",
            "Localização Residencial na Sagrada Família",
            "Apartamentos de 1 Quarto",
            "Vagas de 1 e 2 Veículos",
            "Qualidade Construtiva CHR",
            "Acabamento Superior",
            "Pronto para Morar",
            "Água e Gás Individualizados"
        ],
        gallery: ["/gallery/sao-roque/1.jpg", "/gallery/sao-roque/2.jpg", "/gallery/sao-roque/3.jpg", "/gallery/sao-roque/4.jpg", "/gallery/sao-roque/5.jpg"],
        plans: []
    },
    "marechal-hermes": {
        title: "Edifício\nMarechal Hermes", location: "Rua Marechal Hermes, 778 - Gutierrez",
        status: "Concluído", progress: 100,
        progressStages: [
            { name: "Preparo do Terreno", v: 100 },
            { name: "Fundações", v: 100 },
            { name: "Superestrutura", v: 100 },
            { name: "Alvenaria", v: 100 },
            { name: "Instalações", v: 100 },
            { name: "Acabamento", v: 100 }
        ],
        images: ["/gallery/marechal-hermes/1.jpg"],
        specs: { area: "60m² a 120m²", beds: "2 Quartos", parking: "2 Vagas", floors: "5 Andares", units: "A Definir", leisure: "Área Privativa e Cobertura" },
        desc: "O Edifício Marechal Hermes é um destaque no bairro Gutierrez pela sua arquitetura sóbria e elegante. Este empreendimento concluído pela CHR oferece apartamentos de 2 quartos em uma das ruas mais arborizadas e tranquilas da região. Com unidades de área privativa e coberturas, o projeto entrega o máximo de conforto em um dos bairros mais tradicionais de BH.",
        differentials: [
            "Empreendimento Concluído",
            "Localização Nobre no Gutierrez",
            "Apartamentos de 2 Quartos",
            "5 Andares de Exclusividade",
            "Qualidade Construtiva CHR",
            "Acabamento Superior",
            "Área Privativa e Cobertura",
            "Água e Gás Individualizados"
        ],
        gallery: ["/gallery/marechal-hermes/1.jpg", "/gallery/marechal-hermes/2.jpg", "/gallery/marechal-hermes/3.jpg", "/gallery/marechal-hermes/4.jpg"],
        plans: []
    },
    "geraldo-rezende": {
        title: "Edifício\nGeraldo Rezende", location: "Rua Itajubá, 1138 - Sagrada Família",
        status: "Concluído", progress: 100,
        progressStages: [
            { name: "Preparo do Terreno", v: 100 },
            { name: "Fundações", v: 100 },
            { name: "Superestrutura", v: 100 },
            { name: "Alvenaria", v: 100 },
            { name: "Instalações", v: 100 },
            { name: "Acabamento", v: 100 }
        ],
        images: ["/gallery/geraldo-rezende/1.jpg"],
        specs: { area: "A Definir", beds: "1 e 2 Quartos", parking: "A Definir", floors: "4 Andares", units: "A Definir", leisure: "A Definir" },
        desc: "O Edifício Geraldo Rezende é fruto da expertise da CHR em transformar bons projetos em endereços de desejo. Localizado em uma área privilegiada do bairro Sagrada Família, este empreendimento concluído conta com apartamentos de 1 e 2 quartos em uma torre exclusiva de apenas 4 andares. Um projeto que combina estilo, conforto e a solidez que só a CHR entrega.",
        differentials: [
            "Empreendimento Concluído",
            "Localização Tradicional na Rua Itajubá",
            "Apartamentos de 1 e 2 Quartos",
            "Apenas 4 Andares (Exclusividade)",
            "Qualidade Construtiva CHR",
            "Acabamento Superior",
            "Pronto para Morar",
            "Água e Gás Individualizados"
        ],
        gallery: ["/gallery/geraldo-rezende/1.jpg", "/gallery/geraldo-rezende/2.jpg", "/gallery/geraldo-rezende/3.jpg", "/gallery/geraldo-rezende/4.jpg", "/gallery/geraldo-rezende/5.jpg", "/gallery/geraldo-rezende/6.jpg"],
        plans: []
    },
    "itajuba": {
        title: "Edifício\nItajubá", location: "Rua Itajubá, 1350 - Sagrada Família",
        status: "Concluído", progress: 100,
        progressStages: [
            { name: "Preparo do Terreno", v: 100 },
            { name: "Fundações", v: 100 },
            { name: "Superestrutura", v: 100 },
            { name: "Alvenaria", v: 100 },
            { name: "Instalações", v: 100 },
            { name: "Acabamento", v: 100 }
        ],
        images: ["/gallery/itajuba/1.jpg"],
        specs: { area: "A Definir", beds: "1 e 2 Quartos", parking: "A Definir", floors: "A Definir", units: "A Definir", leisure: "A Definir" },
        desc: "O Edifício Itajubá é um marco de eficiência e bom gosto na tradicional Rua Itajubá. Como um empreendimento concluído pela CHR, entrega a solidez de uma construção de alto padrão e a praticidade de metragens inteligentes. Apartamentos de 1 e 2 quartos projetados para oferecer conforto e agilidade no dia a dia, em uma região completa de serviços e lazer.",
        differentials: [
            "Empreendimento Concluído",
            "Localização Tradicional na Sagrada Família",
            "Apartamentos de 1 e 2 Quartos",
            "Vagas de Garagem Cobertas",
            "Qualidade Construtiva CHR",
            "Acabamento de Alto Padrão",
            "Segurança e Praticidade",
            "Pronto para Morar"
        ],
        gallery: ["/gallery/itajuba/1.jpg", "/gallery/itajuba/2.jpg"],
        plans: []
    },
    "iracema-drummond": {
        title: "Edifício Iracema\nDrummond", location: "Rua Canada, 54 - Sion",
        status: "Concluído", progress: 100,
        progressStages: [
            { name: "Preparo do Terreno", v: 100 },
            { name: "Fundações", v: 100 },
            { name: "Superestrutura", v: 100 },
            { name: "Alvenaria", v: 100 },
            { name: "Instalações", v: 100 },
            { name: "Acabamento", v: 100 }
        ],
        images: ["/gallery/iracema-drummond/1.jpg"],
        specs: { area: "A Definir", beds: "A Definir", parking: "A Definir", floors: "A Definir", units: "A Definir", leisure: "A Definir" },
        desc: "O Edifício Iracema Drummond no bairro Sion é uma joia da arquitetura contemporânea e um projeto concluído com o selo de qualidade CHR. Uma obra pensada para oferecer conforto e sofisticação em um dos bairros de maior valorização de Belo Horizonte.",
        differentials: [
            "Empreendimento Concluído",
            "Localização Nobre no Sion",
            "Qualidade Construtiva CHR",
            "Acabamento de Alto Padrão",
            "Pronto para Morar"
        ],
        gallery: ["/gallery/iracema-drummond/1.jpg", "/gallery/iracema-drummond/2.jpg"],
        plans: []
    },
    "dona-anisia": {
        title: "Edifício CHR\nDona Anisia", location: "Rua Congonhas, 439 - São Pedro",
        status: "Concluído", progress: 100,
        progressStages: [
            { name: "Preparo do Terreno", v: 100 },
            { name: "Fundações", v: 100 },
            { name: "Superestrutura", v: 100 },
            { name: "Alvenaria", v: 100 },
            { name: "Instalações", v: 100 },
            { name: "Acabamento", v: 100 }
        ],
        images: ["/gallery/dona-anisia/1.jpg"],
        specs: { area: "A Definir", beds: "A Definir", parking: "A Definir", floors: "A Definir", units: "A Definir", leisure: "A Definir" },
        desc: "O Edifício CHR Dona Anisia, localizado na arborizada Rua Congonhas, no coração do bairro São Pedro, é sinônimo de excelência e qualidade finalizada. Um empreendimento totalmente pronto que reflete a dedicação da construtora aos detalhes e ao conforto de quem valoriza o melhor.",
        differentials: [
            "Empreendimento Concluído",
            "Localização Especial no São Pedro",
            "Qualidade Construtiva CHR",
            "Design Sofisticado e Moderno",
            "Pronto para Morar"
        ],
        gallery: ["/gallery/dona-anisia/1.jpg", "/gallery/dona-anisia/2.jpg", "/gallery/dona-anisia/3.jpg"],
        plans: []
    },
    "caldeira-brant": {
        title: "Edifício\nCaldeira Brant", location: "Rua Caldeira Brant, 70 - Sagrada Família",
        status: "Concluído", progress: 100,
        progressStages: [
            { name: "Preparo do Terreno", v: 100 },
            { name: "Fundações", v: 100 },
            { name: "Superestrutura", v: 100 },
            { name: "Alvenaria", v: 100 },
            { name: "Instalações", v: 100 },
            { name: "Acabamento", v: 100 }
        ],
        images: ["/gallery/caldeira-brant/1.jpg"],
        specs: { area: "A Definir", beds: "2 e 3 Quartos", parking: "A Definir", floors: "A Definir", units: "A Definir", leisure: "A Definir" },
        desc: "Bem-vindo ao Edifício Caldeira Brant, um empreendimento totalmente concluído na Sagrada Família, assinado com excelência pela CHR. Com apartamentos de 2 e 3 quartos, este projeto oferece o equilíbrio perfeito entre agitação urbana e tranquilidade residencial, pronto para você chamar de lar.",
        differentials: [
            "Empreendimento Concluído",
            "Localização na Sagrada Família",
            "Apartamentos de 2 e 3 Quartos",
            "Qualidade Construtiva CHR",
            "Acabamento de Alto Padrão",
            "Pronto para Morar"
        ],
        gallery: ["/gallery/caldeira-brant/1.jpg", "/gallery/caldeira-brant/2.jpg", "/gallery/caldeira-brant/3.jpg"],
        plans: []
    },
    "adelson-pazzini": {
        title: "Edifício Engenheiro\nAdelson Pazzini", location: "Rua São Manoel, 229 - Floresta",
        status: "Concluído", progress: 100,
        progressStages: [
            { name: "Preparo do Terreno", v: 100 },
            { name: "Fundações", v: 100 },
            { name: "Superestrutura", v: 100 },
            { name: "Alvenaria", v: 100 },
            { name: "Instalações", v: 100 },
            { name: "Acabamento", v: 100 }
        ],
        images: ["/gallery/adelson-pazzini/1.jpg"],
        specs: { area: "A Definir", beds: "A Definir", parking: "A Definir", floors: "A Definir", units: "A Definir", leisure: "A Definir" },
        desc: "O Edifício Engenheiro Adelson Pazzini, entregue pela CHR no bairro Floresta, é um exemplo marcante da nossa tradição e compromisso com a excelência. Localizado na charmosa Rua São Manoel, oferece total comodidade, com projeto arquitetônico moderno e acabamentos requintados.",
        differentials: [
            "Empreendimento Concluído",
            "Localização Privilegiada no Floresta",
            "Qualidade Construtiva CHR",
            "Arquitetura Moderna",
            "Pronto para Morar"
        ],
        gallery: ["/gallery/adelson-pazzini/1.jpg", "/gallery/adelson-pazzini/2.jpg", "/gallery/adelson-pazzini/3.jpg", "/gallery/adelson-pazzini/4.jpg"],
        plans: []
    },
    "macedo": {
        title: "Edifício\nMacedo", location: "Rua Macedo, 117 - Floresta",
        status: "Concluído", progress: 100,
        progressStages: [
            { name: "Preparo do Terreno", v: 100 },
            { name: "Fundações", v: 100 },
            { name: "Superestrutura", v: 100 },
            { name: "Alvenaria", v: 100 },
            { name: "Instalações", v: 100 },
            { name: "Acabamento", v: 100 }
        ],
        images: ["/gallery/macedo/1.jpg"],
        specs: { area: "A Definir", beds: "A Definir", parking: "A Definir", floors: "A Definir", units: "A Definir", leisure: "A Definir" },
        desc: "O Edifício Macedo é mais um projeto concluído de ponta a ponta pela CHR. Situado no coração do Floresta, a poucos passos da área comercial e de serviços, o projeto foi concebido para celebrar a experiência morar com conveniência total e excelente projeto estrutural.",
        differentials: [
            "Empreendimento Concluído",
            "Centralidade na Floresta",
            "Qualidade Construtiva CHR",
            "Acabamento Superior",
            "Pronto para Morar"
        ],
        gallery: ["/gallery/macedo/1.jpg", "/gallery/macedo/2.jpg", "/gallery/macedo/3.jpg"],
        plans: []
    },
    "itabira": {
        title: "Edifício CHR\nItabira", location: "Rua Itabira, 625 - Floresta",
        status: "Concluído", progress: 100,
        progressStages: [
            { name: "Preparo do Terreno", v: 100 },
            { name: "Fundações", v: 100 },
            { name: "Superestrutura", v: 100 },
            { name: "Alvenaria", v: 100 },
            { name: "Instalações", v: 100 },
            { name: "Acabamento", v: 100 }
        ],
        images: ["/gallery/itabira/1.jpg"],
        specs: { area: "A Definir", beds: "A Definir", parking: "A Definir", floors: "A Definir", units: "A Definir", leisure: "A Definir" },
        desc: "O Edifício CHR Itabira é a perfeita tradução de bem-viver. Um empreendimento totalmente concluído, planejado aos mínimos detalhes pela engenharia da construtora CHR, que se destaca pela sua modernidade, conforto térmico e acústico, e uma localização excepcional.",
        differentials: [
            "Empreendimento Concluído",
            "Localização Privilegiada",
            "Qualidade Construtiva CHR",
            "Acabamento Superior",
            "Pronto para Morar"
        ],
        gallery: ["/gallery/itabira/1.jpg", "/gallery/itabira/2.jpg", "/gallery/itabira/3.jpg", "/gallery/itabira/4.jpg"],
        plans: []
    },
    "mem-de-sa": {
        title: "Edifício CHR\nMem de Sá", location: "Av. Mem de Sá, 766 - Santa Efigênia",
        status: "Concluído", progress: 100,
        progressStages: [
            { name: "Preparo do Terreno", v: 100 },
            { name: "Fundações", v: 100 },
            { name: "Superestrutura", v: 100 },
            { name: "Alvenaria", v: 100 },
            { name: "Instalações", v: 100 },
            { name: "Acabamento", v: 100 }
        ],
        images: ["/gallery/mem-de-sa/1.jpg"],
        specs: { area: "A Definir", beds: "A Definir", parking: "A Definir", floors: "A Definir", units: "A Definir", leisure: "A Definir" },
        desc: "O Edifício CHR Mem de Sá, situado no Santa Efigênia, proporciona a seus residentes a verdadeira experiência de viver com segurança e tranquilidade. Com acabamentos impecáveis, a obra concluída é um marco na região para quem valoriza detalhes de altíssimo padrão e um estilo de vida prático e cosmopolita.",
        differentials: [
            "Empreendimento Concluído",
            "Localização Estratégica no Santa Efigênia",
            "Qualidade Construtiva CHR",
            "Acabamento Superior",
            "Pronto para Morar"
        ],
        gallery: ["/gallery/mem-de-sa/1.jpg", "/gallery/mem-de-sa/2.jpg", "/gallery/mem-de-sa/3.jpg", "/gallery/mem-de-sa/4.JPG", "/gallery/mem-de-sa/5.jpg", "/gallery/mem-de-sa/6.jpg", "/gallery/mem-de-sa/7.jpg"],
        plans: []
    },
    "nelson-souza": {
        title: "Edifício\nNelson Souza", location: "Rua Amapa, 72 - Serra",
        status: "Concluído", progress: 100,
        progressStages: [
            { name: "Preparo do Terreno", v: 100 },
            { name: "Fundações", v: 100 },
            { name: "Superestrutura", v: 100 },
            { name: "Alvenaria", v: 100 },
            { name: "Instalações", v: 100 },
            { name: "Acabamento", v: 100 }
        ],
        images: ["/gallery/nelson-souza/1.jpg"],
        specs: { area: "A Definir", beds: "2 e 3 Quartos", parking: "A Definir", floors: "A Definir", units: "A Definir", leisure: "A Definir" },
        desc: "O Edifício Nelson Souza traz elegância e conforto para a região da Serra. Com acabamentos de altíssimo padrão, este empreendimento destaca-se pela excelente localização, ideal para quem busca viver com comodidade e qualidade de vida no coração da cidade.",
        differentials: ["Empreendimento Concluído", "Localização Privilegiada", "Qualidade Construtiva CHR", "Acabamento Superior", "Pronto para Morar"],
        gallery: ["/gallery/nelson-souza/1.jpg", "/gallery/nelson-souza/2.jpg", "/gallery/nelson-souza/3.jpg", "/gallery/nelson-souza/4.jpg", "/gallery/nelson-souza/5.jpg", "/gallery/nelson-souza/6.jpg"],
        plans: []
    },
    "dona-cleonice": {
        title: "Edifício\nDona Cleonice", location: "Rua São Domingos do Prata, 430 - São Pedro",
        status: "Concluído", progress: 100,
        progressStages: [
            { name: "Preparo do Terreno", v: 100 },
            { name: "Fundações", v: 100 },
            { name: "Superestrutura", v: 100 },
            { name: "Alvenaria", v: 100 },
            { name: "Instalações", v: 100 },
            { name: "Acabamento", v: 100 }
        ],
        images: ["/gallery/dona-cleonice/1.jpg"],
        specs: { area: "A Definir", beds: "2 Quartos", parking: "A Definir", floors: "A Definir", units: "A Definir", leisure: "A Definir" },
        desc: "O Edifício Dona Cleonice é a harmonia perfeita entre praticidade e requinte no bairro São Pedro. Construído com materiais selecionados, seus moradores desfrutam de um ambiente pensado para o bem-estar absoluto.",
        differentials: ["Empreendimento Concluído", "Localização Privilegiada no São Pedro", "Qualidade Construtiva CHR", "Acabamento Superior", "Pronto para Morar"],
        gallery: ["/gallery/dona-cleonice/1.jpg", "/gallery/dona-cleonice/2.jpg", "/gallery/dona-cleonice/3.jpg"],
        plans: []
    },
    "stela-de-souza2": {
        title: "Edifício CHR\nStela de Souza", location: "Rua Stela de Souza, 514 - Sagrada Família",
        status: "Concluído", progress: 100,
        progressStages: [
            { name: "Preparo do Terreno", v: 100 },
            { name: "Fundações", v: 100 },
            { name: "Superestrutura", v: 100 },
            { name: "Alvenaria", v: 100 },
            { name: "Instalações", v: 100 },
            { name: "Acabamento", v: 100 }
        ],
        images: ["/gallery/stela-de-souza2/1.jpg"],
        specs: { area: "A Definir", beds: "1, 2 e 3 Quartos", parking: "A Definir", floors: "A Definir", units: "A Definir", leisure: "A Definir" },
        desc: "Uma infraestrutura encantadora na Sagrada Família. O Edifício CHR Stela de Souza foi projetado para elevar a sua rotina, oferecendo apartamentos espaçosos e confortáveis com as melhores tecnologias habitacionais desenvolvidas pela CHR.",
        differentials: ["Empreendimento Concluído", "Próximo a vias de acesso", "Qualidade Construtiva CHR", "Acabamento Superior", "Pronto para Morar"],
        gallery: ["/gallery/stela-de-souza2/1.jpg", "/gallery/stela-de-souza2/2.jpg", "/gallery/stela-de-souza2/3.jpg", "/gallery/stela-de-souza2/4.jpg", "/gallery/stela-de-souza2/5.jpg"],
        plans: []
    },
    "getulio-vargas": {
        title: "Edifício CHR\nGetúlio Vargas", location: "Avenida Getúlio Vargas, 58 - Funcionários",
        status: "Concluído", progress: 100,
        progressStages: [
            { name: "Preparo do Terreno", v: 100 },
            { name: "Fundações", v: 100 },
            { name: "Superestrutura", v: 100 },
            { name: "Alvenaria", v: 100 },
            { name: "Instalações", v: 100 },
            { name: "Acabamento", v: 100 }
        ],
        images: ["/gallery/getulio-vargas/1.jpg"],
        specs: { area: "A Definir", beds: "1, 2 e 3 Quartos", parking: "A Definir", floors: "A Definir", units: "A Definir", leisure: "A Definir" },
        desc: "Posicionado de maneira estratégica no coração do Funcionários, o Edifício CHR Getúlio Vargas proporciona a seus moradores a união autêntica de acessibilidade e luxo. Um ícone urbano totalmente finalizado com o padrão irretocável da CHR.",
        differentials: ["Empreendimento Concluído", "Localização Excepcional no Funcionários", "Qualidade Construtiva CHR", "Acabamento Superior", "Pronto para Morar"],
        gallery: ["/gallery/getulio-vargas/1.jpg", "/gallery/getulio-vargas/2.jpg", "/gallery/getulio-vargas/3.jpg", "/gallery/getulio-vargas/4.jpg", "/gallery/getulio-vargas/5.jpg", "/gallery/getulio-vargas/6.jpg", "/gallery/getulio-vargas/7.jpg", "/gallery/getulio-vargas/8.jpg", "/gallery/getulio-vargas/9.jpg"],
        plans: []
    },
    "waldir-chaves": {
        title: "Edifício\nWaldir Chaves", location: "Rua Caldeira Brant, 371 - Sagrada Família",
        status: "Concluído", progress: 100,
        progressStages: [
            { name: "Preparo do Terreno", v: 100 },
            { name: "Fundações", v: 100 },
            { name: "Superestrutura", v: 100 },
            { name: "Alvenaria", v: 100 },
            { name: "Instalações", v: 100 },
            { name: "Acabamento", v: 100 }
        ],
        images: ["/gallery/waldir-chaves/1.jpg"],
        specs: { area: "A Definir", beds: "1 e 2 Quartos", parking: "A Definir", floors: "A Definir", units: "A Definir", leisure: "A Definir" },
        desc: "Oportunidade única para desfrutar da Sagrada Família. O edifício Waldir Chaves se destaca por seu layout inteligente, áreas extremamente bem valorizadas e a clássica tranquilidade mineira num acabamento excepcional.",
        differentials: ["Empreendimento Concluído", "Localização Privilegiada", "Qualidade Construtiva CHR", "Acabamento Superior", "Pronto para Morar"],
        gallery: ["/gallery/waldir-chaves/1.jpg", "/gallery/waldir-chaves/2.jpg", "/gallery/waldir-chaves/3.jpg"],
        plans: []
    },
    "joao-ayres": {
        title: "Edifício\nJoão Ayres", location: "Rua Oswaldo Ferraz, 532 - Sagrada Família",
        status: "Concluído", progress: 100,
        progressStages: [
            { name: "Preparo do Terreno", v: 100 },
            { name: "Fundações", v: 100 },
            { name: "Superestrutura", v: 100 },
            { name: "Alvenaria", v: 100 },
            { name: "Instalações", v: 100 },
            { name: "Acabamento", v: 100 }
        ],
        images: ["/gallery/joao-ayres/1.jpg"],
        specs: { area: "A Definir", beds: "2 e 3 Quartos", parking: "A Definir", floors: "A Definir", units: "A Definir", leisure: "A Definir" },
        desc: "O Edifício João Ayres impressiona pelo bom gosto alinhado ao planejamento da vida em família. Situado na Sagrada Família, conta com comodidade e segurança na medida certa.",
        differentials: ["Empreendimento Concluído", "Localização Privilegiada", "Qualidade Construtiva CHR", "Acabamento Superior", "Pronto para Morar"],
        gallery: ["/gallery/joao-ayres/1.jpg", "/gallery/joao-ayres/2.jpg", "/gallery/joao-ayres/3.jpg", "/gallery/joao-ayres/4.jpg"],
        plans: []
    },
    "maria-das-dores-brandao": {
        title: "Edifício Maria\ndas Dores Brandão", location: "Rua Formosa, 12 - Santa Tereza",
        status: "Concluído", progress: 100,
        progressStages: [
            { name: "Preparo do Terreno", v: 100 },
            { name: "Fundações", v: 100 },
            { name: "Superestrutura", v: 100 },
            { name: "Alvenaria", v: 100 },
            { name: "Instalações", v: 100 },
            { name: "Acabamento", v: 100 }
        ],
        images: ["/gallery/maria-das-dores-brandao/1.jpg"],
        specs: { area: "A Definir", beds: "A Definir", parking: "A Definir", floors: "A Definir", units: "A Definir", leisure: "A Definir" },
        desc: "Construído no tradicional bairro de Santa Tereza, o edifício Maria das Dores Brandão une modernidade com a cultura histórica da região. Ambientes muito bem desenhados e arejados garantem um investimento seguro.",
        differentials: ["Empreendimento Concluído", "Localização em Santa Tereza", "Qualidade Construtiva CHR", "Acabamento Superior", "Pronto para Morar"],
        gallery: ["/gallery/maria-das-dores-brandao/1.jpg", "/gallery/maria-das-dores-brandao/2.jpg"],
        plans: []
    },
    "efigenia-de-freitas": {
        title: "Edifício\nEfigênia de Freitas", location: "Rua Dr. Vieira Marques, 970 - Sagrada Família",
        status: "Concluído", progress: 100,
        progressStages: [
            { name: "Preparo do Terreno", v: 100 },
            { name: "Fundações", v: 100 },
            { name: "Superestrutura", v: 100 },
            { name: "Alvenaria", v: 100 },
            { name: "Instalações", v: 100 },
            { name: "Acabamento", v: 100 }
        ],
        images: ["/gallery/efigenia-de-freitas/1.jpg"],
        specs: { area: "A Definir", beds: "A Definir", parking: "A Definir", floors: "A Definir", units: "A Definir", leisure: "A Definir" },
        desc: "O edifício Efigênia de Freitas encerra com maestria a união do tradicional bairro Sagrada Família com os materiais e arquitetura visionária da CHR Engenharia. Pronto para abraçar sua família na medida ideal.",
        differentials: ["Empreendimento Concluído", "Localização Privilegiada", "Qualidade Construtiva CHR", "Acabamento Superior", "Pronto para Morar"],
        gallery: ["/gallery/efigenia-de-freitas/1.jpg", "/gallery/efigenia-de-freitas/2.jpg"],
        plans: []
    },
    // Fallback data for other IDs to map to for MVP purposes
};

// Animated counter that counts from 0 to target when it enters the viewport
function AnimatedCounter({ to }: { to: number }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const [inView, setInView] = useState(false);

    useEffect(() => {
        if (inView) {
            const controls = animate(count, to, { duration: 2, ease: "easeOut" });
            return controls.stop;
        }
    }, [inView, count, to]);

    return (
        <motion.span
            onViewportEnter={() => setInView(true)}
            viewport={{ once: true, amount: 0.5 }}
        >
            {rounded}
        </motion.span>
    );
}

export default function PropertyDetail() {

    const { id } = useParams<{ id: string }>();
    const [activeTab, setActiveTab] = useState<'gallery' | 'plans'>('gallery');
    const [activeImageIdx, setActiveImageIdx] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    // Always start page at the top
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [id]);

    // Use specific data if ID matches, else fallback to a generic mock
    const property = id && id in db
        ? db[id as keyof typeof db]
        : { ...db["maranhao"], title: `Empreendimento ${id}`, progress: 50, status: "Em Obras" };

    // Keyboard navigation for gallery
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsLightboxOpen(false);
                return;
            }
            if (activeTab === 'gallery' && property?.gallery) {
                if (e.key === 'ArrowRight') {
                    setActiveImageIdx((prev) => (prev + 1) % property.gallery.length);
                } else if (e.key === 'ArrowLeft') {
                    setActiveImageIdx((prev) => (prev - 1 + property.gallery.length) % property.gallery.length);
                }
            } else if (activeTab === 'plans' && property?.plans) {
                if (e.key === 'ArrowRight') {
                    setActiveImageIdx((prev) => (prev + 1) % property.plans.length);
                } else if (e.key === 'ArrowLeft') {
                    setActiveImageIdx((prev) => (prev - 1 + property.plans.length) % property.plans.length);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeTab, property, isLightboxOpen]);

    return (
        <div className="property-detail-page">
            {/* Redesigned Full Width Hero */}
            <section className="detail-hero">
                {/* Ken Burns animated background */}
                <motion.div
                    className="hero-background"
                    initial={{ scale: 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 8, ease: "easeOut" }}
                >
                    <img src={property.images[0]} alt={property.title} />
                    <div className="hero-gradient-overlay"></div>
                </motion.div>

                {/* Cinematic dark curtain that slides away */}
                <motion.div
                    className="hero-curtain"
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: 0 }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                />

                <div className="hero-content-overlay container">
                    <div className="hero-main-info">
                        {/* Elegant back action integrated into the grid */}
                        <motion.div
                            className="hero-back-wrapper"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            style={{ marginBottom: '2rem' }}
                        >
                            <Link to="/empreendimentos" className="btn-back-minimal">
                                <ArrowLeft size={16} />
                                <span>Voltar para empreendimentos</span>
                            </Link>
                        </motion.div>

                        {/* Status badge */}
                        <motion.div
                            className="hero-status-badge"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.0, duration: 0.5 }}
                        >
                            {property.status}
                        </motion.div>

                        {/* Title - word by word reveal */}
                        <motion.h1
                            className="hero-title"
                            initial={{ opacity: 0, y: 60, skewY: 3 }}
                            animate={{ opacity: 1, y: 0, skewY: 0 }}
                            transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {property.title}
                        </motion.h1>

                        {/* Description line */}
                        <motion.p
                            className="hero-desc"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5, duration: 0.6 }}
                        >
                            {property.desc}
                        </motion.p>

                        {/* Specs - staggered reveal */}
                        <motion.div
                            className="hero-specs-inline"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.8, duration: 0.5 }}
                        >
                            {[
                                { label: "Quartos", value: property.specs.beds },
                                { label: "Área", value: property.specs.area },
                                { label: "Lazer", value: property.specs.leisure },
                                { label: "Vagas", value: property.specs.parking },
                            ].filter(s => s.value).map((spec, i) => (
                                <motion.div
                                    className="spec-inline-item"
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.8 + i * 0.1, duration: 0.5 }}
                                >
                                    <small>{spec.label}</small>
                                    <strong>{spec.value}</strong>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Differentials Block */}
            <section className="detail-section-block bg-primary-dark">
                <h2 className="section-title">Diferenciais {property.title}</h2>
                <div className="differentials-grid">
                    {/* Using simple array index to map hardcoded items, dynamically choose icon based on text */}
                    {property.differentials.map((diff, i) => {
                        let Icon = CheckCircle2;
                        if (diff.toLowerCase().includes("fitness") || diff.toLowerCase().includes("academia")) Icon = Dumbbell;
                        if (diff.toLowerCase().includes("jogo")) Icon = Gamepad2;
                        if (diff.toLowerCase().includes("gourmet") || diff.toLowerCase().includes("coworking")) Icon = Coffee;
                        if (diff.toLowerCase().includes("playground") || diff.toLowerCase().includes("baby")) Icon = Baby;
                        if (diff.toLowerCase().includes("terraço") || diff.toLowerCase().includes("natureza")) Icon = TreePine;
                        if (diff.toLowerCase().includes("portaria") || diff.toLowerCase().includes("segurança")) Icon = ShieldCheck;
                        if (diff.toLowerCase().includes("localização")) Icon = MapPin;
                        if (diff.toLowerCase().includes("andar")) Icon = Layers;
                        if (diff.toLowerCase().includes("quarto")) Icon = BedDouble;
                        if (diff.toLowerCase().includes("unidade")) Icon = Square;
                        if (diff.toLowerCase().includes("privativa") || diff.toLowerCase().includes("cobertura")) Icon = TreePine;
                        if (diff.toLowerCase().includes("econômico") || diff.toLowerCase().includes("economia")) Icon = PiggyBank;
                        if (diff.toLowerCase().includes("água") || diff.toLowerCase().includes("gás")) Icon = Droplet;
                        if (diff.toLowerCase().includes("acabamento") || diff.toLowerCase().includes("padrão")) Icon = Gem;

                        return (
                            <div className="diff-card" key={i}>
                                <Icon size={32} />
                                <span>{diff}</span>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Progress Circular Block */}
            <section className="detail-section-block">
                <h2 className="section-title" style={{ marginBottom: "1rem" }}>Evolução das Obras</h2>
                <p style={{ color: "var(--text-muted)", marginBottom: "4rem", fontSize: "0.9rem", letterSpacing: "1px", textTransform: "uppercase" }}>Última Atualização: Hoje</p>

                <div className="progress-dashboard">
                    {/* Fake progress items list */}
                    <div className="progress-list">
                        {((property as any).progressStages || [
                            { name: "Preparo do Terreno", v: property.progress > 0 ? 100 : 0 },
                            { name: "Fundações", v: property.progress > 10 ? 100 : 0 },
                            { name: "Superestrutura", v: property.progress },
                            { name: "Alvenaria", v: Math.max(0, property.progress - 20) },
                            { name: "Instalações", v: Math.max(0, property.progress - 40) }
                        ]).map((item: any, idx: number) => (
                            <div className="progress-item-line" key={idx}>
                                <div className="progress-item-header">
                                    <span>{item.name}</span>
                                    <span>{item.v}%</span>
                                </div>
                                <div className="progress-bar-thin">
                                    <motion.div
                                        className="progress-bar-thin-fill"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${item.v}%` }}
                                        viewport={{ once: true }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* SVG Circle indicator */}
                    <div className="progress-circle-container">
                        <svg className="progress-circle-svg" viewBox="0 0 100 100">
                            <circle className="progress-circle-bg" cx="50" cy="50" r="45" />
                            <motion.circle
                                className="progress-circle-fill"
                                cx="50" cy="50" r="45"
                                initial={{ strokeDasharray: 283, strokeDashoffset: 283 }}
                                whileInView={{ strokeDashoffset: 283 - (283 * property.progress) / 100 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                        </svg>
                        <div className="progress-circle-content">
                            <small>Status Atual</small>
                            <span className="progress-percentage">
                                <AnimatedCounter to={property.progress} />%
                            </span>
                            <p>{property.status}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Gallery and Plans Section */}
            <section className="detail-section-block bg-primary-dark gallery-section" id="gallery-plans">
                <h2 className="section-title">Plantas e Imagens</h2>
                <div className="gallery-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('gallery'); setActiveImageIdx(0); }}
                    >
                        Galeria de Imagens
                    </button>
                    {property.plans && property.plans.length > 0 && (
                        <button
                            className={`tab-btn ${activeTab === 'plans' ? 'active' : ''}`}
                            onClick={() => { setActiveTab('plans'); setActiveImageIdx(0); }}
                        >
                            Plantas
                        </button>
                    )}
                </div>

                <div className="gallery-container">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={`${activeTab}-${activeImageIdx}`}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.3 }}
                            className="main-gallery-view"
                            onClick={() => setIsLightboxOpen(true)}
                        >
                            <div className="gallery-zoom-overlay">
                                <ZoomIn size={48} strokeWidth={1.5} />
                                <span>Ampliar Imagem</span>
                            </div>
                            {activeTab === 'gallery' && property.gallery && (
                                <img src={property.gallery[activeImageIdx]} alt={`Galeria ${activeImageIdx + 1}`} />
                            )}
                            {activeTab === 'plans' && property.plans && (
                                <>
                                    <img src={property.plans[activeImageIdx].image} alt={property.plans[activeImageIdx].name} className="plan-image" />
                                    <div className="plan-name">{property.plans[activeImageIdx].name}</div>
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    <div className="gallery-thumbnails">
                        {activeTab === 'gallery' && property.gallery?.map((img, idx) => (
                            <button
                                key={idx}
                                className={`thumb-btn ${activeImageIdx === idx ? 'active' : ''}`}
                                onClick={() => setActiveImageIdx(idx)}
                            >
                                <img src={img} alt={`Thumb ${idx + 1}`} />
                            </button>
                        ))}
                        {activeTab === 'plans' && property.plans?.map((plan, idx) => (
                            <button
                                key={idx}
                                className={`thumb-btn plan-thumb-btn ${activeImageIdx === idx ? 'active' : ''}`}
                                onClick={() => setActiveImageIdx(idx)}
                            >
                                <span>{plan.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== VIDEO TOUR SECTION ===== */}
            <section className="video-tour-section">
                <div className="video-background">
                    <video autoPlay muted loop playsInline className="detail-video">
                        <source src="https://player.vimeo.com/external/494443965.sd.mp4?s=33c62376dc86c073356064fcf430858e" type="video/mp4" />
                    </video>
                    <div className="video-overlay" />
                </div>

                <div className="container video-content">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="video-label">CINEMATIC TOUR</span>
                        <h2 className="video-title">Sinta a experiência de viver no {property.title}</h2>
                        <button className="video-play-btn">
                            <div className="play-icon">▶</div>
                            <span>ASSISTIR TOUR COMPLETO</span>
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Minimalist Location Section */}
            <section className="location-minimal-section">
                <div className="location-minimal-container">
                    <div className="location-minimal-map">
                        <iframe
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&t=m&z=15&output=embed`}
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: "grayscale(100%) invert(92%) contrast(83%) hue-rotate(180deg)" }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Maps"
                        ></iframe>
                    </div>

                    <div className="location-minimal-content">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="location-minimal-label">LOCATION</span>
                            <p className="location-minimal-desc">
                                EM UMA DAS ÁREAS MAIS NOBRES E DESEJADAS DA CIDADE,
                                COM TODA A COMODIDADE E CONVÊNIÊNCIA A POUCOS PASSOS.
                            </p>

                            <div className="location-minimal-address-box">
                                <div className="location-minimal-icon-wrapper">
                                    <MapPin size={24} />
                                </div>
                                <div className="location-minimal-address-text">
                                    <strong>{property.location.split(',')[0].toUpperCase()}</strong>
                                    <span>{property.location.split(',')[1]?.trim().toUpperCase()} - MINAS GERAIS</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== INTEREST / CONTACT FORM SECTION ===== */}
            <section className="interest-section">
                {/* Background lifestyle image */}
                <div className="interest-bg">
                    <img
                        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
                        alt="Lifestyle"
                    />
                    <div className="interest-bg-overlay" />
                </div>

                <div className="interest-content">
                    {/* LEFT — text & actions */}
                    <motion.div
                        className="interest-left"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <h2 className="interest-headline">
                            Tem <span>interesse?</span>
                        </h2>
                        <p className="interest-subtitle">SUA EXPERIÊNCIA COMEÇA AQUI.</p>
                        <p className="interest-desc">
                            Preencha o formulário ou escolha uma das opções de contato abaixo para falar conosco.
                        </p>

                        <div className="interest-contact-options">
                            <a
                                href="tel:+553133334444"
                                className="contact-option-btn"
                            >
                                <div className="contact-option-icon">📞</div>
                                <span>Ligamos<br />pra você</span>
                            </a>
                            <a
                                href={`https://wa.me/5531333344444?text=Olá! Tenho interesse no ${property.title}.`}
                                target="_blank"
                                rel="noreferrer"
                                className="contact-option-btn"
                            >
                                <div className="contact-option-icon">💬</div>
                                <span>Fale por<br />WhatsApp</span>
                            </a>
                        </div>
                    </motion.div>

                    {/* RIGHT — form card */}
                    <motion.div
                        className="interest-form-card"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <InterestForm propertyTitle={property.title} />
                    </motion.div>
                </div>
            </section>
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div 
                        className="lightbox-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsLightboxOpen(false)}
                    >
                        <button className="lightbox-close" onClick={() => setIsLightboxOpen(false)}>
                            <X size={32} />
                        </button>
                        <motion.div 
                            className="lightbox-content"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {activeTab === 'gallery' && property.gallery && (
                                <img src={property.gallery[activeImageIdx]} alt="Ampliado" />
                            )}
                            {activeTab === 'plans' && property.plans && (
                                <img src={property.plans[activeImageIdx].image} alt="Ampliado" className="plan-image-lightbox" />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ===== Interest Form Component with EmailJS =====
function InterestForm({ propertyTitle }: { propertyTitle: string }) {
    const [form, setForm] = useState({
        nome: '', email: '', telefone: '', interesse: ''
    });
    const [lgpd, setLgpd] = useState(false);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!lgpd) return alert('Por favor, aceite os termos de privacidade.');
        setStatus('sending');

        try {
            // Replace with your EmailJS credentials after creating account at emailjs.com
            const emailjs = await import('@emailjs/browser');
            await emailjs.send(
                'YOUR_SERVICE_ID',    // ← seu Service ID do EmailJS
                'YOUR_TEMPLATE_ID',   // ← seu Template ID do EmailJS
                {
                    from_name: form.nome,
                    from_email: form.email,
                    phone: form.telefone,
                    message: form.interesse,
                    property: propertyTitle,
                },
                'YOUR_PUBLIC_KEY'     // ← sua Public Key do EmailJS
            );
            setStatus('success');
        } catch {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="form-success">
                <div className="form-success-icon">✓</div>
                <h3>Mensagem enviada!</h3>
                <p>Nossa equipe entrará em contato em breve. Verifique também seu e-mail.</p>
            </div>
        );
    }

    return (
        <form className="interest-form" onSubmit={handleSubmit}>
            <div className="form-field">
                <label>NOME</label>
                <input
                    name="nome"
                    type="text"
                    placeholder="Digite seu nome"
                    value={form.nome}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-field">
                <label>E-MAIL</label>
                <input
                    name="email"
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-field">
                <label>CELULAR / WHATSAPP</label>
                <input
                    name="telefone"
                    type="tel"
                    placeholder="(31) 9 0000-0000"
                    value={form.telefone}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-field">
                <label>SEU INTERESSE</label>
                <textarea
                    name="interesse"
                    placeholder={`Descreva o que você busca no ${propertyTitle}...`}
                    value={form.interesse}
                    onChange={handleChange}
                    rows={3}
                />
            </div>

            <div className="form-lgpd">
                <input
                    type="checkbox"
                    id="lgpd"
                    checked={lgpd}
                    onChange={e => setLgpd(e.target.checked)}
                />
                <label htmlFor="lgpd">
                    De acordo com a LGPD, concordo em fornecer os dados acima para que a CHR Construtora entre em contato comigo para apresentar produtos e serviços.
                </label>
            </div>

            <button
                type="submit"
                className={`form-submit-btn ${status === 'sending' ? 'sending' : ''}`}
                disabled={status === 'sending'}
            >
                {status === 'sending' ? 'ENVIANDO...' : 'ENVIAR →'}
            </button>
            {status === 'error' && (
                <p style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                    Erro ao enviar. Tente novamente ou nos chame pelo WhatsApp.
                </p>
            )}
        </form>
    );
}
