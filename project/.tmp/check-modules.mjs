const fs = require('fs');
const path = require('path');
const nm = 'D:/code/dily cafe/project/node_modules';
['sharp', 'jimp', 'pngjs', 'canvas'].forEach(m => {
  try { fs.accessSync(path.join(nm, m)); console.log(m, 'exists'); }
  catch { console.log(m, 'missing'); }
});
