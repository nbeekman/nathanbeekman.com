import { extendTheme } from "@chakra-ui/react";

// Component overrides
import Heading from "./components/heading";

// Global styles override
import styles from "./styles"

// Typography override
import { fonts, fontWeights } from "./typography";

const theme = {
  styles,
  fontWeights,
  fonts,
  components: {
    Heading,
  },
};

export default extendTheme(theme);
