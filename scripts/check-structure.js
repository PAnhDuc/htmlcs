const fs = require('fs');
const path = require('path');

// Định nghĩa cấu trúc thư mục mong muốn
const expectedStructure = {
  'index.html': 'file',
  'assets': {
    'css': 'folder',
    'js': 'folder',
    'images': 'folder',
    'fonts': 'folder',
  },
};

function checkStructure(basePath, structure) {
  for (const key in structure) {
    const itemPath = path.join(basePath, key);
    const expectedType = structure[key];

    if (expectedType === 'file') {
      if (!fs.existsSync(itemPath) || !fs.lstatSync(itemPath).isFile()) {
        console.error(`❌ Thiếu tệp: ${key}`);
        process.exit(1);
      }
    } else if (expectedType === 'folder') {
      if (!fs.existsSync(itemPath) || !fs.lstatSync(itemPath).isDirectory()) {
        console.error(`❌ Thiếu thư mục: ${key}`);
        process.exit(1);
      } else {
        checkStructure(itemPath, structure[key]);
      }
    }
  }
}

const projectRoot = path.resolve(__dirname, '../');
checkStructure(projectRoot, expectedStructure);

console.log('✅ Cấu trúc dự án hợp lệ.');
