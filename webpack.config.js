const NewRelicSourceMapUploaderPlugin = require("./src/app/shared/new-relic-source-map-uploader");

module.exports = {
  plugins: [
    new NewRelicSourceMapUploaderPlugin({
      apiKey: "some api key",
      applicationId: 1385909203,
      publicPath: "http://localhost:3000/",
    }),
  ],
};
