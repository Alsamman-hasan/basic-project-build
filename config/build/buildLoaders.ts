import webpack from 'webpack';
import { IBuildOptioins } from './types/config';
import { buildBabelLoader } from './loaders/babelLoader';
import { buildCssLoader } from './loaders/cssLoader';

export function buildLoaders(options: IBuildOptioins): webpack.RuleSetRule[] {
  const { isDev } = options;
  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  };
  const jsonLoader = { test: /\.json$/, type: 'json' };
  const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
  const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });
  const cssLoader = buildCssLoader(isDev);
  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff||ttf)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  };

  return [
    fileLoader,
    svgLoader,
    codeBabelLoader,
    jsonLoader,
    tsxCodeBabelLoader,
    cssLoader,
  ];
}
