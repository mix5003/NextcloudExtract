import { createAppConfig } from '@nextcloud/vite-config';

export default createAppConfig(
  {
    main: 'src/main.ts',
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