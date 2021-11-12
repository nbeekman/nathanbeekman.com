import { extendTheme, ThemeOverride } from "@chakra-ui/react";

import Heading from "./components/heading";

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

const theme = {
  fontWeights,
  fonts,
  components: {
    Heading,
  },
};

export default extendTheme(theme);
