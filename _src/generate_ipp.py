#!/usr/bin/env python3
# Generates app/ipp-journey.dc.html : a clean CA/Bento reskin combining the
# IPP Journey (Context, Journey map, Coverage, System, Solutions) + Data source.
import re, json, os, pathlib

HERE = pathlib.Path(__file__).resolve().parent          # .../IPP Journey/_src
ROOT = HERE.parent                                       # .../IPP Journey
APP  = ROOT / "app"

src_journey = (HERE / "IPP Journey.html").read_text()
src_ds      = (HERE / "Data source.html").read_text()
DATA_JSON   = (HERE / "_DATA.json").read_text()

# ---- extract the working content sections from the journey page ----
def section(page, sid):
    m = re.search(r'(<section class="view[^"]*" id="%s">.*?</section>)' % sid, page, re.S)
    if not m: raise SystemExit("missing section "+sid)
    return m.group(1)

sec_overview  = section(src_journey, "overview")
sec_journey   = section(src_journey, "journey")
# Solutions content, renamed and moved into the System context view
sol_inner = re.search(r'<section class="view" id="solutions">(.*?)</section>', src_journey, re.S).group(1)
sol_inner = sol_inner.replace('In-Person Payments Solutions', 'In-Person Payments portfolio')

# reusable pieces pulled verbatim from the source System-context section
hub_card    = re.search(r'<div class="card prose" style="padding:18px">\s*<h3[^>]*>Hub \(Internal\)</h3>.*?</ul>\s*</div>', src_journey, re.S).group(0)
docs_card   = re.search(r'<div class="card prose" style="padding:18px">\s*<h3[^>]*>Adyen Docs \(External\)</h3>.*?</ul>\s*</div>', src_journey, re.S).group(0)
recs_block  = re.search(r'<h3>Recommendations from docs.*?</ul>', src_journey, re.S).group(0)
quote_block = re.search(r'<p class="lead" style="border-left:3px solid var\(--accent\).*?Platforms Quickstart Guide</p>', src_journey, re.S).group(0)

# ---- extract the ported content CSS (style inner minus the old :root alias) ----
style_inner = re.search(r'<style>(.*?)</style>', src_journey, re.S).group(1)
style_inner = re.sub(r':root\{.*?\}', '', style_inner, count=1, flags=re.S)  # drop old alias root

# ---- JTBD_JOURNEY array (for the journey step drawer little/micro jobs) ----
jtbd_journey_text = re.search(r'const JTBD_JOURNEY = \[.*?\n\];', src_journey, re.S).group(0)

# ---- Data source page: its whole script (self-contained JTBD tables) ----
ds_script = re.findall(r'<script>(.*?)</script>', src_ds, re.S)[-1]
# expose a render hook so we can (re)render when the hidden tab becomes visible
ds_script = ds_script.replace("render();", "render();\n  window.__renderDataSource = render;", 1)

# ---- Service Blueprint page: richer Journey map (CSS + markup + script) ----
src_bp = (HERE / "Service Blueprint.html").read_text()
bp_style = re.search(r'<style>(.*?)</style>', src_bp, re.S).group(1)
bp_style = re.sub(r':root\{.*?\}', '', bp_style, count=1, flags=re.S)   # drop old alias root
bp_style = bp_style.replace("'Inter',var(--font-body)", "var(--font-sans)").replace("'Inter'", "var(--font-sans)")
bp_script = re.findall(r'<script>(.*?)</script>', src_bp, re.S)[-1]
bp_script = bp_script.replace("'Inter',var(--font-body)", "var(--font-sans)")

# Reorganise each job card: Job -> Opportunities -> owner/size (actor demoted to a tag)
NEW_JOB_BLOCK = r'''if (!matchedIds.length) {
        html += (typeof STEP_NOTE !== 'undefined' && STEP_NOTE[si] && !oppIds.length)
          ? `<div class="bp-note">${STEP_NOTE[si]}</div>`
          : `<div class="bp-noopp">${oppIds.length ? 'No opportunities match filters' : 'No opportunities mapped to this job'}</div>`;
      } else {
        html += `<div class="bp-opps"><div class="bp-opps-h">Opportunities \u00b7 ${matchedIds.length}</div>`;
        matchedIds.forEach(oi => {
          const o = OPPS[oi];
          const sc = squadColor(o[4]);
          html += `<div class="bp-opp2" style="border-left:3px solid ${sc}">`;
          html += `<div class="bp-oname2">${o[0]}${o[6] ? '<span class="bp-chk"> \u2713</span>' : ''}</div>`;
          html += `<div class="bp-otags2"><span class="bp-team" style="color:${sc}"><span class="bp-adot" style="background:${sc}"></span>${o[4]}</span>`;
          if (o[3] && o[3] !== '\u2014') html += `<span class="bp-size2">${o[3]}</span>`;
          html += `<span class="bp-nbadge ${natureCls(o[2])}">${o[2]}</span>`;
          html += `</div>`;
          html += `<div class="bp-actor2">${o[5]}</div>`;
          html += `</div>`;
        });
        html += `</div>`;
      }'''
bp_script, _n = re.subn(r"if \(!matchedIds\.length\) \{.*?\n      \} else \{.*?\n      \}", lambda m: NEW_JOB_BLOCK, bp_script, count=1, flags=re.S)
assert _n == 1, "job-card block not patched"

# --- team / squad ownership layer (draft mapping, editable) ---
TEAM_LAYER = r'''
/* simplified: colour by parent team, not per-squad */
const SQUADS = {
  'Device Config':'#0F75DC','Device Software & Security':'#0F75DC',
  'Device Fleet Core':'#0F75DC','Device Supply & Services':'#0F75DC',
  'Hardware portfolio':'#0F75DC',
  'Core experience':'#7C3AED','Shopper experience':'#7C3AED',
  'Payment client foundations':'#7C3AED',
  'Talon One':'#8C959D','Account management':'#8C959D'
};
function squadColor(n){return SQUADS[n]||'#8C959D';}
const TEAM_BY_OPP = ['Device Software & Security','Device Software & Security','Talon One','Shopper experience','Device Fleet Core','Device Supply & Services','Device Fleet Core','Device Fleet Core','Device Config','Device Fleet Core','Core experience','Device Fleet Core','Device Supply & Services','Device Fleet Core','Payment client foundations','Device Software & Security','Device Config','Device Fleet Core','Device Config'];
OPPS.forEach(function(o,i){ if(TEAM_BY_OPP[i]) o[4]=TEAM_BY_OPP[i]; });
const PHASE_TEAMS = {
  '1 \u00b7 Exploration':['Hardware portfolio','Account management'],
  '2 \u00b7 Test & Integration':['Device Supply & Services','Core experience'],
  '3 \u00b7 Go Live & Rollout':['Device Fleet Core','Device Config','Device Software & Security','Core experience','Shopper experience'],
  '4 \u00b7 BAU & Growth':['Device Fleet Core','Core experience','Shopper experience','Talon One'],
  '5 \u00b7 Fleet Operation':['Device Fleet Core','Shopper experience','Device Supply & Services']
};
const STEP_NOTE = {
  0: 'Find the right model with the <b>Hardware portfolio</b> team, order through <b>Customer Area</b> or the <b>Adyen Hardware Portfolio Manager</b>, and agree the IPP <b>cost contract</b> with an <b>Account manager</b>.'
};
'''
bp_script = bp_script.replace("const OPP_BY_STEP =", TEAM_LAYER + "\nconst OPP_BY_STEP =", 1)

# phase header: append owning-squad tags
_ph_old = '<div class="bp-phsub">${phOppCount} opportunit${phOppCount === 1 ? \'y\' : \'ies\'} in this phase</div>'
_ph_new = _ph_old + '<div class="bp-phteams">${(PHASE_TEAMS[ph.label]||[]).map(function(t){return \'<span class="bp-phteam" style="color:\'+squadColor(t)+\'"><span class="bp-adot" style="background:\'+squadColor(t)+\'"></span>\'+t+\'</span>\';}).join(\'\')}</div>'
assert _ph_old in bp_script, "phase header anchor not found"
bp_script = bp_script.replace(_ph_old, _ph_new, 1)

# relabel filter copy: Owner -> Team, Actor -> Persona (dropdown internals)
bp_script = bp_script.replace('All owners', 'All teams').replace('All actors', 'All personas')
# the "Showing N of 19" hint element is removed from the UI; guard its (unconditional) writes
bp_script = bp_script.replace("document.getElementById('fHint').textContent", "(document.getElementById('fHint')||{}).textContent")
# sub-steps default to collapsed (clamped to 3 rows) instead of fully open
bp_script = bp_script.replace('<div class="bp-subs open" onclick', '<div class="bp-subs" onclick')
# remove the per-job "N pain points" chip — pains now live in the phase Friction & sentiment box
bp_script = re.sub(r"if \(st\.pains > 0\) meta\.push\(.*?pain points</span>`\);", "", bp_script, count=1, flags=re.S)
# remove the "already addressed" green check mark from opportunities (cards + drawers)
bp_script = bp_script.replace(r"""${o[6] ? '<span class="bp-chk"> \u2713</span>' : ''}""", "")
bp_script = bp_script.replace(r"""${op.addressed ? '<span class="bp-chk">\u2713</span>' : ''}""", "")

# --- consolidate personas (actors) per JTBD, then rebuild the (deduped) filter groups ---
_ACTOR_RENAMES = [
    ('QA Engineer / Integration Developer', 'Integration Developer / Technical Lead'),
    ('Integration Developer', 'Integration Developer / Technical Lead'),
    ('Fleet / Operations Manager', 'Fleet Manager / Operations Analyst'),
    ('IT / Technical Operations Manager', 'Fleet Manager / Operations Analyst'),
    ('Marketing / CRM Manager', 'Marketing / CRM / CX Manager'),
    ('Marketing / CX Manager', 'Marketing / CRM / CX Manager'),
]
for _old, _new in _ACTOR_RENAMES:
    bp_script = bp_script.replace('"' + _old + '"', '"' + _new + '"').replace("'" + _old + "'", "'" + _new + "'")
# rebuild the two filter groups with clean, deduped actor lists (order preserved)
bp_script = re.sub(r"\{label:'Adyen Internal', actors:\[[^\]]*\]\}",
    "{label:'Adyen Internal', actors:['Implementation / Finance Operations','Integration Developer / Technical Lead','IT Admin / Security Administrator']}",
    bp_script)
bp_script = re.sub(r"\{label:'Merchant Ops', actors:\[[^\]]*\]\}",
    "{label:'Merchant Ops', actors:['Fleet Manager / Operations Analyst','Head of Payments / Expansion Lead','Marketing / CRM / CX Manager','Operations Manager','Payments Analyst / Operations Manager','Procurement / Fleet Manager','Product / Payments Manager']}",
    bp_script)

