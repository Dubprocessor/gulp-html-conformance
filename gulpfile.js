const path = require('path');
const fs = require('fs');

const gulp = require('gulp');
const conform = require('./src/index');

const srcPath = './__test__/fixtures/*.html';
const logDirPath = './__test__/temp/';
const destPath = './__test__/temp/';

gulp.task('htmllint', () =>
  gulp
    .src(srcPath)
    .pipe(
      conform({
        logToFile: `${logDirPath}vnu-json.log`,
        vnu: {
          format: 'text',
          'exit-zero-always': false,
          Werror: false,
          filterpattern: '.*name.*'
        },
        htmlhint: {
          'space-tab-mixed-disabled': 'space'
        }
      })
    )
    .pipe(gulp.dest(destPath))
);

gulp.task('clean', done => {
  function recClean(dirPath) {
    if (!fs.existsSync(dirPath)) {
      return;
    }

    fs.readdirSync(dirPath).forEach(file => {
      const currPath = path.join(dirPath, file);
      if (fs.lstatSync(currPath).isDirectory()) {
        recClean(currPath);
      } else {
        fs.unlinkSync(currPath);
      }
    });
    if (dirPath !== logDirPath) {
      fs.rmdirSync(dirPath);
    }
  }

  recClean(logDirPath);
  done();
});

gulp.task('default', gulp.series('clean', 'htmllint'));
