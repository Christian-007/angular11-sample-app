"use strict";
const { publishSourcemap } = require("@newrelic/publish-sourcemap");

class NewRelicSourceMapUploaderPlugin {
  constructor(options) {
    this.applicationId = this._throwErrorIfNotExist(options, "applicationId");
    this.apiKey = this._throwErrorIfNotExist(options, "apiKey");
    this.publicPath = this._throwErrorIfNotExist(options, "publicPath");
    this.releaseName = options.releaseName || null;
    this.releaseId = options.releaseId || null;
    this.repoUrl = options.repoUrl || null;
    this.buildCommit = options.buildCommit || null;
    this.nrPublishSourcemap = publishSourcemap; // for easier spy on the unit test ¯\_(ツ)_/¯
  }

  // TODO: validate if options exist, validate if applicationId is number, apiKey is string, publicPath is string, handle if no js or source map files found
  // TODO: create unit tests
  apply(compiler) {
    compiler.hooks.done.tapPromise(
      "NewRelicSourceMapUploaderPlugin",
      async (stats) => {
        const { chunks } = stats.compilation;
        const { path } = stats.compilation.outputOptions;

        const files = chunks
          .map((chunk) => chunk.files)
          .filter((fileNames) => !this._hasCssFile(fileNames))
          .map((fileNames) => this._getJsAndSourceMapFiles(fileNames, path));
        const batchUploadSourceMaps = files.map((file) =>
          this._uploadSourceMap(file)
        );

        try {
          await Promise.all(batchUploadSourceMaps);
          console.log(
            `[New Relic Source Map Uploader] ✅ Source map upload done!"`
          );
        } catch (error) {
          return console.warn(
            `[New Relic Source Map Uploader] ❌ Error uploading sourcemaps: ${error}"`
          );
        }
      }
    );
  }

  _uploadSourceMap(file) {
    const { jsFileUrl, sourceMapFilePath } = file;

    return new Promise((resolve, reject) => {
      this.nrPublishSourcemap(
        {
          sourcemapPath: sourceMapFilePath,
          javascriptUrl: jsFileUrl,
          applicationId: this.applicationId,
          apiKey: this.apiKey,
          releaseName: this.releaseName,
          releaseId: this.releaseId,
          repoUrl: this.repoUrl,
          buildCommit: this.buildCommit,
        },
        (err) => {
          if (err) {
            reject(err);
          }

          resolve();
        }
      );
    });
  }

  _getJsAndSourceMapFiles(fileNames, fileOutputPath) {
    const JS_EXTENSION = ".js";
    const SOURCE_MAP_EXTENSION = ".map";
    const jsFileName = fileNames.find((fileName) =>
      fileName.endsWith(JS_EXTENSION)
    );
    const sourceMapFileName = fileNames.find((fileName) =>
      fileName.endsWith(SOURCE_MAP_EXTENSION)
    );
    const publicUrl = this._stripTrailingSlash(this.publicPath);
    const outputPath = this._stripTrailingSlash(
      this._stripQueryString(fileOutputPath)
    );

    return {
      jsFileUrl: `${publicUrl}/${jsFileName}`,
      sourceMapFilePath: `${outputPath}/${sourceMapFileName}`,
    };
  }

  _hasCssFile(fileNames) {
    const CSS_EXTENSION = ".css";
    return fileNames.some((file) => file.endsWith(CSS_EXTENSION));
  }

  _stripTrailingSlash(path) {
    const FORWARD_SLASH = "/";
    const START_INDEX = 0;
    const hasTrailingSlash = path.endsWith(FORWARD_SLASH);

    if (hasTrailingSlash) {
      const MAX_LENGTH_WITHOUT_TRAILING_SLASH = path.length - 1;
      return path.substr(START_INDEX, MAX_LENGTH_WITHOUT_TRAILING_SLASH);
    }

    return path;
  }

  _stripQueryString(path) {
    const QUERY_STRING = "?";
    const START_INDEX = 0;
    const queryStringIndex = path.indexOf(QUERY_STRING);
    const hasQueryString = queryStringIndex > 0;

    if (hasQueryString) {
      return path.substr(START_INDEX, queryStringIndex);
    }

    return path;
  }

  _throwErrorIfNotExist(options, optionName) {
    const hasValue = options[optionName] != undefined;
    if (!hasValue) {
      throw new Error(
        `[New Relic Source Map Uploader] ❌ ${optionName} is required`
      );
    }

    return options[optionName];
  }
}

module.exports = NewRelicSourceMapUploaderPlugin;
