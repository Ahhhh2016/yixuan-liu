const markdownFiles = import.meta.glob('./content/novels/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

function parseFrontmatter(markdownText) {
  const frontmatterMatch = markdownText.match(/^---\n([\s\S]*?)\n---\n?/);
  const frontmatter = {};
  let body = markdownText;

  if (frontmatterMatch) {
    const rawFrontmatter = frontmatterMatch[1];
    body = markdownText.slice(frontmatterMatch[0].length);

    rawFrontmatter.split('\n').forEach((line) => {
      const separatorIndex = line.indexOf(':');
      if (separatorIndex === -1) {
        return;
      }

      const key = line.slice(0, separatorIndex).trim();
      const value = line.slice(separatorIndex + 1).trim().replace(/^"(.*)"$/, '$1');
      frontmatter[key] = value;
    });
  }

  return { frontmatter, body };
}

function normalizeSlug(filePath) {
  const match = filePath.match(/\/([^/]+)\.md$/);
  return match ? match[1] : '';
}

export const novelDetails = Object.entries(markdownFiles)
  .map(([path, markdownText]) => {
    const { frontmatter, body } = parseFrontmatter(markdownText);
    const fileSlug = normalizeSlug(path);
    const slug = frontmatter.slug || fileSlug;

    return {
      slug,
      series: frontmatter.series || '',
      title: frontmatter.title || slug,
      meta: frontmatter.meta || '',
      episode: frontmatter.episode || '',
      order: Number(frontmatter.order || 0),
      date: frontmatter.date || '',
      summary: frontmatter.summary || '',
      cover: frontmatter.cover || '',
      seriesCover: frontmatter.seriesCover || '',
      content: body.trim(),
    };
  })
  .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

export function getNovelBySlug(slug) {
  return novelDetails.find((item) => item.slug === slug);
}
