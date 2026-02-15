export const docsManifest = {
  defaultVersion: 'v2',
  versions: [
    {
      id: 'v1',
      label: '1.x',
      status: 'stable',
      description: 'Original release line with the core explain flow.',
      nav: [
        {
          section: 'Basics',
          title: 'Getting Started',
          slug: 'getting-started',
          file: 'v1/getting-started.md',
          updated: '2026-01-10',
          summary: 'Install, open a file, and run your first explain.'
        },
        {
          section: 'Usage',
          title: 'Commands',
          slug: 'commands',
          file: 'v1/commands.md',
          updated: '2026-01-12',
          summary: 'Palette actions and how to trigger them.'
        },
        {
          section: 'Usage',
          title: 'Configuration',
          slug: 'configuration',
          file: 'v1/configuration.md',
          updated: '2026-01-15',
          summary: 'Tune tone, examples, and streaming preferences.'
        },
        {
          section: 'Support',
          title: 'Troubleshooting',
          slug: 'troubleshooting',
          file: 'v1/troubleshooting.md',
          updated: '2026-01-22',
          summary: 'Fix the most common install and output issues.'
        }
      ]
    },
    {
      id: 'v2',
      label: '2.x',
      status: 'latest',
      description: 'Power Cat line with faster workflows and deeper context.',
      nav: [
        {
          section: 'Basics',
          title: 'Getting Started',
          slug: 'getting-started',
          file: 'v2/getting-started.md',
          updated: '2026-02-01',
          summary: 'Install the new build and verify the model routing.'
        },
        {
          section: 'Usage',
          title: 'Commands',
          slug: 'commands',
          file: 'v2/commands.md',
          updated: '2026-02-05',
          summary: 'New shortcuts and multi step prompts.'
        },
        {
          section: 'Usage',
          title: 'Configuration',
          slug: 'configuration',
          file: 'v2/configuration.md',
          updated: '2026-02-06',
          summary: 'Advanced settings for tone, prompts, and streams.'
        },
        {
          section: 'Advanced',
          title: 'Workflows',
          slug: 'workflows',
          file: 'v2/workflows.md',
          updated: '2026-02-08',
          summary: 'Batch explain, inline refactors, and quick summaries.'
        },
        {
          section: 'Support',
          title: 'Troubleshooting',
          slug: 'troubleshooting',
          file: 'v2/troubleshooting.md',
          updated: '2026-02-10',
          summary: 'Diagnostics, logs, and fallback guidance.'
        }
      ]
    }
  ]
};
