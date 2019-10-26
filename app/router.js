'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.get('/', controller.home.index);

  /**
   * 外网客户行为数据落地 | 修改策略
   */
  router.post('/logStrategy/modify', controller.logStoreTransfer.modifyStoreStrategy);

  /**
   * 外网客户行为数据落地 | 存贮
   */
  router.post('/api/v1/log', controller.logStoreTransfer.getBehaviorData);

  /**
   * 登录接口
   */
  router.get('/api/v1/sys/login', controller.system.login);

  /**
   * 数据配置中心 | 查询接口
   */
  router.get('/config/query', controller.collectConfig.queryConfig);

  /**
   * 数据配置中心 | 增 删 改 接口
   */
  router.post('/config/handle', controller.collectConfig.handleConfig);
};
