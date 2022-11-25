import { ResolveOptions } from 'webpack';
import { IBuildOptioins } from './types/config';

export function buildResolves(options: IBuildOptioins): ResolveOptions {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    preferAbsolute: true, //
    modules: [options.paths.src, 'node_modules'],
    mainFiles: ['index'],
    alias: {},
  };
}
