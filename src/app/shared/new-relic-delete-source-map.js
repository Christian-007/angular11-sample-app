var deleteSourcemap = require("@newrelic/publish-sourcemap").deleteSourcemap;
const sourceMapIds = [
  "2f988525-1c6c-4dbe-b2aa-c2b98720115f",
  "2fd40601-00f9-4d5f-9c43-3aa020449515",
  "4cce379f-4c79-4a99-a692-d1edc93b7a8f",
  "7f9a1a8b-a9e7-4aca-b416-74dd20a15946",
  "878fb8f8-b651-4d26-8218-2e8ed74d0f60",
  "8952fee9-807d-4503-a0e7-5df6ae2d8f80",
  "a34c32eb-c7e8-461b-bbb8-830b91fa337a",
  "d21f5447-2d5a-4db1-978f-c611a9faeb79",
];
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
const batchDeleteSourceMaps = sourceMapIds.map((id) => remove(id));

Promise.all(batchDeleteSourceMaps)
  .then(() => {
    console.log("Deleting source maps done!");
  })
  .catch((err) => {
    console.warn(`❌ Error deleting sourcemaps: ${err}"`);
  });
