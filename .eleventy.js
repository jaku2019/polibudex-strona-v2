const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

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
      if (item.data.tagi) {
        item.data.tagi.forEach(tag => tagsSet.add(tag));
      }
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
    return posts.filter(post => post.data.tagi && post.data.tagi.includes(tag));
  });

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
    pathPrefix: "/polibudex-strona-v2/"
  };
};
