# NINHO client demonstration

React 19 / Vite application covering buyer, agent, lawyer and administrator journeys from the supplied NINHO brief and Phase 1 proposal.

## Run

```sh
npm install
npm run dev
npm run build
```

The default screen opens the NINHO admin dashboard from the client’s reference. Switch preview roles in the top bar. The layouts and brand assets follow PowerPoint slides 11–17. The NINHO wordmark opens the marketing homepage; sign out opens the sample login. Use any email, any password of 4+ characters, and demo verification code **123456**.

## Included demo journeys

- Buyer: search and save homes, property detail, neighborhood context, unit/currency switches, sample cost estimate, viewing requests, professional profiles and comparisons, professional team selection, purchase roadmap, documents, signature, chat and payment records.
- Agent: clients, individual purchases, listings creation/edit/removal, meeting accept/preparation/decline/reassign, tasks, calendar, agency performance, commission settings and statements.
- Lawyer: purchase stages, preparation messages, document requests/review, tasks, membership record.
- Admin: agency ranking and reporting export, professional applications/approval, payment and membership records, commission records and legal content.
- Shared: English/Portuguese navigation, notifications, calendar .ics export, task management, mobile layouts, per-role document visibility and browser persistence.

## Demonstration boundaries

All properties, people, amounts and operational metrics are illustrative. This is a client-side interactive prototype, not the production system. Records persist in the current browser's localStorage and are shared by the demo role switcher. Do not upload personal or sensitive files. Sample uploads are capped at 2 MB. No real authentication, server authorization, EU-hosted database/private file storage, realtime cross-user synchronization, email delivery, actual calendar OAuth/sync, automatic translation, electronic signature provider, certified invoicing, payment collection, or background reminders is configured. These require backend work and client-owned provider accounts. Initial chat messages have prepared Portuguese translations; new messages retain their original text. Navigation and core interface labels support English and Portuguese; the demonstration content is predominantly English.

Cost assumptions and USD conversion are fixed illustrative values clearly identified in the interface. Production tax assumptions, exchange rates and travel times must use approved rules and configured providers. Payment flows follow the proposal's manual collection model.

Reset sample state in Settings. Images are illustrative Unsplash photographs and do not identify actual listed properties. No source brief or commercial proposal is included in the public deployment.
