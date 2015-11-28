module.exports = function(config) {
  config.set({
    basePath: "../..",
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,

    frameworks: ["jasmine"],

    files: [
      "www/js/javascript/*.js",
      "www/spec/*_spec.js"
    ],

    exclude: [
    ],

    preprocessors: {
      "www/lib/**/*.js": ["coverage"]
    },

    reporters: ["mocha", "coverage"],

    browsers: ["PhantomJS"],

    coverageReporter: {
      type: 'html',
      dir: 'coverage'
    },

    mochaReporter: {
      output: "autowatch"
    }
  });
};
