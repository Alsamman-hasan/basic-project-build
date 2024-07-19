import path from 'path';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { IBuildOptions } from './types/config';

export function buildDevServer(options: IBuildOptions): DevServerConfiguration {
  return {
    allowedHosts: options.isDev ? 'all' : undefined,
    client: {
      progress: true,
    },
    compress: true,
    devMiddleware: {
      publicPath: 'https://localhost:3000',
    },
    historyApiFallback: true,
    hot: 'only',
    open: true,
    port: options.port,
    static: {
      directory: path.join(__dirname, 'public'),
    },
  };
}
