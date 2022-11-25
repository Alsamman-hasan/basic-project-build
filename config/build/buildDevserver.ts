import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { IBuildOptioins } from './types/config';

export function buildDevServer(options: IBuildOptioins): DevServerConfiguration {
  return {
    port: options.port,
    open: true,
    historyApiFallback: true,
    hot: true,
  };
}
