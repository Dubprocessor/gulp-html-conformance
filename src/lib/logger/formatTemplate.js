const chalk = require('chalk');

const formatTemplate = ({ timestamp, level, message, meta }) => {
  const colorlessLevel = level.replace(/\u001b\[.*?m/g, ''); /* eslint-disable-line */

  let link;
  if (colorlessLevel === 'info') {
    link = `\n${chalk.underline.yellow(meta.path)}`;
  } else if (colorlessLevel === 'error') {
    link = `\n${chalk.underline.red(meta.path)}`;
  } else if (colorlessLevel === 'success') {
    link = `\n${chalk.underline.green(meta.path)}`;
  } else {
    link = '';
  }

  return `[${chalk.gray(timestamp)}] - ${level}\n${chalk.whiteBright(message)}\n${
    meta.place ? meta.place : ''
  } ${link}\n`;
};

module.exports.formatTemplate = formatTemplate;
