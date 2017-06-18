module.exports = {
  entry: "./app/app.js",
  output: {
    filename: "static/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        include: /app/,
        loader: "babel",
        query: {
          presets: ["react", "es2015"]
          
        }
      }
    ]
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  // This lets us debug our react code in chrome dev tools. Errors will have lines and file names
  // Without this the console says all errors are coming from just coming from bundle.js
  devtool: "eval-source-map"
};
