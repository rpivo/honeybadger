module.exports = {
  entry: "./src/last-published.ts",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: "last-published.js",
  },
  resolve: {
    extensions: [".js", ".ts"],
    fallback: {
      fs: false,
      https: false,
      util: false,
    },
  },
};
