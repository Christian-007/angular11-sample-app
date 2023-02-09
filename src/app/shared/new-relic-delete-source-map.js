var deleteSourcemap = require("@newrelic/publish-sourcemap").deleteSourcemap;
var listSourcemaps = require("@newrelic/publish-sourcemap").listSourcemaps;

listSourcemaps(
  {
    applicationId: 1385909203,
    apiKey: "some api key",
  },
  function (err, res) {
    if (err) {
      console.log("Listing source maps error: ", err);
      return;
    }

    const { sourcemaps } = res;
    console.log("sourcemaps: ", sourcemaps);

    console.log("Deleting all sourcemaps...");
    const batchDeleteSourceMaps = sourcemaps.map((sourcemap) =>
      remove(sourcemap.id)
    );
    Promise.all(batchDeleteSourceMaps)
      .then(() => {
        console.log("Deleting source maps done!");
      })
      .catch((err) => {
        console.warn(`❌ Error deleting sourcemaps: ${err}"`);
      });
  }
);

const remove = (sourcemapId) => {
  return new Promise((resolve, reject) => {
    deleteSourcemap(
      {
        sourcemapId,
        applicationId: 1385909203,
        apiKey: "some api key",
      },
      function (err) {
        if (err) {
          reject(err);
        }

        console.log(err || `Deleted source map ${sourcemapId}`);
        resolve();
      }
    );
  });
};
