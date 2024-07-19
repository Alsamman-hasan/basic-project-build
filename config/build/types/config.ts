export type BuildMode = 'development' | 'production';

export interface BuildPaths {
  entry: string;
  build: string;
  html: string;
  src: string;
  icon: string;
  robots: string;
  manifest: string;
  public: string;
  envPath: string;
  logo192: string;
  indexCss: string;
  appTsConfig: string;
  appWebpackCache: string;
}

export interface IBuildOptions {
  mode: BuildMode;
  paths: BuildPaths;
  isDev: boolean;
  port: number;
  apiUrl: string;
  publicUrl: string;
}

export interface BuildEnv {
  mode: BuildMode;
  port: number;
  apiUrl: string;
  publicUrl: string;
}
