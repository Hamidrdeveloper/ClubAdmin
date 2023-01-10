import { join } from 'path';

import { rootDir } from './env';

export default {
  main: [join(rootDir, '/src/index.tsx')],
};
