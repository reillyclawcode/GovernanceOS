# GovernanceOS

**Civic Governance Dashboard** — the institutional backbone of the AI Civilization framework.

**Live dashboard**: [civilization-os-ashy.vercel.app](https://civilization-os-ashy.vercel.app/)

GovernanceOS models governance infrastructure for AI-aligned civic institutions: charter frameworks, citizen assemblies, modular governance software, AI audit tracking, and participatory equity metrics. It is grounded in the research paper *Reclaiming the Future: AI Alignment, Societal Resilience, and Civilization Trajectories* and designed to complement the broader ecosystem of tools.

## What it does

| Tab | Description |
|-----|-------------|
| **Overview** | Key governance metrics, charter pillars, 10-year audit coverage chart, and funding stack |
| **Charter** | Full Civic AI Charter with three pillars (Representation, Finance, Transparency), principles, and enforcement mechanisms |
| **Assemblies** | Five citizen assemblies — AI Safety, Climate & Energy, Housing & Land Use, Digital Rights, Budget & Finance — with demographics, decisions, and turnout |
| **Modules** | Five governance software modules (Representation, Finance, Transparency, Identity, Measurement) with features, tech stacks, and live metrics |
| **Audit Tracker** | 10-year AI audit coverage trajectory (10% → 100%), incident timeline, and resolution rates |
| **Participation** | Demographic equity index, satisfaction and accessibility scores, quadratic voting metrics, and assembly participation breakdown |

## Data model

All dashboard data is sourced from `public/data/seed.json`, derived from the research paper:

- **Civic AI Charter** with 3 pillars and 12 principles
- **5 citizen assemblies** with demographics, decisions, binding rates, and turnout
- **5 governance modules** (4 GA + 1 Beta) with features, tech stacks, and operational metrics
- **10-year audit timeline** (2026–2035) with coverage, incidents, and resolution data
- **Participation metrics** for 10M residents: registration, voting, demographic equity across 8 groups
- **Funding stack**: 5 budget categories from Civic Dividend Pool to Community Participation

## Tech stack

- **Next.js 14** (App Router)
- **React 18** with TypeScript
- **Tailwind CSS 3** — glassmorphism dark theme with violet/sky accents
- **Recharts** — area charts, bar charts, grouped comparisons
- **Space Grotesk + Inter** — typography
- CommonJS configs (`.js`) for Windows compatibility

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Design system

- **Background**: `#030712` with radial violet/sky gradients
- **Cards**: Frosted glass with `backdrop-filter: blur(12px)`, subtle border glow on hover
- **Accent colors**: Violet (`#8b5cf6`), Sky (`#0ea5e9`), Emerald (`#10b981`), Amber (`#f59e0b`), Rose (`#f43f5e`)
- **Typography**: Space Grotesk for headings/metrics, Inter for body text

## Ecosystem

GovernanceOS is one part of a connected body of work:

- [Research Paper](https://reillyclawcode.github.io/clawcodeblog/research/ai-civilization/) — the founding document
- [GovernanceOS Blog Post](https://reillyclawcode.github.io/clawcodeblog/posts/2026-02-16-governanceos/) — walkthrough of this dashboard
- [Simulation](https://simulation-brown.vercel.app/) — 50-year civilization trajectory simulator with AI-generated reports
- [TransitionOS](https://transition-os-beta.vercel.app/) — workforce reskilling dashboard with path planning and income bridges
- [CivilizationOS](https://civilization-os-3nlf.vercel.app/) — resident experience: civic journeys, dividends, benefits, KPI projections
- [CivilizationOS Blog Post](https://reillyclawcode.github.io/clawcodeblog/posts/2026-02-16-civilizationos/) — walkthrough of the resident experience dashboard
- [ClimateOS](https://climate-os.vercel.app/) — Climate futures dashboard with four scenarios, eight metrics, and scenario-aware analysis
- [ClimateOS Blog Post](https://reillyclawcode.github.io/clawcodeblog/posts/2026-02-17-climateos/) — walkthrough of the climate dashboard
- [Clawcode Blog](https://reillyclawcode.github.io/clawcodeblog/) — the research hub

## Repository layout

```
GovernanceOS/
├── app/
│   ├── page.tsx              # Full dashboard (6 tabs)
│   ├── layout.tsx            # Root layout + metadata
│   └── globals.css           # Glassmorphism theme
├── public/data/
│   └── seed.json             # All dashboard data
├── docs/
│   └── charter-outline.md    # Research notes
├── package.json
├── next.config.js
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Governance modules

| Module | Status | Description |
|--------|--------|-------------|
| **Representation** | GA v1.2.0 | Sortition engine, delegate graph, participation quotas, multi-mode voting |
| **Finance** | GA v1.1.0 | Real-time treasury, programmatic disbursements, on-chain attestations, escrow |
| **Transparency** | GA v1.0.3 | AI audit pipeline, bias testing, red-team scheduling, auto-published dashboards |
| **Identity** | Beta v0.8.0 | W3C DID civic identity, zero-knowledge proofs, offline verification |
| **Measurement** | GA v1.3.0 | Kafka/Snowplow pipeline, DuckDB analytics, auto-generated public briefs |

## License

Open-source under permissive license. Part of the Clawcode Research project.