# --- alternative layouts: swimlane blueprint (default) + ownership matrix, with the
#     existing stacked cards kept as a third option. Appended inside the IIFE. ---
SWIM_JS = r'''
/* ===== alternative journey-map layouts ===== */
function bpPhaseAgg(ph,f){
  var jobs=[],pain=0,little=0,oppIds=[];
  ph.steps.forEach(function(si){
    var st=STEPS[si]; jobs.push({si:si,big:st.big,pains:st.pains,littles:st.littles}); pain+=st.pains; little+=st.littles;
    (OPP_BY_STEP[si]||[]).forEach(function(oi){ if(oppMatches(oi,f)&&oppIds.indexOf(oi)<0) oppIds.push(oi); });
  });
  return {jobs:jobs,pain:pain,little:little,oppIds:oppIds};
}
function bpOppChip(oi){ var o=OPPS[oi], sc=squadColor(o[4]); return '<span class="bp-oppchip" style="color:'+sc+';border-color:'+sc+'55"><span class="bp-adot" style="background:'+sc+'"></span>'+o[0]+'</span>'; }
function renderSwimlane(f){
  var N=PHASES.length, cols='150px repeat('+N+',minmax(200px,1fr))';
  var aggs=PHASES.map(function(ph){return bpPhaseAgg(ph,f);});
  var INS=(typeof IPP_INSIGHTS!=='undefined'?IPP_INSIGHTS:[]);
  function sentFor(pi){ return INS.filter(function(x){return x.phases.indexOf(pi)>=0;}); }
  var total=0; aggs.forEach(function(a){total+=a.oppIds.length;});
  var fh=document.getElementById('fHint'); if(fh) fh.textContent='Showing '+total+' of 19 opportunities';
  var h='<div class="bp-swim" style="grid-template-columns:'+cols+'">';
  h+='<div class="bp-cell bp-corner"></div>';
  PHASES.forEach(function(ph,pi){ h+='<div class="bp-cell bp-ph-cell" style="cursor:pointer" onclick="openPhaseDrawer('+pi+')"><div class="bp-ph-name">'+ph.label+'</div><div class="bp-ph-sub">'+aggs[pi].oppIds.length+' opportunit'+(aggs[pi].oppIds.length===1?'y':'ies')+'</div></div>'; });
  h+='<div class="bp-cell bp-rowlabel">Merchant job</div>';
  aggs.forEach(function(a){ h+='<div class="bp-cell">'+(a.jobs.length?a.jobs.map(function(j){return '<div class="bp-job-line" onclick="openLittleJobsDrawer('+j.si+')">'+j.big+'</div>';}).join(''):'<span class="bp-empty">&mdash;</span>')+'</div>'; });
  h+='<div class="bp-cell bp-rowlabel">Friction &amp; sentiment</div>';
  PHASES.forEach(function(ph,pi){
    var a=aggs[pi], items=sentFor(pi);
    var fs=PHASES[pi].steps.filter(function(si){return STEPS[si].pains>0;})[0];
    var head=(a.pain&&fs!==undefined)?'<div class="bp-frichead bp-clk" onclick="openPainDrawer('+fs+')">\u26a0 '+a.pain+' research pain points</div>':'';
    var chips=items.length?'<div class="bp-sentwrap">'+items.map(function(x){return '<span class="bp-sent bp-sent-'+x.sev+'" onclick="openInsightDrawer('+(x.n-1)+')">'+x.short+'</span>';}).join('')+'</div>':'';
    h+='<div class="bp-cell bp-friction">'+((head||chips)?(head+chips):'<span class="bp-empty">No pain captured</span>')+'</div>';
  });
  h+='<div class="bp-cell bp-rowlabel">Opportunities</div>';
  aggs.forEach(function(a){ h+='<div class="bp-cell">'+(a.oppIds.length?a.oppIds.map(bpOppChip).join(''):'<span class="bp-empty">&mdash;</span>')+'</div>'; });
  h+='<div class="bp-cell bp-rowlabel">Owning teams</div>';
  PHASES.forEach(function(ph){ var t=PHASE_TEAMS[ph.label]||[]; h+='<div class="bp-cell">'+(t.length?t.map(function(x){var sc=squadColor(x);return '<span class="bp-team" style="color:'+sc+'"><span class="bp-adot" style="background:'+sc+'"></span>'+x+'</span>';}).join(''):'<span class="bp-empty">&mdash;</span>')+'</div>'; });
  h+='</div>';
  return h;
}
function openInsightDrawer(i){
  var x=(typeof IPP_INSIGHTS!=='undefined')?IPP_INSIGHTS[i]:null; if(!x) return;
  var d=document.getElementById('drawer'); if(!d) return;
  var col=x.sev==='crit'?'var(--gap)':(x.sev==='high'?'var(--p1)':'var(--infra)');
  var ph=x.phases.map(function(pi){return PHASES[pi].label;}).join(' &middot; ');
  d.innerHTML='<div class="dhead"><span class="dbar" style="background:'+col+'"></span>'
    +'<button class="close" onclick="closeDrawer()">\u00d7</button>'
    +'<span class="oid mono" style="color:var(--ink-faint);font-size:12px;font-weight:600">CUSTOMER SENTIMENT &middot; #'+x.n+'</span>'
    +'<h3>'+x.title+'</h3>'
    +'<div class="dmeta"><span class="sev sev-'+x.sev+'">'+x.sevlbl+'</span></div></div>'
    +'<div class="dbody">'
    +'<div class="dsec"><div class="vtxt" style="font-size:13px;color:var(--ink-soft);line-height:1.55">'+x.desc+'</div></div>'
    +'<div class="dsec"><div class="k">Evidence</div><div class="vtxt" style="font-size:12px;color:var(--ink-faint);line-height:1.5">'+x.meta+'</div></div>'
    +'<div class="dsec"><div class="k">Verbatim</div><div class="ins-q" style="font-style:italic">'+x.quote+'</div></div>'
    +'<div class="dsec"><div class="k">Where in the journey</div><div class="vtxt" style="font-size:12.5px;color:var(--ink-soft)">'+ph+'</div></div>'
    +'<div class="dsec"><div class="k">Recommendation</div><div class="whybox">'+x.rec+'</div></div>'
    +'</div>';
  d.classList.add('on'); var s=document.getElementById('scrim'); if(s) s.classList.add('on');
}
function renderMatrix(f){
  var order=Object.keys(SQUADS), used=[]; OPPS.forEach(function(o){ if(used.indexOf(o[4])<0) used.push(o[4]); });
  var squads=order.filter(function(s){return used.indexOf(s)>=0;});
  var N=PHASES.length, cols='200px repeat('+N+',minmax(150px,1fr))';
  var phaseOpps=PHASES.map(function(ph){ var ids=[]; ph.steps.forEach(function(si){ (OPP_BY_STEP[si]||[]).forEach(function(oi){ if(ids.indexOf(oi)<0) ids.push(oi); }); }); return ids; });
  var h='<div class="bp-swim" style="grid-template-columns:'+cols+'">';
  h+='<div class="bp-cell bp-corner">Team \u00d7 phase</div>';
  PHASES.forEach(function(ph){ h+='<div class="bp-cell bp-ph-cell"><div class="bp-ph-name">'+ph.label+'</div></div>'; });
  squads.forEach(function(s){ var sc=squadColor(s);
    h+='<div class="bp-cell bp-rowlabel"><span class="bp-team" style="color:'+sc+'"><span class="bp-adot" style="background:'+sc+'"></span>'+s+'</span></div>';
    phaseOpps.forEach(function(ids){ var mine=ids.filter(function(oi){return OPPS[oi][4]===s&&oppMatches(oi,f);}); h+='<div class="bp-cell'+(mine.length?' bp-cell-on':'')+'">'+(mine.length?mine.map(bpOppChip).join(''):'')+'</div>'; });
  });
  h+='</div>';
  var shown=0; phaseOpps.forEach(function(ids){ ids.forEach(function(oi){ if(oppMatches(oi,f)) shown++; }); });
  var fh=document.getElementById('fHint'); if(fh) fh.textContent='Showing '+shown+' of 19 opportunities';
  return h;
}
/* clamp each sub-steps box to 3 rows; only keep the expand toggle when it overflows */
function bpFitSubs(){
  document.querySelectorAll('#bpCanvas .bp-subs').forEach(function(box){
    var body=box.querySelector('.bp-sub-body'); if(!body) return;
    box.classList.remove('bp-subs--fit','open');
    if(body.scrollHeight <= 80){ box.classList.add('bp-subs--fit'); box.onclick=null; }
  });
}
/* Cards view: inject the combined Friction & sentiment box at the top of each phase column */
function bpInjectFriction(){
  var INS=(typeof IPP_INSIGHTS!=='undefined'?IPP_INSIGHTS:[]);
  var cols=document.querySelectorAll('#bpCanvas .bp-phase'); if(!cols.length) return;
  function sentFor(pi){ return INS.filter(function(x){return x.phases.indexOf(pi)>=0;}); }
  function sevScore(items){ return items.reduce(function(t,x){return t+(x.sev==='crit'?3:(x.sev==='high'?2:1));},0); }
  var f=getFilters();
  cols.forEach(function(col,pi){
    if(col.querySelector('.bp-fs-box')) return;
    var a=bpPhaseAgg(PHASES[pi],f), items=sentFor(pi);
    var fs=PHASES[pi].steps.filter(function(si){return STEPS[si].pains>0;})[0];
    var head=(a.pain&&fs!==undefined)?'<div class="bp-frichead bp-clk" onclick="event.stopPropagation();openPainDrawer('+fs+')">\u26a0 '+a.pain+' research pain points</div>':'';
    var chips=items.length?'<div class="bp-sentwrap">'+items.map(function(x){return '<span class="bp-sent bp-sent-'+x.sev+'" onclick="event.stopPropagation();openInsightDrawer('+(x.n-1)+')">'+x.short+'</span>';}).join('')+'</div>':'';
    var count=items.length+(a.pain?1:0);
    var box=document.createElement('div'); box.className='bp-fs-box';
    box.innerHTML='<div class="bp-fs-toggle" onclick="this.closest(\'.bp-fs-box\').classList.toggle(\'open\')"><span class="bp-fs-h">Friction &amp; sentiment</span>'
      +(count?'<span class="bp-fs-count">'+count+'</span>':'')+'<svg class="bp-fs-caret" width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></div>'
      +'<div class="bp-fs-body">'+((head||chips)?(head+chips):'<span class="bp-fs-empty">No pain captured</span>')+'</div>';
    var anchor=col.querySelector('.bp-subs')||col.querySelector('.bp-phhead');
    if(anchor && anchor.nextSibling) col.insertBefore(box, anchor.nextSibling); else col.appendChild(box);
  });
}
var bpLayout='stacked';
var renderStacked = render;
render = function(){
  var canvas=document.getElementById('bpCanvas'); if(!canvas) return;
  var wrap=document.getElementById('bpCanvasWrap'); if(wrap) wrap.classList.toggle('bp-canvas--hug', bpLayout==='stacked');
  if(bpLayout==='stacked'){ canvas.style.display='flex'; renderStacked(); bpFitSubs(); bpInjectFriction(); return; }
  canvas.style.display='block';
  canvas.innerHTML = (bpLayout==='matrix') ? renderMatrix(getFilters()) : renderSwimlane(getFilters());
};
(function(){ var tg=document.getElementById('bpLayoutToggle'); if(!tg) return; tg.addEventListener('click',function(e){ var b=e.target.closest('button'); if(!b) return; bpLayout=b.dataset.l; tg.querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x===b);}); render(); }); })();
render();
'''
bp_script += SWIM_JS
# expose inline-referenced handlers to window (script is wrapped in an IIFE)
bp_script += ("\n;window.openAllOppsDrawer=openAllOppsDrawer;window.openAllJobsDrawer=openAllJobsDrawer;"
              "window.openPhaseDrawer=openPhaseDrawer;window.openEvidenceDrawer=openEvidenceDrawer;"
              "window.openPainDrawer=openPainDrawer;window.openLittleJobsDrawer=openLittleJobsDrawer;"
              "window.openInsightDrawer=openInsightDrawer;window.closeDrawer=closeDrawer;\n")

