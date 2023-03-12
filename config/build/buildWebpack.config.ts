import { Configuration } from "webpack";
import TerserPlugin from "terser-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import { buildDevServer } from "./buildDevserver";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolves } from "./buildResolve";
import { IBuildOptioins } from "./types/config";

export function buildWebpackConfig(options: IBuildOptioins): Configuration {
  const { mode, paths, isDev } = options;
  return {
    mode,
    entry: paths.entry,
    output: {
      filename: "[name].[contenthash].js",
      path: paths.build,
      clean: true,
      publicPath: "/",
      assetModuleFilename: "images/[hash][ext][query]",
    },
    module: {
      rules: buildLoaders(options),
    },
    devtool: isDev ? "eval-cheap-module-source-map" : "source-map",
    // devtool: "source-map",
    devServer: isDev ? buildDevServer(options) : undefined,
    resolve: buildResolves(options),
    plugins: buildPlugins(options),
    optimization: {
      minimize: !isDev,
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
      mergeDuplicateChunks: true,
      removeAvailableModules: true,
      sideEffects: true,
    },
    cache: {
      type: "filesystem",
      allowCollectingMemory: true,
      maxAge: 31536000,
      memoryCacheUnaffected: true,
      idleTimeout: 60000,
    },
    performance: {
      maxAssetSize: 100000,
    },
  };
}
