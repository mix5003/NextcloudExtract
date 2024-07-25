import { createAppConfig } from '@nextcloud/vite-config';

export default createAppConfig(
  {
    extraction: 'src/extraction.ts',
  },
  {
    emptyOutputDirectory: false,
    config: {
      css: {
        modules: {
          localsConvention: 'camelCase',
        },
      },
    },
  },
);