# =====================================================================
HEAD = r'''<!DOCTYPE html>
<html lang="en" data-bento-icon-base="../assets/icons/">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>IPP Journey · Customer Area</title>
<link rel="stylesheet" href="../_ds/px-design-system-25da7e27-3560-4727-ad22-c443a79dda21/tokens/fonts.css">
<link rel="stylesheet" href="../_ds/px-design-system-25da7e27-3560-4727-ad22-c443a79dda21/tokens/palette.css">
<link rel="stylesheet" href="../_ds/px-design-system-25da7e27-3560-4727-ad22-c443a79dda21/tokens/colors.css">
<link rel="stylesheet" href="../_ds/px-design-system-25da7e27-3560-4727-ad22-c443a79dda21/tokens/typography.css">
<link rel="stylesheet" href="../_ds/px-design-system-25da7e27-3560-4727-ad22-c443a79dda21/tokens/spacing.css">
<style>
/* ============================================================
   CA / Bento token compatibility layer
   Legacy IPP tokens re-pointed at real Bento tokens.
   ============================================================ */
:root{
  /* raw legacy palette -> Bento palette */
  --color-black-000:var(--b-color-white); --color-white:var(--b-color-white);
  --color-black-100:var(--b-color-grey-100); --color-black-200:var(--b-color-grey-200);
  --color-black-500:var(--b-color-grey-400); --color-black-1300:var(--b-color-grey-1300);
  --color-black-1700:var(--b-color-grey-1900); --color-black-1900:var(--b-color-grey-1900);
  --color-black-2800:var(--b-color-grey-3200); --color-black-3200:var(--b-color-grey-3200);
  --color-green:var(--b-color-green-900); --color-green-900:var(--b-color-green-900);
  --color-yellow-600:var(--b-color-yellow-600); --color-blue-1700:var(--b-color-blue-1700);
  --color-red-1700:var(--b-color-red-1700); --color-orange-1000:var(--b-color-orange-1000);
  --ipp-accent-deep:var(--b-color-green-1900); --ipp-accent-tint:var(--b-color-green-100);
  --ipp-p0:var(--b-color-red-1700); --ipp-p1:var(--b-color-orange-1000);
  --ipp-p2:var(--b-color-grey-1900); --ipp-explore:var(--b-color-blue-1700);

  /* type / weight / family / spacing / radius / shadow -> Bento */
  --text-2xl:var(--b-font-size-600); --text-xl:var(--b-font-size-500);
  --text-base:var(--b-font-size-300); --text-sm:var(--b-font-size-200); --text-xs:var(--b-font-size-100);
  --font-weight-normal:400; --font-weight-medium:500; --font-weight-semibold:600; --font-weight-bold:700;
  --font-sans:var(--b-font-family-primary); --font-mono:var(--b-font-family-secondary);
  --shadow-sm:var(--b-shadow-low); --shadow-lg:var(--b-shadow-high);
  --spacing-3xs:5px; --spacing-2xs:10px; --spacing-xs:15px; --spacing-s:20px;
  --radius-m:8px; --radius-l:12px;
  --default-transition-duration:150ms;
  --default-transition-timing-function:var(--b-animation-easing-standard);

  /* semantic aliases used throughout the ported CSS */
  --bg:var(--b-color-background-secondary); --panel:var(--b-color-background-primary);
  --ink:var(--b-color-label-primary); --ink-soft:var(--b-color-label-secondary); --ink-faint:var(--b-color-label-tertiary);
  --line:var(--b-color-outline-primary); --line-soft:var(--b-color-grey-200);
  --accent:var(--b-color-green-900); --accent-deep:var(--b-color-green-1900); --accent-tint:var(--b-color-green-100);
  --strong:var(--b-color-green-1700); --partial:var(--b-color-yellow-600); --infra:var(--b-color-blue-1700);
  --gap:var(--b-color-red-1700); --out:var(--b-color-grey-1300); --unmapped:var(--b-color-grey-400);
  --p0:var(--b-color-red-1700); --p1:var(--b-color-orange-1000); --p2:var(--b-color-grey-1900); --explore:var(--b-color-blue-1700);
  --shadow:var(--b-shadow-low);
  --fs-display:var(--b-font-size-600); --fs-h1:var(--b-font-size-500); --fs-h2:var(--b-font-size-500); --fs-h3:var(--b-font-size-300);
  --fs-body:var(--b-font-size-200); --fs-caption:var(--b-font-size-100); --fs-micro:10.5px;
  --fw-bold:700; --fw-semi:600; --fw-med:500; --fw-reg:400;
  --lh-tight:1.15; --lh-snug:1.3; --lh-normal:1.55;
  --shadow-lg:var(--b-shadow-high);
}

/* ---- base reset (CA) ---- */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{font-family:var(--b-text-body-font-family);font-size:var(--fs-body);color:var(--ink);-webkit-font-smoothing:antialiased}
h1,h2,h3{font-family:var(--b-font-family-primary);font-weight:700;letter-spacing:-0.01em;margin:0}
a{color:inherit}

/* ============================================================
   CA shell : left product nav + top bar
   ============================================================ */
.sidebar{width:264px;flex:none;display:flex;flex-direction:column;
  padding:8px 8px 12px;border-right:1px solid var(--line-soft);
  background:var(--b-color-background-secondary);height:100vh;position:sticky;top:0;overflow-y:auto}
.sb-top{padding:8px 6px 4px}
.sb-brand{display:flex;align-items:center;gap:8px;padding:6px 8px;text-decoration:none;color:var(--ink)}
.sb-brand .brand-name{font-weight:700;font-size:var(--text-base);letter-spacing:-0.01em}
.sb-brand .brand-sub{font-size:var(--fs-caption);color:var(--ink-faint);font-weight:500}
.sb-nav{flex:1;display:flex;flex-direction:column;gap:1px;margin-top:8px}
.sb-link{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:8px;
  font-size:var(--text-sm);font-weight:500;color:var(--ink);text-decoration:none;cursor:pointer;
  transition:background var(--default-transition-duration) var(--default-transition-timing-function)}
.sb-link:hover{background:var(--b-color-background-secondary-hover)}
.sb-link.active-link{background:var(--b-color-background-tertiary);font-weight:600}
.sb-link svg{flex:none;color:var(--ink-faint);width:16px;height:16px}
.sb-link.active-link svg{color:var(--ink)}
.sb-divider{height:1px;background:var(--line);margin:10px 6px}
.sb-section-label{font-family:var(--font-mono);font-size:10px;letter-spacing:.12em;text-transform:uppercase;
  color:var(--ink-faint);font-weight:600;padding:6px 10px 2px}
.sb-bottom{margin-top:auto;padding-top:10px}
.sb-cta-box{padding:14px;border-radius:12px;background:var(--panel);border:1px solid var(--line-soft)}
.sb-cta-box b{font-size:var(--fs-caption);color:var(--ink);font-weight:700}
.sb-cta-btn{display:flex;align-items:center;justify-content:center;width:100%;margin-top:12px;
  padding:9px 0;border-radius:9999px;border:1px solid var(--line);background:var(--panel);
  font-size:var(--fs-caption);font-weight:600;color:var(--ink);cursor:pointer;text-decoration:none;
  transition:all var(--default-transition-duration) var(--default-transition-timing-function)}
.sb-cta-btn:hover{background:var(--b-color-background-secondary);border-color:var(--ink-faint)}

/* top bar with breadcrumb (CA) */
.ca-topbar{position:sticky;top:0;z-index:50;display:flex;align-items:center;gap:10px;
  height:52px;padding:0 28px;background:var(--panel);border-bottom:1px solid var(--line)}
.ca-crumb{font-size:var(--fs-body);color:var(--ink-faint);display:inline-flex;align-items:center;gap:8px}
.ca-crumb .sep{color:var(--line)}
.ca-crumb .leaf{color:var(--ink);font-weight:600}
.ca-topbar .spacer{flex:1}
.ca-hdr-btn{display:inline-flex;align-items:center;gap:7px;height:32px;padding:0 12px;border-radius:8px;
  border:1px solid var(--line);background:var(--panel);font-size:var(--fs-caption);font-weight:600;color:var(--ink);
  cursor:pointer;text-decoration:none}
.ca-hdr-btn:hover{background:var(--b-color-background-secondary)}
.eyebrow{font-family:var(--font-mono);font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--accent);font-weight:600}

/* ---- Data source view extras ---- */
.sources{margin-bottom:22px}
.src-label{font-family:var(--font-mono);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-faint);font-weight:600;margin-bottom:10px}
.src-grid{display:flex;flex-wrap:wrap;gap:8px}
.src-link{display:inline-flex;align-items:center;gap:7px;text-decoration:none;background:var(--panel);border:1px solid var(--line);
  border-radius:8px;padding:6px 11px;transition:.16s;box-shadow:none}
.src-link:hover{border-color:var(--accent);transform:translateY(-1px);box-shadow:var(--shadow)}
.src-link svg{width:13px;height:13px;flex:none;color:var(--accent)}
.src-text{display:inline-flex;align-items:baseline;gap:6px;min-width:0}
.src-text b{font-size:var(--fs-caption);color:var(--ink);font-weight:600;line-height:var(--lh-snug)}
.src-meta{font-family:var(--font-mono);font-size:9.5px;color:var(--ink-faint)}
.toolbar{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:18px}
.jobnote{margin:0 0 12px;font-size:var(--fs-caption);color:var(--ink-soft);line-height:var(--lh-normal);max-width:900px}
.jobnote b.addr{color:#3a7d0a}
.srcnote{margin:16px 0 60px;font-size:var(--fs-caption);color:var(--ink-faint)}
.viewhead h1{font-size:var(--fs-display);line-height:var(--lh-tight);margin:0 0 6px;font-weight:700}

/* ---- coverage view ---- */
.lev-grid{margin-top:26px}

/* ======= ported content CSS (re-skinned via tokens above) ======= */
__CONTENT_CSS__
</style>
</head>
<body>
'''

GATE = r'''
<!-- Access gate (client-side, prototype only). -->
<div id="ipp-gate" style="position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;background:#fff;">
  <form id="ipp-gate-form" style="width:320px;max-width:88vw;display:flex;flex-direction:column;gap:12px;font-family:'Adyen UI',system-ui,sans-serif;">
    <div style="font-size:18px;font-weight:600;color:#001222;">IPP Journey</div>
    <div style="font-size:13px;color:#5C6874;">Enter the access passcode to continue.</div>
    <input id="ipp-gate-input" type="password" placeholder="Passcode" autocomplete="current-password"
      style="height:40px;padding:0 12px;border:1px solid #8C959D;border-radius:8px;font-size:14px;outline:none;box-sizing:border-box;" />
    <div id="ipp-gate-err" style="display:none;font-size:12px;color:#DC3801;">Incorrect passcode - try again.</div>
    <button type="submit" style="height:40px;border:0;border-radius:8px;background:#001222;color:#fff;font-size:14px;font-weight:600;cursor:pointer;">Enter</button>
  </form>
</div>
<script>
(function () {
  var ACCESS_PASSWORD = 'IPP2026';
  var KEY = 'ipp-access-until', TTL = 24*60*60*1000;
  var gate = document.getElementById('ipp-gate');
  var until = parseInt(localStorage.getItem(KEY) || '0', 10);
  if (until && Date.now() < until) { gate.style.display='none'; return; }
  var form=document.getElementById('ipp-gate-form'), input=document.getElementById('ipp-gate-input'), err=document.getElementById('ipp-gate-err');
  input.focus();
  form.addEventListener('submit', function(e){ e.preventDefault();
    if(input.value===ACCESS_PASSWORD){ localStorage.setItem(KEY,String(Date.now()+TTL)); gate.style.display='none'; }
    else { err.style.display='block'; input.value=''; input.focus(); }
  });
})();
</script>
'''

def nav_icon(paths):
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">%s</svg>' % paths

