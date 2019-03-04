const vnu = require('vnu-jar');

function createCmd(options) {
  let vnuCmd = `java -Xss1024k -jar ${vnu} `;
  Object.keys(options.vnu).forEach(key => {
    const value = options.vnu[key];
    if (key === 'format') {
      vnuCmd += '--format json ';
    }
    if (key === 'filterfile') {
      vnuCmd += `--filterfile ${value} `;
    }
    if (key === 'filterpattern') {
      vnuCmd += `--filterpattern ${value} `;
    }
    if (value === true) {
      vnuCmd += `--${key} `;
    }
  });
  return vnuCmd;
}

module.exports = createCmd;
