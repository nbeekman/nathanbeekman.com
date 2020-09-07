import * as React from "react";

import { WorkItem } from "../../components/work";

export default ({ entry, widgetFor }) => (
  <div className="helvetica">
    <WorkItem
      width="w-100 mw6"
      aspectRatio="aspect-ratio--1x1"
      image={entry.getIn(["data", "image"])}
      project={entry.getIn(["data", "title"])}
      client={entry.getIn(["data", "client"])}
      about={entry.getIn(["data", "about"])}
      colours={entry.getIn(["data", "colours"])}
    />
  </div>
);