SIDEBAR = r'''
<aside class="sidebar">
  <div class="sb-top">
    <a class="sb-brand" href="javascript:void(0)">
      <svg width="60" height="20" viewBox="0 0 101.6 32.9" fill="#0ABF53"><path d="M14.3,7.5H0.3V12l9.2,0c0.6,0,1,0.5,1,1v7.9h-2c-0.6,0-1-0.5-1-1v-5.7H3.6c-2,0-3.6,1.6-3.6,3.6v4c0,2,1.6,3.6,3.6,3.6h14.3V11.1C17.9,9.1,16.3,7.5,14.3,7.5z"/><path d="M31.4,20.9h-2c-0.6,0-1-0.5-1-1V7.5h-3.9c-2,0-3.6,1.6-3.6,3.6v10.7c0,2,1.6,3.6,3.6,3.6h14.3V0h-7.5L31.4,20.9z"/><path d="M52.3,20.9h-2c-0.6,0-1-0.5-1-1V7.5h-7.5v14.3c0,2,1.6,3.6,3.6,3.6h6.9v2.2H42.1v5.2h14.1c2,0,3.6-1.6,3.6-3.6V7.5h-7.5V20.9z"/><path d="M77.1,7.5H62.7v14.3c0,2,1.6,3.6,3.6,3.6h14.1v-4.5h-9.2c-0.6,0-1-0.5-1-1V12h2c0.6,0,1,0.5,1,1v5.7h3.9c2,0,3.6-1.6,3.6-3.6v-4C80.7,9.1,79.1,7.5,77.1,7.5z"/><path d="M98,7.5H83.7v17.9h7.5V12h2c0.6,0,1,0.5,1,1v12.4h7.5V11.1C101.6,9.1,100,7.5,98,7.5z"/></svg>
    </a>
  </div>
  <nav class="sb-nav">
    <a class="sb-link active-link" data-tab="journey" onclick="switchTab('journey')">''' + nav_icon('<path d="M3 3h7v7H3z"/><path d="M14 3h7v4h-7z"/><path d="M14 10h7v4h-7z"/><path d="M3 14h7v7H3z"/><path d="M14 17h7v4h-7z"/>') + r'''Journey map</a>
    <a class="sb-link" data-tab="sysinfo" onclick="switchTab('sysinfo')">''' + nav_icon('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/>') + r'''System context</a>
    <a class="sb-link" data-tab="overview" onclick="switchTab('overview')">''' + nav_icon('<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>') + r'''Customer context</a>
    <div class="sb-divider"></div>
    <div class="sb-section-label">Source of truth</div>
    <a class="sb-link" data-tab="datasource" onclick="switchTab('datasource')">''' + nav_icon('<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>') + r'''Data source</a>
  </nav>
  <div class="sb-bottom">
    <div class="sb-cta-box">
      <span class="dot"></span> <b>Work in progress</b>
      <p style="margin:8px 0 0;font-size:var(--text-xs);color:var(--ink-soft);line-height:1.55">This is a living document shaped by research and the Figma journey map.</p>
      <p style="margin:6px 0 0;font-size:var(--text-xs);color:var(--ink-soft);line-height:1.55">Got ideas, corrections, or feedback? Would love to hear from you!</p>
      <a href="slack://user?team=T025TN82G&id=U099UUXHZ62" class="sb-cta-btn">Chat with @eva_han</a>
    </div>
  </div>
</aside>
'''

# breadcrumb leaf per tab, updated by JS
TOPBAR = r'''
  <div class="ca-topbar">
    <div class="ca-crumb"><span>In-person payments</span><span class="sep">/</span><span class="leaf" id="caLeaf">Context</span></div>
    <div class="spacer"></div>
    <a class="ca-hdr-btn" href="Data%20source.html" onclick="switchTab('datasource');return false;">Data source</a>
  </div>
'''

JOURNEY_BP = r'''
<section class="view active" id="journey">
  <div class="viewhead">
    <h2>Journey map</h2>
    <p class="sub">A journey, cascading from strategic phases to JTBD actors responsible for each opportunity. Filter by actors and owners to isolate stakeholder-specific views.</p>
  </div>
  <div class="bp-kpis">
    <div class="kpi accent" style="cursor:pointer" onclick="openAllOppsDrawer()"><div class="v" id="kpiOpps">19</div><div class="l"><b>IPP Opportunities</b> mapped across the journey</div></div>
    <div class="kpi" style="cursor:pointer" onclick="openAllJobsDrawer()"><div class="v" id="kpiJobs">9</div><div class="l"><b>Jobs-to-be-Done</b> &mdash; main goals across the lifecycle</div></div>
    <div class="kpi"><div class="v" id="kpiLittle">49</div><div class="l"><b>Little jobs</b> &mdash; granular tasks under each JTBD</div></div>
  </div>
  <div class="toolbar" id="toolbar">
    <div class="ff"><span class="fl">View</span><div class="jtoggle" id="bpLayoutToggle"><button class="on" data-l="stacked">Journey map</button><button data-l="swim">Blueprint</button><button data-l="matrix">Ownership</button></div></div>
    <div class="ff"><span class="fl">Team</span><div class="ms-wrap" id="msOwner"><button type="button" class="ms-btn" id="msOwnerBtn" style="min-width:180px">All teams</button><div class="ms-drop" id="msOwnerDrop"></div></div></div>
    <div class="ff"><span class="fl">Persona</span><div class="ms-wrap" id="msActor"><button type="button" class="ms-btn" id="msActorBtn">All personas</button><div class="ms-drop" id="msActorDrop"></div></div></div>
    <div class="ff"><span class="fl">Opportunity size</span><div class="ms-wrap" id="msSize"><button type="button" class="ms-btn" id="msSizeBtn" style="min-width:140px">All sizes</button><div class="ms-drop" id="msSizeDrop"></div></div></div>
    <button type="button" class="freset" id="fReset">Reset filters</button>
    <button class="bp-expand" id="bpExpandBtn" aria-label="Expand" title="Expand" onclick="toggleJourneyExpand()" style="margin-left:auto"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg></button>
  </div>
  __LEGEND__
  <div class="bp-canvas" id="bpCanvasWrap">
    <div class="bp-flow" id="bpCanvas"></div>
  </div>
</section>
'''
JOURNEY_BP = JOURNEY_BP.replace("__LEGEND__", "")

COVERAGE = r'''
<section class="view" id="coverage">
  <div class="viewhead"><h2>Coverage heatmap</h2>
    <p class="sub">Where each opportunity converges across the journey moments &mdash; and how well it is covered today. Click a row to isolate it.</p></div>
  <div class="legend">
    <span><span class="lg" style="background:var(--strong)"></span>Strong</span>
    <span><span class="lg" style="background:var(--partial)"></span>Partial</span>
    <span><span class="lg" style="background:var(--infra)"></span>Infra only</span>
    <span><span class="lg" style="background:var(--gap)"></span>Gap</span>
    <span>&#9733; Highest-leverage moment</span>
  </div>
  <div class="heatwrap"><table class="heat" id="heat"></table></div>
  <div class="lev-grid" id="levGrid"></div>
</section>
'''

DATASOURCE = r'''
<section class="view" id="datasource">
  <div class="viewhead">
    <h1>Journey Data Source</h1>
    <p class="sub">This page collects the current data sources behind the IPP journey work. Use the tabs to browse the underlying data as tables, download the CSVs to work with it directly, and open the original Figma sources via the links below.</p>
  </div>
  <div class="sources">
    <div class="src-label">Original sources</div>
    <div class="src-grid">
      <a class="src-link" href="JTBD_Journey_Map.csv" download><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg><span class="src-text"><b>Download JTBD journey CSV</b><span class="src-meta">CSV &middot; JTBD journey map</span></span></a>
      <a class="src-link" href="https://www.figma.com/board/DxZOYYhQG4e3XbIary263y/JTBD-IPP-Platform?node-id=1-2983&t=88GBG9fqVOkPSQgT-1" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg><span class="src-text"><b>JTBD mapping</b><span class="src-meta">Figma &middot; JTBD-IPP-Platform</span></span></a>
      <a class="src-link" href="https://www.figma.com/board/DxZOYYhQG4e3XbIary263y/JTBD-IPP-Platform?node-id=1-276&t=88GBG9fqVOkPSQgT-1" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg><span class="src-text"><b>Opportunities mapping based on JTBD</b><span class="src-meta">Figma &middot; JTBD-IPP-Platform</span></span></a>
      <a class="src-link" href="https://www.figma.com/design/Nuk9VPbHlvQN3cFC4WbJTu/%F0%9F%97%BA%EF%B8%8F-TFM-Merchant---Adyen-journey?node-id=1-490&t=JBwqgABE9RPcq547-1" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg><span class="src-text"><b>Journey map</b><span class="src-meta">Figma &middot; TFM Merchant - Adyen journey</span></span></a>
      <a class="src-link" href="https://www.figma.com/design/MPNljRopWaEWdP13W1u9cX/TFM---User-journey?node-id=1867-5737&t=cvxTZ9CS8qJf9kwn-4" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg><span class="src-text"><b>Merchant journey map</b><span class="src-meta">Figma &middot; TFM - User journey</span></span></a>
      <a class="src-link" href="https://notebooklm.google.com/notebook/46f9b8af-e427-46b6-a4a6-da4f27e985cb" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg><span class="src-text"><b>User insights</b><span class="src-meta">NotebookLM &middot; Research notebook</span></span></a>
      <a class="src-link" href="https://drive.google.com/drive/folders/1g3nWmLpmVzR-ruupbFm2rh4vCtBEUyxe?usp=drive_link" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg><span class="src-text"><b>IPP journey source</b><span class="src-meta">Google Drive &middot; Folder</span></span></a>
    </div>
  </div>
  <div class="toolbar">
    <div class="jtoggle" id="srcTabs">
      <button class="on" data-st="journey">JTBD &amp; Opportunities</button>
      <button data-st="opps">Opportunities</button>
      <button data-st="evidence">Journey &amp; Research evidence</button>
    </div>
  </div>
  <div id="srcPanelJourney">
    <div class="tbl-filters">
      <div class="ff"><span class="fl">Phase</span><select id="jf-phase"></select></div>
      <div class="ff"><span class="fl">Big job</span><select id="jf-big"></select></div>
      <div class="ff"><span class="fl">Sub-step</span><select id="jf-sub"></select></div>
      <div class="ff"><span class="fl">Actor</span><select id="jf-actor"></select></div>
      <button type="button" class="freset" id="jf-reset">Reset filters</button>
      <span class="fhint">Drag a column's right edge to resize it</span>
    </div>
    <div class="jtbdwrap"><table class="jtbd" id="journeyTable"></table></div>
    <p class="jobnote" style="margin-top:12px">Each job lists the opportunities that serve it, with the opportunity's <b>Who</b>, <b>Job nature</b> and <b>Size &amp; owner</b> (<span style="color:var(--accent)">&#9679;</span> IPP Platform, <b class="addr">&#10003;</b> already addressed). The opportunity's <span class="reljob">related jobs</span> are highlighted beneath each one. 8 <b>Online Checkout</b> opportunities belong to a separate digital-checkout journey and are not mapped to these 9 in-store jobs.</p>
  </div>
  <div id="srcPanelOpps" style="display:none">
    <p class="jobnote"><b>Job nature</b> captures what drives each opportunity - Innovation (new value), Frustration (jobs that cause the most frustration to our internal users &amp; merchants), and Autonomy (self-service). Opportunities marked <b class="addr">&#10003; Already addressed</b> are live or in delivery today.</p>
    <div class="jtbdwrap"><table class="jtbd" id="oppTable"></table></div>
  </div>
  <div id="srcPanelEvidence" style="display:none">
    <p class="jobnote">Each row maps a journey sub-step to the opportunity it supports, with the <b>Evidence</b> behind it. Covers Journey A (Merchant Configuration) and Journey B (Submerchant onboarding, AfP). Rows with no theme are logistics/operational steps with no mapped opportunity.</p>
    <div class="jtbdwrap"><table class="jtbd" id="evidenceTable"></table></div>
  </div>
  <p class="srcnote">Source: Figma JTBD board (JTBD-IPP-Platform). Job titles in the "Who" column are inferred from the nature of each task.</p>
</section>
'''

# =====================================================================
# Context dashboard  (source: Droid session "Customer sentiment for H1 2027 roadmap")
# =====================================================================
THEMES = [  # Salesforce support tickets by theme (Unwrap, Sep 2025-Sep 2026)
    ("EFTPOS terminals (card machines)", 27453),
    ("Warehousing &amp; logistics", 15808),
    ("Terminal UX", 15312),
    ("IPP payments", 10712),
    ("IPP integrations", 5908),
    ("Part-mapping issues", 5725),
    ("S1 terminals", 4836),
    ("Terminal orders &amp; returns", 4137),
    ("Card machine not working", 3616),
    ("IPP hardware", 3066),
    ("Terminal not processing", 2865),
    ("Boarding &amp; reassignments", 2735),
]
THEME_MAX = max(v for _, v in THEMES)

