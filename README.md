# SETU — AI for Digital Public Infrastructure & Governance

SETU (सेतु, "bridge") is a multilingual AI platform that aggregates citizen
development requests — via voice, text and messaging apps — across India's
diverse linguistic regions, and turns them into ranked, explainable
infrastructure priorities for national policymakers.

## The problem

Governments across India struggle to consolidate citizen feedback and align
it with national infrastructure priorities. Development requests live in
fragmented systems, leading to misaligned public spending, unaddressed
infrastructure gaps, and no way to measure the impact of large-scale digital
public infrastructure initiatives.

## What SETU does

- **Multilingual intake** — citizens report issues by voice, SMS, WhatsApp or
  web, in their own language.
- **AI classification** — each report is translated, classified by sector
  (Water, Roads, Sanitation, Electricity, Healthcare, Education) and scored
  for urgency.
- **Explainable prioritisation** — reports are correlated with population and
  existing infrastructure investment data to compute a transparent priority
  score: `(reports × urgency weight × population) ÷ existing investment`.
- **Policy dashboard** — planners see a ranked, filterable list of demand
  hotspots, each traceable back to a real citizen quote, and can export or
  draft an evidence-based brief.

## Tech stack

React 19, TanStack Start (SSR + server functions), TanStack Router, Tailwind
CSS, Radix UI, Recharts, jsPDF.

## Development

You need Node.js (or Bun) installed.

```sh
git clone <this-repository-url>
cd <repository-name>
npm install
npm run dev
```

Build for production:

```sh
npm run build
npm run preview
```

## Project structure

```
src/
  routes/       — pages (/, /report, /dashboard)
  components/   — UI components
  lib/          — data model, scoring logic, state, export helpers
```
