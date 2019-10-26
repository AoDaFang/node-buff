'use strict';

const Controller = require('egg').Controller;

class systemController extends Controller {

  /**
   * 登录接口
   */
  async login() {
    const {
      app,
      ctx
    } = this;
    // 记录请求日志信息
    ctx.helper.infoLogger(ctx);
    // 获取请求参数
    let reqData = await ctx.request.body;
    console.log("======================= 登录接口 =======================");
    console.log("----------- 接收的数据 -----------");
    console.log(reqData);
    let res = null;
    try {
      // 获取url
      const baseUrl = await app.config.IntraNet.baseUrl;
      // 获取url
      const url = await app.config.IntraNet.loginUrl;
      console.log(baseUrl + url)
      res = await ctx.helper.onlineHttpUtil(ctx,baseUrl + url, 'GET');
      console.log('------------- 返回的数据 --------------');
      console.log(res.data);

      // 如果返回失败则发送错误提示
      res.data.code != 0 && ctx.returnErrorBody('接口code 不为 0');
      // 如果返回成功则发送错误提示
      res.data.code == 0 && ctx.returnDataBody('success', res.data.data);
    } catch (e) {
      console.log('------------- 捕获到异常 --------------');
      // 记录异常日志
      ctx.helper.errLogger(ctx, e);
      ctx.returnErrorBody('fail');
    }
  }
}

module.exports = systemController;
