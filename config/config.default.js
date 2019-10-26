
'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1569316505200_2299';

  // add your middleware config here
  config.middleware = [];

  // 解决跨域添加
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['*']
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };
  // 解决跨域添加

  // config.cluster = {
  //     listen: {
  //       port: 8082,
  //       hostname: '10.140.128.41',
  //     }
  // };

  // 系统配置相关接口
  config.configure = {
    query: '/api/v1/config/event',
    handle: '/api/v1/config/event',
  };

  // 内网相关配置
  config.IntraNet = {
    baseUrl: 'http://10.0.15.31:8080/',
    modifyStrategyUrl: 'logStrategy/modify',
    getBehaviorDataUrl: 'api/v1/log',// 发送行为数据的url
    loginUrl: 'api/v1/sys/login', // 登录接口
    configUrl: 'https://video-uat.ihxlife.com/config-server',
  };

  // 配置参数校验相关信息
  config.validate = {
    // 设置检验不通时的返回体
    resolveError(ctx, errors) {
      if (errors.length) {
        ctx.body = {
          result: {
            code: 1,
            message: errors[0].message,
          },
        };
      }
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  return {
    ...config,
    ...userConfig,
  };
};
