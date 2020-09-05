import tachyons from "../tachyonsComposer";

const Basic = tachyons("button", "input-reset f5 link ph3 pv2 mb2 dib");

export default Basic;

export const Border = tachyons(Basic, "ba bw1");
export const ThickBorder = tachyons(Basic, "ba bw2");
export const Pill = tachyons(Basic, "br-pill");
export const PillBorder = tachyons(Border, "br-pill");
export const PillThickBorder = tachyons(ThickBorder, "br-pill");
export const Rounded = tachyons(Basic, "br3");
export const RoundedBorder = tachyons(Border, "br3");
export const RoundedThickBorder = tachyons(ThickBorder, "br3");

export const Small = tachyons(
  "button",
  "input-reset f6 link dim ph3 pv2 mb2 dib"
);

export const SmallBorder = tachyons(Basic, "ba bw1");
export const SmallThickBorder = tachyons(Basic, "ba bw2");
export const SmallPill = tachyons(Basic, "br-pill");
export const SmallPillBorder = tachyons(Border, "br-pill");
export const SmallPillThickBorder = tachyons(ThickBorder, "br-pill");
export const SmallRounded = tachyons(Basic, "br3");
