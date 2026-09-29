
(() => {
  const sb = window.lobiSupabase;
  const CONFIG_CATEGORY = "__site_config__";
  const CONFIG_NAME = "__LOBI_SITE_CONFIG__";
  const STORE_PREVIEW_URL = "../lobi-lifestyle/?editorPreview=1";

  const defaults = {
    version: 1,
    theme: {
      background: "#050505",
      text: "#f4f4f1",
      primary: "#b7ff00",
      secondary: "#ef2b20",
      panel: "#0d0d0d",
      muted: "#9a9a9a"
    },
    header: { visible: true, height: 85, logoWidth: 115 },
    hero: {
      visible: true,
      eyebrow: "LOBI LIFESTYLE · DROP 01",
      title: "NÃO É SÓ\nROUPA.",
      accent: "É PRESENÇA.",
      description: "Streetwear masculino selecionado para quem carrega identidade no jeito de vestir.",
      buttonText: "VER O DROP",
      buttonLink: "#produtos",
      titleMax: 125,
      minHeight: 760,
      imageUrl: "",
      imageX: 50,
      imageY: 50,
      overlay: 45
    },
    marquee: {
      visible: true,
      text: "LOBI LIFESTYLE ✦ STREETWEAR MASCULINO ✦ DROP 01 ✦ PRESENÇA"
    },
    products: {
      visible: true,
      eyebrow: "PRIMEIRO DROP",
      title: "DROP 01",
      description: "Peças selecionadas pela LOBI.\nQuantidades limitadas.",
      columnsDesktop: 3,
      columnsMobile: 2,
      imageRatio: "4/5",
      sectionPadding: 120
    },
    promo: {
      visible: false,
      title: "DROP 01",
      subtitle: "PEÇAS SELECIONADAS. QUANTIDADES LIMITADAS.",
      buttonText: "VER PRODUTOS",
      buttonLink: "#produtos",
      imageUrl: "",
      height: 420,
      imageX: 50,
      imageY: 50,
      overlay: 48
    },
    manifesto: {
      visible: true,
      eyebrow: "LOBI LIFESTYLE",
      title: "VISTA O QUE",
      accent: "TE REPRESENTA.",
      body: "A LOBI não nasceu para ser só mais uma loja de roupas. Nossa seleção é feita para quem vê o estilo como parte da própria identidade.",
      tags: "ESTILO, ATITUDE, IDENTIDADE"
    },
    footer: {
      visible: true,
      tagline: "Streetwear masculino para quem tem presença.",
      instagram: "",
      whatsapp: "https://wa.me/5583993149486",
      copyright: "© 2026 LOBI LIFESTYLE"
    },
    order: ["hero","promo","marquee","products","manifesto"]
  };

  function campaignPreset({
    background="#050505",text="#f4f4f1",primary="#b7ff00",secondary="#ef2b20",panel="#0d0d0d",muted="#9a9a9a",
    eyebrow="LOBI LIFESTYLE",title="NÃO É SÓ\nROUPA.",accent="É PRESENÇA.",
    description="Streetwear masculino selecionado para quem carrega identidade no jeito de vestir.",
    buttonText="VER PRODUTOS",marquee="LOBI LIFESTYLE ✦ STREETWEAR MASCULINO ✦ PRESENÇA",
    promoTitle="LOBI LIFESTYLE",promoSubtitle="ESTILO, ATITUDE E IDENTIDADE.",promoButton="VER PRODUTOS",
    productsEyebrow="SELEÇÃO LOBI",productsTitle="ESCOLHA SUA PEÇA"
  }={}){
    return {
      ...JSON.parse(JSON.stringify(defaults)),
      theme:{background,text,primary,secondary,panel,muted},
      hero:{...defaults.hero,visible:true,eyebrow,title,accent,description,buttonText,buttonLink:"#produtos",titleMax:125,overlay:48},
      marquee:{visible:true,text:marquee},
      products:{...defaults.products,visible:true,eyebrow:productsEyebrow,title:productsTitle},
      promo:{...defaults.promo,visible:true,title:promoTitle,subtitle:promoSubtitle,buttonText:promoButton,buttonLink:"#produtos",height:380,overlay:48},
      manifesto:{...defaults.manifesto},
      footer:{...defaults.footer}
    };
  }

  const presets = {
    original: JSON.parse(JSON.stringify(defaults)),
    minimal: {
      ...JSON.parse(JSON.stringify(defaults)),
      theme:{background:"#070707",text:"#f7f7f4",primary:"#f7f7f4",secondary:"#777777",panel:"#101010",muted:"#9a9a9a"},
      hero:{...defaults.hero,titleMax:112,overlay:62},
      products:{...defaults.products,imageRatio:"1/1"}
    },
    neon: {
      ...JSON.parse(JSON.stringify(defaults)),
      theme:{background:"#020202",text:"#ffffff",primary:"#b7ff00",secondary:"#ff3b1f",panel:"#0a0a0a",muted:"#a8a8a8"},
      hero:{...defaults.hero,titleMax:132,overlay:38}
    },

    anoNovo: campaignPreset({
      background:"#050505",text:"#fffdf5",primary:"#d6b45a",secondary:"#f4f4f1",panel:"#10100e",muted:"#aaa38e",
      eyebrow:"LOBI · ANO NOVO",title:"ANO NOVO.",accent:"PRESENÇA NOVA.",
      description:"Comece o ano vestindo o que representa você.",
      buttonText:"COMEÇAR O ANO",marquee:"ANO NOVO ✦ NOVA FASE ✦ MESMA IDENTIDADE ✦ LOBI",
      promoTitle:"NOVO ANO. NOVO DROP.",promoSubtitle:"UMA NOVA FASE PARA O SEU ESTILO.",promoButton:"VER SELEÇÃO",
      productsEyebrow:"COMECE COM PRESENÇA",productsTitle:"SELEÇÃO DE ANO NOVO"
    }),
    carnaval: campaignPreset({
      background:"#050505",text:"#ffffff",primary:"#b7ff00",secondary:"#ff2bd6",panel:"#0d0d0f",muted:"#a7a7aa",
      eyebrow:"LOBI · CARNAVAL",title:"RUA. COR.",accent:"PRESENÇA.",
      description:"Seu estilo acompanha o ritmo. Vista presença do começo ao fim.",
      buttonText:"VER O DROP",marquee:"CARNAVAL LOBI ✦ RUA ✦ COR ✦ ATITUDE ✦ PRESENÇA",
      promoTitle:"NO SEU RITMO.",promoSubtitle:"STREETWEAR PARA FAZER PRESENÇA ONDE VOCÊ FOR.",promoButton:"VER PEÇAS",
      productsEyebrow:"CARNAVAL LOBI",productsTitle:"ESTILO EM MOVIMENTO"
    }),
    diaMulher: campaignPreset({
      background:"#0e0710",text:"#fff7ff",primary:"#e8a8ff",secondary:"#b044c6",panel:"#170b19",muted:"#b7a0ba",
      eyebrow:"LOBI · DIA DA MULHER",title:"PRESENÇA.",accent:"FORÇA. IDENTIDADE.",
      description:"Uma campanha de celebração para mulheres que constroem presença do próprio jeito.",
      buttonText:"VER SELEÇÃO",marquee:"DIA DA MULHER ✦ PRESENÇA ✦ FORÇA ✦ IDENTIDADE",
      promoTitle:"PRESENÇA QUE INSPIRA.",promoSubtitle:"UMA HOMENAGEM EM FORMA DE IDENTIDADE.",promoButton:"VER SELEÇÃO",
      productsEyebrow:"DIA DA MULHER",productsTitle:"SELEÇÃO ESPECIAL"
    }),
    pascoa: campaignPreset({
      background:"#110c09",text:"#fff4df",primary:"#d9a35f",secondary:"#9d6cff",panel:"#1a120e",muted:"#b9a995",
      eyebrow:"LOBI · PÁSCOA",title:"SEU ESTILO",accent:"MERECE PRESENTE.",
      description:"Uma seleção com identidade para transformar o presente em presença.",
      buttonText:"VER PRESENTES",marquee:"PÁSCOA LOBI ✦ PRESENTE COM IDENTIDADE ✦ PRESENÇA",
      promoTitle:"PRESENTE COM PRESENÇA.",promoSubtitle:"ESCOLHA ALGO QUE REALMENTE REPRESENTA.",promoButton:"VER SELEÇÃO",
      productsEyebrow:"PÁSCOA LOBI",productsTitle:"ESCOLHA O PRESENTE"
    }),
    diaTrabalhador: campaignPreset({
      background:"#060707",text:"#f7f7f2",primary:"#f2c94c",secondary:"#b7ff00",panel:"#101111",muted:"#9d9d94",
      eyebrow:"LOBI · DIA DO TRABALHADOR",title:"CORRE TODO DIA.",accent:"PRESENÇA TAMBÉM.",
      description:"Para quem constrói, cria, resolve e segue em movimento.",
      buttonText:"VER SELEÇÃO",marquee:"DIA DO TRABALHADOR ✦ CORRE ✦ ATITUDE ✦ PRESENÇA",
      promoTitle:"PRA QUEM FAZ ACONTECER.",promoSubtitle:"UMA CAMPANHA PARA QUEM NÃO PARA.",promoButton:"VER PRODUTOS",
      productsEyebrow:"DIA DO TRABALHADOR",productsTitle:"SELEÇÃO PARA O CORRE"
    }),
    diaMaes: campaignPreset({
      background:"#10090c",text:"#fff4f7",primary:"#e9a7b8",secondary:"#9e2f50",panel:"#180d12",muted:"#bd9da6",
      eyebrow:"LOBI · DIA DAS MÃES",title:"PRESENÇA QUE",accent:"MARCA PRA SEMPRE.",
      description:"Para celebrar quem transforma cuidado em identidade todos os dias.",
      buttonText:"VER SELEÇÃO",marquee:"DIA DAS MÃES ✦ PRESENÇA ✦ CARINHO ✦ IDENTIDADE",
      promoTitle:"PARA QUEM SEMPRE ESTÁ PRESENTE.",promoSubtitle:"UM GESTO COM IDENTIDADE PARA O DIA DAS MÃES.",promoButton:"VER IDEIAS",
      productsEyebrow:"DIA DAS MÃES",productsTitle:"PRESENTES COM SIGNIFICADO"
    }),
    diaNamorados: campaignPreset({
      background:"#090506",text:"#fff5f5",primary:"#ff4d5f",secondary:"#ff8ca0",panel:"#14090c",muted:"#b89ba0",
      eyebrow:"LOBI · DIA DOS NAMORADOS",title:"DOIS ESTILOS.",accent:"UMA PRESENÇA.",
      description:"Presenteie com algo que combina com a identidade de quem está ao seu lado.",
      buttonText:"VER PRESENTES",marquee:"DIA DOS NAMORADOS ✦ ESTILO ✦ CONEXÃO ✦ PRESENÇA",
      promoTitle:"PRESENTE QUE TEM IDENTIDADE.",promoSubtitle:"PARA QUEM FAZ PARTE DA SUA HISTÓRIA.",promoButton:"ESCOLHER PRESENTE",
      productsEyebrow:"DIA DOS NAMORADOS",productsTitle:"PARA PRESENTEAR"
    }),
    diaAmigo: campaignPreset({
      background:"#05080b",text:"#f6fbff",primary:"#62d8ff",secondary:"#b7ff00",panel:"#0b1217",muted:"#95a6ae",
      eyebrow:"LOBI · DIA DO AMIGO",title:"QUEM FECHA",accent:"COM VOCÊ.",
      description:"Amizade também tem identidade. Presenteie quem divide o corre.",
      buttonText:"VER PRESENTES",marquee:"DIA DO AMIGO ✦ PARCERIA ✦ RUA ✦ IDENTIDADE ✦ LOBI",
      promoTitle:"PRA QUEM TÁ JUNTO.",promoSubtitle:"UM PRESENTE COM A CARA DA PARCERIA.",promoButton:"VER SELEÇÃO",
      productsEyebrow:"DIA DO AMIGO",productsTitle:"PRESENTES PARA O PARCEIRO"
    }),
    saoJoao: campaignPreset({
      background:"#070b12",text:"#fff8e8",primary:"#ffbf3f",secondary:"#ef5a29",panel:"#101723",muted:"#b0aa9c",
      eyebrow:"LOBI · SÃO JOÃO",title:"ARRAIÁ NA RUA.",accent:"ESTILO ACESO.",
      description:"Do São João à cidade, presença é o que mantém o look vivo.",
      buttonText:"VER SELEÇÃO",marquee:"SÃO JOÃO LOBI ✦ FOGUEIRA ✦ RUA ✦ ESTILO ✦ PRESENÇA",
      promoTitle:"SÃO JOÃO COM IDENTIDADE.",promoSubtitle:"STREETWEAR PARA ENTRAR NO CLIMA SEM SAIR DO SEU ESTILO.",promoButton:"VER PEÇAS",
      productsEyebrow:"TEMPORADA JUNINA",productsTitle:"PRESENÇA NO ARRAIÁ"
    }),
    diaPais: campaignPreset({
      background:"#070a0f",text:"#f3f6fa",primary:"#d5b46a",secondary:"#315a8a",panel:"#0e141d",muted:"#98a3af",
      eyebrow:"LOBI · DIA DOS PAIS",title:"PRESENÇA VEM",accent:"DE REFERÊNCIA.",
      description:"Para quem ensinou que estilo também é atitude.",
      buttonText:"VER PRESENTES",marquee:"DIA DOS PAIS ✦ REFERÊNCIA ✦ ATITUDE ✦ PRESENÇA",
      promoTitle:"UM PRESENTE À ALTURA.",promoSubtitle:"ESCOLHA UMA PEÇA COM IDENTIDADE PARA O DIA DOS PAIS.",promoButton:"VER SELEÇÃO",
      productsEyebrow:"DIA DOS PAIS",productsTitle:"PRESENTES COM PRESENÇA"
    }),
    diaAvos: campaignPreset({
      background:"#0b0a07",text:"#fffaf0",primary:"#d8bd7a",secondary:"#8d7653",panel:"#14120d",muted:"#aaa18e",
      eyebrow:"LOBI · DIA DOS AVÓS",title:"HISTÓRIA QUE",accent:"VIRA PRESENÇA.",
      description:"Para celebrar quem carrega história, referência e afeto.",
      buttonText:"VER PRESENTES",marquee:"DIA DOS AVÓS ✦ HISTÓRIA ✦ AFETO ✦ PRESENÇA",
      promoTitle:"PRESENTE COM HISTÓRIA.",promoSubtitle:"UM GESTO PARA QUEM SEMPRE FEZ PARTE.",promoButton:"VER SELEÇÃO",
      productsEyebrow:"DIA DOS AVÓS",productsTitle:"PRESENTES COM SIGNIFICADO"
    }),
    diaHomem: campaignPreset({
      background:"#040404",text:"#f5f5f2",primary:"#b7ff00",secondary:"#8b8b8b",panel:"#0d0d0d",muted:"#999999",
      eyebrow:"LOBI · DIA DO HOMEM",title:"SEU ESTILO.",accent:"SUA PRESENÇA.",
      description:"Identidade não se explica. Se veste.",
      buttonText:"VER O DROP",marquee:"DIA DO HOMEM ✦ ESTILO ✦ ATITUDE ✦ IDENTIDADE ✦ LOBI",
      promoTitle:"PRESENÇA É IDENTIDADE.",promoSubtitle:"UMA SELEÇÃO PARA QUEM SABE O QUE REPRESENTA.",promoButton:"VER PEÇAS",
      productsEyebrow:"DIA DO HOMEM",productsTitle:"STREETWEAR COM IDENTIDADE"
    }),
    diaCriancas: campaignPreset({
      background:"#07070b",text:"#fffefe",primary:"#ffd633",secondary:"#5e9cff",panel:"#101015",muted:"#a5a5b0",
      eyebrow:"LOBI · DIA DAS CRIANÇAS",title:"ATITUDE NÃO",accent:"TEM IDADE.",
      description:"Tema pronto para a data. Use apenas se houver produtos adequados ao público da campanha.",
      buttonText:"VER SELEÇÃO",marquee:"DIA DAS CRIANÇAS ✦ COR ✦ MOVIMENTO ✦ IDENTIDADE",
      promoTitle:"PRESENÇA DESDE CEDO.",promoSubtitle:"ADAPTE A CAMPANHA AO SEU CATÁLOGO REAL.",promoButton:"VER PRODUTOS",
      productsEyebrow:"DIA DAS CRIANÇAS",productsTitle:"SELEÇÃO DA DATA"
    }),
    halloween: campaignPreset({
      background:"#030303",text:"#fff7ef",primary:"#ff7417",secondary:"#7e3cff",panel:"#0d0911",muted:"#a99baa",
      eyebrow:"LOBI · HALLOWEEN",title:"DARK MODE.",accent:"PRESENÇA LIGADA.",
      description:"Visual escuro, atitude acesa. A rua continua sendo o cenário.",
      buttonText:"ENTRAR NO DROP",marquee:"HALLOWEEN LOBI ✦ DARK MODE ✦ STREETWEAR ✦ PRESENÇA",
      promoTitle:"NIGHT DROP.",promoSubtitle:"UMA SELEÇÃO ESCURA, URBANA E SEM DISFARCE.",promoButton:"VER O DROP",
      productsEyebrow:"HALLOWEEN",productsTitle:"DARK SELECTION"
    }),
    natal: campaignPreset({
      background:"#07100b",text:"#fffaf0",primary:"#d6b45a",secondary:"#c62333",panel:"#0d1811",muted:"#a8aa9e",
      eyebrow:"LOBI · NATAL",title:"PRESENTE COM",accent:"IDENTIDADE.",
      description:"Neste Natal, escolha algo que tenha presença antes mesmo de abrir a embalagem.",
      buttonText:"VER PRESENTES",marquee:"NATAL LOBI ✦ PRESENTE COM IDENTIDADE ✦ PRESENÇA",
      promoTitle:"NATAL COM PRESENÇA.",promoSubtitle:"PEÇAS PARA PRESENTEAR SEM CAIR NO ÓBVIO.",promoButton:"VER PRESENTES",
      productsEyebrow:"NATAL LOBI",productsTitle:"GUIA DE PRESENTES"
    }),

    diaConsumidor: campaignPreset({
      background:"#05070d",text:"#f7f9ff",primary:"#69a7ff",secondary:"#b7ff00",panel:"#0b101a",muted:"#98a4b8",
      eyebrow:"LOBI · DIA DO CONSUMIDOR",title:"QUEM ESCOLHE",accent:"MERECE MAIS.",
      description:"Uma campanha feita para quem escolhe a LOBI para vestir a própria identidade.",
      buttonText:"VER SELEÇÃO",marquee:"DIA DO CONSUMIDOR ✦ VOCÊ ESCOLHE ✦ VOCÊ FAZ A LOBI",
      promoTitle:"DIA DO CONSUMIDOR LOBI.",promoSubtitle:"CONDIÇÕES ESPECIAIS PODEM SER CONFIGURADAS POR VOCÊ.",promoButton:"VER PRODUTOS",
      productsEyebrow:"DIA DO CONSUMIDOR",productsTitle:"SELEÇÃO ESPECIAL"
    }),
    mesConsumidor: campaignPreset({
      background:"#05070b",text:"#f5f8ff",primary:"#79b8ff",secondary:"#b7ff00",panel:"#0b1118",muted:"#93a0af",
      eyebrow:"LOBI · MÊS DO CONSUMIDOR",title:"O MÊS É",accent:"DE QUEM ESCOLHE.",
      description:"Mais espaço para descobrir peças que combinam com a sua identidade.",
      buttonText:"EXPLORAR",marquee:"MÊS DO CONSUMIDOR ✦ LOBI ✦ ESTILO ✦ ESCOLHA ✦ PRESENÇA",
      promoTitle:"MÊS DO CONSUMIDOR.",promoSubtitle:"UMA CAMPANHA INTEIRA PARA QUEM FAZ PARTE DA LOBI.",promoButton:"VER SELEÇÃO",
      productsEyebrow:"MÊS DO CONSUMIDOR",productsTitle:"DESTAQUES DA CAMPANHA"
    }),
    semanaCliente: campaignPreset({
      background:"#050505",text:"#f8f8f4",primary:"#b7ff00",secondary:"#f4c542",panel:"#0d0d0d",muted:"#99998f",
      eyebrow:"LOBI · SEMANA DO CLIENTE",title:"VOCÊ FAZ",accent:"PARTE DA PRESENÇA.",
      description:"Uma semana pensada para quem acompanha, escolhe e veste LOBI.",
      buttonText:"VER A CAMPANHA",marquee:"SEMANA DO CLIENTE ✦ VOCÊ FAZ PARTE ✦ LOBI",
      promoTitle:"ESSA SEMANA É SUA.",promoSubtitle:"UMA SELEÇÃO ESPECIAL PARA QUEM FAZ A LOBI ACONTECER.",promoButton:"VER PRODUTOS",
      productsEyebrow:"SEMANA DO CLIENTE",productsTitle:"PARA QUEM É LOBI"
    }),
    diaCliente: campaignPreset({
      background:"#050505",text:"#fafaf7",primary:"#f4c542",secondary:"#b7ff00",panel:"#10100d",muted:"#a2a094",
      eyebrow:"LOBI · DIA DO CLIENTE",title:"VOCÊ FAZ PARTE.",accent:"DA NOSSA HISTÓRIA.",
      description:"Hoje a presença é de quem constrói a LOBI junto com a gente.",
      buttonText:"VER SELEÇÃO",marquee:"DIA DO CLIENTE ✦ OBRIGADO POR FAZER PARTE ✦ LOBI",
      promoTitle:"DIA DE QUEM FAZ A LOBI.",promoSubtitle:"NOSSA IDENTIDADE TAMBÉM É FEITA POR QUEM ESCOLHE ESTAR AQUI.",promoButton:"VER PRODUTOS",
      productsEyebrow:"DIA DO CLIENTE",productsTitle:"SELEÇÃO LOBI"
    }),
    onzeOnze: campaignPreset({
      background:"#050505",text:"#ffffff",primary:"#ff3b30",secondary:"#f7d51d",panel:"#100b0a",muted:"#a79e9b",
      eyebrow:"LOBI · 11.11",title:"11.11",accent:"HORA DE ESCOLHER.",
      description:"Uma data para colocar na mira as peças que faltavam no seu estilo.",
      buttonText:"VER 11.11",marquee:"11.11 LOBI ✦ CAMPANHA ESPECIAL ✦ STREETWEAR ✦ PRESENÇA",
      promoTitle:"11.11 LOBI.",promoSubtitle:"SUA LISTA DE DESEJOS ENTRA EM CENA.",promoButton:"VER SELEÇÃO",
      productsEyebrow:"11.11",productsTitle:"DESTAQUES DO DIA"
    }),
    esquentaBlack: campaignPreset({
      background:"#020202",text:"#f7f7f4",primary:"#b7ff00",secondary:"#6d6d6d",panel:"#090909",muted:"#8d8d8d",
      eyebrow:"LOBI · ESQUENTA BLACK",title:"ANTES DA BLACK.",accent:"JÁ TEM PRESENÇA.",
      description:"O aquecimento começou. Prepare sua seleção antes da campanha principal.",
      buttonText:"VER O ESQUENTA",marquee:"ESQUENTA BLACK ✦ LOBI ✦ PREPARE SUA LISTA ✦ PRESENÇA",
      promoTitle:"ESQUENTA BLACK.",promoSubtitle:"COMECE A ESCOLHER ANTES DA BLACK FRIDAY.",promoButton:"VER PRODUTOS",
      productsEyebrow:"ESQUENTA BLACK",productsTitle:"PREPARE SUA LISTA"
    }),
    blackFriday: campaignPreset({
      background:"#000000",text:"#ffffff",primary:"#b7ff00",secondary:"#ef2b20",panel:"#080808",muted:"#8c8c8c",
      eyebrow:"LOBI · BLACK FRIDAY",title:"BLACK FRIDAY.",accent:"SEM PERDER IDENTIDADE.",
      description:"A campanha mais esperada do ano com a estética e a presença da LOBI.",
      buttonText:"ENTRAR NA BLACK",marquee:"BLACK FRIDAY LOBI ✦ PRESENÇA ✦ STREETWEAR ✦ CAMPANHA ESPECIAL",
      promoTitle:"BLACK FRIDAY LOBI.",promoSubtitle:"DEFINA SUAS OFERTAS NO CATÁLOGO E DEIXE O VISUAL PRONTO AQUI.",promoButton:"VER PRODUTOS",
      productsEyebrow:"BLACK FRIDAY",productsTitle:"BLACK SELECTION"
    }),
    cyberMonday: campaignPreset({
      background:"#03060b",text:"#f3fbff",primary:"#27d7ff",secondary:"#7565ff",panel:"#07111a",muted:"#8fa7b1",
      eyebrow:"LOBI · CYBER MONDAY",title:"CYBER MONDAY.",accent:"STREET NO ONLINE.",
      description:"A rua encontra o digital em uma campanha feita para comprar online.",
      buttonText:"VER A CYBER",marquee:"CYBER MONDAY ✦ ONLINE DROP ✦ LOBI ✦ STREETWEAR",
      promoTitle:"CYBER MONDAY LOBI.",promoSubtitle:"CAMPANHA DIGITAL COM IDENTIDADE DE RUA.",promoButton:"COMPRAR ONLINE",
      productsEyebrow:"CYBER MONDAY",productsTitle:"ONLINE SELECTION"
    }),
    liquidacao: campaignPreset({
      background:"#0a0303",text:"#fff7f2",primary:"#ff4635",secondary:"#ffd43b",panel:"#160808",muted:"#b49c94",
      eyebrow:"LOBI · SALE",title:"SALE LOBI.",accent:"ÚLTIMAS OPORTUNIDADES.",
      description:"Uma seleção para abrir espaço para o próximo movimento da LOBI.",
      buttonText:"VER A SALE",marquee:"SALE LOBI ✦ ÚLTIMAS OPORTUNIDADES ✦ ENQUANTO DURAR",
      promoTitle:"SALE.",promoSubtitle:"USE ESTE TEMA COM OS PREÇOS E CONDIÇÕES REAIS CADASTRADOS NOS PRODUTOS.",promoButton:"VER PRODUTOS",
      productsEyebrow:"SALE LOBI",productsTitle:"ÚLTIMAS PEÇAS"
    }),
    freteGratis: campaignPreset({
      background:"#04090b",text:"#f4fbff",primary:"#49d3ff",secondary:"#b7ff00",panel:"#081317",muted:"#91a7ae",
      eyebrow:"LOBI · FRETE GRÁTIS",title:"SEU LOOK",accent:"VAI MAIS LONGE.",
      description:"Tema pronto para campanhas de frete grátis. Ative somente quando a condição estiver válida.",
      buttonText:"VER PRODUTOS",marquee:"FRETE GRÁTIS ✦ LOBI ✦ CONSULTE AS CONDIÇÕES DA CAMPANHA",
      promoTitle:"FRETE GRÁTIS.",promoSubtitle:"CONFIGURE E DIVULGUE SOMENTE AS CONDIÇÕES REAIS DA SUA CAMPANHA.",promoButton:"VER PEÇAS",
      productsEyebrow:"CAMPANHA DE FRETE",productsTitle:"ESCOLHA SEU LOOK"
    }),
    aniversarioLobi: campaignPreset({
      background:"#050406",text:"#fffaff",primary:"#b7ff00",secondary:"#9e56ff",panel:"#100d13",muted:"#a59cab",
      eyebrow:"LOBI · ANIVERSÁRIO",title:"LOBI EM FESTA.",accent:"VOCÊ FAZ PARTE.",
      description:"Mais um capítulo da LOBI. A identidade cresce com quem veste a marca.",
      buttonText:"COMEMORAR COM A LOBI",marquee:"ANIVERSÁRIO LOBI ✦ MAIS UM CAPÍTULO ✦ PRESENÇA ✦ IDENTIDADE",
      promoTitle:"ANIVERSÁRIO LOBI.",promoSubtitle:"UMA CAMPANHA PARA CELEBRAR QUEM FAZ PARTE DESSA HISTÓRIA.",promoButton:"VER SELEÇÃO",
      productsEyebrow:"ANIVERSÁRIO LOBI",productsTitle:"EDIÇÃO DE COMEMORAÇÃO"
    }),
    dropEspecial: campaignPreset({
      background:"#030303",text:"#ffffff",primary:"#b7ff00",secondary:"#ef2b20",panel:"#0a0a0a",muted:"#999999",
      eyebrow:"LOBI · DROP ESPECIAL",title:"NOVO DROP.",accent:"NOVA PRESENÇA.",
      description:"Uma nova seleção entra em cena. Mesma identidade, novo movimento.",
      buttonText:"VER O DROP",marquee:"NOVO DROP ✦ LOBI LIFESTYLE ✦ QUANTIDADES LIMITADAS ✦ PRESENÇA",
      promoTitle:"DROP ESPECIAL.",promoSubtitle:"PEÇAS SELECIONADAS PARA O PRÓXIMO MOVIMENTO.",promoButton:"EXPLORAR DROP",
      productsEyebrow:"DROP ESPECIAL",productsTitle:"NOVAS PEÇAS"
    }),
    voltaAulas: campaignPreset({
      background:"#05080c",text:"#f5fbff",primary:"#5ea8ff",secondary:"#b7ff00",panel:"#0a1118",muted:"#96a4b0",
      eyebrow:"LOBI · VOLTA ÀS AULAS",title:"VOLTA PRO CORRE.",accent:"COM PRESENÇA.",
      description:"Uma campanha urbana para começar uma nova rotina sem abrir mão da identidade.",
      buttonText:"VER SELEÇÃO",marquee:"VOLTA ÀS AULAS ✦ NOVA ROTINA ✦ MESMA IDENTIDADE ✦ LOBI",
      promoTitle:"BACK TO THE STREET.",promoSubtitle:"PEÇAS PARA COMEÇAR A ROTINA COM PRESENÇA.",promoButton:"VER PRODUTOS",
      productsEyebrow:"VOLTA ÀS AULAS",productsTitle:"NOVO COMEÇO"
    }),
    verao: campaignPreset({
      background:"#07100f",text:"#f7fff8",primary:"#dfff3f",secondary:"#ff7043",panel:"#0c1715",muted:"#9eaaa4",
      eyebrow:"LOBI · VERÃO",title:"CALOR NA RUA.",accent:"PRESENÇA LEVE.",
      description:"Peças para manter identidade, conforto e presença nos dias mais quentes.",
      buttonText:"VER VERÃO",marquee:"VERÃO LOBI ✦ LEVEZA ✦ RUA ✦ ESTILO ✦ PRESENÇA",
      promoTitle:"VERÃO NA LOBI.",promoSubtitle:"UMA SELEÇÃO MAIS LEVE PARA CONTINUAR MARCANDO PRESENÇA.",promoButton:"VER PEÇAS",
      productsEyebrow:"TEMPORADA DE VERÃO",productsTitle:"VERÃO LOBI"
    }),
    inverno: campaignPreset({
      background:"#05070a",text:"#f1f5f7",primary:"#b9d2df",secondary:"#62788d",panel:"#0b1015",muted:"#8d9ba4",
      eyebrow:"LOBI · INVERNO",title:"CAMADAS DE",accent:"IDENTIDADE.",
      description:"Quando a temperatura cai, o estilo ganha novas camadas.",
      buttonText:"VER INVERNO",marquee:"INVERNO LOBI ✦ CAMADAS ✦ TEXTURA ✦ STREETWEAR ✦ PRESENÇA",
      promoTitle:"INVERNO COM PRESENÇA.",promoSubtitle:"CAMADAS, TEXTURAS E IDENTIDADE PARA OS DIAS FRIOS.",promoButton:"VER SELEÇÃO",
      productsEyebrow:"TEMPORADA DE INVERNO",productsTitle:"INVERNO LOBI"
    })
  };

  const $ = s => document.querySelector(s);
  const pageView = $("#pageView");
  if (!pageView) return;

  let config = JSON.parse(JSON.stringify(defaults));
  let configRowId = null;
  let initialized = false;
  let fixedDeleteUndo = null;

  function deepMerge(base, extra){
    if(!extra || typeof extra !== "object") return base;
    for(const [k,v] of Object.entries(extra)){
      if(v && typeof v === "object" && !Array.isArray(v) && base[k] && typeof base[k] === "object" && !Array.isArray(base[k])){
        deepMerge(base[k],v);
      } else {
        base[k]=v;
      }
    }
    return base;
  }

  function setStatus(message,type=""){
    const el=$("#editorStatus");
    if(!el) return;
    el.textContent=message;
    el.className="editor-status"+(type?(" "+type):"");
  }

  function val(id){ return $(id)?.value ?? ""; }
  function num(id,fallback=0){ const n=Number(val(id)); return Number.isFinite(n)?n:fallback; }
  function checked(id){ return !!$(id)?.checked; }
  function setVal(id,v){ const e=$(id); if(e) e.value=v ?? ""; }
  function setCheck(id,v){ const e=$(id); if(e) e.checked=!!v; }

  function syncOutputs(){
    document.querySelectorAll("[data-output-for]").forEach(o=>{
      const input=$("#"+o.dataset.outputFor);
      if(input) o.value=input.value;
    });
  }

  function fillForm(){
    setVal("#themeBackground",config.theme.background); setVal("#themeText",config.theme.text);
    setVal("#themePrimary",config.theme.primary); setVal("#themeSecondary",config.theme.secondary);
    setVal("#themePanel",config.theme.panel); setVal("#themeMuted",config.theme.muted);

    setCheck("#headerVisible",config.header.visible !== false); setVal("#headerHeight",config.header.height); setVal("#logoWidth",config.header.logoWidth);

    setCheck("#heroVisible",config.hero.visible); setVal("#heroEyebrow",config.hero.eyebrow);
    setVal("#heroTitle",config.hero.title); setVal("#heroAccent",config.hero.accent);
    setVal("#heroDescription",config.hero.description); setVal("#heroButtonText",config.hero.buttonText);
    setVal("#heroButtonLink",config.hero.buttonLink); setVal("#heroTitleMax",config.hero.titleMax);
    setVal("#heroMinHeight",config.hero.minHeight); setVal("#heroImageUrl",config.hero.imageUrl);
    setVal("#heroImageX",config.hero.imageX); setVal("#heroImageY",config.hero.imageY); setVal("#heroOverlay",config.hero.overlay);

    setCheck("#marqueeVisible",config.marquee.visible); setVal("#marqueeText",config.marquee.text);

    setCheck("#productsVisible",config.products.visible); setVal("#productsEyebrow",config.products.eyebrow);
    setVal("#productsTitle",config.products.title); setVal("#productsDescription",config.products.description);
    setVal("#columnsDesktop",config.products.columnsDesktop); setVal("#columnsMobile",config.products.columnsMobile);
    setVal("#imageRatio",config.products.imageRatio); setVal("#sectionPadding",config.products.sectionPadding);

    setCheck("#promoVisible",config.promo.visible); setVal("#promoTitle",config.promo.title);
    setVal("#promoSubtitle",config.promo.subtitle); setVal("#promoButtonText",config.promo.buttonText);
    setVal("#promoButtonLink",config.promo.buttonLink); setVal("#promoImageUrl",config.promo.imageUrl);
    setVal("#promoHeight",config.promo.height); setVal("#promoImageX",config.promo.imageX);
    setVal("#promoImageY",config.promo.imageY); setVal("#promoOverlay",config.promo.overlay);

    setCheck("#manifestoVisible",config.manifesto.visible); setVal("#manifestoEyebrow",config.manifesto.eyebrow);
    setVal("#manifestoTitle",config.manifesto.title); setVal("#manifestoAccent",config.manifesto.accent);
    setVal("#manifestoBody",config.manifesto.body); setVal("#manifestoTags",config.manifesto.tags);

    setCheck("#footerVisible",config.footer.visible); setVal("#footerTagline",config.footer.tagline);
    setVal("#footerInstagram",config.footer.instagram); setVal("#footerWhatsapp",config.footer.whatsapp);
    setVal("#footerCopyright",config.footer.copyright);

    renderOrderList();
    syncOutputs();
    sendPreview();
  }

  function readForm(){
    config.theme = {
      background:val("#themeBackground"), text:val("#themeText"), primary:val("#themePrimary"),
      secondary:val("#themeSecondary"), panel:val("#themePanel"), muted:val("#themeMuted")
    };
    config.header={visible:checked("#headerVisible"),height:num("#headerHeight",85),logoWidth:num("#logoWidth",115)};
    config.hero={
      ...config.hero,
      visible:checked("#heroVisible"), eyebrow:val("#heroEyebrow"), title:val("#heroTitle"),
      accent:val("#heroAccent"), description:val("#heroDescription"), buttonText:val("#heroButtonText"),
      buttonLink:val("#heroButtonLink"), titleMax:num("#heroTitleMax",125), minHeight:num("#heroMinHeight",760),
      imageUrl:val("#heroImageUrl"), imageX:num("#heroImageX",50), imageY:num("#heroImageY",50), overlay:num("#heroOverlay",45)
    };
    config.marquee={visible:checked("#marqueeVisible"),text:val("#marqueeText")};
    config.products={
      visible:checked("#productsVisible"),eyebrow:val("#productsEyebrow"),title:val("#productsTitle"),
      description:val("#productsDescription"),columnsDesktop:num("#columnsDesktop",3),columnsMobile:num("#columnsMobile",2),
      imageRatio:val("#imageRatio"),sectionPadding:num("#sectionPadding",120)
    };
    config.promo={
      ...config.promo,
      visible:checked("#promoVisible"),title:val("#promoTitle"),subtitle:val("#promoSubtitle"),
      buttonText:val("#promoButtonText"),buttonLink:val("#promoButtonLink"),imageUrl:val("#promoImageUrl"),
      height:num("#promoHeight",420),imageX:num("#promoImageX",50),imageY:num("#promoImageY",50),overlay:num("#promoOverlay",48)
    };
    config.manifesto={
      visible:checked("#manifestoVisible"),eyebrow:val("#manifestoEyebrow"),title:val("#manifestoTitle"),
      accent:val("#manifestoAccent"),body:val("#manifestoBody"),tags:val("#manifestoTags")
    };
    config.footer={
      visible:checked("#footerVisible"),tagline:val("#footerTagline"),instagram:val("#footerInstagram"),
      whatsapp:val("#footerWhatsapp"),copyright:val("#footerCopyright")
    };
    config.updatedAt=new Date().toISOString();
    return config;
  }

  function sendPreview(){
    readForm();
    const frame=$("#sitePreview");
    if(frame?.contentWindow) frame.contentWindow.postMessage({type:"lobi-preview-config",config},"*");
  }

  function refreshPreview(){
    const frame=$("#sitePreview");
    if(frame) frame.src=STORE_PREVIEW_URL+"&t="+Date.now();
  }

  async function loadConfig(){
    setStatus("Carregando configuração...");
    const {data,error}=await sb.from("products")
      .select("id,description")
      .eq("category",CONFIG_CATEGORY)
      .order("updated_at",{ascending:false})
      .limit(1);
    if(error){ console.error(error); setStatus("Não foi possível carregar a configuração.","error"); return; }
    if(data?.length){
      configRowId=data[0].id;
      try{
        const saved=JSON.parse(data[0].description||"{}");
        config=deepMerge(JSON.parse(JSON.stringify(defaults)),saved);
      }catch(e){
        console.warn(e);
        config=JSON.parse(JSON.stringify(defaults));
      }
    }else{
      configRowId=null;
      config=JSON.parse(JSON.stringify(defaults));
    }
    fixedDeleteUndo=null; updateFixedUndoButton(); fillForm();
    setStatus(configRowId?"Configuração carregada.":"Usando configuração padrão.","ok");
  }

  async function saveConfig(){
    readForm();
    const button=$("#saveSiteConfig");
    if(button){button.disabled=true;button.textContent="SALVANDO...";}
    setStatus("Salvando alterações...");
    const payload={
      name:CONFIG_NAME, price:0, category:CONFIG_CATEGORY, description:JSON.stringify(config),
      sizes:[], stock:0, tag:"SYSTEM", active:true, image_url:null, image_path:null, updated_at:new Date().toISOString()
    };
    let result;
    if(configRowId){
      result=await sb.from("products").update(payload).eq("id",configRowId).select("id").single();
    }else{
      result=await sb.from("products").insert(payload).select("id").single();
    }
    if(result.error){
      console.error(result.error); setStatus(result.error.message||"Erro ao salvar.","error");
    }else{
      configRowId=result.data.id;
      if(fixedDeleteUndo) fixedDeleteUndo.saved=true;
      setStatus("Site atualizado com sucesso.","ok");
      refreshPreview();
    }
    if(button){button.disabled=false;button.textContent="SALVAR VISUAL";}
  }

  function applyPreset(name){
    if(!presets[name]) return;
    const keepImages={hero:config.hero.imageUrl,promo:config.promo.imageUrl};
    config=JSON.parse(JSON.stringify(presets[name]));
    config.hero.imageUrl=keepImages.hero||config.hero.imageUrl;
    config.promo.imageUrl=keepImages.promo||config.promo.imageUrl;
    setVal("#presetSelect",name);
    setVal("#quickPresetSelect",name);
    fillForm();
    setStatus("Tema completo aplicado na prévia: cores, textos, slogan, faixa e banner. Salve para publicar.","ok");
  }

  async function uploadEditorImage(file,targetInput){
    if(!file) return;
    if(!["image/jpeg","image/png","image/webp"].includes(file.type)){setStatus("Use JPG, PNG ou WEBP.","error");return;}
    if(file.size>8*1024*1024){setStatus("A imagem deve ter até 8 MB.","error");return;}
    setStatus("Enviando imagem...");
    const ext={ "image/jpeg":"jpg","image/png":"png","image/webp":"webp"}[file.type]||"jpg";
    const path="site/"+crypto.randomUUID()+"."+ext;
    try{
      const {error}=await sb.storage.from("product-images").upload(path,file,{upsert:false,contentType:file.type,cacheControl:"3600"});
      if(error) throw error;
      const {data}=sb.storage.from("product-images").getPublicUrl(path);
      setVal(targetInput,data.publicUrl);
      sendPreview();
      setStatus("Imagem enviada. Salve para publicar.","ok");
    }catch(e){
      console.error(e);
      setStatus("Falha ao enviar a imagem. Você também pode colar uma URL no campo.","error");
    }
  }

  const labels={header:"Cabeçalho",hero:"Hero / capa",promo:"Banner",marquee:"Faixa de texto",products:"Produtos",manifesto:"Sobre a LOBI",footer:"Rodapé"};
  const visibilityInputs={header:"#headerVisible",hero:"#heroVisible",promo:"#promoVisible",marquee:"#marqueeVisible",products:"#productsVisible",manifesto:"#manifestoVisible",footer:"#footerVisible"};

  function ensureFixedUndoButton(){
    let btn=$("#undoFixedSectionDelete");
    if(btn)return btn;
    const toolbar=document.querySelector(".editor-toolbar");
    if(!toolbar)return null;
    btn=document.createElement("button");
    btn.id="undoFixedSectionDelete";
    btn.type="button";
    btn.className="btn btn-ghost hidden";
    btn.textContent="↶ DESFAZER EXCLUSÃO";
    btn.addEventListener("click",undoFixedSectionDelete);
    toolbar.appendChild(btn);
    return btn;
  }

  function updateFixedUndoButton(){
    const btn=ensureFixedUndoButton();
    if(!btn)return;
    if(fixedDeleteUndo){
      btn.classList.remove("hidden");
      btn.textContent="↶ DESFAZER: "+(labels[fixedDeleteUndo.section]||"ITEM");
    }else{
      btn.classList.add("hidden");
      btn.textContent="↶ DESFAZER EXCLUSÃO";
    }
  }

  function confirmDeleteFixedSection(section){
    if(!visibilityInputs[section])return;
    const input=document.querySelector(visibilityInputs[section]);
    if(!input||!input.checked)return;
    const label=labels[section]||"este item";
    if(!confirm('Excluir "'+label+'" da Página?\n\nVocê poderá desfazer depois.'))return;
    fixedDeleteUndo={section:section,saved:false};
    input.checked=false;
    if(config[section]&&typeof config[section]==="object")config[section].visible=false;
    updateFixedUndoButton();
    renderOrderList();
    sendPreview();
    setStatus(label+" removido da prévia. Salve para publicar.","ok");
  }

  async function undoFixedSectionDelete(){
    if(!fixedDeleteUndo)return;
    const snapshot=fixedDeleteUndo;
    const input=document.querySelector(visibilityInputs[snapshot.section]);
    if(input)input.checked=true;
    if(config[snapshot.section]&&typeof config[snapshot.section]==="object")config[snapshot.section].visible=true;
    fixedDeleteUndo=null;
    updateFixedUndoButton();
    renderOrderList();
    sendPreview();
    setStatus((labels[snapshot.section]||"Item")+" restaurado.","ok");
    if(snapshot.saved){
      await saveConfig();
      setStatus("Exclusão desfeita e sincronizada com o site principal.","ok");
    }
  }

  function renderOrderList(){
    const list=$("#sectionOrderList"); if(!list) return;
    list.innerHTML="";
    config.order.forEach((key,index)=>{
      const item=document.createElement("div");
      const visibilityInput=document.querySelector(visibilityInputs[key]||"");
      const isVisible=visibilityInput ? visibilityInput.checked : true;
      item.className="section-order-item"+(isVisible?"":" section-hidden");
      item.draggable=true;
      item.dataset.key=key;
      item.innerHTML='<span class="drag-handle">⋮⋮</span><span class="order-label">'+labels[key]+(isVisible?"":' <small>OCULTO</small>')+'</span><button class="order-move" type="button" data-dir="-1" aria-label="Mover para cima">↑</button><button class="order-move" type="button" data-dir="1" aria-label="Mover para baixo">↓</button><button class="order-delete" type="button" aria-label="'+(isVisible?"Excluir":"Restaurar")+'" title="'+(isVisible?"Excluir":"Restaurar")+'">'+(isVisible?"×":"↶")+'</button>';
      item.addEventListener("dragstart",()=>item.classList.add("dragging"));
      item.addEventListener("dragend",()=>item.classList.remove("dragging"));
      item.addEventListener("dragover",e=>e.preventDefault());
      item.addEventListener("contextmenu",e=>{e.preventDefault();if(isVisible)confirmDeleteFixedSection(key);});
      item.querySelector(".order-delete")?.addEventListener("click",()=>{
        if(isVisible){
          confirmDeleteFixedSection(key);
        }else{
          const input=document.querySelector(visibilityInputs[key]||"");
          if(input)input.checked=true;
          if(config[key]&&typeof config[key]==="object")config[key].visible=true;
          if(fixedDeleteUndo?.section===key)fixedDeleteUndo=null;
          updateFixedUndoButton();
          renderOrderList();
          sendPreview();
          setStatus((labels[key]||"Item")+" restaurado na prévia. Salve para publicar.","ok");
        }
      });
      item.addEventListener("drop",e=>{
        e.preventDefault();
        const dragging=list.querySelector(".dragging"); if(!dragging||dragging===item)return;
        const from=config.order.indexOf(dragging.dataset.key), to=config.order.indexOf(item.dataset.key);
        const [moved]=config.order.splice(from,1); config.order.splice(to,0,moved);
        renderOrderList(); sendPreview();
      });
      item.querySelectorAll(".order-move").forEach(btn=>btn.addEventListener("click",()=>{
        const dir=Number(btn.dataset.dir), from=config.order.indexOf(key), to=from+dir;
        if(to<0||to>=config.order.length)return;
        [config.order[from],config.order[to]]=[config.order[to],config.order[from]];
        renderOrderList(); sendPreview();
      }));
      list.appendChild(item);
    });
  }

  function setVisualMode(visual=true){
    const shell=document.querySelector(".page-editor-shell");
    if(!shell)return;
    shell.classList.toggle("visual-only",visual);
    const btn=$("#toggleAdvancedEditor");
    if(btn)btn.textContent=visual?"AJUSTES AVANÇADOS":"VOLTAR À PRÉVIA";
  }

  function applyInlineChange(section,field,value){
    const input=document.getElementById(field);
    if(!input)return;
    input.value=value;
    input.dispatchEvent(new Event("input",{bubbles:true}));
    setVisualSelection(section,field);
    setStatus("Alteração feita diretamente na prévia. Salve para publicar.","ok");
  }

  function moveFixedRelative(section,dir){
    const i=config.order.indexOf(section);
    const to=i+Number(dir);
    if(i<0||to<0||to>=config.order.length)return;
    [config.order[i],config.order[to]]=[config.order[to],config.order[i]];
    renderOrderList();
    sendPreview();
    setStatus((labels[section]||section)+" movido na prévia. Salve para publicar.","ok");
  }

  function setVisualSelection(section,field=""){
    document.querySelectorAll(".editor-group.visual-active").forEach(el=>el.classList.remove("visual-active"));
    const panel=document.querySelector('[data-editor-section="'+section+'"]');
    if(panel)panel.classList.add("visual-active");
    const info=$("#visualSelectionInfo");
    if(info)info.textContent=(labels[section]||section||"Elemento")+(field?" · edição direta":"");
  }

  function focusEditorField(section,field){
    setVisualSelection(section,field);
    const panel=document.querySelector('[data-editor-section="'+section+'"]');
    if(panel){
      panel.open=true;
      panel.scrollIntoView({behavior:"smooth",block:"start"});
    }
    if(!field)return;
    const input=document.getElementById(field);
    if(!input)return;
    input.classList.remove("editor-focus-pulse");
    void input.offsetWidth;
    input.classList.add("editor-focus-pulse");
    input.focus({preventScroll:true});
    if(typeof input.select==="function" && ["text","url","number","search"].includes(input.type))input.select();
  }

  function reorderFixedFromPreview(fromKey,toKey,after=false){
    if(!fromKey||!toKey||fromKey===toKey)return;
    const from=config.order.indexOf(fromKey);
    const targetOriginal=config.order.indexOf(toKey);
    if(from<0||targetOriginal<0)return;
    const moved=config.order.splice(from,1)[0];
    let target=config.order.indexOf(toKey);
    if(after)target+=1;
    config.order.splice(Math.max(0,target),0,moved);
    renderOrderList();
    sendPreview();
    setStatus((labels[fromKey]||fromKey)+" movido diretamente na prévia. Salve para publicar.","ok");
  }

  async function saveAllPage(){
    const btn=$("#saveAllPage");
    if(btn){btn.disabled=true;btn.textContent="SALVANDO TUDO...";}
    await saveConfig();
    const blockSave=$("#saveBlocksBtn");
    if(blockSave)blockSave.click();
    setStatus("Visual e itens enviados para salvamento.","ok");
    if(btn){btn.disabled=false;btn.textContent="SALVAR TUDO";}
  }

  function focusSection(section){
    setVisualSelection(section);
    const panel=document.querySelector('[data-editor-section="'+section+'"]');
    if(!panel) return;
    panel.open=true;
    panel.scrollIntoView({behavior:"smooth",block:"start"});
  }

  function init(){
    if(initialized) return;
    initialized=true;
    const frame=$("#sitePreview"); if(frame) frame.src=STORE_PREVIEW_URL;
    ensureFixedUndoButton();
    setVisualMode(true);

    pageView.querySelectorAll("input,textarea,select").forEach(input=>{
      if(input.id==="presetSelect"||input.type==="file")return;
      input.addEventListener(input.type==="checkbox"||input.tagName==="SELECT"?"change":"input",()=>{
        syncOutputs();sendPreview();
      });
    });

    $("#saveSiteConfig")?.addEventListener("click",saveConfig);
    $("#saveAllPage")?.addEventListener("click",saveAllPage);
    $("#saveAllPageQuick")?.addEventListener("click",saveAllPage);
    $("#toggleAdvancedEditor")?.addEventListener("click",()=>{
      const shell=document.querySelector(".page-editor-shell");
      setVisualMode(!shell?.classList.contains("visual-only"));
    });
    $("#reloadSiteConfig")?.addEventListener("click",loadConfig);
    $("#resetSiteConfig")?.addEventListener("click",()=>{
      if(!confirm("Restaurar o visual padrão da LOBI na prévia?"))return;
      config=JSON.parse(JSON.stringify(defaults));fillForm();setStatus("Padrão restaurado na prévia. Salve para publicar.");
    });
    $("#applyPreset")?.addEventListener("click",()=>applyPreset(val("#presetSelect")));
    $("#quickApplyPreset")?.addEventListener("click",()=>applyPreset(val("#quickPresetSelect")));
    $("#presetSelect")?.addEventListener("change",()=>setVal("#quickPresetSelect",val("#presetSelect")));
    $("#quickPresetSelect")?.addEventListener("change",()=>setVal("#presetSelect",val("#quickPresetSelect")));
    $("#heroImageFile")?.addEventListener("change",e=>uploadEditorImage(e.target.files[0],"#heroImageUrl"));
    $("#promoImageFile")?.addEventListener("change",e=>uploadEditorImage(e.target.files[0],"#promoImageUrl"));

    document.addEventListener("keydown",e=>{
      if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"&&!pageView.classList.contains("hidden")){
        e.preventDefault();
        saveAllPage();
      }
    });

    document.querySelectorAll(".preview-device").forEach(btn=>btn.addEventListener("click",()=>{
      document.querySelectorAll(".preview-device").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      const wrap=$("#previewFrameWrap"); wrap.className="preview-frame-wrap"+(btn.dataset.device==="desktop"?"":" "+btn.dataset.device);
    }));

    window.addEventListener("message",e=>{
      if(e.data?.type==="lobi-editor-select") focusSection(e.data.section);
      if(e.data?.type==="lobi-editor-open-advanced"){setVisualMode(false);focusSection(e.data.section);}
      if(e.data?.type==="lobi-editor-focus-field") focusEditorField(e.data.section,e.data.field);
      if(e.data?.type==="lobi-editor-inline-change") applyInlineChange(e.data.section,e.data.field,e.data.value??"");
      if(e.data?.type==="lobi-editor-reorder-fixed") reorderFixedFromPreview(e.data.from,e.data.to,!!e.data.after);
      if(e.data?.type==="lobi-editor-move-fixed") moveFixedRelative(e.data.section,e.data.dir);
      if(e.data?.type==="lobi-editor-quick-image"){
        if(e.data.section==="hero")$("#heroImageFile")?.click();
        if(e.data.section==="promo")$("#promoImageFile")?.click();
      }
      if(e.data?.type==="lobi-preview-ready") sendPreview();
      if(e.data?.type==="lobi-editor-context-delete-fixed") confirmDeleteFixedSection(e.data.section);
    });

    loadConfig();
  }

  document.getElementById("pageNavButton")?.addEventListener("click",()=>setTimeout(init,0));
  if(!pageView.classList.contains("hidden")) init();
})();