INSIGHTS = [
    ("1","crit","Critical","Hardware &amp; connectivity failures at the counter",
     "Terminals that freeze, won't charge, or drop connectivity cost sales on the spot &mdash; the biggest pain by volume, including a physical battery-safety risk. The one bright spot: this theme is trending down.",
     "Unwrap #1 (EFTPOS 26,369 = 42.6%) &middot; ~9,100 reliability &middot; leading NPS detractor",
     "&ldquo;An urgent safety issue with our three terminals&hellip; severe battery swelling, one unusable, another unable to charge.&rdquo; &mdash; Salesforce ticket, Sep 2026",
     "Stand up a named reliability + battery-safety workstream with merchant-visible device health."),
    ("2","high","High","Terminal fulfilment: warehousing, logistics &amp; orders (new)",
     "Shipping delays, lost terminals and wrong items are a quarter of all IPP feedback with no improvement trend &mdash; but they hide in support tickets, so they barely show in NPS or Slack. A large operational drag with no clear product owner.",
     "Unwrap #2 &middot; W&amp;L 15,778 (25.5%), flat &middot; Orders &amp; Returns 4,128",
     "&ldquo;Drop shipping is not working for Monzo&hellip; still an error saying drop shipping not configured.&rdquo; &mdash; IPP support Slack",
     "Treat fulfilment as a product surface: order/shipment tracking, lost-terminal self-service, fulfilment SLAs."),
    ("3","high","High","Boarding, reassignment &amp; provisioning",
     "Terminals get stuck in &lsquo;Deployed,&rsquo; reassignment isn't self-serve, and boarding silently fails when no payment method is set &mdash; some go live without encryption keys, and apps/memory can persist after reassignment (data-leak risk).",
     "Boarding cluster ~7,500+ &middot; keys-missing 1,825 &middot; part-mapping 5,384 &middot; methods not provisioned 4,288",
     "&ldquo;I am unable to access terminal S1F2&hellip; it is requesting a boarding password I cannot find how to change.&rdquo; &mdash; Salesforce ticket, Sep 2026",
     "Show boarding blockers in-product, enable self-serve reassignment with enforced data-wipe, auto-provision approved methods."),
    ("4","high","High","Tap to Pay / SoftPOS is second-class and unreliable",
     "Boarding and attestation fail too often (false &lsquo;SecurityBlock,&rsquo; setup-token errors) and the tooling lags fixed terminals &mdash; device-level config is blocked, there's no phone-model targeting, and reboarding needs a reinstall.",
     "~4,800+ entries, worst sentiment of any IPP theme &middot; SDK failures 2,652 &middot; Slack Integrations 26.3%",
     "&ldquo;Persistent HTTP 400 (1029_617) &lsquo;Invalid combination of merchant account and setup token&rsquo; integrating Tap to Pay on Android.&rdquo; &mdash; Salesforce ticket, Sep 2026",
     "Bring SoftPOS to parity with terminals: reliable attestation/boarding, device-level config, phone-model targeting."),
    ("5","high","High","Fleet &amp; firmware updates are risky and uncontrollable",
     "Saving a profile can push a fleet-wide install mid-trading, upgrades sometimes uninstall apps, and recovery is undocumented. Partners want the missing controls to validate before going wide.",
     "Lightspeed &middot; IPPMOB-7350 &middot; IPPPL-15999",
     "&ldquo;My terminal is stuck at 71% during a software update, showing the wrong timezone and &lsquo;terminal not boarded.&rsquo;&rdquo; &mdash; Salesforce ticket, Sep 2026",
     "API-driven deployment, staged rollout, and stable LTS tracks."),
    ("6","high","High","Developer &amp; platform / API integration overhead",
     "Partners who embed Adyen hit heavy integration overhead: API specs that don't match production, 7&ndash;9 onboarding calls where Stripe needs 0, no bulk payment-method endpoints, missing fields (MCC, midNumber), missing offline webhooks, and no real-time payout API.",
     "Lightspeed developer feedback",
     "&ldquo;Integrating with Adyen creates disproportionate engineering overhead&hellip; critical API gaps, inaccurate specs, unusable log-tracing, poor device deployment controls.&rdquo; &mdash; Lightspeed",
     "Close the API/tooling gaps before strategic partners benchmark toward competitors."),
    ("7","high","High","Settings &amp; Customer Area are opaque &mdash; and the UI regressed",
     "~955 terminal settings, each settable at six cascading levels (PSP &rarr; Company &rarr; Merchant &rarr; Store &rarr; Profile &rarr; Terminal), yet nothing is labeled device-only &mdash; so merchants can't tell what a setting is, where it came from, or what else changes. The new &lsquo;Ekiben&rsquo; UI also broke working controls.",
     "IPPPL-17966 &middot; PF-4562 &middot; Settings PRD, Unwrap, Lightspeed",
     "&ldquo;Too many settings are invisible to the customer and can only be viewed by Adyen support&hellip; you don't know what you don't know.&rdquo; &mdash; NPS, Dick's Sporting Goods (2/10)",
     "Make settings legible: show current value + provenance + blast radius, and label device-only settings."),
    ("8","med","Medium","Thin docs, slow support, low self-serve",
     "Merchants can't self-serve: docs lack detail and functionality often only works after a conversation with support. Support and Reporting are IPP's lowest-rated NPS dimensions.",
     "NPS H1 2026 &middot; lowest-rated dimensions",
     "&ldquo;Documentation often lacks and often when we try to implement functionality it does not work unless we have a conversation with support.&rdquo; &mdash; NPS, Quilt Software (8/10)",
     "Invest in docs + self-serve so common tasks don't require support."),
    ("9","med","Medium-High","Payments configuration &amp; behavior (US debit/PIN, limits, schemes)",
     "Config behaviour surprises merchants &mdash; e.g. debit cards running as credit, or PIN not prompting &mdash; smaller by ticket volume but high-severity at the counter.",
     "~1,600 Salesforce tickets &middot; recurring in Slack",
     "&ldquo;The POS is running debit cards as credit, and I need the setting enabled so debit requires a PIN.&rdquo; &mdash; Salesforce ticket, Jan 2026",
     "Make payment-config outcomes predictable and self-serviceable."),
    ("10","med","Medium","Localization / regional fit blocks markets",
     "Regional gaps (Japan, France/Conecs, receipts, language) can gate whole markets for local teams and merchants.",
     "NPS H1 2026 &middot; regional detractors/passives",
     "&ldquo;The Adyen Japan team is struggling to serve their Japanese customers.&rdquo; &mdash; NPS, Dinii Inc. (Japan, 8/10)",
     "Prioritise regional fit where it unblocks whole markets."),
    ("11","med","Medium","Store &amp; Forward / offline is inconsistent",
     "Offline / Store &amp; Forward behaves unexpectedly on unstable networks &mdash; including double payments &mdash; eroding trust exactly when reliability matters most.",
     "NPS H1 2026 &middot; EMEA",
     "&ldquo;Offline payments&hellip; we often experience double payments in these situations.&rdquo; &mdash; NPS, Georg Jensen A/S (10/10)",
     "Make offline payments deterministic (no double charges/declines)."),
    ("12","med","Medium","No business-value / reporting layer on fleet data",
     "Merchants want actionable reporting from device/fleet data (e.g. per-device feature status) and today have to ask support for it.",
     "Salesforce tickets &middot; fleet reporting requests",
     "&ldquo;I need a report showing the Standalone status for every V400m device in our stores.&rdquo; &mdash; Salesforce ticket, Sep 2026",
     "Add a reporting layer that turns fleet data into merchant-visible insight."),
]

# ---- map each sentiment insight (pain point) to journey phase(s) ----
# phase indices: 0 Exploration · 1 Test & Integration · 2 Go Live & Rollout · 3 BAU & Growth · 4 Fleet Operation
PHASE_SHORT = ["Exploration", "Test & Integration", "Go Live", "BAU & Growth", "Fleet Operation"]
INSIGHT_SHORT = [
    "Hardware & connectivity", "Fulfilment & logistics", "Boarding & provisioning",
    "Tap to Pay / SoftPOS", "Fleet & firmware updates", "API integration overhead",
    "Opaque settings / CA", "Docs & support", "Payments config",
    "Localization", "Offline / Store & Forward", "Fleet reporting",
]
INSIGHT_PHASES = [
    [3, 4],       # 1 Hardware & connectivity failures — in-store operation
    [1, 2, 4],    # 2 Fulfilment / warehousing / orders — ordering, delivery, replacements
    [2, 4],       # 3 Boarding, reassignment & provisioning — go-live + fleet
    [1, 3],       # 4 Tap to Pay / SoftPOS — integration + BAU
    [3, 4],       # 5 Fleet & firmware updates — BAU + fleet
    [1],          # 6 Developer / API integration overhead — test & integration
    [1, 2, 3],    # 7 Opaque settings & CA — test config, go-live config, BAU
    [1, 3],       # 8 Thin docs, slow support — integration + BAU
    [2, 3],       # 9 Payments configuration & behaviour — go-live + BAU
    [0, 2],       # 10 Localization / regional fit — planning + go-live
    [3],          # 11 Store & Forward / offline — BAU operation
    [3, 4],       # 12 No reporting layer — BAU + fleet
]

def build_overview():
    bars = ""
    for name, val in THEMES:
        pct = round(val / THEME_MAX * 100, 1)
        bars += (f'<div class="bar-row"><div class="bar-name" title="{name}">{name}</div>'
                 f'<div class="bar-track"><div class="bar-fill" style="width:{pct}%"></div></div>'
                 f'<div class="bar-val">{val:,}</div></div>')
    cards = ""
    for i, (rank, sev, sevlbl, title, desc, meta, quote, rec) in enumerate(INSIGHTS):
        jchips = ''.join('<span class="ins-jchip">%s</span>' % PHASE_SHORT[p] for p in INSIGHT_PHASES[i])
        cards += (f'<div class="ins-card ins-{sev}">'
                  f'<div class="ins-top"><span class="ins-rank">{rank}</span>'
                  f'<span class="sev sev-{sev}">{sevlbl}</span></div>'
                  f'<div class="ins-title">{title}</div>'
                  f'<div class="ins-desc">{desc}</div>'
                  f'<div class="ins-meta">{meta}</div>'
                  f'<div class="ins-q">{quote}</div>'
                  f'<div class="ins-rec"><span class="arr">&rarr;</span> {rec}</div>'
                  f'<div class="ins-journey"><span class="ins-jlabel">In journey</span>{jchips}</div>'
                  f'</div>')
    return OVERVIEW_TMPL.replace("__BARS__", bars).replace("__CARDS__", cards)

OVERVIEW_TMPL = r'''
<section class="view" id="overview">
  <div class="viewhead"><h2>IPP customer sentiment</h2>
    <p class="sub">What in-person merchants &mdash; and the teams serving them &mdash; keep telling us, synthesised across Unwrap, Salesforce support, NPS, Slack and partner feedback to steer the <b>H1 2027 roadmap</b>.</p>
  </div>

  <div class="kpis" style="margin-bottom:20px">
    <div class="kpi"><div class="v">61,842</div><div class="l"><b>feedback entries</b> analysed &mdash; ~797 support workflows, 323 Slack questions, 3,529 survey responses</div></div>
    <div class="kpi accent"><div class="v">53.3</div><div class="l"><b>IPP NPS</b> &mdash; 12.9 pts below the overall base (66.2); Support &amp; Reporting rate lowest</div></div>
    <div class="kpi"><div class="v">25.5%</div><div class="l"><b>Warehousing &amp; logistics</b> &mdash; 2nd-largest pain, never on the roadmap, no product owner</div></div>
    <div class="kpi"><div class="v">12</div><div class="l"><b>insights</b> ranked by severity &times; frequency, each tied to its sources</div></div>
  </div>

  <div class="grid2" style="margin-bottom:22px">
    <div class="chart-card">
      <h3>Top feedback themes</h3>
      <div class="chart-sub">Salesforce support tickets by theme &mdash; Unwrap, Sep 2025&ndash;Sep 2026. Themes overlap, so counts are not additive.</div>
      <div class="barlist">__BARS__</div>
    </div>
    <div>
      <div class="chart-card" style="margin-bottom:14px">
        <h3>Satisfaction agrees with volume</h3>
        <div class="chart-sub">Net Promoter Score (0&ndash;10 &ldquo;would you recommend&rdquo;)</div>
        <div class="nps-row"><span class="nps-lab">IPP merchants</span><div class="nps-track"><div class="nps-fill ipp" style="width:53.3%"></div></div><span class="nps-num">53.3</span></div>
        <div class="nps-row"><span class="nps-lab">Overall base</span><div class="nps-track"><div class="nps-fill base" style="width:66.2%"></div></div><span class="nps-num">66.2</span></div>
        <div class="nps-gap">&minus;12.9 pts &mdash; lowest dimensions: <b>Support</b> &amp; <b>Reporting</b></div>
      </div>
      <div class="card prose" style="padding:18px 20px">
        <h3 style="font-size:14px">Root cause</h3>
        <p style="font-size:13px;margin-bottom:8px">The product assumes <b>(1)</b> a self-service merchant with a payments team &mdash; many need more done <i>for</i> them, more reliably, with less to configure &mdash; and <b>(2)</b> a partner willing to hand-build around API, webhook and tooling gaps.</p>
        <p style="font-size:13px;margin:0;color:var(--ink-soft)">Both assumptions break at scale.</p>
      </div>
    </div>
  </div>

  <h3 style="font-size:16px;margin:0 0 4px">Insights, ranked (severity &times; frequency)</h3>
  <p class="sub" style="margin:0 0 14px;color:var(--ink-soft);font-size:var(--fs-caption)">Every insight is tied to its evidence &mdash; volumes from Unwrap/Salesforce, plus a representative verbatim.</p>
  <div class="ins-grid">__CARDS__</div>
</section>
'''

