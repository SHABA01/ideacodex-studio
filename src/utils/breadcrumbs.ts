// src/utils/breadcrumbs.js
import sidebarConfig from "../components/sidebar/sidebarConfig";

export function generateBreadcrumb(pathname) {
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = [];
  let currentPath = "";

  for (let i = 0; i < segments.length; i++) {
    currentPath += `/${segments[i]}`;

    // 1. Find item in sidebarConfig (flat items)
    let match =
      sidebarConfig.find((item) => item.path === currentPath) ||
      sidebarConfig
        .filter((i) => i.section)
        .flatMap((s) => s.children)
        .find((child) => child.path === currentPath);

    if (match) {
      crumbs.push({
        label: match.label,
        path: currentPath,
      });
    } else {
      // fallback: capitalize the segment
      crumbs.push({
        label: segments[i].charAt(0).toUpperCase() + segments[i].slice(1),
        path: currentPath,
      });
    }
  }

  return crumbs;
}
