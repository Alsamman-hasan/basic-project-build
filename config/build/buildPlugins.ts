import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import InterpolateHtmlPlugin from 'react-dev-utils/InterpolateHtmlPlugin';
import webpack, { WebpackPluginInstance } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { IBuildOptions } from './types/config';

export function buildPlugins(options: IBuildOptions): WebpackPluginInstance[] {
  const { paths, isDev, apiUrl, publicUrl } = options;
  const isProd = !isDev;
  const HTMLWebpackPl = new HtmlWebpackPlugin({
    favicon: paths.icon,
    inject: true,
    minify: !isDev
      ? {
          collapseWhitespace: true,
          keepClosingSlash: true,
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        }
      : undefined,
    template: paths.html,
  });
  const plugins = [
    new webpack.ProgressPlugin(),
    HTMLWebpackPl,
    new webpack.DefinePlugin({
      __API__: JSON.stringify(apiUrl),
      __IS_DEV__: JSON.stringify(isDev),
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
    }),
    new Dotenv({ path: paths.envPath, safe: true, systemvars: true }),
    new ForkTsCheckerWebpackPlugin({
      async: isDev,
      typescript: {
        configOverwrite: {
          compilerOptions: {
            declarationMap: false,
            incremental: true,
            inlineSourceMap: false,
            noEmit: true,
            skipLibCheck: true,
            sourceMap: isDev ? false : isDev,
          },
        },
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: 'write-references',
      },
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, { PUBLIC_URL: publicUrl }),
    new CopyPlugin({
      patterns: [
        { from: paths.robots },
        { from: paths.manifest },
        { from: paths.logo192 },
        { from: paths.indexCss },
      ],
    }),
  ];

  if (isDev) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new ReactRefreshWebpackPlugin());
    plugins.push(
      new BundleAnalyzerPlugin({
        openAnalyzer: true,
      }),
    );
  }
  if (isProd)
    plugins.push(
      new MiniCssExtractPlugin({
        chunkFilename: 'css/[name].[contenthash:8].css',
        filename: 'css/[name].[contenthash:8].css',
      }),
    );

  return plugins as WebpackPluginInstance[];
}
