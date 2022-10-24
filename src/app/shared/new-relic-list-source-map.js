var listSourcemaps = require("@newrelic/publish-sourcemap").listSourcemaps;

listSourcemaps(
  {
    applicationId: 1385909203,
    apiKey: "some api key",
  },
  function (err, res) {
    console.log(err || res.sourcemaps);
  }
);
