import path from "path";
import dotenv from "dotenv";
import getPublicUrlOrPath from "react-dev-utils/getPublicUrlOrPath";
import webpack from "webpack";
import { buildWebpackConfig } from "./config/build/buildWebpack.config";
import { BuildEnv, BuildPaths } from "./config/build/types/config";

export default (env: BuildEnv) => {
  const resolveApp = (relativePath: string) =>
    path.resolve(__dirname, relativePath);

  const paths: BuildPaths = {
    appTsConfig: resolveApp("tsconfig.json"),
    appWebpackCache: resolveApp("node_modules/.cache"),
    build: resolveApp("build"),
    entry: resolveApp("src/index.tsx"),
    envPath: resolveApp("./.env"),
    html: resolveApp("public/index.html"),
    icon: resolveApp("public/logo64.png"),
    indexCss: resolveApp("public/index.css"),
    logo192: resolveApp("public/logo192.png"),
    manifest: resolveApp("public/manifest.json"),
    public: resolveApp("public"),
    robots: resolveApp("public/robots.txt"),
    src: resolveApp("src"),
  };
  dotenv.config().parsed || {};

  const mode = env.mode || "development";
  const isDev = mode === "development";
  const { apiUrl } = env;
  const PORT = Number(process.env.APP_PORT);

  const publicUrlOrPath = getPublicUrlOrPath(
    isDev,
    ".",
    process.env.PUBLIC_URL
  );
  const config: webpack.Configuration = buildWebpackConfig({
    apiUrl,
    isDev,
    mode,
    paths,
    port: PORT,
    publicUrl: publicUrlOrPath,
  });

  return config;
};
