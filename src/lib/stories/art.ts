// Fills the %%key%% placeholders of a generated story drawing (see
// scripts/stories/gnome_art.py): text labels for the page language and
// %%base%% with the site base path, so image links survive a sub-path deploy.
export function fillArt(svg: string, labels: Record<string, string>, base: string): string {
  const root = base.endsWith('/') ? base : `${base}/`;
  return svg.replace(/%%(\w+)%%/g, (whole, key: string) => {
    if (key === 'base') return root;
    const label = labels[key];
    if (label === undefined) throw new Error(`story art: no label for ${whole}`);
    return escapeXml(label);
  });
}

const escapeXml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
