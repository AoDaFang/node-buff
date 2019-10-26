'use strict'
const egg = require('egg');

// const workers = Number(process.argv[2] || require('os').cpus().length); // 获取cup数量
egg.startCluster({
  workers: 1,
  baseDir: __dirname,
  port: 8082,
});
