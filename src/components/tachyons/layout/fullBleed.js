import * as React from "react";
import tachyons from "../tachyonsComposer";

const FullBleed = tachyons("section", "cf w-100");

const TileContainer = tachyons("article", "fl hide-child");
const ControlAspectRatio = tachyons("div", "aspect-ratio");
const BackgroundImage = tachyons("div", "bg-center cover aspect-ratio--object");

FullBleed.Tile = ({
  className,
  children,
  width,
  aspectRatio,
  backgroundURL,
  ...props
}) => (
  <TileContainer className={`${width} ${className}`} {...props}>
    <ControlAspectRatio className={aspectRatio}>
      <BackgroundImage style={{ backgroundImage: `url(${backgroundURL})` }}>
        {children}
      </BackgroundImage>
    </ControlAspectRatio>
  </TileContainer>
);

FullBleed.Overlay = tachyons("div", "w-100 h-100 pa2 pa3");
FullBleed.HiddenOverlay = tachyons(FullBleed.Overlay, "child");

export default FullBleed;
