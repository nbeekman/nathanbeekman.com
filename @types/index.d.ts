declare module '@mdx-js/react';
declare module 'gatsby-mdx';
declare module 'prism-react-renderer';

declare module '*.svg' {
  const content: any;
  export default content;
}
declare module '*.png' {
  const content: any;
  export default content;
}
declare interface Window {
  docsearch: any;
  // Injected by gatsby-plugin-google-gtag in production builds only, so optional.
  gtag?: (
    command: 'event',
    eventName: string,
    params?: Record<string, unknown>,
  ) => void;
}
