const fs = require('fs');
const path = require('path');
exports.getPackages = function getPackages() {
  return fs
    .readdirSync(path.resolve('packages'))
    .map(file => path.resolve('packages', file))
    .filter(file => fs.lstatSync(file).isDirectory());
};
