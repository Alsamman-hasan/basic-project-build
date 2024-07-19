import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin';
import { IBuildOptions } from '../types/config';

interface buildBabelLoaderProps extends IBuildOptions {
  isTsx?: boolean;
}

export function buildBabelLoader({ isDev, isTsx }: buildBabelLoaderProps) {
  return {
    exclude: /node_modules/,
    test: isTsx ? /\.(js|jsx|tsx)$/ : /\.(js|ts)$/,
    use: {
      loader: require.resolve('babel-loader'),
      options: {
        cacheCompression: false,
        cacheDirectory: true,
        compact: !isDev,
        plugins: [
          ['@babel/plugin-transform-typescript', { isTsx }],
          '@babel/plugin-transform-runtime',
          isTsx &&
            !isDev && [
              babelRemovePropsPlugin,
              {
                props: ['data-testid'],
              },
            ],
          isDev && require.resolve('react-refresh/babel'),
        ].filter(Boolean),
        // presets: [
        //   [
        //     require.resolve('@babel/preset-react'),
        //     {
        //       runtime: isTsx ? 'automatic' : 'classic',
        //     },
        //   ],
        // ],
        presets: ['@babel/preset-env'],
      },
    },
  };
}
