module.exports = {
  entry: {
    'last-published': './src/last-published.ts',
    'latest-version': './src/latest-version.ts',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  target: 'node',
};
