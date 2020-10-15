const { src, watch, dest, parallel, series } = require("gulp");
const sass = require("gulp-sass");
const nodemon = require("gulp-nodemon");
const browserSync = require("browser-sync");
const cleanCSS = require("gulp-clean-css");
const fs = require("fs-extra");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const env = require("gulp-env");

const scss = () => {
  return src("./src/scss/main.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("./src/public/"));
};

const watchScss = () => {
  watch("./src/scss/**/*.scss", scss);
};

const start = (done) => {
  env({
    file: "./src/nodemon.json",
  });

  return nodemon({
    script: "./src/app.js",
    ext: "js json",
    ignore: ["src/scripts/**/*.*", "src/public/**/*.*", "dist/**/*.*"],
    env: { NODE_ENV: "development" },
    done: done,
  }).on("restart", (ev) => {
    console.log(ev);
  });
};

const browserRefresh = () => {
  return browserSync.init(null, {
    proxy: `http://localhost:${process.env.PORT || 3000}`,
    files: "./src/**/*.*",
    port: 8000,
  });
};

const minifyCss = () => {
  return src("./src/public/main.css")
    .pipe(cleanCSS({ compability: "ie8" }))
    .pipe(dest("./dist/public/"));
};

const copySrcToDist = () => {
  return fs.copy("./src", "./dist", {
    filter: (input) => {
      let res = true;

      if (input.includes("src\\scss")) res = false;

      return res;
    },
  });
};

const concatJsFile = (name) => {
  return src([`./src/scripts/util/**/*.js`, `./src/scripts/${name}/**/*.js`])
    .pipe(concat(`${name}.js`))
    .pipe(
      babel({
        presets: ["@babel/env"],
        plugins: ["@babel/plugin-proposal-class-properties"],
      })
    )
    .pipe(dest("./src/public/scripts/"));
};

const concatJsFiles = async () => {
  await concatJsFile("admin");
  await concatJsFile("shop");
};

const parseJsFile = (name) => {
  return src(`./src/public/scripts/${name}.js`)
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(dest("./src/public/parsedScripts/"));
};

const watchFrontJsFiles = () => {
  watch("./src/scripts/**/*.js", concatJsFiles);
};

exports.default = parallel(watchFrontJsFiles, start, watchScss, browserRefresh);
exports.build = series(scss, copySrcToDist, minifyCss);
