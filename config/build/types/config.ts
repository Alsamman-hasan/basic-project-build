export type BuildMode = "development" | "production";

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
}

export interface IBuildOptioins {
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
