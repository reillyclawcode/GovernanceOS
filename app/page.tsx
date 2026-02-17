"use client";
import { useEffect, useState, useMemo } from "react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

/* Types */
interface Pillar { id:string; title:string; icon:string; color:string; desc:string; principles:string[] }
interface Charter { title:string; purpose:string; pillars:Pillar[]; enforcement:string }
interface Demographics { age18_34:number; age35_54:number; age55plus:number; female:number; male:number; nonbinary:number }
interface Assembly { id:string; name:string; domain:string; members:number; demographics:Demographics; meetingsHeld:number; decisionsIssued:number; bindingRate:number; avgTurnout:number; stipendPerSession:number; nextSession:string }
interface ModuleMetrics { [key:string]: any }
interface GovModule { id:string; title:string; status:string; version:string; desc:string; features:string[]; techStack:string; metrics:ModuleMetrics }
interface AuditYear { year:number; audited:number; total:number; incidents:number; resolved:number }
interface DemographicEquity { [key:string]: number }
interface Participation { totalResidents:number; registered:number; activeVoters:number; assemblyParticipants:number; avgTurnoutRate:number; quadraticVotesLastQuarter:number; demographicEquity:DemographicEquity; satisfactionIndex:number; accessibilityScore:number }
interface FundingItem { label:string; value:string; sub:string; color:string }
interface SeedData { charter:Charter; assemblies:Assembly[]; modules:GovModule[]; auditTimeline:AuditYear[]; participation:Participation; fundingStack:FundingItem[] }

type Tab = "overview" | "charter" | "assemblies" | "modules" | "audits" | "participation";

const fmtK = (n:number) => n >= 1_000_000 ? `${(n/1_000_000).toFixed(1)}M` : n >= 1_000 ? `${(n/1_000).toFixed(0)}K` : n.toString();
const pct = (n:number) => `${(n*100).toFixed(0)}%`;

function Heading({ icon, title, sub }: { icon:string; title:string; sub?:string }) {
  return (<div className="mb-6"><h2 className="text-xl font-semibold flex items-center gap-2" style={{fontFamily:"'Space Grotesk',sans-serif"}}><span className="text-2xl">{icon}</span> {title}</h2>{sub && <p className="text-sm mt-1" style={{color:"var(--text-muted)"}}>{sub}</p>}</div>);
}
function Stat({ label, value, sub, color }: { label:string; value:string; sub?:string; color?:string }) {
  return (<div className="glass-card p-4"><p className="text-xs uppercase tracking-wider mb-1" style={{color:"var(--text-faint)"}}>{label}</p><p className="text-2xl font-bold" style={{color:color||"var(--violet)",fontFamily:"'Space Grotesk',sans-serif"}}>{value}</p>{sub && <p className="text-xs mt-1" style={{color:"var(--text-muted)"}}>{sub}</p>}</div>);
}

