import fs from 'fs';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { Configuration } from 'webpack';
import { buildDevServer } from './buildDevserver';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolves } from './buildResolve';
import { IBuildOptions } from './types/config';

export function buildWebpackConfig(options: IBuildOptions): Configuration {
  const { mode, paths, isDev } = options;
  return {
    bail: !isDev,
    cache: {
      allowCollectingMemory: true,
      buildDependencies: {
        config: [__filename],
        defaultWebpack: ['webpack/lib/'],
        tsconfig: [paths.appTsConfig].filter(f => fs.existsSync(f)),
      },
      cacheDirectory: paths.appWebpackCache,
      idleTimeout: 60000,
      maxAge: 31536000,
      memoryCacheUnaffected: true,
      store: 'pack',
      type: 'filesystem',
    },
    devServer: isDev ? buildDevServer(options) : undefined,
    devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
    entry: paths.entry,
    mode,
    module: {
      rules: buildLoaders(options),
    },
    optimization: {
      mergeDuplicateChunks: true,
      minimize: !isDev,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              comparisons: false,
              ecma: 5,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ascii_only: true,
              comments: false,
              ecma: 5,
            },
            parse: {},
          },
        }),
        new CssMinimizerPlugin(),
      ],
      removeAvailableModules: true,
      sideEffects: true,
    },
    output: {
      assetModuleFilename: 'images/[hash][ext][query]',
      clean: true,
      filename: '[name].[contenthash].js',
      path: paths.build,
      publicPath: '/',
    },
    performance: {
      maxAssetSize: 100000,
    },
    plugins: buildPlugins(options),
    resolve: buildResolves(options),
    stats: 'errors-warnings',
  };
}
