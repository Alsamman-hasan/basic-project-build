import { ResolveOptions } from 'webpack';
import { IBuildOptions } from './types/config';

export function buildResolves(options: IBuildOptions): ResolveOptions {
  return {
    alias: {
      '@': options.paths.src,
    },

    extensions: ['.tsx', '.ts', '.js'],

    mainFiles: ['index'],
    //
    modules: [options.paths.src, 'node_modules'],
    preferAbsolute: true,
  };
}