# ---- main journey script (clean; only working paths) ----
JOURNEY_SCRIPT = r'''
<script>
const DATA = __DATA__;
const oppById = Object.fromEntries(DATA.opps.map(o=>[o.id,o]));
const CVLABEL = {strong:"Strong",partial:"Partial",infra:"Infra only",gap:"Gap",out:"Not Devices-owned",unmapped:"Unmapped"};
__JTBD_JOURNEY__

/* ---- drawer ---- */
function closeDrawer(){document.getElementById('drawer').classList.remove('on');document.getElementById('scrim').classList.remove('on');}
document.getElementById('scrim').onclick=closeDrawer;
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDrawer();});
function whereTags(id){
  const cols=DATA.heatCols.filter(c=>DATA.heat[id]&&DATA.heat[id][c.id]);
  if(!cols.length)return '<span class="vtxt" style="color:var(--unmapped)">Not yet mapped to a journey moment.</span>';
  return '<div class="where">'+cols.map(c=>`<span class="wtag ${c.star?'star':''}">${c.id}${c.star?' \u2605':''} \u00b7 ${c.label}</span>`).join('')+'</div>';
}
function openDrawer(id){
  const o=oppById[id],d=document.getElementById('drawer');
  d.innerHTML=`<div class="dhead"><span class="dbar" style="background:var(--${o.coverage})"></span>
    <button class="close" onclick="closeDrawer()">\u00d7</button>
    <span class="oid mono" style="color:var(--ink-faint);font-size:12px;font-weight:600">${o.id}</span>
    <h3>${o.title}</h3>
    <div class="dmeta"><span class="badge pri-${o.priority}">${o.priority}</span>
    <span class="cv cv-${o.coverage}"><span class="cvdot"></span>${CVLABEL[o.coverage]}</span></div></div>
    <div class="dbody">
      <div class="dsec"><div class="vtxt">${o.desc}</div></div>
      <div class="dsec"><div class="k">Where it appears</div>${whereTags(o.id)}</div>
      <div class="dsec"><div class="k">Priority signals</div>
        <div class="signal">
          <div class="sg"><div class="sk">Evidence weight</div><div class="sv">${o.evidence}</div></div>
          <div class="sg"><div class="sk">Business outcome impact</div><div class="sv">${o.business}</div></div>
          <div class="sg"><div class="sk">Strategic urgency</div><div class="sv">${o.urgency}</div></div>
          <div class="sg"><div class="sk">Foundational dependency</div><div class="sv">${o.dependency}</div></div>
        </div></div>
      <div class="dsec"><div class="k">Why this priority</div><div class="whybox">${o.why}</div></div>
    </div>`;
  d.classList.add('on');document.getElementById('scrim').classList.add('on');
}

/* ---- journey map is provided by the Service Blueprint module (below) ---- */

/* ---- coverage heatmap ---- */
let isolated=null;
function renderHeat(){
  const t=document.getElementById('heat');if(!t)return;
  let head=`<thead><tr><th class="rowhead" style="background:var(--panel)"></th>`;
  DATA.heatCols.forEach(c=>{head+=`<th class="${c.star?'star':''}"><div class="jhead">${c.j}</div><div class="cid">${c.id}${c.star?' \u2605':''}</div><div>${c.label}</div></th>`;});
  head+=`</tr></thead>`;
  let body='<tbody>';
  DATA.heatOrder.forEach(id=>{
    const o=oppById[id];
    body+=`<tr data-opp="${id}"><td class="rowhead" onclick="toggleIsolate('${id}')">
      <div class="rh"><span class="roid">${id}</span><span class="rtitle">${o.title}</span>
      <span class="rcv" style="background:var(--${o.coverage})" title="${CVLABEL[o.coverage]}"></span></div></td>`;
    DATA.heatCols.forEach(c=>{
      const det=DATA.heat[id]&&DATA.heat[id][c.id];
      const fcls=det?('f f-'+(o.coverage==='infra'?'infra':o.coverage==='out'?'gap':o.coverage)):'';
      body+=`<td class="cell ${fcls} ${c.star?'colstar':''}" ${det?`data-d="${det.replace(/"/g,'&quot;')}" data-ctx="${id} \u00b7 ${c.label}"`:''}>
        ${det?'<div class="fill"><span class="ck">\u25cf</span></div>':''}</td>`;
    });
    body+='</tr>';
  });
  body+=`<tr class="totrow"><td class="rowhead">Opportunities converging</td>`;
  DATA.heatCols.forEach(c=>{let n=0;DATA.heatOrder.forEach(id=>{if(DATA.heat[id]&&DATA.heat[id][c.id])n++;});body+=`<td>${n}</td>`;});
  body+='</tr></tbody>';
  t.innerHTML=head+body;
  const tip=document.getElementById('htip');
  t.querySelectorAll('.cell.f').forEach(cell=>{
    cell.onmousemove=ev=>{tip.innerHTML=`<div class="tt">${cell.dataset.ctx}</div>${cell.dataset.d}`;
      tip.classList.add('on');tip.style.left=Math.min(ev.clientX+14,innerWidth-250)+'px';tip.style.top=(ev.clientY+14)+'px';};
    cell.onmouseleave=()=>tip.classList.remove('on');
  });
}
function toggleIsolate(id){
  isolated=isolated===id?null:id;
  document.querySelectorAll('#heat tbody tr[data-opp]').forEach(tr=>{
    tr.classList.toggle('dim',isolated&&tr.dataset.opp!==isolated);});
}
function renderLeverage(){
  const g=document.getElementById('levGrid');if(!g)return;g.innerHTML='';
  (DATA.leverage||[]).forEach(l=>{
    const el=document.createElement('div');el.className='lev'+(l.rank===1?' top':'');
    el.innerHTML=`<span class="lr">${l.rank}</span><div class="lj">${l.journey}</div>
      <h3>${l.step}</h3><div class="lwhy">${l.why}</div>
      <div class="lconv"><span class="lcount">${l.count} opps</span>
      <span class="lopps">${l.opps.map(id=>`<span class="opin">${id}</span>`).join('')}</span></div>`;
    g.appendChild(el);
  });
}

/* ---- solutions ---- */
const SOL_LIST = __SOL_LIST__;
function renderSolutions(){
  const g=document.getElementById('solGrid');if(!g)return;g.innerHTML='';
  SOL_LIST.forEach(s=>{
    const el=document.createElement('div');el.className='sol-card';
    el.innerHTML=`<span class="sol-icon">${s.icon}</span>
      <div class="sol-name">${s.name}</div>
      <div class="sol-desc">${s.desc}</div>
      <div class="sol-tags">${s.tags.map(t=>`<span class="wtag">${t}</span>`).join('')}</div>`;
    el.onclick=()=>openSolDrawer(s);
    g.appendChild(el);
  });
}
function openSolDrawer(s){
  const d=document.getElementById('drawer');
  d.innerHTML=`<div class="dhead"><span class="dbar" style="background:var(--accent)"></span>
    <button class="close" onclick="closeDrawer()">\u00d7</button>
    <span class="oid mono" style="color:var(--ink-faint);font-size:12px;font-weight:600">IPP SOLUTION</span>
    <h3>${s.name}</h3></div>
    <div class="dbody">
      <div class="dsec"><div class="vtxt" style="font-size:14px;line-height:1.55">${s.desc}</div></div>
      <div class="dsec"><div class="k">Capabilities</div>
        <div class="where">${s.tags.map(t=>`<span class="wtag">${t}</span>`).join('')}</div></div>
    </div>`;
  d.classList.add('on');document.getElementById('scrim').classList.add('on');
}

/* ---- tab switching ---- */
const LEAF={overview:'Customer context',journey:'Journey map',sysinfo:'System context',datasource:'Data source'};
let dsRendered=false;
function switchTab(v){
  document.querySelectorAll('section.view').forEach(s=>s.classList.toggle('active',s.id===v));
  document.querySelectorAll('.sidebar .sb-nav .sb-link').forEach(a=>{const t=a.dataset.tab;if(t)a.classList.toggle('active-link',t===v);});
  const leaf=document.getElementById('caLeaf');if(leaf)leaf.textContent=LEAF[v]||'';
  if(location.hash!=='#'+v)history.replaceState(null,'','#'+v);
  if(v==='datasource'&&!dsRendered&&window.__renderDataSource){dsRendered=true;window.__renderDataSource();}
  const mc=document.querySelector('.main-content');if(mc)mc.scrollTo(0,0);
}
window.addEventListener('hashchange',()=>{const h=(location.hash||'').replace('#','');if(LEAF[h])switchTab(h);});

/* ---- journey map: expand / full-screen ---- */
function toggleJourneyExpand(){
  const w=document.getElementById('bpCanvasWrap');if(!w)return;
  const on=w.classList.toggle('is-expanded');
  document.body.classList.toggle('bp-expanded-lock',on);
  const btn=document.getElementById('bpExpandBtn');
  if(btn){
    btn.setAttribute('aria-label',on?'Collapse':'Expand');
    btn.setAttribute('title',on?'Collapse':'Expand');
    btn.innerHTML = on
      ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h5V4"/><path d="M20 15h-5v5"/><path d="M15 4v5h5"/><path d="M9 20v-5H4"/></svg>'
      : '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>';
  }
}
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const w=document.getElementById('bpCanvasWrap');if(w&&w.classList.contains('is-expanded'))toggleJourneyExpand();}});

/* ---- init ---- */
renderSolutions();
(function(){const h=(location.hash||'').replace('#','');switchTab(LEAF[h]?h:'journey');})();
</script>
'''

# ---- data-source script, isolated in an IIFE ----
DS_WRAPPED = "\n<script>\n(function(){\n" + ds_script + "\n})();\n</script>\n"

# extract SOL_LIST source text
sol_list_text = re.search(r'const SOL_LIST = (\[.*?\n\]);', src_journey, re.S).group(1)

