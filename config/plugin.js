'use strict';

/** @type Egg.EggPlugin */

// 开启参数校验模块
exports.validate = {
  enable: true,
  package: 'egg-validate',
};

// 开启跨域模块
exports.cors = {
  enable: true,
  package: 'egg-cors',
};