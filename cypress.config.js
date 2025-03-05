import { defineConfig } from "cypress";
import Evinced from "@evinced/cypress-sdk";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const os = require('os');
export default defineConfig({
  
  e2e: {
    setupNodeEvents(on) {
      // This is how you should upload to platform with Cypress
      on("task", {
        uploadToPlatform: Evinced.default.cyTaskUploadToPlatform,
      });
    },
  },
  
  env: {
    // To disable the feature just comment out the whole evReporterOptions entry.
    evincedConfig: {
      reporterOptions: {
        reportFormat: "html", // Sets a desired format for the report. Available options are: html, sarif, and json.
        filePath: "./evincedReports/aggregatedReport.html", // Specifies a path to the final aggregated report file.
        tmpDir: os.tmpdir(), // Specifies the temporary directory to store temporary report files.
        reportTimeStamp: new Date().toISOString(), // Provides a unique timestamp for the report to distinguish to which test run the temporary files belong to. Please do not change this value unless you are sure what you would like to achieve.
      },
    },
  },
});

