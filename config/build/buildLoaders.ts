import webpack from 'webpack';
import { buildBabelLoader } from './loaders/babelLoader';
import { buildFileLoader } from './loaders/buildFileLoader';
import { buildCssLoader } from './loaders/cssLoader';
import { IBuildOptions } from './types/config';

export function buildLoaders(options: IBuildOptions): webpack.RuleSetRule[] {
  const { isDev } = options;
  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  };

  const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
  const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });
  const cssLoader = buildCssLoader(isDev);
  const imageLoader = buildFileLoader();
  const fileLoader = {
    test: /\.(woff2|woff||ttf)$/i,
    type: 'asset/resource',
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
