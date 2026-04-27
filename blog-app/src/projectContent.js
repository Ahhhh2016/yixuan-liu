const markdownFiles = import.meta.glob('./content/projects/*.md', {
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

export const projectDetails = Object.entries(markdownFiles)
  .map(([path, markdownText]) => {
    const { frontmatter, body } = parseFrontmatter(markdownText);
    const fileSlug = normalizeSlug(path);
    const slug = frontmatter.slug || fileSlug;

    return {
      slug,
      title: frontmatter.title || slug,
      meta: frontmatter.meta || '',
      date: frontmatter.date || '',
      summary: frontmatter.summary || '',
      content: body.trim(),
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title));

export function getProjectBySlug(slug) {
  return projectDetails.find((item) => item.slug === slug);
}