SYSINFO_TMPL = r'''
<section class="view" id="sysinfo">
  <div class="viewhead"><h2>System context &amp; documentation</h2>
    <p class="sub">Technical architecture, configuration hierarchy, and documentation references gathered from Hub and Adyen Docs &mdash; grounding the journey map in how the system actually works.</p></div>

  <div class="grid3" style="margin-bottom:28px">
    <div class="card prose">
      <h3>Supply chain journey</h3>
      <p>The IPP Platform Supply Chain team smooths the terminal's journey from <b>warehouse to merchant</b>:</p>
      <ul class="why-list">
        <li><span class="ix">&bull;</span><span><b>Dropshipping</b> &mdash; direct from warehouse to submerchant</span></li>
        <li><span class="ix">&bull;</span><span><b>Custom packaging</b> &mdash; leaflets, QR codes, branded boxes for platform merchants</span></li>
        <li><span class="ix">&bull;</span><span><b>Bulk shipping</b> &mdash; safety stock (max 6 months before firmware staleness)</span></li>
      </ul>
    </div>
    <div class="card prose">
      <h3>Terminal boarding journey</h3>
      <p>The boarding sequence, traceable via log queries:</p>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin:10px 0">
        <span class="opin">listStores</span><span style="color:var(--ink-faint)">&rarr;</span>
        <span class="opin">getConfiguration</span><span style="color:var(--ink-faint)">&rarr;</span>
        <span class="opin">selfBoarding</span><span style="color:var(--ink-faint)">&rarr;</span>
        <span class="opin">merchant.json</span><span style="color:var(--ink-faint)">&rarr;</span>
        <span class="opin">confirm</span><span style="color:var(--ink-faint)">&rarr;</span>
        <span class="opin">maintenance</span>
      </div>
      <p style="margin-bottom:0">Maps to journey steps <b>2.c &rarr; 3.c</b>: the terminal receives its identity, downloads config, and enters operational state.</p>
    </div>
    <div class="card prose">
      <h3>Configuration journey</h3>
      <p class="lead">Settings inherit downward through 5 levels; overrides propagate to children unless overridden further down.</p>
      <div style="background:var(--b-color-grey-100);border:1px solid var(--line);border-radius:8px;padding:12px 14px;font-family:var(--font-mono);font-size:12.5px;line-height:1.9;margin:12px 0">
        <span style="color:var(--accent-deep);font-weight:700">PSP</span> &rarr; <span style="color:var(--infra);font-weight:700">Company</span> &rarr; <span style="color:var(--partial);font-weight:700">Merchant</span> &rarr; <span style="color:var(--p1);font-weight:700">Store</span> &rarr; <span style="color:var(--p0);font-weight:700">Terminal</span>
      </div>
      <p><b>73% of settings</b> are overridden at the terminal level, with no single entry point for the settings application.</p>
      <p style="margin-bottom:0"><b>TFM</b> data model: tfmconfig, tfmterminal, store, account, tfmprofile. <b>EMV kernel config</b> runs a 5-phase flow on boot or settings change.</p>
    </div>
  </div>

  <h3 style="font-size:16px;margin-bottom:14px">Documentation references</h3>
  <div class="opp-grid">
    __HUB__
    __DOCS__
  </div>

  <div class="card prose" style="margin-top:28px">
    <h3>AfP terminal onboarding</h3>
    __QUOTE__
    <p style="font-size:12px;color:var(--ink-faint)">&mdash; Adyen Docs, Platforms Quickstart Guide</p>
    <div class="divider"></div>
    __RECS__
  </div>

  <div class="divider" style="margin:36px 0 28px"></div>
  __PORTFOLIO__
</section>
'''

def build_sysinfo():
    return (SYSINFO_TMPL
        .replace("__HUB__", hub_card)
        .replace("__DOCS__", docs_card)
        .replace("__QUOTE__", quote_block)
        .replace("__RECS__", recs_block)
        .replace("__PORTFOLIO__", sol_inner))

