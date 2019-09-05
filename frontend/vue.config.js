const path = require("path");
const PrerenderSPAPlugin = require("prerender-spa-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];

const config = {
  configureWebpack: {
    plugins: [
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, "dist"),
        routes: ["/"],
        renderer: new PrerenderSPAPlugin.PuppeteerRenderer({
          renderAfterTime: 3000
        })
      }),
      new CompressionWebpackPlugin({
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  }
};

module.exports = config;
