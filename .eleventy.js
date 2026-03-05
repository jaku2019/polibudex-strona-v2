const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

// Normalize tagi: Pages CMS may save tags as a string like "[tag1,tag2]" instead of a YAML array
function normalizeTagi(tagi) {
  if (!tagi) return [];
  if (Array.isArray(tagi)) return tagi;
  const s = String(tagi).trim();
  if (s.startsWith("[") && s.endsWith("]")) {
    return s.slice(1, -1).split(",").map(t => t.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
  }
  return [s].filter(Boolean);
}

module.exports = function(eleventyConfig) {
  // Rewrite URLs in HTML output to include pathPrefix
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // Passthrough copies
  eleventyConfig.addPassthroughCopy("src/assets");

  // Collections
  eleventyConfig.addCollection("posty", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posty/*.md").sort(function(a, b) {
      return b.date - a.date;
    });
  });

  eleventyConfig.addCollection("tagi", function(collectionApi) {
    let tagsSet = new Set();
    collectionApi.getFilteredByGlob("src/posty/*.md").forEach(item => {
      const tagi = normalizeTagi(item.data.tagi);
      tagi.forEach(tag => tagsSet.add(tag));
    });
    return [...tagsSet].sort();
  });

  // Filters
  eleventyConfig.addFilter("dateFormat", function(date) {
    const d = new Date(date);
    return d.toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  });

  eleventyConfig.addFilter("dateISO", function(date) {
    return new Date(date).toISOString().split("T")[0];
  });

  eleventyConfig.addFilter("limit", function(arr, limit) {
    return arr.slice(0, limit);
  });

  eleventyConfig.addFilter("filterByTag", function(posts, tag) {
    return posts.filter(post => normalizeTagi(post.data.tagi).includes(tag));
  });

  eleventyConfig.addFilter("normalizeTagi", normalizeTagi);

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
    pathPrefix: process.env.ELEVENTY_PATH_PREFIX || "/"
  };
};
