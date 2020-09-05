import * as React from "react";
import tachyons from "../tachyonsComposer";

const FullScreenCenteredTile = ({ className, children, ...props }) => {
  const Outer = tachyons("section", "dt w-100");
  const Inner = tachyons("div", "dtc v-mid tc ph3 ph4-l");
  return (
    <Outer className={className} {...props}>
      <Inner>{children}</Inner>
    </Outer>
  );
};

export default FullScreenCenteredTile;
