module.exports = {
  title: 'CodeRoad',
  tagline: 'A VSCode Extension for Interactive Coding Tutorials',
  url: 'https://coderoad.github.io',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'coderoad',
  projectName: 'coderoad.github.io',
  themeConfig: {
    themeConfig: {
      googleAnalytics: {
        trackingID: 'UA-166812953-1',
      },
    },
    navbar: {
      title: 'CodeRoad',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      links: [
        {
          to: 'docs/overview',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/coderoad/coderoad-vscode',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        // {
        //   title: 'Docs',
        //   items: [
        //     {
        //       label: 'Style Guide',
        //       to: 'docs/doc1',
        //     },
        //     {
        //       label: 'Second Doc',
        //       to: 'docs/doc2',
        //     },
        //   ],
        // },
        // {
        //   title: 'Community',
        //   items: [
        //     {
        //       label: 'Stack Overflow',
        //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //     },
        //     {
        //       label: 'Discord',
        //       href: 'https://discordapp.com/invite/docusaurus',
        //     },
        //     {
        //       label: 'Twitter',
        //       href: 'https://twitter.com/docusaurus',
        //     },
        //   ],
        // },
        // {
        //   title: 'More',
        //   items: [
        //     {
        //       label: 'GitHub',
        //       href: 'https://github.com/coderoad/coderoad-vscode',
        //     },
        //   ],
        // },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} CodeRoad. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/coderoad/coderoad-vscode/edit/master/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-ideal-image',
      '@docusaurus/plugin-google-analytics',
      '@docusaurus/plugin-sitemap',
      {
        cacheTime: 600 * 1000, // 600 sec - cache purge period
        changefreq: 'weekly',
        priority: 0.5,
      },
    ],
  ],
}