# ---- assemble ----
bp_css_extra = "\n/* ===== Service Blueprint (Journey map) CSS ===== */\n" + bp_style + "\n#journey .toolbar{align-items:flex-end}\n.bp-kpis .kpi .v{font-size:28px}\n" + r'''
/* ===== Journey map readability ===== */
.bp-phase{width:276px}
.bp-phhead{padding:14px 16px}
.bp-phlabel{font-size:14px;font-weight:700}
.bp-phsub{font-size:11.5px;margin-top:4px}
.bp-job{padding:15px 16px}
.bp-step{font-family:var(--font-mono);font-size:10.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-faint)}
.bp-big{font-size:14px;font-weight:600;line-height:1.4;margin-top:5px;color:var(--ink)}
.bp-meta{margin-top:10px}
/* Job -> Opportunities -> owner/size */
.bp-opps{margin-top:12px;padding-top:12px;border-top:1px dashed var(--line-soft);display:flex;flex-direction:column;gap:8px}
.bp-opps-h{font-family:var(--font-mono);font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-faint);font-weight:600}
.bp-opp2{background:var(--b-color-grey-100);border:1px solid var(--line-soft);border-radius:8px;padding:9px 11px}
.bp-oname2{font-size:12.5px;font-weight:600;color:var(--ink);line-height:1.4;margin-bottom:7px}
.bp-oname2 .bp-chk{color:#3a7d0a;font-weight:700}
.bp-otags2{display:flex;flex-wrap:wrap;gap:5px;align-items:center}
.bp-owner{font-family:var(--font-mono);font-size:9px;font-weight:600;padding:2px 7px;border-radius:5px;letter-spacing:.02em}
.bp-owner.owner-ipp{color:var(--accent-deep);background:var(--accent-tint)}
.bp-owner.owner-oc{color:var(--infra);background:rgba(15,117,220,.08)}
.bp-size2{font-family:var(--font-mono);font-size:9px;font-weight:700;color:var(--ink-soft);background:var(--b-color-grey-200);padding:2px 7px;border-radius:5px}
.bp-actor2{display:inline-flex;align-items:center;gap:5px;font-size:10.5px;font-weight:400;line-height:1.35;width:100%;margin-top:3px}
.bp-actor2 .bp-adot{width:6px;height:6px;border-radius:50%;flex:none}
.bp-sub-tag{font-size:11px}
/* sub-steps: uniform 3-row height, expand only when it overflows */
.bp-subs .bp-sub-body{max-height:80px;min-height:80px;overflow:hidden;margin-top:6px;transition:max-height .25s ease}
.bp-subs.open .bp-sub-body{max-height:600px}
.bp-subs--fit .bp-sub-body{max-height:none}
.bp-subs--fit .bp-subs-toggle{cursor:default}
.bp-subs--fit .bp-subs-toggle::before{visibility:hidden}
/* team ownership */
.bp-team{display:inline-flex;align-items:center;gap:5px;font-size:10.5px;font-weight:400}
.bp-team .bp-adot{width:7px;height:7px;border-radius:50%;flex:none}
.bp-nbadge{font-size:9.5px}
.bp-actor2{color:var(--ink-faint);font-weight:400;font-size:10.5px;line-height:1.35;width:100%;margin-top:5px}
.bp-actor2::before{content:"For: ";color:var(--ink-faint);opacity:.75}
.bp-phhead{min-height:122px;display:flex;flex-direction:column;box-sizing:border-box}
.bp-phteams{display:flex;flex-wrap:wrap;gap:4px 8px;margin-top:auto;padding-top:10px}
.bp-phteam{display:inline-flex;align-items:center;gap:5px;font-size:10px;font-weight:400}
.bp-phteam .bp-adot{width:6px;height:6px;border-radius:50%;flex:none}
.bp-legend{display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px;margin:0 0 16px;padding:12px 14px;
  border:1px solid var(--line);border-radius:12px;background:var(--panel)}
.bp-legend .lg-cap{font-size:11px;font-weight:700;color:var(--ink);margin-right:2px}
.bp-legend .lg-grp{font-size:10px;font-weight:600;color:var(--ink-faint);margin-left:6px}
.bp-legend .lg-item{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;color:var(--ink-soft)}
.bp-legend .lg-dot{width:9px;height:9px;border-radius:50%;flex:none}
.bp-howto{font-size:12.5px;color:var(--ink-soft);line-height:1.5;max-width:900px;margin:0 0 14px}
.bp-note{margin-top:11px;padding-top:11px;border-top:1px dashed var(--line-soft);font-size:11.5px;color:var(--ink-soft);line-height:1.55}
.bp-note b{color:var(--ink);font-weight:600}
/* swimlane blueprint + ownership matrix */
.bp-swim{width:100%;display:grid;gap:1px;background:var(--line);border:1px solid var(--line);border-radius:12px;overflow:hidden}
.bp-swim .bp-cell{background:var(--panel);padding:11px 13px;min-width:0;font-size:12px;box-sizing:border-box}
.bp-swim .bp-corner,.bp-swim .bp-rowlabel,.bp-swim .bp-ph-cell{background:var(--b-color-grey-100)}
.bp-swim .bp-rowlabel{font-weight:700;color:var(--ink-soft);font-size:11px;display:flex;align-items:center}
.bp-swim .bp-corner{font-size:10.5px;color:var(--ink-faint);display:flex;align-items:center}
.bp-swim .bp-ph-name{font-size:13px;font-weight:700;color:var(--ink)}
.bp-swim .bp-ph-sub{font-size:11px;color:var(--ink-faint);margin-top:2px}
.bp-swim .bp-job-line{font-size:12px;font-weight:600;color:var(--ink);line-height:1.35;margin-bottom:8px;cursor:pointer}
.bp-swim .bp-job-line:last-child{margin-bottom:0}
.bp-swim .bp-job-line:hover{text-decoration:underline}
.bp-swim .bp-friction{display:flex;flex-direction:column;align-items:flex-start;justify-content:center}
.bp-swim .bp-clk{cursor:pointer}
.bp-swim .bp-painnum{font-size:11.5px;font-weight:700;color:var(--gap)}
.bp-swim .bp-frichead{font-size:11px;font-weight:700;color:var(--gap);margin-bottom:7px}
.bp-swim .bp-frichead.bp-clk:hover{text-decoration:underline}
.bp-swim .bp-sentwrap{display:flex;flex-wrap:wrap}
.bp-swim .bp-empty{color:var(--ink-faint)}
.bp-swim .bp-oppchip{display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:600;padding:3px 8px;border:1px solid;border-radius:6px;margin:0 4px 4px 0;line-height:1.3}
.bp-swim .bp-team{display:inline-flex;align-items:center;gap:5px;font-size:10.5px;font-weight:400;margin:0 8px 5px 0}
.bp-swim .bp-cell-on{background:var(--b-color-background-primary)}
.bp-swim .bp-sent{display:inline-block;font-size:10.5px;font-weight:600;padding:3px 8px;border-radius:6px;margin:0 4px 4px 0;cursor:pointer;line-height:1.3}
.bp-swim .bp-sent:hover{filter:brightness(0.97)}
.bp-sent-crit{background:#fbe7e4;color:var(--gap)}
.bp-sent-high{background:#fef1e2;color:#b45309}
.bp-sent-med{background:#e6eef4;color:var(--infra)}
/* Cards view: let the frame hug all columns (so nothing is clipped) and scroll as one unit */
.bp-canvas.bp-canvas--hug{border:none;background:none;padding:0;border-radius:0}
.bp-canvas--hug .bp-flow{width:max-content;min-width:min-content;padding:4px 0 24px;border:none;border-radius:0;background:transparent}
/* transparent canvas, no outline box, left-aligned with the View control */
.bp-canvas,.journey-canvas{background:transparent;border:none;border-radius:0;padding-left:0;padding-right:0}
/* Journey map summary — Bento summary-block style: one container, divided cells */
.bp-kpis{display:flex;gap:0;background:var(--panel);border:1px solid var(--line);border-radius:12px;overflow:hidden;margin-bottom:28px}
.bp-kpis .kpi{flex:1;min-width:0;background:transparent;border:none;border-left:1px solid var(--line);border-radius:0;box-shadow:none;padding:16px 20px}
.bp-kpis .kpi:first-child,.bp-kpis .kpi:first-child.accent{border-left:none}
.bp-kpis .kpi.accent{border-left:1px solid var(--line)}
.bp-kpis .kpi .v{font-size:26px}
.bp-kpis .kpi[onclick]{cursor:pointer}
.bp-kpis .kpi[onclick]:hover{background:var(--b-color-grey-100)}
@media(max-width:640px){.bp-kpis{flex-wrap:wrap}.bp-kpis .kpi{flex:1 1 100%;border-left:none;border-top:1px solid var(--line)}.bp-kpis .kpi:first-child{border-top:none}}
/* Cards view: per-phase Friction & sentiment box (white, collapsible, below sub-steps) */
.bp-fs-box{margin:6px 0 2px;border:1px solid var(--line);border-radius:10px;background:var(--panel);overflow:hidden}
.bp-fs-toggle{display:flex;align-items:center;gap:8px;padding:10px 12px;cursor:pointer;user-select:none}
.bp-fs-count{font-size:10px;font-weight:700;color:var(--ink-soft);background:var(--b-color-grey-100);border-radius:5px;padding:1px 6px}
.bp-fs-caret{margin-left:auto;flex:none;color:var(--ink-faint);transition:transform .2s ease}
.bp-fs-box.open .bp-fs-caret{transform:rotate(180deg)}
.bp-fs-body{max-height:0;overflow:hidden;transition:max-height .25s ease;padding:0 12px}
.bp-fs-box.open .bp-fs-body{max-height:600px;padding:2px 12px 12px}
.bp-fs-h{font-family:var(--font-mono);font-size:9.5px;color:var(--ink-faint);font-weight:600}
.bp-fs-box .bp-frichead{font-size:11px;font-weight:700;color:var(--gap);margin-bottom:7px}
.bp-fs-box .bp-frichead.bp-clk{cursor:pointer}
.bp-fs-box .bp-frichead.bp-clk:hover{text-decoration:underline}
.bp-fs-box .bp-sentwrap{display:flex;flex-wrap:wrap}
.bp-fs-box .bp-sent{display:inline-block;font-size:10px;font-weight:600;padding:2px 7px;border-radius:6px;margin:0 4px 4px 0;cursor:pointer;line-height:1.3}
.bp-fs-box .bp-sent:hover{filter:brightness(0.97)}
.bp-fs-empty{font-size:11px;color:var(--ink-faint)}
/* simpler, neutral dropdowns (no green) */
.ms-btn:hover,.ms-btn.open{border-color:var(--ink-faint)}
.ms-drop{box-shadow:var(--b-shadow-low)}
.ms-drop label:hover{background:var(--b-color-background-secondary)}
.ms-drop label input{accent-color:var(--ink)}
.ms-group-hdr .ms-grp-btn{color:var(--ink-soft)}
.toolbar .freset:hover,.tbl-filters .freset:hover{border-color:var(--ink-faint);color:var(--ink)}
.tbl-filters select:focus{border-color:var(--ink-faint)}
/* expand / full-screen */
.bp-howto-row{display:flex;align-items:flex-start;gap:16px;margin:0 0 14px}
.bp-howto-row .bp-howto{margin:0;flex:1}
.bp-howto-row .bp-expand{flex:none;margin-top:1px}
.bp-expand{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;padding:0;box-sizing:border-box;
  border:1px solid var(--line);border-radius:8px;background:var(--panel);color:var(--ink);cursor:pointer;box-shadow:var(--b-shadow-low)}
.bp-expand:hover{background:var(--b-color-background-secondary);border-color:var(--ink-faint)}
/* align all toolbar controls to a common 34px height */
#journey .toolbar .ms-btn{height:34px;box-sizing:border-box;padding-top:0;padding-bottom:0;line-height:32px}
#journey .toolbar .jtoggle{height:34px;box-sizing:border-box}
#journey .toolbar .freset{height:34px;box-sizing:border-box;padding-top:0;padding-bottom:0;line-height:32px}
.bp-canvas.is-expanded{position:fixed;inset:24px;z-index:400;margin:0;max-height:none;
  border:1px solid var(--line);border-radius:14px;background:var(--panel);
  box-shadow:0 24px 60px rgba(0,18,34,0.28);overflow:auto;padding:56px 28px 28px}
.bp-canvas.is-expanded .bp-flow{border:none;background:none;padding:0}
body.bp-expanded-lock{overflow:hidden}
body.bp-expanded-lock::before{content:"";position:fixed;inset:0;background:rgba(0,18,34,0.5);z-index:399}
body.bp-expanded-lock .bp-expand{position:fixed;top:38px;right:42px;z-index:401}
'''
DASH_CSS = r'''
/* ===== Context sentiment dashboard ===== */
.barlist{display:flex;flex-direction:column;gap:7px;margin-top:6px}
.bar-row{display:grid;grid-template-columns:190px 1fr 58px;align-items:center;gap:12px}
.bar-name{font-size:12px;color:var(--ink-soft);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bar-track{height:14px;background:var(--b-color-grey-200);border-radius:5px;overflow:hidden}
.bar-fill{height:100%;background:linear-gradient(90deg,var(--accent-deep),var(--accent));border-radius:5px}
.bar-val{font-family:var(--font-mono);font-size:11px;font-weight:600;color:var(--ink);text-align:right}
.nps-row{display:grid;grid-template-columns:96px 1fr 44px;align-items:center;gap:10px;margin-bottom:8px}
.nps-lab{font-size:12px;color:var(--ink-soft)}
.nps-track{height:16px;background:var(--b-color-grey-200);border-radius:6px;overflow:hidden}
.nps-fill{height:100%;border-radius:6px}
.nps-fill.ipp{background:var(--gap)}.nps-fill.base{background:var(--accent)}
.nps-num{font-family:var(--font-mono);font-size:13px;font-weight:700;color:var(--ink);text-align:right}
.nps-gap{margin-top:10px;font-size:12px;color:var(--ink-soft);border-top:1px solid var(--line-soft);padding-top:10px}
.ins-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.ins-card{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:16px 18px;position:relative;box-shadow:none;border-left-width:4px}
.ins-card.ins-crit{border-left-color:var(--gap)}
.ins-card.ins-high{border-left-color:var(--p1)}
.ins-card.ins-med{border-left-color:var(--infra)}
.ins-top{display:flex;align-items:center;gap:9px;margin-bottom:8px}
.ins-rank{font-family:var(--font-mono);font-size:13px;font-weight:700;color:var(--ink-faint)}
.sev{font-family:var(--font-mono);font-size:10px;font-weight:600;padding:3px 9px;border-radius:6px;letter-spacing:.02em}
.sev-crit{background:#fbe7e4;color:var(--gap)}
.sev-high{background:#fef1e2;color:#b45309}
.sev-med{background:#e6eef4;color:var(--infra)}
.ins-title{font-size:14px;font-weight:600;line-height:1.3;margin-bottom:7px;color:var(--ink)}
.ins-desc{font-size:12.5px;color:var(--ink-soft);line-height:1.5;margin-bottom:10px}
.ins-meta{font-family:var(--font-mono);font-size:10px;color:var(--ink-faint);line-height:1.5;margin-bottom:10px}
.ins-q{font-size:12px;color:var(--ink-soft);font-style:italic;line-height:1.5;background:var(--b-color-grey-100);border-radius:8px;padding:10px 12px;margin-bottom:10px}
.ins-rec{font-size:12.5px;color:var(--accent-deep);line-height:1.45;display:flex;gap:6px}
.ins-rec .arr{flex:none;font-weight:700}
.ins-journey{margin-top:10px;padding-top:10px;border-top:1px solid var(--line-soft);display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.ins-jlabel{font-family:var(--font-mono);font-size:9.5px;letter-spacing:.06em;color:var(--ink-faint);font-weight:600;text-transform:uppercase;margin-right:2px}
.ins-jchip{font-size:10px;font-weight:600;color:var(--ink-soft);background:var(--b-color-grey-100);border:1px solid var(--line-soft);border-radius:5px;padding:2px 7px}
@media(max-width:900px){.ins-grid{grid-template-columns:1fr}.bar-row{grid-template-columns:140px 1fr 52px}}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;align-items:stretch}
.grid3 .card{height:100%}
@media(max-width:960px){.grid3{grid-template-columns:1fr}}
'''
UI_POLISH_CSS = r'''
/* ===== UI polish: Bento surfaces, font & spacing ===== */
:root{
  /* everything on Adyen UI */
  --font-sans:'Adyen UI', var(--b-font-family-primary);
  --font-mono:'Adyen UI', var(--b-font-family-primary);
  /* re-point the ported spacing scale onto Bento spacers */
  --spacing-3xs:var(--b-spacer-020); /* 4 */
  --spacing-2xs:var(--b-spacer-050); /* 10 */
  --spacing-xs:var(--b-spacer-060);  /* 12 */
  --spacing-s:var(--b-spacer-080);   /* 20 */
}
/* sidebar stays grey; main content one step lighter */
body{background:var(--b-color-background-secondary);background-image:none;
  font-family:'Adyen UI', var(--b-font-family-primary)}
.sidebar{background:var(--b-color-background-secondary)}
.main-content{background:#FBFBFC}
/* single font family across the pages */
h1,h2,h3,.mono,.eyebrow,.src-meta,.sev,.badge,.opin,.bar-val,.nps-num,.ins-rank,.sb-section-label{font-family:'Adyen UI', var(--b-font-family-primary)}
/* regular spacing, no uppercase, anywhere */
*{letter-spacing:normal !important;text-transform:none !important;font-family:'Adyen UI', var(--b-font-family-primary)}
/* Bento spacing rhythm for the shell */
.wrap{padding:0 var(--b-spacer-100)}                 /* 32 */
section.view{padding:var(--b-spacer-100) 0 var(--b-spacer-140)} /* 32 / 64 */
.sidebar{padding:var(--b-spacer-040) var(--b-spacer-040) var(--b-spacer-060)}
.sb-link{padding:var(--b-spacer-050) var(--b-spacer-050);border-radius:var(--b-border-radius-m)}
.viewhead{padding-bottom:var(--b-spacer-070);margin-bottom:var(--b-spacer-090)}
.card,.chart-card,.opp,.ins-card,.kpi,.sol-card,.heatwrap,.journey-canvas,.bp-canvas,.jtbdwrap{border-radius:var(--b-border-radius-l)}
'''
head = HEAD.replace("__CONTENT_CSS__", style_inner + bp_css_extra + DASH_CSS + UI_POLISH_CSS)
journey_script = (JOURNEY_SCRIPT
    .replace("__DATA__", DATA_JSON.strip())
    .replace("__JTBD_JOURNEY__", jtbd_journey_text)
    .replace("__SOL_LIST__", sol_list_text))

main = (
    '<div class="main-content">' +
    '<main class="wrap">\n' +
    build_overview() + "\n" + JOURNEY_BP + "\n" +
    build_sysinfo() + "\n" + DATASOURCE + "\n" +
    '</main>\n' +
    '<div class="scrim" id="scrim"></div>\n<aside class="drawer" id="drawer"></aside>\n<div class="htip" id="htip"></div>\n' +
    '</div><!-- /main-content -->\n'
)

# inject the sentiment insights (mapped to phases) so the swimlane lane + drawer can use them
_insights_js = [{'n': r, 'sev': s, 'sevlbl': sl, 'title': t, 'short': INSIGHT_SHORT[i],
                 'desc': d, 'meta': m, 'quote': q, 'rec': rc, 'phases': INSIGHT_PHASES[i]}
                for i, (r, s, sl, t, d, m, q, rc) in enumerate(INSIGHTS)]
bp_script = "var IPP_INSIGHTS = " + json.dumps(_insights_js) + ";\n" + bp_script
BP_WRAPPED = "\n<script>\n(function(){\n" + bp_script + "\n})();\n</script>\n"

html = head + GATE + SIDEBAR + main + journey_script + BP_WRAPPED + DS_WRAPPED + "\n</body>\n</html>\n"
# canonicalize persona names everywhere (incl. legacy JTBD_OPPS) so no stale names linger
for _old, _new in _ACTOR_RENAMES:
    html = html.replace('"' + _old + '"', '"' + _new + '"').replace("'" + _old + "'", "'" + _new + "'")

APP.mkdir(exist_ok=True)
out = APP / "ipp-journey.dc.html"
out.write_text(html)
print("wrote", out, len(html), "bytes")

# copy CSV assets used by the data-source downloads
import shutil
for csv in ["JTBD_Journey_Map.csv","JTBD_Consolidated.csv","JTBD_Opportunities.csv","JTBD_Journey_Research_Evidence.csv","JTBD_Converged_Journey.csv"]:
    p = HERE / csv
    if p.exists(): shutil.copy(p, APP / csv)
print("copied CSVs")
