const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname); // 当前文件夹

// 读取目录中的所有文件
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }

  let totalWords = 0;
  
  // 过滤出所有.md文件
  const markdownFiles = files.filter(file => path.extname(file).toLowerCase() === '.md');

  markdownFiles.forEach((file, index) => {
    // 读取每个文件内容
    const filePath = path.join(directoryPath, file);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return console.log('Error reading file: ' + filePath);
      }
      
      // 计算单词数
      const wordCount = data.split(/\s+/).length;
      totalWords += wordCount;
      
      // 所有文件都已处理完成，输出总字数
      if (index === markdownFiles.length - 1) {
        console.log(`Total word count in all Markdown files: ${totalWords}`);
      }
    });
  });
});
