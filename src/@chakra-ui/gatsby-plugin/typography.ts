import { ThemeOverride } from "@chakra-ui/react";

const fontWeights: ThemeOverride['fontWeights'] = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

const fonts: ThemeOverride['fonts'] = {
  heading: `'Bebas Neue', ui-serif, Cambria, "Times New Roman", Times, serif`,
  body: `'Montserrat', system-ui, sans-serif`,
  mono: `Menlo, monospace`,
};

export { fontWeights, fonts };
