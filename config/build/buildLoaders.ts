import webpack from "webpack";
import { IBuildOptioins } from "./types/config";
import { buildBabelLoader } from "./loaders/babelLoader";
import { buildCssLoader } from "./loaders/cssLoader";
import { buildFileLoader } from "./loaders/buildFileLoader";

export function buildLoaders(options: IBuildOptioins): webpack.RuleSetRule[] {
  const { isDev } = options;
  const svgLoader = {
    test: /\.svg$/,
    use: ["@svgr/webpack"],
  };

  const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
  const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });
  const cssLoader = buildCssLoader(isDev);
  const imageLoader = buildFileLoader(isDev);
  const fileLoader = {
    test: /\.(woff2|woff||ttf)$/i,
    type: "asset/resource",
  };

  return [
    fileLoader,
    imageLoader,
    svgLoader,
    codeBabelLoader,
    tsxCodeBabelLoader,
    cssLoader,
  ];
}
