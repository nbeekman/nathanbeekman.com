/**
 * The only module that touches window.gtag.
 *
 * GA4 is loaded by gatsby-plugin-google-gtag (see gatsby-config.js). That plugin sends
 * pageviews on its own; everything here is a custom event layered on top.
 */

type EventMap = {
  project_open: {
    project_name: string;
    project_type: "work" | "fun";
    is_featured: boolean;
  };
  project_modal_close: {
    project_name: string;
    engaged_seconds: number;
    did_scroll: boolean;
  };
  project_link_click: {
    project_name: string;
    link_url: string;
    link_type: "site" | "repo";
  };
  social_click: { network: "github" | "linkedin" };
  page_scroll_depth: { percent: 25 | 50 | 75 | 100 };
  outbound_click: { label: string; link_url: string };
};

/**
 * Keyed off `keyof EventMap` rather than a discriminated union of `{ name, params }`
 * pairs. With a union, TypeScript infers the type parameter as the whole union and
 * `params` widens to a union of every event's parameters, which would happily accept
 * `track("social_click", { project_name: "..." })`. Keying off the map correlates the
 * two arguments, so a mismatch fails the build.
 */
export const track = <K extends keyof EventMap>(name: K, params: EventMap[K]): void => {
  // Gatsby's SSR build executes component code in Node, where `window` does not exist.
  if (typeof window === "undefined") return;

  // gatsby-plugin-google-gtag does not inject the script during `gatsby develop`, so
  // there is nothing to send to locally. Log instead of dropping, so wiring can be
  // verified without deploying.
  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", name, params);
    return;
  }

  window.gtag?.("event", name, params);
};

/** GA4 stores numeric parameters as doubles; rounding keeps reports readable. */
export const secondsSince = (startedAt: number): number =>
  Math.round((Date.now() - startedAt) / 100) / 10;
