import CMS from "netlify-cms-app";
import workPreview from "./preview-templates/workPreview";
import blogPreview from "./preview-templates/blogPreview";

// Not using the import statement because it applies CSS Normalise
// which mucks up the existing styles of the editor.

// import "../components/styles.scss";

// Instead use CMS.registerPreviewStyle and link to the CSS
// bundle in the built site.

CMS.registerPreviewStyle(
  "https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css"
);

//CMS.registerPreviewStyle("admin/prism-tomorrow.css");

// And finally load the preview template

CMS.registerPreviewTemplate("work", workPreview);
CMS.registerPreviewTemplate("blog", blogPreview);
