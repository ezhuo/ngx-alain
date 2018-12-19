const path = require('path');
const fs = require('fs');
const bundle = require('less-bundle-promise');

const root = path.resolve(__dirname, '../');
const allLessPath = path.join(root, '_all.less');
const target = path.join(root, 'src/assets/alain-default.less');

const content = `
@import 'src/delon/theme/styles/index';
@import 'src/delon/abc/index';
@import 'src/delon/chart/index';
@import 'src/delon/theme/styles/layout/default/index';
@import 'src/delon/theme/styles/layout/fullscreen/index';


@import 'src/styles/index';
@import 'src/styles/theme';
`;

fs.writeFileSync(allLessPath, content);

bundle({
  src: allLessPath,
}).then(colorsLess => {
  fs.writeFileSync(target, colorsLess);
  fs.unlinkSync(allLessPath);
});
