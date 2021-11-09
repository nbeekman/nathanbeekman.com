declare module '@mdx-js/react';
declare module 'gatsby-mdx';
declare module 'prism-react-renderer';

declare module '*.svg' {
  const content: any;
  export default content;
}
declare interface Window {
  docsearch: any;
}
