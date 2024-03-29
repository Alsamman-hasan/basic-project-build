import babelRemovePropsPlugin from "../../babel/babelRemovePropsPlugin";
import { IBuildOptioins } from "../types/config";

interface buildBabelLoaderProps extends IBuildOptioins {
  isTsx?: boolean;
}

export function buildBabelLoader({ isDev, isTsx }: buildBabelLoaderProps) {
  return {
    test: isTsx ? /\.(js|jsx|tsx)$/ : /\.(js|ts)$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
        plugins: [
          ["@babel/plugin-transform-typescript", { isTsx }],
          "@babel/plugin-transform-runtime",
          isTsx &&
            !isDev && [
              babelRemovePropsPlugin,
              {
                props: ["data-testid"],
              },
            ],
          isDev && require.resolve("react-refresh/babel"),
        ].filter(Boolean),
        cacheDirectory: true,
        cacheCompression: false,
        compact: !isDev,
      },
    },
  };
}
