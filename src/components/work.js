import * as React from 'react';
// import { Link } from 'gatsby';

import { Subtitle } from '../components/tachyons/text';
import FullBleed from '../components/tachyons/layout/fullBleed';

const SectionContainer = ({ children }) => (
  <div className="db center mb5">{children}</div>
);
// const SectionHeading = ({ children }) => (
//   <h2 className="f2 f1-l mt4 mt5-l mb4 bb b--dark-blue b--dotted avenir">{children}</h2>
// );
const Client = ({ children }) => <h3 className="f3 mb2">{children}</h3>;
const P = ({ children }) => (
  <p className="f6 lh-copy measure mb2">{children}</p>
);

export const WorkItem = ({
  image,
  client,
  project,
  colours,
  about,
  slug,
  width,
  aspectRatio,
}) => {
  return (
    // TODO
    // <Link to={`work${slug}`}>
      <FullBleed.Tile
        backgroundURL={image.childImageSharp.fluid.src}
        width={width}
        aspectRatio={aspectRatio}
      >
        <FullBleed.HiddenOverlay className={colours}>
          <Client>{client}</Client>
          <Subtitle className="mb4">{project}</Subtitle>
          {about &&
            about.split("\n\n").map((paragraph, i) => <P key={i}>{paragraph}</P>)}
        </FullBleed.HiddenOverlay>
      </FullBleed.Tile>
    // </Link>
  );
};

export default ({ work, ...props }) => {
  return (
    <SectionContainer>
      {/* <SectionHeading>Work</SectionHeading> */}
      <FullBleed>
        {work
          .sort((a, b) => a.node.frontmatter.order - b.node.frontmatter.order)
          .map(({ node: { id, frontmatter, fields } }) => (
            <WorkItem
              key={id}
              width="w-100 w-50-ns w-25-l"
              aspectRatio="aspect-ratio--1x1 aspect-ratio--3x4-m"
              slug={fields.slug}
              {...frontmatter}
            />
          ))}
      </FullBleed>
    </SectionContainer>
  );
};
