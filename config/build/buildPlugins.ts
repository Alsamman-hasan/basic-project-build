import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack, { WebpackPluginInstance } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import CopyPlugin from "copy-webpack-plugin";
import CircularDependencyPlugin from "circular-dependency-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import Dotenv from "dotenv-webpack";
import { IBuildOptioins } from "./types/config";

export function buildPlugins(options: IBuildOptioins): WebpackPluginInstance[] {
  const { paths, isDev, apiUrl } = options;
  const isProd = !isDev;
  const plugins = [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: paths.html,
      favicon: paths.icon,
      minify: !isDev
        ? {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          }
        : undefined,
    }),

    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
      __API__: JSON.stringify(apiUrl),
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
    }),
    new Dotenv(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: "write-references",
      },
    }),
  ];

  if (isDev) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new ReactRefreshWebpackPlugin());
    plugins.push(
      new BundleAnalyzerPlugin({
        openAnalyzer: true,
      })
    );
  }
  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      })
    );
    plugins.push(
      new CopyPlugin({
        patterns: [{ from: paths.robots }, { from: paths.manifest }],
      })
    );
  }
  return plugins;
}
