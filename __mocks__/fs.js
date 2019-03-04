const fs = jest.genMockFromModule('fs');

const mkdirSync = jest.fn().mockImplementation((dirPath, _options) => {
  if (dirPath) {
    return dirPath;
  }
  return;
});
const existsSync = jest.fn().mockImplementation(dirPath => {
  if (dirPath.includes('nonexisten')) {
    return false;
  }
  return true;
});
fs.mkdirSync = mkdirSync;
fs.existsSync = existsSync;

module.exports = fs;
