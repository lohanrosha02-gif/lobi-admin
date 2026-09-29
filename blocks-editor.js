(() => {
  const sb = window.lobiSupabase;
  const CATEGORY = "__site_blocks__";
  const NAME = "__LOBI_SITE_BLOCKS__";
  const $ = (s, root=document) => root.querySelector(s);
  const pageView = $("#pageView");
  if (!sb || !pageView) return;

  let blocks = [];
  let rowId = null;
  let started = false;
  let lastDeleted = null;
  let undoTimer = null;

  const typeNames = {banner:"Banner",text:"Texto",image:"Imagem",cta:"Chamada + botão",spacer:"Espaço",divider:"Linha divisória"};
  const placeNames = {afterHero:"Depois da capa",beforeProducts:"Antes dos produtos",afterProducts:"Depois dos produtos",beforeManifesto:"Antes do Sobre",afterManifesto:"Depois do Sobre"};

  function typeIconSvg(type){
    const icons={
      banner:'<rect x="10" y="18" width="80" height="64" rx="8"/><path d="M10 63 34 42l18 16 12-10 26 22"/><circle cx="70" cy="36" r="7"/>',
      text:'<path d="M18 22h64M50 22v58M32 80h36"/><path d="M29 22 20 39M71 22l9 17"/>',
      image:'<rect x="14" y="14" width="72" height="72" rx="8"/><circle cx="64" cy="36" r="8"/><path d="m18 72 22-22 15 14 10-10 17 18"/>',
      cta:'<rect x="12" y="18" width="76" height="64" rx="8"/><path d="M25 35h50M25 47h34"/><rect x="25" y="58" width="34" height="12" rx="3"/><path d="m65 64 8 0m-4-4 4 4-4 4"/>',
      spacer:'<path d="M18 20h64M18 80h64M50 29v42"/><path d="m43 36 7-7 7 7M43 64l7 7 7-7"/>',
      divider:'<path d="M12 50h76"/><path d="m20 43-8 7 8 7M80 43l8 7-8 7"/>'
    };
    return '<svg viewBox="0 0 100 100" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">'+(icons[type]||icons.text)+'</svg>';
  }

  function id(){ return crypto.randomUUID ? crypto.randomUUID() : "b"+Date.now()+Math.random().toString(16).slice(2); }
  function esc(v){ return String(v == null ? "" : v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll('"',"&quot;"); }
  function status(msg,type=""){ const el=$("#blocksStatus"); if(!el)return; el.textContent=msg; el.className="blocks-status "+type; }

  function addStyles(){
    if($("#blocksEditorStyles")) return;
    const st=document.createElement("style");
    st.id="blocksEditorStyles";
    st.textContent =
      ".blocks-panel{border:1px solid var(--line,var(--border));border-radius:11px;background:#0b0b0c;margin-bottom:8px;overflow:hidden}" +
      ".blocks-panel>summary{cursor:pointer;padding:14px 15px;color:#ddd;font-size:10px;font-weight:800;letter-spacing:.13em;text-transform:uppercase;list-style:none}" +
      ".blocks-panel[open]>summary{color:var(--green);border-bottom:1px solid var(--border)}" +
      ".blocks-body{padding:15px;display:grid;gap:12px}.blocks-toolbar{display:flex;gap:8px;flex-wrap:wrap}" +
      ".blocks-status{min-height:15px;color:#777;font-size:9px}.blocks-status.ok{color:var(--green)}.blocks-status.error{color:#ff7770}" +
      ".undo-delete{display:none;width:100%;border:1px solid rgba(183,255,0,.35);background:rgba(183,255,0,.08);color:var(--green);padding:10px 12px;font-size:9px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.undo-delete.show{display:block}" +
      ".delete-confirm-copy{color:#aaa;font-size:11px;line-height:1.7;margin:4px 0 6px}.delete-confirm-name{color:#fff;font-weight:800}.delete-confirm-note{color:#777;font-size:9px;line-height:1.5}" +
      ".blocks-list{display:grid;gap:8px}.block-row{display:grid;grid-template-columns:22px 30px 1fr auto;gap:9px;align-items:center;padding:10px;border:1px solid var(--border);background:#0d0d0d}" +
      ".block-row{border-radius:9px;transition:.15s ease}.block-row:hover{border-color:rgba(183,255,0,.22);background:#101012}.block-row.dragging{opacity:.45}.block-row.off{opacity:.5}.drag-block{color:var(--green);font-size:18px;cursor:grab}.block-name{font-size:10px;font-weight:800;text-transform:uppercase}.block-sub{margin-top:3px;color:#666;font-size:8px}" +
      ".block-actions{display:flex;gap:5px;flex-wrap:wrap;justify-content:flex-end}.block-mini{border:1px solid var(--border);background:transparent;color:#aaa;padding:7px 8px;font-size:8px;font-weight:800;text-transform:uppercase}.block-mini:hover{color:#fff}.block-mini.del:hover{color:#ff7770;border-color:rgba(239,43,32,.5)}" +
      ".blocks-modal-bg{position:fixed;inset:0;z-index:500;display:grid;place-items:center;padding:20px;background:rgba(0,0,0,.88);backdrop-filter:blur(8px)}" +
      ".blocks-modal{width:min(720px,100%);max-height:92vh;overflow:auto;padding:0;background:linear-gradient(180deg,#101012,#09090a);border:1px solid var(--border);border-radius:16px;box-shadow:var(--shadow)}" +
      ".blocks-modal-head{position:sticky;top:0;z-index:3;display:flex;justify-content:space-between;gap:16px;align-items:flex-start;padding:20px 22px;margin:0 0 18px;border-bottom:1px solid var(--border);background:rgba(12,12,13,.97);backdrop-filter:blur(14px)}.blocks-modal h2{font-family:'Archivo Black',sans-serif;font-size:30px;letter-spacing:-1px}" +
      ".blocks-close{width:38px;height:38px;border:1px solid var(--border);background:transparent;color:#fff;font-size:22px}.blocks-types{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}" +
      ".blocks-type{min-height:132px;border:1px solid var(--border);border-radius:12px;background:linear-gradient(180deg,#101012,#0b0b0c);color:#ddd;padding:14px;text-align:left;transition:.18s ease}.blocks-type:hover{transform:translateY(-2px);border-color:rgba(183,255,0,.42);background:#111315}.blocks-type-icon{width:38px;height:38px;display:grid;place-items:center;margin-bottom:12px;border:1px solid rgba(183,255,0,.2);border-radius:9px;background:rgba(183,255,0,.055);color:var(--green)}.blocks-type-icon svg{width:24px;height:24px}.blocks-type strong{display:block;color:#f2f2ee;font-size:10px;text-transform:uppercase}.blocks-type .blocks-type-desc{display:block;margin-top:6px;color:#777;font-size:9px;line-height:1.45}.block-type-icon{width:30px;height:30px;display:grid;place-items:center;border:1px solid rgba(183,255,0,.18);border-radius:7px;background:rgba(183,255,0,.045);color:var(--green)}.block-type-icon svg{width:18px;height:18px}" +
      ".blocks-form{display:grid;gap:14px;padding:0 22px 22px}.blocks-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.blocks-form input,.blocks-form textarea,.blocks-form select{padding:12px 13px}.blocks-form textarea{min-height:95px}" +
      ".blocks-upload{display:grid;grid-template-columns:1fr auto;gap:8px}.blocks-upload input[type=file]{display:none}.blocks-upload label{display:flex;align-items:center;justify-content:center;border:1px dashed rgba(183,255,0,.35);color:var(--green);padding:12px;cursor:pointer}" +
      ".blocks-modal-actions{position:sticky;bottom:-22px;z-index:3;display:flex;justify-content:flex-end;gap:8px;margin:4px -22px -22px;padding:14px 22px;border-top:1px solid var(--border);background:rgba(9,9,10,.97);backdrop-filter:blur(14px)}" +
      "@media(max-width:650px){.blocks-types{grid-template-columns:1fr 1fr}.blocks-type{min-height:120px}.block-row{grid-template-columns:20px 30px 1fr}.block-actions{grid-column:3;justify-content:flex-start}.blocks-grid{grid-template-columns:1fr}.blocks-modal-bg{padding:0}.blocks-modal{width:100%;height:100%;max-height:100vh;border:0}}";
    document.head.appendChild(st);
  }

  function injectUI(){
    if($("#customBlocksPanel")) return;
    const panel=document.createElement("details");
    panel.id="customBlocksPanel";
    panel.className="blocks-panel";
    panel.open=true;
    panel.setAttribute("data-editor-section","blocks");
    panel.innerHTML =
      "<summary>Adicionar itens</summary>" +
      "<div class='blocks-body'>" +
        "<p class='editor-help'>Crie novos banners, textos, imagens e outros blocos. Arraste para reorganizar os itens adicionados.</p>" +
        "<div class='blocks-toolbar'><button class='btn btn-primary' id='addBlockBtn' type='button'>+ ADICIONAR ITEM</button><button class='btn btn-ghost' id='saveBlocksBtn' type='button'>SALVAR ITENS</button></div>" +
        "<div id='blocksStatus' class='blocks-status'></div>" +
        "<button id='undoDeleteBtn' class='undo-delete' type='button'>↶ DESFAZER ÚLTIMA EXCLUSÃO</button>" +
        "<div id='blocksList' class='blocks-list'></div>" +
      "</div>";
    const orderPanel = pageView.querySelector('[data-editor-section="order"]');
    const controls = pageView.querySelector(".editor-controls");
    if(orderPanel) controls.insertBefore(panel,orderPanel); else controls.appendChild(panel);
    $("#addBlockBtn").onclick=chooseType;
    $("#quickAddBlock")?.addEventListener("click",chooseType);
    $("#saveBlocksBtn").onclick=save;
    $("#undoDeleteBtn").onclick=undoLastDelete;
  }

  function template(type){
    const b={id:id(),type:type,name:typeNames[type],visible:true,placement:"afterHero",background:"#050505",align:"center",paddingTop:70,paddingBottom:70};
    if(type==="banner") Object.assign(b,{title:"NOVO BANNER",subtitle:"Sua chamada aqui",buttonText:"VER MAIS",buttonLink:"#produtos",imageUrl:"",height:420,imageX:50,imageY:50,overlay:45});
    if(type==="text") Object.assign(b,{eyebrow:"LOBI LIFESTYLE",title:"NOVO TÍTULO",body:"Escreva seu texto aqui.",maxWidth:820});
    if(type==="image") Object.assign(b,{imageUrl:"",alt:"",caption:"",width:100,maxWidth:1400});
    if(type==="cta") Object.assign(b,{title:"PRONTO PARA ESCOLHER SEU LOOK?",body:"Confira as peças disponíveis.",buttonText:"VER PRODUTOS",buttonLink:"#produtos"});
    if(type==="spacer") Object.assign(b,{height:120,paddingTop:0,paddingBottom:0});
    if(type==="divider") Object.assign(b,{width:80,thickness:1,color:"#2a2a2a",paddingTop:35,paddingBottom:35});
    return b;
  }

  function updateUndoUI(){
    const btn=$("#undoDeleteBtn");
    if(!btn)return;
    if(lastDeleted){
      btn.classList.add("show");
      btn.textContent="↶ DESFAZER EXCLUSÃO: "+(lastDeleted.block.name||typeNames[lastDeleted.block.type]||"ITEM");
    }else{
      btn.classList.remove("show");
      btn.textContent="↶ DESFAZER ÚLTIMA EXCLUSÃO";
    }
  }

  function clearUndo(){
    lastDeleted=null;
    clearTimeout(undoTimer);
    undoTimer=null;
    updateUndoUI();
  }

  function confirmDeleteBlock(blockId){
    const index=blocks.findIndex(x=>x.id===blockId);
    if(index<0)return;
    const b=blocks[index];
    const bg=document.createElement("div");
    bg.className="blocks-modal-bg";
    bg.innerHTML=
      "<section class='blocks-modal' style='width:min(520px,100%)'>" +
        "<div class='blocks-modal-head'><div><p class='eyebrow'>CONFIRMAR EXCLUSÃO</p><h2>EXCLUIR ITEM?</h2></div><button class='blocks-close' type='button'>×</button></div>" +
        "<p class='delete-confirm-copy'>Você está prestes a excluir <span class='delete-confirm-name'>"+esc(b.name||typeNames[b.type])+"</span>.</p>" +
        "<p class='delete-confirm-note'>A ordem dos outros blocos será mantida. Você poderá desfazer esta exclusão enquanto continuar nesta tela. Para publicar no site principal, use SALVAR ITENS.</p>" +
        "<div class='blocks-modal-actions'><button class='btn btn-ghost cancel-delete' type='button'>CANCELAR</button><button class='btn btn-danger confirm-delete' type='button'>EXCLUIR ITEM</button></div>" +
      "</section>";
    const close=()=>bg.remove();
    $(".blocks-close",bg).onclick=close;
    $(".cancel-delete",bg).onclick=close;
    bg.onclick=e=>{if(e.target===bg)close();};
    $(".confirm-delete",bg).onclick=()=>{
      const deleted=blocks.splice(index,1)[0];
      lastDeleted={block:JSON.parse(JSON.stringify(deleted)),index:index,saved:false};
      clearTimeout(undoTimer);
      undoTimer=setTimeout(()=>clearUndo(),300000);
      close();
      render();
      updateUndoUI();
      status("Item excluído. Você pode desfazer antes ou depois de salvar.","ok");
    };
    document.body.appendChild(bg);
  }

  async function undoLastDelete(){
    if(!lastDeleted)return;
    const snapshot=lastDeleted;
    const restoreAt=Math.max(0,Math.min(snapshot.index,blocks.length));
    if(blocks.some(x=>x.id===snapshot.block.id)){
      clearUndo();
      return;
    }
    blocks.splice(restoreAt,0,JSON.parse(JSON.stringify(snapshot.block)));
    const wasSaved=snapshot.saved;
    clearUndo();
    render();
    status("Exclusão desfeita. O item voltou exatamente para a posição anterior.","ok");
    if(wasSaved){
      await save();
      status("Exclusão desfeita e sincronizada novamente com o site principal.","ok");
    }
  }

  function reorderBlockFromPreview(fromId,toId,after=false){
    if(!fromId||!toId||fromId===toId)return;
    const from=blocks.findIndex(x=>x.id===fromId);
    const targetOriginal=blocks.findIndex(x=>x.id===toId);
    if(from<0||targetOriginal<0)return;
    const moved=blocks.splice(from,1)[0];
    const targetBlock=blocks.find(x=>x.id===toId);
    if(targetBlock)moved.placement=targetBlock.placement||moved.placement;
    let target=blocks.findIndex(x=>x.id===toId);
    if(after)target+=1;
    blocks.splice(Math.max(0,target),0,moved);
    render();
    status("Item movido diretamente na prévia. Salve para publicar.","ok");
  }

  function placeBlockFromPreview(blockId,placement){
    const b=blocks.find(x=>x.id===blockId);
    if(!b||!placeNames[placement])return;
    b.placement=placement;
    render();
    status("Item reposicionado diretamente na prévia. Salve para publicar.","ok");
  }

  function render(){
    const list=$("#blocksList"); if(!list)return;
    list.innerHTML="";
    if(!blocks.length){list.innerHTML="<p class='editor-help'>Nenhum item adicional ainda.</p>";updateUndoUI();sendPreview();return;}
    blocks.forEach((b,index)=>{
      const row=document.createElement("div");
      row.className="block-row"+(b.visible===false?" off":"");
      row.draggable=true;
      row.dataset.id=b.id;
      row.innerHTML =
        "<span class='drag-block'>⋮⋮</span>" +
        "<span class='block-type-icon'>"+typeIconSvg(b.type)+"</span>" +
        "<div><div class='block-name'>"+esc(b.name||typeNames[b.type])+"</div><div class='block-sub'>"+esc(typeNames[b.type])+" · "+esc(placeNames[b.placement]||b.placement)+"</div></div>" +
        "<div class='block-actions'><button class='block-mini edit'>Editar</button><button class='block-mini dup'>Duplicar</button><button class='block-mini vis'>"+(b.visible===false?"Mostrar":"Ocultar")+"</button><button class='block-mini del'>Excluir</button></div>";
      row.ondragstart=()=>row.classList.add("dragging");
      row.ondragend=()=>row.classList.remove("dragging");
      row.ondragover=e=>e.preventDefault();
      row.oncontextmenu=e=>{e.preventDefault();confirmDeleteBlock(b.id);};
      row.ondblclick=e=>{if(!e.target.closest("button"))editBlock(b.id);};
      row.ondrop=e=>{
        e.preventDefault();
        const d=list.querySelector(".dragging"); if(!d||d===row)return;
        const from=blocks.findIndex(x=>x.id===d.dataset.id),to=blocks.findIndex(x=>x.id===b.id);
        const moved=blocks.splice(from,1)[0];blocks.splice(to,0,moved);render();status("Ordem alterada. Salve para publicar.");
      };
      $(".edit",row).onclick=()=>editBlock(b.id);
      $(".dup",row).onclick=()=>{const n=JSON.parse(JSON.stringify(b));n.id=id();n.name=(b.name||typeNames[b.type])+" cópia";blocks.splice(index+1,0,n);render();status("Item duplicado. Salve para publicar.");};
      $(".vis",row).onclick=()=>{b.visible=b.visible===false?true:false;render();status("Visibilidade alterada. Salve para publicar.");};
      $(".del",row).onclick=()=>confirmDeleteBlock(b.id);
      list.appendChild(row);
    });
    updateUndoUI();
    sendPreview();
  }

  function chooseType(){
    const bg=document.createElement("div");bg.className="blocks-modal-bg";
    const desc={banner:"Imagem grande com título e botão",text:"Título e parágrafo",image:"Imagem independente",cta:"Chamada com botão",spacer:"Espaço vazio ajustável",divider:"Linha de separação"};
    bg.innerHTML="<section class='blocks-modal'><div class='blocks-modal-head'><div><p class='eyebrow'>NOVO ITEM</p><h2>O QUE ADICIONAR?</h2></div><button class='blocks-close'>×</button></div><div class='blocks-types'></div></section>";
    const grid=$(".blocks-types",bg);
    Object.keys(typeNames).forEach(type=>{
      const btn=document.createElement("button");btn.className="blocks-type";btn.type="button";
      btn.innerHTML="<span class='blocks-type-icon'>"+typeIconSvg(type)+"</span><strong>"+typeNames[type]+"</strong><span class='blocks-type-desc'>"+desc[type]+"</span>";
      btn.onclick=()=>{bg.remove();const b=template(type);blocks.push(b);render();editBlock(b.id);};
      grid.appendChild(btn);
    });
    $(".blocks-close",bg).onclick=()=>bg.remove();bg.onclick=e=>{if(e.target===bg)bg.remove();};document.body.appendChild(bg);
  }

  function field(label,idv,value,type="text",attrs=""){
    return "<label>"+label+"<input id='"+idv+"' type='"+type+"' value='"+esc(value)+"' "+attrs+"></label>";
  }
  function area(label,idv,value){return "<label>"+label+"<textarea id='"+idv+"'>"+String(value||"").replaceAll("&","&amp;").replaceAll("<","&lt;")+"</textarea></label>";}

  function editBlock(blockId){
    const b=blocks.find(x=>x.id===blockId);if(!b)return;
    const bg=document.createElement("div");bg.className="blocks-modal-bg";
    let f="";
    f+=field("Nome interno","bfName",b.name);
    f+="<label>Posição<select id='bfPlacement'>"+Object.keys(placeNames).map(k=>"<option value='"+k+"'>"+placeNames[k]+"</option>").join("")+"</select></label>";
    f+="<label class='editor-inline'><input id='bfVisible' type='checkbox' "+(b.visible===false?"":"checked")+"> Mostrar no site</label>";
    if(b.type==="banner"){
      f+=field("Título","bfTitle",b.title)+field("Subtítulo","bfSubtitle",b.subtitle);
      f+="<div class='blocks-grid'>"+field("Texto do botão","bfButtonText",b.buttonText)+field("Link","bfButtonLink",b.buttonLink)+"</div>";
      f+=field("Imagem (URL)","bfImageUrl",b.imageUrl,"url");
      f+="<div class='blocks-upload'><span class='editor-help'>Ou envie uma imagem</span><label>ENVIAR<input id='bfImageFile' type='file' accept='image/jpeg,image/png,image/webp'></label></div>";
      f+="<div class='blocks-grid'>"+field("Altura px","bfHeight",b.height,"number","min='180' max='1000'")+field("Escurecimento %","bfOverlay",b.overlay,"number","min='0' max='95'")+"</div>";
      f+="<div class='blocks-grid'>"+field("Posição X %","bfImageX",b.imageX,"number","min='0' max='100'")+field("Posição Y %","bfImageY",b.imageY,"number","min='0' max='100'")+"</div>";
    }else if(b.type==="text"){
      f+=field("Texto pequeno","bfEyebrow",b.eyebrow)+field("Título","bfTitle",b.title)+area("Texto","bfBody",b.body)+field("Largura máxima px","bfMaxWidth",b.maxWidth,"number","min='280' max='1600'");
    }else if(b.type==="image"){
      f+=field("Imagem (URL)","bfImageUrl",b.imageUrl,"url");
      f+="<div class='blocks-upload'><span class='editor-help'>Ou envie uma imagem</span><label>ENVIAR<input id='bfImageFile' type='file' accept='image/jpeg,image/png,image/webp'></label></div>";
      f+=field("Texto alternativo","bfAlt",b.alt)+field("Legenda","bfCaption",b.caption);
      f+="<div class='blocks-grid'>"+field("Largura %","bfWidth",b.width,"number","min='10' max='100'")+field("Máximo px","bfMaxWidth",b.maxWidth,"number","min='200' max='2200'")+"</div>";
    }else if(b.type==="cta"){
      f+=field("Título","bfTitle",b.title)+area("Texto","bfBody",b.body);
      f+="<div class='blocks-grid'>"+field("Texto do botão","bfButtonText",b.buttonText)+field("Link","bfButtonLink",b.buttonLink)+"</div>";
    }else if(b.type==="spacer"){
      f+=field("Altura px","bfHeight",b.height,"number","min='10' max='600'");
    }else if(b.type==="divider"){
      f+="<div class='blocks-grid'>"+field("Largura %","bfWidth",b.width,"number","min='10' max='100'")+field("Espessura px","bfThickness",b.thickness,"number","min='1' max='12'")+"</div>"+field("Cor","bfColor",b.color,"color");
    }
    if(!["spacer","divider"].includes(b.type)){
      f+="<div class='blocks-grid'>"+field("Cor de fundo","bfBackground",b.background||"#050505","color")+"<label>Alinhamento<select id='bfAlign'><option value='left'>Esquerda</option><option value='center'>Centro</option><option value='right'>Direita</option></select></label></div>";
      f+="<div class='blocks-grid'>"+field("Espaço acima","bfPadTop",b.paddingTop,"number","min='0' max='300'")+field("Espaço abaixo","bfPadBottom",b.paddingBottom,"number","min='0' max='300'")+"</div>";
    }
    bg.innerHTML="<section class='blocks-modal'><div class='blocks-modal-head'><div><p class='eyebrow'>"+typeNames[b.type]+"</p><h2>EDITAR ITEM</h2></div><button class='blocks-close'>×</button></div><div class='blocks-form'>"+f+"<div class='blocks-modal-actions'><button class='btn btn-ghost cancel'>CANCELAR</button><button class='btn btn-primary apply'>APLICAR</button></div></div></section>";
    document.body.appendChild(bg);
    $("#bfPlacement",bg).value=b.placement||"afterHero"; if($("#bfAlign",bg))$("#bfAlign",bg).value=b.align||"center";
    const close=()=>bg.remove();$(".blocks-close",bg).onclick=close;$(".cancel",bg).onclick=close;bg.onclick=e=>{if(e.target===bg)close();};
    const file=$("#bfImageFile",bg);if(file)file.onchange=e=>upload(e.target.files[0],url=>{$("#bfImageUrl",bg).value=url;});
    $(".apply",bg).onclick=()=>{
      const v=(q,d="")=>$(q,bg)?.value??d, n=(q,d=0)=>{const x=Number(v(q,d));return Number.isFinite(x)?x:d};
      b.name=v("#bfName",typeNames[b.type]).trim()||typeNames[b.type];b.placement=v("#bfPlacement","afterHero");b.visible=$("#bfVisible",bg).checked;
      if(b.type==="banner")Object.assign(b,{title:v("#bfTitle"),subtitle:v("#bfSubtitle"),buttonText:v("#bfButtonText"),buttonLink:v("#bfButtonLink"),imageUrl:v("#bfImageUrl"),height:n("#bfHeight",420),overlay:n("#bfOverlay",45),imageX:n("#bfImageX",50),imageY:n("#bfImageY",50)});
      if(b.type==="text")Object.assign(b,{eyebrow:v("#bfEyebrow"),title:v("#bfTitle"),body:v("#bfBody"),maxWidth:n("#bfMaxWidth",820)});
      if(b.type==="image")Object.assign(b,{imageUrl:v("#bfImageUrl"),alt:v("#bfAlt"),caption:v("#bfCaption"),width:n("#bfWidth",100),maxWidth:n("#bfMaxWidth",1400)});
      if(b.type==="cta")Object.assign(b,{title:v("#bfTitle"),body:v("#bfBody"),buttonText:v("#bfButtonText"),buttonLink:v("#bfButtonLink")});
      if(b.type==="spacer")b.height=n("#bfHeight",120);
      if(b.type==="divider")Object.assign(b,{width:n("#bfWidth",80),thickness:n("#bfThickness",1),color:v("#bfColor","#2a2a2a")});
      if(!["spacer","divider"].includes(b.type)){b.background=v("#bfBackground","#050505");b.align=v("#bfAlign","center");b.paddingTop=n("#bfPadTop",70);b.paddingBottom=n("#bfPadBottom",70);}
      close();render();status("Item atualizado. Salve para publicar.");
    };
  }

  async function upload(file,done){
    if(!file)return;
    if(!["image/jpeg","image/png","image/webp"].includes(file.type)){status("Use JPG, PNG ou WEBP.","error");return;}
    if(file.size>8*1024*1024){status("Imagem acima de 8 MB.","error");return;}
    status("Enviando imagem...");
    const ext={"image/jpeg":"jpg","image/png":"png","image/webp":"webp"}[file.type]||"jpg";
    const path="site-blocks/"+id()+"."+ext;
    try{
      const up=await sb.storage.from("product-images").upload(path,file,{upsert:false,contentType:file.type,cacheControl:"3600"});
      if(up.error)throw up.error;
      const pub=sb.storage.from("product-images").getPublicUrl(path);
      done(pub.data.publicUrl);status("Imagem enviada.","ok");
    }catch(e){console.error(e);status("Falha ao enviar imagem.","error");}
  }

  async function load(){
    status("Carregando itens...");
    const r=await sb.from("products").select("id,description").eq("category",CATEGORY).order("updated_at",{ascending:false}).limit(1);
    if(r.error){console.error(r.error);status("Erro ao carregar itens.","error");return;}
    if(r.data&&r.data.length){rowId=r.data[0].id;try{blocks=JSON.parse(r.data[0].description||"[]");if(!Array.isArray(blocks))blocks=[];}catch{blocks=[];}}
    else{rowId=null;blocks=[];}
    clearUndo();render();status("Itens carregados.","ok");
  }

  async function save(){
    status("Salvando itens...");
    const payload={name:NAME,price:0,category:CATEGORY,description:JSON.stringify(blocks),sizes:[],stock:0,tag:"SYSTEM",active:true,image_url:null,image_path:null,updated_at:new Date().toISOString()};
    const r=rowId ? await sb.from("products").update(payload).eq("id",rowId).select("id").single() : await sb.from("products").insert(payload).select("id").single();
    if(r.error){console.error(r.error);status(r.error.message||"Erro ao salvar.","error");return;}
    rowId=r.data.id;if(lastDeleted)lastDeleted.saved=true;status("Itens publicados no site.","ok");sendPreview();updateUndoUI();
  }

  function sendPreview(){
    const frame=$("#sitePreview");
    if(frame&&frame.contentWindow)frame.contentWindow.postMessage({type:"lobi-preview-blocks",blocks:blocks},"*");
  }

  function start(){
    if(started)return;started=true;addStyles();injectUI();load();
    if(!document.body.dataset.lobiBlockShortcuts){
      document.body.dataset.lobiBlockShortcuts="1";
      document.addEventListener("keydown",e=>{
        const modal=document.querySelector(".blocks-modal-bg");
        if(!modal)return;
        if(e.key==="Escape"){
          e.preventDefault();
          modal.querySelector(".blocks-close,.cancel,.cancel-delete")?.click();
        }
        if((e.ctrlKey||e.metaKey)&&e.key==="Enter"){
          const apply=modal.querySelector(".apply");
          if(apply){e.preventDefault();apply.click();}
        }
      });
    }
    window.addEventListener("message",e=>{if(e.data&&e.data.type==="lobi-preview-ready")setTimeout(sendPreview,120);if(e.data&&e.data.type==="lobi-editor-context-delete-block"&&e.data.id)confirmDeleteBlock(e.data.id);if(e.data&&e.data.type==="lobi-editor-select-block"&&e.data.id)editBlock(e.data.id);if(e.data&&e.data.type==="lobi-editor-reorder-block")reorderBlockFromPreview(e.data.fromId,e.data.toId,!!e.data.after);if(e.data&&e.data.type==="lobi-editor-place-block")placeBlockFromPreview(e.data.id,e.data.placement);});
  }

  document.getElementById("pageNavButton")?.addEventListener("click",()=>setTimeout(start,50));
  if(!pageView.classList.contains("hidden"))start();
})();