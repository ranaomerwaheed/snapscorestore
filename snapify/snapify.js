// ==UserScript==
// @name         Snapify Tool by SnapScoresStore
// @author       FreeSnapScores
// @namespace    https://snapscores.store/
// @version      2.2.0
// @description  Automatic adaptive shutter finder + trusted prime + auto replay for new Snapchat Web DOM
// @match        https://web.snapchat.com/*
// @match        https://www.snapchat.com/web*
// @grant        none
// @icon         https://freesnapscores.com/assets/logo.svg
// @updateURL    https://snapscores.store/snapify/snapify.js
// @downloadURL  https://snapscores.store/snapify/snapify.js
// ==/UserScript==
(()=>{

  if(window.__SNAPIFY_ADAPT__) return; window.__SNAPIFY_ADAPT__=true;

  /* ------------------------------------------------------------------ CONFIG */
  const DEBUG = true;
  const AUTO_INTERVAL_MS = 2500;
  const FAST_RESCAN_MS = 500;
  const POINTER_MOVE_JIGGLE = 2;
  const VIDEO_MODE = false;          // set true to long-press for video
  const VIDEO_HOLD_MS = 4200;
  const POST_RELEASE_MS = 1000;
  const TRUST_WINDOW_MS = 6500;
  const MUTATION_WINDOW_MS = 900;
  // When a needed UI element (like the ❤️ shortcut) is missing, wait this long before pausing.
  const WAIT_ON_MISSING_MS = 1000;
  // --- NEW simple camera nav + heart button send ---
  const CAMERA_NAV_SELECTORS = [
    'nav a[href="/camera"]',
    'button[aria-label*="Camera"]',
    'a[aria-label*="Camera"]'
  ];
  const SEND_TO_XPATHS = [
    "/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div[2]/div[2]/button[2]"
  ];
  const FINAL_SEND_XPATH = "/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div[1]/div/form/div[2]/button";
  const POST_CAPTURE_WAIT_MS = 2000;
  const AFTER_SEND_COOLDOWN_MS = 300;

  /* ------------------------------------------------------------- LOG HELPERS */
  const log=(...a)=>DEBUG&&console.log('[SnapifyAdaptive]',...a);
  const warn=(...a)=>console.warn('[SnapifyAdaptive]',...a);
  const err=(...a)=>console.error('[SnapifyAdaptive]',...a);

  /* -------------------------------------------------------------- UI PANEL */
  let ui, stEl, cycEl; // removed lastEl, trustEl
  function buildUI(){
    ui=document.createElement('div');
    Object.assign(ui.style,{
      position:'fixed',bottom:'10px',right:'10px',zIndex:10000,
      background:'rgba(0,0,0,.8)',color:'#fff',font:'11px/1.4 monospace',
      padding:'10px 12px',borderRadius:'8px',width:'270px'
    });
    ui.innerHTML=`
      <b>Snapify Tool - FreeSnapScores</b>
      <div>Status: <span id="sa-status">Idle</span></div>
      <div>Cycle: <span id="sa-cycle">0</span></div>
      <div style="display:flex;gap:6px;margin:6px 0;">
        <button id="sa-auto"  style="flex:1;">Auto</button>
        <button id="sa-stop"  style="flex:1;" disabled>Stop</button>
      </div>
      <div style="opacity:.6">Hotkey: Ctrl+Alt+S (Auto/Stop)</div>
    `;
    document.body.appendChild(ui);
    stEl=ui.querySelector('#sa-status');
    cycEl=ui.querySelector('#sa-cycle');
    ui.querySelector('#sa-auto').onclick=()=>trustedWrap(()=>startAuto());
    ui.querySelector('#sa-stop').onclick=()=>stopAuto();
  }
  function setStatus(t){ stEl.textContent=t; }
  function setCycle(n){ cycEl.textContent=n; }
  // remove UI-updaters for Trust/Last/Sent — keep no-ops so callers remain safe
  function setLast(t){} 
  function setTrust(t){} 
  function setSent(){}

  /* ------------------------------------------------------------- TRUST STATE */
  let lastTrusted=0;
  function trustedWrap(fn){ lastTrusted=performance.now(); setTrust('Recent'); fn(); }
  function trustExpired(){ return performance.now()-lastTrusted>TRUST_WINDOW_MS; }

  /* ------------------------------------------------------- SHUTTER FINDING */
  function exactButton(){
    return document.querySelector('.BN1L1 .Jq_5_ > button.qJKfS');
  }
  function structuralFallback(){
    const c=document.querySelector('.BN1L1 .Jq_5_');
    if(!c) return null;
    const btn=[...c.querySelectorAll('button')].find(b=>b.querySelector('svg circle')||b.querySelectorAll('svg').length>=2);
    return btn||null;
  }
  function geometricHeuristic(){
    const zone=document.querySelector('.BN1L1')||document.querySelector('.VknXc')||document;
    let best=null, bestScore=0;
    zone.querySelectorAll('button').forEach(b=>{
      if(!b.isConnected) return;
      const r=b.getBoundingClientRect();
      if(r.width<40||r.height<40) return;
      const roundPenalty=Math.abs(r.width-r.height);
      const score=r.width*r.height - roundPenalty*20;
      if(score>bestScore) { best=b; bestScore=score; }
    });
    return best;
  }
  function findShutter(){
    return exactButton()||structuralFallback()||geometricHeuristic();
  }

  /* ------------------------------------------------------- CAMERA STATE */
  function isIdleCamera(){
    // presence of helper text paragraph
    return !!document.querySelector('.mrKEm');
  }
  function previewModeLikely(){
    // absence of idle text + maybe a send panel (not in DOM sample; heuristic only)
    return !isIdleCamera() && !!document.querySelector('form button[type=submit], [data-test="send-button"]');
  }

  /* ----------------------------------------------------- EVENT SIMULATION */
  function pointerSequence(btn, holdMs=0, label='pointer'){
    if(!btn) return false;
    try{
      const r=btn.getBoundingClientRect();
      const cx=r.left+r.width/2;
      const cy=r.top+r.height/2;
      const jig=(d=0)=>({clientX:cx+(Math.random()-0.5)*POINTER_MOVE_JIGGLE,clientY:cy+(Math.random()-0.5)*POINTER_MOVE_JIGGLE});
      const mkPtr=(t,o={})=>new PointerEvent(t,{bubbles:true,cancelable:true,button:0,pointerType:'mouse',...jig(),...o});
      const mkM  =(t,o={})=>new MouseEvent(t,{bubbles:true,cancelable:true,button:0,...jig(),...o});
      btn.dispatchEvent(mkPtr('pointerover'));
      btn.dispatchEvent(mkPtr('pointerenter'));
      btn.dispatchEvent(mkM('mouseover'));
      btn.dispatchEvent(mkM('mouseenter'));
      btn.dispatchEvent(mkPtr('pointerdown'));
      btn.dispatchEvent(mkM('mousedown'));
      if(holdMs>0){
        setTimeout(()=>{
          btn.dispatchEvent(mkPtr('pointerup'));
          btn.dispatchEvent(mkM('mouseup'));
          btn.dispatchEvent(mkM('click'));
        }, holdMs);
      } else {
        btn.dispatchEvent(mkPtr('pointerup'));
        btn.dispatchEvent(mkM('mouseup'));
        btn.dispatchEvent(mkM('click'));
      }
      setLast(label+(holdMs?`(${holdMs}ms)`:''));
      return true;
    }catch(e){ err('pointerSequence',e); try{ btn.click(); }catch{} return false; }
  }
  function nativeClick(btn){
    try{ btn.click(); setLast('native'); return true; }catch(e){ return false; }
  }
  function spaceKey(btn){
    try{ btn.focus(); }catch{}
    document.dispatchEvent(new KeyboardEvent('keydown',{key:' ',code:'Space',bubbles:true}));
    document.dispatchEvent(new KeyboardEvent('keyup',{key:' ',code:'Space',bubbles:true}));
    setLast('space');
  }

  /* ----------------------------------------------------- MUTATION WATCH */
  function mutateWindow(ms=MUTATION_WINDOW_MS){
    return new Promise(res=>{
      let changed=false;
      const target=document.querySelector('.BN1L1')||document.body;
      if(!target) return res(false);
      const mo=new MutationObserver(()=>{ changed=true; });
      mo.observe(target,{subtree:true,childList:true,attributes:true,characterData:true});
      setTimeout(()=>{ mo.disconnect(); res(changed); }, ms);
    });
  }

  /* -------------------------------------------------- CAPTURE ATTEMPT */
  async function attempt(trusted, modeLabel){
    const btn=findShutter();
    if(!btn){
      setLast('no-btn');
      return {ok:false, reason:'no-button'};
    }
    const strategies = [];

    if(trusted){
      strategies.push({name:'native', fn:()=>nativeClick(btn)});
    }
    strategies.push(
      {name:'pointer-short', fn:()=>pointerSequence(btn,0,'ptr')},
      {name:'pointer-jiggle', fn:()=>{ pointerSequence(btn,0,'ptr-jig'); setTimeout(()=>pointerSequence(btn,0,'ptr-jig2'),90); return true; }},
      {name:'space+pointer', fn:()=>{ spaceKey(btn); pointerSequence(btn,0,'space+ptr'); return true; }},
    );

    if(VIDEO_MODE){
      strategies.unshift({name:'video-hold', fn:()=>pointerSequence(btn, VIDEO_HOLD_MS,'video')});
    }

    for(const strat of strategies){
      const watch=mutateWindow();
      strat.fn();
      const totalWait = VIDEO_MODE && strat.name==='video-hold'
        ? VIDEO_HOLD_MS + POST_RELEASE_MS
        : POST_RELEASE_MS;
      await sleep(totalWait);
      const mutated=await watch;
      if(mutated || !findShutter() || previewModeLikely()){
        setStatus('Capture heuristic success');
        return {ok:true, reason:strat.name};
      }
    }
    return {ok:false, reason:'all-failed'};
  }

  /* -------------------------------------------------- PRIME (single) */
  async function primeCapture(){
    // ensure camera first
    if(!await openCamera()){ setStatus('Prime abort (no camera)'); return; }
    setStatus('Prime capture...');
    const r=await attempt(true,'prime');
    if(!r.ok){
      setStatus('Prime failed ('+r.reason+')');
      if(trustExpired()) setTrust('Needed');
    } else {
      setStatus('Captured');
      await runSendPipeline();
    }
  }

  /* -------------------------------------------------- AUTO LOOP */
  let running=false, cycle=0, timer=null;
  // Back-button selectors used to recover to camera from other screens
  const RECOVER_BACK1_SEL = 'button.xHw7V.T0LP0.STlkX';
  const RECOVER_BACK2_SEL = 'button.tTyKn.DjPBk.eKaL7.Bnaur';

  // Try clicking back buttons to get back to camera. Returns true if camera found.
  async function tryRecoverFromNotCamera(){
    setStatus('Attempting to recover');
    // try first back button
    const tryClick = async (sel, waitMs=800)=>{
      const el = document.querySelector(sel);
      if(!el || !visible(el)) return false;
      try{ el.click(); }catch(e){ try{ el.dispatchEvent(new MouseEvent('click',{bubbles:true})); }catch{} }
      // wait shortly for camera to appear
      const start = performance.now();
      while(performance.now()-start < waitMs){
        if(findShutter()) return true;
        await sleep(120);
      }
      return false;
    };

    if(await tryClick(RECOVER_BACK1_SEL, 900)) return true;
    if(await tryClick(RECOVER_BACK2_SEL, 900)) return true;
    return false;
  }

  // Pause automation and update UI (leave script idle/stuck as requested)
  function pauseAutomation(reason){
    running = false;
    clearTimeout(timer);
    try{
      ui.querySelector('#sa-auto').disabled = false;
      ui.querySelector('#sa-stop').disabled = true;
    }catch{}
    setStatus(reason || 'Paused');
    log('Automation paused:', reason);
  }
  async function autoStep(firstTrusted){
    if(!running) return;
    // ensure camera each cycle
    if(!await openCamera()){
      // If camera missing, attempt recovery by clicking back buttons.
      setStatus('Waiting for camera');
      const recovered = await tryRecoverFromNotCamera();
      if(!recovered){
        // couldn't recover — schedule next try normally
        scheduleNext(false);
        return;
      }
      // recovered, continue normal processing
    }
    cycle++; setCycle(cycle);
    const trusted = firstTrusted || !trustExpired();
    setStatus(trusted?'Auto(trusted)':'Auto');
    const res=await attempt(trusted,'auto');
    if(res.ok){
      await runSendPipeline(); // Let the pipeline complete and show its own status messages
    } else if(trustExpired()){
      setTrust('Needed');
    }
    scheduleNext();
  }
  function scheduleNext(fast=false){
    if(!running) return;
    const hasBtn=!!findShutter();
    const delay=fast ? FAST_RESCAN_MS : (hasBtn ? AUTO_INTERVAL_MS : FAST_RESCAN_MS);
    timer=setTimeout(()=>autoStep(false), delay);
  }
  function startAuto(){
    if(running) return;
    running=true; cycle=0; setCycle(0);
    ui.querySelector('#sa-auto').disabled=true;
    ui.querySelector('#sa-stop').disabled=false;
    setStatus('Starting auto');
    autoStep(true);
  }
  function stopAuto(){
    running=false;
    clearTimeout(timer);
    ui.querySelector('#sa-auto').disabled=false;
    ui.querySelector('#sa-stop').disabled=true;
    setStatus('Stopped');
  }

  /* -------------------------------------------------- HOTKEYS */
  window.addEventListener('keydown',e=>{
    if(!e.ctrlKey || !e.altKey) return;
    const k=e.key.toLowerCase();
    if(k==='s') trustedWrap(()=> running?stopAuto():startAuto());
  });

  /* -------------------------------------------------- UTIL */
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));

  /* -------------------------------------------------- INIT */
  buildUI();
  setStatus('Idle');
  setTrust('Needed');
  setSent();
  log('Initialized Adaptive v5.0.0');

  // Expose minimal debug
  window.SNAPIFY_FIND_SHUTTER = findShutter;
  window.SNAPIFY_PRIME = ()=>trustedWrap(()=>primeCapture());
  window.SNAPIFY_AUTO_START = ()=>trustedWrap(()=>startAuto());
  window.SNAPIFY_AUTO_STOP = ()=>stopAuto();

  // --- NEW helpers for send flow ---
  const $xFirst = (xp)=>{ try { return document.evaluate(xp,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; } catch { return null; } };
  const visible = el => !!(el && el.offsetParent && el.offsetWidth>0 && el.offsetHeight>0);

  function findSendToButton(){
    for(const xp of SEND_TO_XPATHS){
      const el=$xFirst(xp);
      if(visible(el)) return el;
    }
    // text fallback
    return [...document.querySelectorAll('button')].find(b=>{
      if(!visible(b)) return false;
      const t=(b.textContent||'').trim().toLowerCase();
      return t==='send to' || t==='sendto' || t==='send-to';
    }) || null;
  }

  async function waitForSendTo(timeout=POST_CAPTURE_WAIT_MS){
    const start=performance.now();
    while(performance.now()-start<timeout){
      const btn=findSendToButton();
      if(btn) return btn;
      await sleep(120);
    }
    return null;
  }

  // Helper: find heart button
  function findHeartButton(){
    // Only select button with textContent exactly "❤️"
    return [...document.querySelectorAll('button.c47Sk')]
      .find(b => (b.textContent || '').trim() === '❤️');
  }

  // Helper: find Select button after heart is clicked
  function findSelectButton(){
    return [...document.querySelectorAll('button')].find(b=>{
      const t=(b.textContent||'').trim().toLowerCase();
      return t==='select' || t==='select all';
    }) || null;
  }

  // Helper: wait for final send button after selections
  async function waitForFinalSend(timeout=4000){
    const start=performance.now();
    while(performance.now()-start<timeout){
      const btn = $xFirst(FINAL_SEND_XPATH)
        || [...document.querySelectorAll('button')].find(b=>{
            const t=b.textContent?.trim().toLowerCase();
            return t==='send' || t==='send snap' || t==='send to';
          });
      if(btn && visible(btn)) return btn;
      await sleep(150);
    }
    return null;
  }

  // Updated send pipeline using heart button shortcut
  async function runSendPipeline(){
    setStatus('Waiting Send-To');
    const sendToBtn = await waitForSendTo();
    if(!sendToBtn){ setStatus('Send-To not found'); return false; }
    try{ sendToBtn.click(); }catch(e){ err('Send-To click failed', e); return false; }

    setStatus('Looking for heart button');
    // Wait up to WAIT_ON_MISSING_MS for the heart button to appear. If still missing, pause and do not continue.
    const start = performance.now();
    let heartBtn = findHeartButton();
    while(!heartBtn && performance.now() - start < WAIT_ON_MISSING_MS){
      await sleep(150);
      heartBtn = findHeartButton();
    }
    if(!heartBtn){
      setStatus('Paused - heart missing');
      pauseAutomation('Heart button not found');
      return false;
    }

    try{
      heartBtn.click();
      setStatus('Heart clicked');
      await sleep(300);
    }catch(e){
      err('Heart button click failed', e);
      return false;
    }

    setStatus('Looking for Select button');
    await sleep(300);

    const selectBtn = findSelectButton();
    if(!selectBtn){ setStatus('Select button not found'); return false; }

    try{
      selectBtn.click();
      setStatus('Select clicked');
      await sleep(300);
    }catch(e){
      err('Select button click failed', e);
      return false;
    }

    setStatus('Waiting final send');
    const finalBtn = await waitForFinalSend(6000);
    if(!finalBtn){
      setStatus('Final Send not found');
      warn('Final send button not detected after selections');
      return false;
    }

    try{
      finalBtn.click();
      sentCount++;
      setSent();
      setStatus('Sent!');
    }catch(e){
      err('Final Send click failed', e);
      return false;
    }

    await sleep(AFTER_SEND_COOLDOWN_MS);
    return true;
  }

  // NEW: camera opening + shutter wait
  async function waitForShutter(timeout=4000){
    const start=performance.now();
    while(performance.now()-start<timeout){
      if(findShutter()) return true;
      await sleep(120);
    }
    return false;
  }
  async function openCamera(){
    if(findShutter()) return true;
    setStatus('Opening camera');
    for(const sel of CAMERA_NAV_SELECTORS){
      const el=document.querySelector(sel);
      if(visible(el)){
        try{ el.click(); }catch{}
        if(await waitForShutter(3500)){ setStatus('Camera ready'); return true; }
      }
    }
    setStatus('Camera not found');
    return false;
  }

})();
