import type { Plugin, ResolvedConfig } from 'vite';

export function replaceSpritemapReferences(): Plugin {
  let resolvedBase = '/';
  let spritemapUrl = '/assets/spritemap.svg';

  const plugin: Plugin = {
    name: 'replace-spritemap-references',
    configResolved(config: ResolvedConfig) {
      resolvedBase = config.base;
      spritemapUrl = `${resolvedBase}assets/spritemap.svg`;
    },
    transformIndexHtml: {
      order: 'post',
      handler(html: string) {
        return html.replaceAll('/__spritemap', spritemapUrl);
      },
    },
  };

  return plugin;
}
