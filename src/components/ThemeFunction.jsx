export function getThemeClass(title) {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("old town road")) return "theme-cowboy";
    if (lowerTitle.includes("teeth")) return "theme-orange";
    if (lowerTitle.includes("mere ghar ram")) return "theme-divine";
    if (lowerTitle.includes("sapta sagaradaache")) return "theme-cowboy";
    if (lowerTitle.includes("tune mere jaana")) return "theme-emotional";
    if (lowerTitle.includes("love me like")) return "theme-crazy";
    if (lowerTitle.includes("marino - all")) return "theme-emotional";
    if (lowerTitle.includes("o sanam ")) return "theme-crazy";
    if (lowerTitle.includes("luka chuppi")) return "theme-emotional";
    if (lowerTitle.includes("meri maa")) return "theme-Worship";
    return "theme-default";
  }