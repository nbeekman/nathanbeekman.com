# Portfolio Analytics: Click and Engagement Tracking

**Date:** 2026-07-30
**Status:** Approved design, pending implementation

## Problem

`nathanbeekman.com` runs GA4 (`G-EKN2T2JRV0`) through `gatsby-plugin-google-gtag`, but
collects pageviews only. The site is a single page (`src/pages/index.tsx`), so a visit
produces one pageview and nothing else. Every meaningful interaction is invisible:

- Which featured project cards get opened (`src/components/work.tsx:153`)
- Whether visitors read a project overview or dismiss it immediately
- Which projects earn a click through to the live site (`src/components/work.tsx:176`)
- GitHub versus LinkedIn in the footer (`src/components/footer.tsx:37,45`)
- Whether anyone scrolls far enough to reach the Fun section

Project cards open a Chakra modal held in client-side state. No URL changes, so GA4
cannot infer these interactions on its own at any configuration setting.

## Goals

Answer three questions from the GA4 UI:

1. Which projects draw attention, and which get ignored?
2. Do visitors read project overviews, or bounce off them?
3. Which projects convert into a click through to the live work?

## Non-goals

- Replacing or supplementing GA4 with another vendor
- Session replay or heatmaps
- A cookie consent banner (this adds no cookies beyond what GA4 already sets)
- Building resume or contact UI (see "Deferred" below)

## Approach

A typed `track()` helper with explicit call sites, chosen over two alternatives.

A delegated global click listener driven by `data-analytics-*` attributes was rejected:
it is stringly-typed, so a typo fails silently, and it cannot express the modal timing
and scroll events regardless.

GA4 Enhanced Measurement alone was rejected as insufficient. It is likely already active
on the property, collecting outbound clicks and 90% scroll as generic `click` events keyed
by URL. It cannot attribute a modal open to a specific project, which is the primary goal.
Custom event names below are chosen to avoid collision with its built-ins.

## Design

### 1. `src/utils/analytics.ts`

The only module that touches `window.gtag`.

```ts
type EventMap = {
  project_open:        { project_name: string; project_type: "work" | "fun"; is_featured: boolean };
  project_modal_close: { project_name: string; engaged_seconds: number; did_scroll: boolean };
  project_link_click:  { project_name: string; link_url: string };
  social_click:        { network: "github" | "linkedin" };
  page_scroll_depth:   { percent: 25 | 50 | 75 | 100 };
  outbound_click:      { label: string; link_url: string };
};

export function track<K extends keyof EventMap>(name: K, params: EventMap[K]): void;
```

A mapped type is used deliberately rather than a discriminated union of
`{ name, params }` pairs. With a union, TypeScript infers the type parameter as the whole
union and `params` widens to a union of every event's parameters, which would accept
`social_click` with `project_open`'s parameters. Keying off `keyof EventMap` correlates
the two arguments correctly, so a typo'd event name or mismatched parameters fail the
build rather than silently producing junk data.

`track()` returns early when `typeof window === "undefined"` or `window.gtag` is
undefined. Both guards are required:

- Gatsby's SSR build executes component code in Node, where `window` does not exist.
- `gatsby-plugin-google-gtag` does not inject the script during `gatsby develop`, so
  `window.gtag` is undefined in local development.

In development (`process.env.NODE_ENV !== "production"`) the helper `console.debug`s the
event name and params instead of dropping them, so wiring is verifiable locally without
deploying.

`engaged_seconds` is rounded to one decimal place. GA4 numeric parameters are stored as
doubles; rounding keeps the cardinality low enough to be readable in reports.

### 2. `@types/index.d.ts`

Extend the existing `Window` interface (currently at line 13) with an optional `gtag`:

```ts
declare interface Window {
  docsearch: any;
  gtag?: (command: "event", eventName: string, params?: Record<string, unknown>) => void;
}
```

Optional, not required, so the guard in `track()` typechecks.

### 3. `src/components/work.tsx`

- `openProject()` fires `project_open`. `project_type` derives from the existing `title`
  prop (`title.toLowerCase() === "fun" ? "fun" : "work"`) rather than threading a new prop
  through `index.tsx`.
- Modal open time is stored in a ref on open. Close computes elapsed seconds and fires
  `project_modal_close`.
- `did_scroll` comes from an `onScroll` handler on `ModalBody`, which is the scroll
  container given `scrollBehavior="inside"`. Tracked in a ref, reset on each open.
- The external project link fires `project_link_click` on click.

`project_modal_close` must fire on every close path: the close button, overlay click, and
the Escape key. Chakra routes all three through `onClose`, so wrapping that single
callback covers all three. Verify all three during implementation rather than assuming.

### 4. `useScrollDepth` hook, called from `src/components/layout.tsx`

A `requestAnimationFrame`-throttled `scroll` listener firing each of the 25/50/75/100
thresholds at most once per page load, tracked in a ref-held `Set`. Listener registered
with `{ passive: true }` and removed on unmount.

Depth is `(scrollY + innerHeight) / documentElement.scrollHeight`, so 100% means the
bottom of the viewport reached the bottom of the document.

If the document is short enough that it does not scroll, thresholds already satisfied on
mount fire once on mount. Otherwise short sessions would silently record no depth at all.

### 5. `src/components/footer.tsx`

An `onClick` on each of the two anchors firing `social_click`.

Both anchors also gain `target="_blank"` and `rel="noopener noreferrer"`, which they lack
today. This is unrelated to analytics, but is a one-word change on lines already being
edited.

### 6. Deferred: `outbound_click`

Ships defined and unused. When a resume download or contact link is added later, tracking
it becomes a single `track()` call with no new plumbing. No resume or contact UI is
invented as part of this work.

## Required manual step in GA4

**Events are collected immediately, but event parameters do not appear in any GA4 report
until registered as custom dimensions.** Registration is not retroactive: data collected
before a dimension is registered stays invisible for that dimension, permanently.

In GA4, go to Admin, then Custom definitions, then Create custom dimension. For each, set
scope to Event and match the event parameter name exactly:

| Dimension name | Scope | Event parameter |
| --- | --- | --- |
| Project name | Event | `project_name` |
| Project type | Event | `project_type` |
| Did scroll | Event | `did_scroll` |
| Social network | Event | `network` |
| Scroll percent | Event | `percent` |
| Outbound label | Event | `label` |

`engaged_seconds` should be registered as a custom **metric** (Admin, then Custom
definitions, then Custom metrics), scope Event, unit Standard.

`is_featured` is deliberately absent from this table. It is collected, but is constant
today and carries no information; see "Risks" below.

Register these before or immediately after deploy. Until then GA4 shows event counts but
no per-project breakdown, which is the most valuable part.

## Verification

- `yarn lint` passes.
- `yarn build` succeeds. Node 18.16.0 is required; newer Node fails this project's build
  with a misleading buffer-bounds error.
- In `gatsby develop`, the browser console shows a `console.debug` line with correct
  params for: opening a card, closing a modal via each of the three close paths, clicking
  a project link, clicking each social icon, and crossing each scroll threshold.
- Scroll thresholds fire at most once per load.
- Post-deploy, GA4 Realtime shows the custom events arriving.

## Risks

- **Ad blockers** suppress an unknown share of events. Absolute counts will undercount;
  relative comparison between projects stays useful, which is what the goals require.
- **`is_featured` is currently constant.** `work.tsx:80` filters to
  `featuredProject` before rendering, so every tracked card is featured and the parameter
  is always `true`. It is included because the filter is plausible to relax later, but it
  carries no information today and should not be registered as a dimension until it does.
