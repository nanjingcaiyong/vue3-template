import baseWebpackConfig from './webpack.base.config';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { merge } from 'webpack-merge';
import webpack, { Compiler, WebpackPluginInstance } from 'webpack';
const plugins: (
  | ((this: Compiler, compiler: Compiler) => void)
  | WebpackPluginInstance
)[] = []

process.env.npm_config_report && plugins.push(new BundleAnalyzerPlugin())
const webpackConfig: webpack.Configuration = merge(baseWebpackConfig, {
  mode: 'development',
  plugins
});

export default webpackConfig;