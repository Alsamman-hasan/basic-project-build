export function buildFileLoader() {
  return {
    test: /\.(png|jpe?g|gif)$/i,
    type: 'asset',
  };
}
