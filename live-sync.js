/* LOBI Admin | Receber mudanças do catálogo enquanto o painel está aberto.
   Não substitui rascunhos em edição nem pula permissões do Supabase. */
(function(){
  "use strict";
  const sb=window.lobiSupabase;
  if(!sb||!sb.channel)return;
  let timer=null;
  const get=id=>document.getElementById(id);
  const visible=id=>{const e=get(id);return e&&!e.classList.contains("hidden")};
  const refresh=()=>{
    timer=null;
    if(document.hidden||!visible("adminApp"))return;
    const modalOpen=visible("productModal")||visible("deleteModal");
    if(modalOpen)return; // não mexer em formulário aberto
    if(typeof loadProducts==="function")loadProducts().catch(console.warn);
  };
  const schedule=()=>{
    if(timer!==null)clearTimeout(timer);
    timer=setTimeout(refresh,700);
  };
  sb.channel("lobi-admin-live-catalog")
    .on("postgres_changes",{event:"*",schema:"public",table:"products"},payload=>{
      const type=payload.new?.category||payload.old?.category;
      if(type==="__site_config__"||type==="__site_blocks__"){
        // Não descartar modificações ainda não salvas no editor.
        if(visible("pageView")){
          const status=get("editorStatus");
          if(status)status.textContent="A página foi alterada em outro dispositivo. Clique em RECARREGAR para consultar a versão publicada sem perder este rascunho.";
        }
        return;
      }
      schedule();
    })
    .subscribe(status=>{
      if(status==="CHANNEL_ERROR")console.warn("LOBI Admin: tempo real indisponível; verificação periódica continua.");
    });
  document.addEventListener("visibilitychange",()=>{if(!document.hidden)schedule();});
  setInterval(()=>{if(!document.hidden)schedule();},120000);
})();
