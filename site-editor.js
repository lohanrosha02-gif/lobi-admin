
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
      whatsapp: "",
      copyright: "© 2026 LOBI LIFESTYLE"
    },
    order: ["hero","promo","marquee","products","manifesto"]
  };

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
    }
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
    if(button){button.disabled=false;button.textContent="SALVAR ALTERAÇÕES";}
  }

  function applyPreset(name){
    if(!presets[name]) return;
    const keepImages={hero:config.hero.imageUrl,promo:config.promo.imageUrl};
    config=JSON.parse(JSON.stringify(presets[name]));
    config.hero.imageUrl=keepImages.hero||config.hero.imageUrl;
    config.promo.imageUrl=keepImages.promo||config.promo.imageUrl;
    fillForm();
    setStatus("Tema aplicado na prévia. Clique em salvar para publicar.");
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
      item.className="section-order-item";
      item.draggable=true;
      item.dataset.key=key;
      item.innerHTML='<span class="drag-handle">⋮⋮</span><span class="order-label">'+labels[key]+'</span><button class="order-move" type="button" data-dir="-1">↑</button><button class="order-move" type="button" data-dir="1">↓</button>';
      item.addEventListener("dragstart",()=>item.classList.add("dragging"));
      item.addEventListener("dragend",()=>item.classList.remove("dragging"));
      item.addEventListener("dragover",e=>e.preventDefault());
      item.addEventListener("contextmenu",e=>{e.preventDefault();confirmDeleteFixedSection(key);});
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

  function focusSection(section){
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

    pageView.querySelectorAll("input,textarea,select").forEach(input=>{
      if(input.id==="presetSelect"||input.type==="file")return;
      input.addEventListener(input.type==="checkbox"||input.tagName==="SELECT"?"change":"input",()=>{
        syncOutputs();sendPreview();
      });
    });

    $("#saveSiteConfig")?.addEventListener("click",saveConfig);
    $("#reloadSiteConfig")?.addEventListener("click",loadConfig);
    $("#resetSiteConfig")?.addEventListener("click",()=>{
      if(!confirm("Restaurar o visual padrão da LOBI na prévia?"))return;
      config=JSON.parse(JSON.stringify(defaults));fillForm();setStatus("Padrão restaurado na prévia. Salve para publicar.");
    });
    $("#applyPreset")?.addEventListener("click",()=>applyPreset(val("#presetSelect")));
    $("#heroImageFile")?.addEventListener("change",e=>uploadEditorImage(e.target.files[0],"#heroImageUrl"));
    $("#promoImageFile")?.addEventListener("change",e=>uploadEditorImage(e.target.files[0],"#promoImageUrl"));

    document.querySelectorAll(".preview-device").forEach(btn=>btn.addEventListener("click",()=>{
      document.querySelectorAll(".preview-device").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      const wrap=$("#previewFrameWrap"); wrap.className="preview-frame-wrap"+(btn.dataset.device==="desktop"?"":" "+btn.dataset.device);
    }));

    window.addEventListener("message",e=>{
      if(e.data?.type==="lobi-editor-select") focusSection(e.data.section);
      if(e.data?.type==="lobi-preview-ready") sendPreview();
      if(e.data?.type==="lobi-editor-context-delete-fixed") confirmDeleteFixedSection(e.data.section);
    });

    loadConfig();
  }

  document.getElementById("pageNavButton")?.addEventListener("click",()=>setTimeout(init,0));
  if(!pageView.classList.contains("hidden")) init();
})();
