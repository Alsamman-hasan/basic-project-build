export function buildFileLoader(isDev: boolean) {
  return {
    test: /\.(png|jpe?g|gif)$/i,
    type: "asset",
  };
}
