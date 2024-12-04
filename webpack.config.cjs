const path = require("path");

module.exports = {
  entry: "./src/index.js", // Entry point of your application
  output: {
    filename: "bundle.js", // The name of the output file
    path: path.resolve(__dirname, "dist"), // Output directory for the bundled file
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Use Babel to transpile JS
          options: {
            presets: ["@babel/preset-env"], // Transpile ES6+ code
          },
        },
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, "dist"), // Serve static files from 'dist' folder
    compress: true,
    port: 8000, // Port for the dev server
    hot: true, // Enable Hot Module Replacement (HMR)
  },
  resolve: {
    extensions: [".js", ".json"], // Resolve these file types without needing to specify the extension
  },
  devtool: "source-map", // For easier debugging
};
