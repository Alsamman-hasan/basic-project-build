import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildCssLoader(isDev: boolean) {
  return {
    exclude: /node_modules/,
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
      {
        loader: require.resolve('css-loader'),
        options: {
          modules: {
            auto: (resPath: string) => Boolean(resPath.includes('.module.')),
            localIdentName: isDev
              ? '[path][name]__[local]--[hash:base64:5]'
              : '[hash:base64:8]',
          },
        },
      },
      'sass-loader',
    ],
  };
}