export default function Home() {
  const [data, setData] = useState<SeedData|null>(null);
  const [tab, setTab] = useState<Tab>("overview");
  const [selectedAssembly, setSelectedAssembly] = useState<string|null>(null);
  const [selectedModule, setSelectedModule] = useState<string|null>(null);

  useEffect(() => { fetch("/data/seed.json").then(r=>r.json()).then(setData).catch(console.error); }, []);

  if (!data) return (<main className="min-h-screen flex items-center justify-center"><div className="text-center space-y-3"><div className="text-4xl animate-pulse">{"\u{1F3DB}\uFE0F"}</div><p className="text-sm" style={{color:"var(--text-muted)"}}>Loading GovernanceOS&hellip;</p></div></main>);

  const TABS: {id:Tab;label:string;icon:string}[] = [
    {id:"overview",label:"Overview",icon:"\u{1F4CA}"},{id:"charter",label:"Charter",icon:"\u{1F4DC}"},
    {id:"assemblies",label:"Assemblies",icon:"\u{1F5F3}\uFE0F"},{id:"modules",label:"Modules",icon:"\u{1F9E9}"},
    {id:"audits",label:"Audit Tracker",icon:"\u{1F50D}"},{id:"participation",label:"Participation",icon:"\u{1F465}"},
  ];

  const activeAssembly = data.assemblies.find(a=>a.id===selectedAssembly);
  const activeModule = data.modules.find(m=>m.id===selectedModule);
  const totalDecisions = data.assemblies.reduce((s,a)=>s+a.decisionsIssued,0);
  const avgBinding = data.assemblies.reduce((s,a)=>s+a.bindingRate,0)/data.assemblies.length;
  const latestAudit = data.auditTimeline[data.auditTimeline.length-1];

  return (
    <main className="min-h-screen pb-20">
      <header className="pt-10 pb-8 px-4" style={{background:"linear-gradient(180deg,rgba(139,92,246,0.06) 0%,transparent 100%)"}}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{color:"var(--violet)"}}>GovernanceOS</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{fontFamily:"'Space Grotesk',sans-serif"}}>Civic Governance Dashboard</h1>
          <p className="text-sm max-w-2xl" style={{color:"var(--text-muted)"}}>Charter frameworks, citizen assemblies, governance modules, audit tracking, and participatory tools. The institutional backbone of the AI Civilization framework.</p>
          <div className="flex flex-wrap gap-3 mt-5">
            <a href="https://github.com/reillyclawcode/GovernanceOS" target="_blank" rel="noopener" className="text-xs px-3 py-1.5 rounded-full" style={{background:"rgba(139,92,246,0.12)",color:"#a78bfa",border:"1px solid rgba(139,92,246,0.3)"}}>{"\u{1F4BB}"} GitHub</a>
            <a href="https://reillyclawcode.github.io/clawcodeblog/research/ai-civilization/" target="_blank" rel="noopener" className="text-xs px-3 py-1.5 rounded-full" style={{background:"rgba(245,158,11,0.12)",color:"#fbbf24",border:"1px solid rgba(245,158,11,0.3)"}}>{"\u{1F4DC}"} Research Paper</a>
            <a href="https://github.com/reillyclawcode/simulation" target="_blank" rel="noopener" className="text-xs px-3 py-1.5 rounded-full" style={{background:"rgba(14,165,233,0.12)",color:"#38bdf8",border:"1px solid rgba(14,165,233,0.3)"}}>{"\u{1F52C}"} Simulation</a>
            <a href="https://github.com/reillyclawcode/transitionOS" target="_blank" rel="noopener" className="text-xs px-3 py-1.5 rounded-full" style={{background:"rgba(16,185,129,0.12)",color:"#34d399",border:"1px solid rgba(16,185,129,0.3)"}}>{"\u{1F6E0}\uFE0F"} TransitionOS</a>
            <a href="https://civilization-os-3nlf.vercel.app/" target="_blank" rel="noopener" className="text-xs px-3 py-1.5 rounded-full" style={{background:"rgba(245,158,11,0.12)",color:"#fbbf24",border:"1px solid rgba(245,158,11,0.3)"}}>{"\u{1F30D}"} CivilizationOS</a>
            <a href="https://climate-os.vercel.app/" target="_blank" rel="noopener" className="text-xs px-3 py-1.5 rounded-full" style={{background:"rgba(20,184,166,0.12)",color:"#2dd4bf",border:"1px solid rgba(20,184,166,0.3)"}}>{"\u{1F331}"} ClimateOS</a>
            <a href="https://reillyclawcode.github.io/clawcodeblog/" target="_blank" rel="noopener" className="text-xs px-3 py-1.5 rounded-full" style={{background:"rgba(100,116,139,0.12)",color:"#94a3b8",border:"1px solid rgba(100,116,139,0.3)"}}>{"\u{1F4DD}"} Blog</a>
          </div>
        </div>
      </header>

      <nav className="sticky top-0 z-50 px-4 py-3" style={{background:"rgba(3,7,18,0.85)",backdropFilter:"blur(12px)",borderBottom:"1px solid var(--card-border)"}}>
        <div className="max-w-6xl mx-auto flex gap-2 overflow-x-auto">
          {TABS.map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} className={`tab-btn whitespace-nowrap ${tab===t.id?"tab-btn-active":""}`}>{t.icon} {t.label}</button>))}
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 mt-8">

        {/* OVERVIEW */}
        {tab==="overview" && (<section>
          <Heading icon={"\u{1F4CA}"} title="Governance Overview" sub="Key institutional metrics at a glance" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <Stat label="Assemblies active" value={`${data.assemblies.length}`} color="var(--violet)" />
            <Stat label="Decisions issued" value={`${totalDecisions}`} sub={`${pct(avgBinding)} binding`} color="var(--emerald)" />
            <Stat label="Modules deployed" value={`${data.modules.filter(m=>m.status==="GA").length}`} sub={`of ${data.modules.length} total`} color="var(--sky)" />
            <Stat label="Registered voters" value={fmtK(data.participation.registered)} sub={`of ${fmtK(data.participation.totalResidents)}`} color="var(--amber)" />
          </div>
          <div className="glass-card p-6 mb-8">
            <h3 className="text-sm font-semibold mb-4" style={{color:"var(--text)"}}>Charter Pillars</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {data.charter.pillars.map(p => (
                <div key={p.id} className="glass-card p-4" style={{borderLeft:`3px solid ${p.color}`}}>
                  <div className="flex items-center gap-2 mb-2"><span className="text-xl">{p.icon}</span><p className="text-sm font-semibold" style={{color:p.color}}>{p.title}</p></div>
                  <p className="text-xs" style={{color:"var(--text-muted)"}}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card p-6 mb-8">
            <h3 className="text-sm font-semibold mb-4" style={{color:"var(--text)"}}>AI Audit Coverage (10-Year Projection)</h3>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={data.auditTimeline}>
                <defs><linearGradient id="aud-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3}/><stop offset="100%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="year" tick={{fill:"#94a3b8",fontSize:11}} /><YAxis domain={[0,100]} tick={{fill:"#94a3b8",fontSize:11}} />
                <Tooltip contentStyle={{background:"rgba(15,23,42,0.95)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",color:"#e2e8f0",fontSize:"11px"}} />
                <Area type="monotone" dataKey="audited" stroke="#8b5cf6" fill="url(#aud-g)" strokeWidth={2} name="% High-Risk AI Audited" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-sm font-semibold mb-4" style={{color:"var(--text)"}}>Funding Stack</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.fundingStack.map(f => (
                <div key={f.label} className="glass-card p-4">
                  <p className="text-[10px] uppercase tracking-wider mb-1" style={{color:"var(--text-faint)"}}>{f.label}</p>
                  <p className="text-lg font-bold" style={{color:f.color,fontFamily:"'Space Grotesk',sans-serif"}}>{f.value}</p>
                  <p className="text-xs" style={{color:"var(--text-muted)"}}>{f.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>)}

        {/* CHARTER */}
        {tab==="charter" && (<section>
          <Heading icon={"\u{1F4DC}"} title={data.charter.title} sub={data.charter.purpose} />
          <div className="space-y-6 mb-8">
            {data.charter.pillars.map(p => (
              <div key={p.id} className="glass-card p-6" style={{borderLeft:`3px solid ${p.color}`}}>
                <div className="flex items-center gap-3 mb-4"><span className="text-3xl">{p.icon}</span><div><h3 className="text-lg font-semibold" style={{color:p.color}}>{p.title}</h3><p className="text-xs" style={{color:"var(--text-muted)"}}>{p.desc}</p></div></div>
                <div className="space-y-2">
                  {p.principles.map((pr,i) => (
                    <div key={i} className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{background:`${p.color}22`,color:p.color}}>{i+1}</span>
                      <p className="text-xs leading-relaxed" style={{color:"var(--text-muted)"}}>{pr}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="glass-card p-6" style={{borderLeft:"3px solid var(--emerald)"}}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{color:"var(--emerald)"}}>Enforcement</p>
            <p className="text-sm leading-relaxed" style={{color:"var(--text-muted)"}}>{data.charter.enforcement}</p>
          </div>
        </section>)}

        {/* ASSEMBLIES */}
        {tab==="assemblies" && (<section>
          <Heading icon={"\u{1F5F3}\uFE0F"} title="Citizen Assemblies" sub="Randomly stratified assemblies mirroring local demographics. Stipends, childcare, transit passes, and language access remove participation barriers." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {data.assemblies.map(a => (
              <button key={a.id} onClick={()=>setSelectedAssembly(a.id===selectedAssembly?null:a.id)} className={`glass-card p-5 text-left w-full transition-all ${selectedAssembly===a.id?"ring-2 ring-violet-400/50 border-violet-400/30":""} hover:border-white/20`}>
                <h4 className="text-sm font-semibold mb-1" style={{color:"var(--text)"}}>{a.name}</h4>
                <p className="text-xs mb-3" style={{color:"var(--text-muted)"}}>{a.domain} &middot; {a.members} members</p>
                <div className="flex gap-3 text-[10px]">
                  <span style={{color:"var(--emerald)"}}>{a.decisionsIssued} decisions</span>
                  <span style={{color:"var(--violet)"}}>{pct(a.bindingRate)} binding</span>
                  <span style={{color:"var(--sky)"}}>{pct(a.avgTurnout)} turnout</span>
                </div>
              </button>
            ))}
          </div>
          {activeAssembly && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-1" style={{color:"var(--text)"}}>{activeAssembly.name}</h3>
              <p className="text-xs mb-4" style={{color:"var(--text-muted)"}}>{activeAssembly.domain} &middot; Next session: {activeAssembly.nextSession}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="glass-card p-3 text-center"><p className="text-lg font-bold" style={{color:"var(--violet)"}}>{activeAssembly.members}</p><p className="text-[10px]" style={{color:"var(--text-faint)"}}>Members</p></div>
                <div className="glass-card p-3 text-center"><p className="text-lg font-bold" style={{color:"var(--emerald)"}}>{activeAssembly.decisionsIssued}</p><p className="text-[10px]" style={{color:"var(--text-faint)"}}>Decisions</p></div>
                <div className="glass-card p-3 text-center"><p className="text-lg font-bold" style={{color:"var(--sky)"}}>{pct(activeAssembly.avgTurnout)}</p><p className="text-[10px]" style={{color:"var(--text-faint)"}}>Turnout</p></div>
                <div className="glass-card p-3 text-center"><p className="text-lg font-bold" style={{color:"var(--amber)"}}>${activeAssembly.stipendPerSession}</p><p className="text-[10px]" style={{color:"var(--text-faint)"}}>Stipend/session</p></div>
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{color:"var(--violet)"}}>Demographics</p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[{label:"18\u201334",val:activeAssembly.demographics.age18_34},{label:"35\u201354",val:activeAssembly.demographics.age35_54},{label:"55+",val:activeAssembly.demographics.age55plus},{label:"Female",val:activeAssembly.demographics.female},{label:"Male",val:activeAssembly.demographics.male},{label:"Non-binary",val:activeAssembly.demographics.nonbinary}].map(d => (
                  <div key={d.label} className="rounded-lg border border-white/5 bg-white/[0.02] p-2 text-center">
                    <p className="text-sm font-bold" style={{color:"var(--text)"}}>{d.val}%</p>
                    <p className="text-[10px]" style={{color:"var(--text-faint)"}}>{d.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {!activeAssembly && <div className="glass-card p-8 text-center"><p className="text-3xl mb-3">{"\u{1F5F3}\uFE0F"}</p><p className="text-sm" style={{color:"var(--text-muted)"}}>Select an assembly to explore its details and demographics.</p></div>}
        </section>)}

        {/* MODULES */}
        {tab==="modules" && (<section>
          <Heading icon={"\u{1F9E9}"} title="Governance Modules" sub="Composable building blocks: cities adopt independently via APIs" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {data.modules.map(m => (
              <button key={m.id} onClick={()=>setSelectedModule(m.id===selectedModule?null:m.id)} className={`glass-card p-5 text-left w-full transition-all ${selectedModule===m.id?"ring-2 ring-violet-400/50 border-violet-400/30":""} hover:border-white/20`}>
                <div className="flex items-center justify-between mb-2"><h4 className="text-sm font-semibold" style={{color:"var(--text)"}}>{m.title}</h4><span className={`text-[10px] px-2 py-0.5 rounded-full ${m.status==="GA"?"bg-emerald-500/15 text-emerald-400 border border-emerald-500/30":"bg-amber-500/15 text-amber-400 border border-amber-500/30"}`}>{m.status} v{m.version}</span></div>
                <p className="text-xs" style={{color:"var(--text-muted)"}}>{m.desc.length > 100 ? m.desc.slice(0,100) + "\u2026" : m.desc}</p>
              </button>
            ))}
          </div>
          {activeModule && (
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4"><div><h3 className="text-lg font-semibold" style={{color:"var(--text)"}}>{activeModule.title}</h3><p className="text-xs" style={{color:"var(--text-muted)"}}>{activeModule.desc}</p></div><span className={`text-xs px-3 py-1 rounded-full ${activeModule.status==="GA"?"bg-emerald-500/15 text-emerald-400 border border-emerald-500/30":"bg-amber-500/15 text-amber-400 border border-amber-500/30"}`}>{activeModule.status} v{activeModule.version}</span></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{color:"var(--violet)"}}>Features</p>
                  <div className="space-y-2">{activeModule.features.map((f,i)=>(<div key={i} className="flex items-start gap-2 text-xs" style={{color:"var(--text-muted)"}}><span style={{color:"var(--violet)"}}>{"\u2022"}</span>{f}</div>))}</div>
                  <p className="text-xs font-semibold uppercase tracking-widest mt-4 mb-2" style={{color:"var(--sky)"}}>Tech Stack</p>
                  <p className="text-xs" style={{color:"var(--text-muted)"}}>{activeModule.techStack}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{color:"var(--emerald)"}}>Metrics</p>
                  <div className="space-y-2">{Object.entries(activeModule.metrics).map(([k,v])=>(<div key={k} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-3"><span className="text-xs" style={{color:"var(--text-muted)"}}>{k.replace(/_/g," ").replace(/\b\w/g,c=>c.toUpperCase())}</span><span className="text-sm font-bold" style={{color:"var(--text)"}}>{typeof v === "number" && v > 1000 ? fmtK(v) : String(v)}</span></div>))}</div>
                </div>
              </div>
            </div>
          )}
          {!activeModule && <div className="glass-card p-8 text-center"><p className="text-3xl mb-3">{"\u{1F9E9}"}</p><p className="text-sm" style={{color:"var(--text-muted)"}}>Select a module to explore its features, tech stack, and live metrics.</p></div>}
        </section>)}

        {/* AUDIT TRACKER */}
        {tab==="audits" && (<section>
          <Heading icon={"\u{1F50D}"} title="AI Audit Tracker" sub="Tracking coverage of high-risk AI systems from 10% (2026) to 100% (2035). Threshold breaches trigger automatic policy reviews." />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <Stat label="Current coverage" value={`${latestAudit?.audited ?? 0}%`} color="var(--violet)" />
            <Stat label="Systems tracked" value={`${latestAudit?.total ?? 0}`} color="var(--sky)" />
            <Stat label="Incidents (latest yr)" value={`${latestAudit?.incidents ?? 0}`} sub={`${latestAudit?.resolved ?? 0} resolved`} color="var(--rose)" />
            <Stat label="Resolution rate" value={latestAudit ? pct(latestAudit.resolved / Math.max(1, latestAudit.incidents)) : "N/A"} color="var(--emerald)" />
          </div>
          <div className="glass-card p-6 mb-6">
            <h3 className="text-sm font-semibold mb-1" style={{color:"var(--text)"}}>Audit Coverage Over Time</h3>
            <p className="text-xs mb-4" style={{color:"var(--text-faint)"}}>% of high-risk AI systems with participatory safety reviews</p>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.auditTimeline}>
                <defs><linearGradient id="at-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3}/><stop offset="100%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="year" tick={{fill:"#94a3b8",fontSize:11}} /><YAxis domain={[0,100]} tick={{fill:"#94a3b8",fontSize:11}} />
                <Tooltip contentStyle={{background:"rgba(15,23,42,0.95)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",color:"#e2e8f0",fontSize:"11px"}} />
                <Area type="monotone" dataKey="audited" stroke="#8b5cf6" fill="url(#at-g)" strokeWidth={2} name="% Audited" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-sm font-semibold mb-4" style={{color:"var(--text)"}}>Incident Timeline</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={data.auditTimeline}>
                <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="year" tick={{fill:"#94a3b8",fontSize:11}} /><YAxis tick={{fill:"#94a3b8",fontSize:11}} />
                <Tooltip contentStyle={{background:"rgba(15,23,42,0.95)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",color:"#e2e8f0",fontSize:"11px"}} />
                <Bar dataKey="incidents" fill="#f43f5e" name="Incidents" radius={[4,4,0,0]} />
                <Bar dataKey="resolved" fill="#10b981" name="Resolved" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>)}

        {/* PARTICIPATION */}
        {tab==="participation" && (<section>
          <Heading icon={"\u{1F465}"} title="Participation & Equity" sub="Measuring who participates, demographic equity, accessibility, and satisfaction" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <Stat label="Registered" value={fmtK(data.participation.registered)} sub={`of ${fmtK(data.participation.totalResidents)}`} color="var(--violet)" />
            <Stat label="Active voters" value={fmtK(data.participation.activeVoters)} color="var(--emerald)" />
            <Stat label="Avg turnout" value={pct(data.participation.avgTurnoutRate)} color="var(--sky)" />
            <Stat label="Quadratic votes (Q)" value={fmtK(data.participation.quadraticVotesLastQuarter)} color="var(--amber)" />
          </div>
          <div className="glass-card p-6 mb-6">
            <h3 className="text-sm font-semibold mb-4" style={{color:"var(--text)"}}>Demographic Equity Index</h3>
            <p className="text-xs mb-4" style={{color:"var(--text-faint)"}}>1.0 = perfect parity between demographic group participation and population share</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(data.participation.demographicEquity).map(([k,v]) => {
                const color = v >= 0.95 ? "#10b981" : v >= 0.85 ? "#0ea5e9" : v >= 0.75 ? "#f59e0b" : "#f43f5e";
                return (
                  <div key={k} className="glass-card p-4 text-center">
                    <p className="text-2xl font-bold" style={{color,fontFamily:"'Space Grotesk',sans-serif"}}>{v.toFixed(2)}</p>
                    <p className="text-xs mt-1" style={{color:"var(--text-muted)"}}>{k.replace(/_/g," ").replace(/\b\w/g,c=>c.toUpperCase())}</p>
                    <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{background:"rgba(255,255,255,0.05)"}}><div className="h-full rounded-full" style={{width:`${v*100}%`,background:color,opacity:0.7}} /></div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-card p-6">
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{color:"var(--violet)"}}>Satisfaction Index</p>
              <p className="text-4xl font-bold" style={{color:"var(--violet)",fontFamily:"'Space Grotesk',sans-serif"}}>{data.participation.satisfactionIndex}</p>
              <p className="text-xs mt-1" style={{color:"var(--text-muted)"}}>out of 5.0 &mdash; based on biannual resident surveys</p>
              <div className="mt-3 h-2 rounded-full overflow-hidden" style={{background:"rgba(255,255,255,0.05)"}}><div className="h-full rounded-full" style={{width:`${data.participation.satisfactionIndex/5*100}%`,background:"var(--violet)",opacity:0.7}} /></div>
            </div>
            <div className="glass-card p-6">
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{color:"var(--sky)"}}>Accessibility Score</p>
              <p className="text-4xl font-bold" style={{color:"var(--sky)",fontFamily:"'Space Grotesk',sans-serif"}}>{pct(data.participation.accessibilityScore)}</p>
              <p className="text-xs mt-1" style={{color:"var(--text-muted)"}}>Screen reader, multi-language, IVR, large print, offline support</p>
              <div className="mt-3 h-2 rounded-full overflow-hidden" style={{background:"rgba(255,255,255,0.05)"}}><div className="h-full rounded-full" style={{width:`${data.participation.accessibilityScore*100}%`,background:"var(--sky)",opacity:0.7}} /></div>
            </div>
          </div>
          <div className="glass-card p-6 mt-6">
            <h3 className="text-sm font-semibold mb-4" style={{color:"var(--text)"}}>Assembly Participation Breakdown</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={data.assemblies.map(a=>({name:a.name.replace(" Assembly",""),members:a.members,turnout:Math.round(a.avgTurnout*100)}))}>
                <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" tick={{fill:"#94a3b8",fontSize:9}} /><YAxis tick={{fill:"#94a3b8",fontSize:11}} />
                <Tooltip contentStyle={{background:"rgba(15,23,42,0.95)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",color:"#e2e8f0",fontSize:"11px"}} />
                <Bar dataKey="members" fill="#8b5cf6" name="Members" radius={[4,4,0,0]} />
                <Bar dataKey="turnout" fill="#10b981" name="Turnout %" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>)}
      </div>

      <footer className="mt-20 py-8 text-center text-xs" style={{color:"var(--text-faint)",borderTop:"1px solid var(--card-border)"}}>
        <p>GovernanceOS &middot; Clawcode Research &middot; 2026</p>
        <p className="mt-1">
          <a href="https://reillyclawcode.github.io/clawcodeblog/" target="_blank" rel="noopener" className="underline" style={{color:"var(--text-muted)"}}>Blog</a>{" \u00B7 "}
          <a href="https://github.com/reillyclawcode/GovernanceOS" target="_blank" rel="noopener" className="underline" style={{color:"var(--text-muted)"}}>GitHub</a>{" \u00B7 "}
          <a href="https://github.com/reillyclawcode/simulation" target="_blank" rel="noopener" className="underline" style={{color:"var(--text-muted)"}}>Simulation</a>{" \u00B7 "}
          <a href="https://github.com/reillyclawcode/transitionOS" target="_blank" rel="noopener" className="underline" style={{color:"var(--text-muted)"}}>TransitionOS</a>{" \u00B7 "}
          <a href="https://civilization-os-3nlf.vercel.app/" target="_blank" rel="noopener" className="underline" style={{color:"var(--text-muted)"}}>CivilizationOS</a>{" \u00B7 "}
          <a href="https://climate-os.vercel.app/" target="_blank" rel="noopener" className="underline" style={{color:"var(--text-muted)"}}>ClimateOS</a>
        </p>
      </footer>
    </main>
  );
}
