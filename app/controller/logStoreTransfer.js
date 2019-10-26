'use strict';

const Controller = require('egg').Controller;

class logStoreTransferController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  /**
   * 更改数据存储策略
   */
  async modifyStoreStrategy() {
    const {
      app,
      ctx
    } = this;
    // 记录请求日志信息
    ctx.helper.infoLogger(ctx);
    // 获取请求参数
    const reqData = await ctx.request.body;
    console.log("======================= 修改策略接口 =======================");
    console.log('------------- 接口接受到的数据(转发出去的数据) --------------');
    console.log(reqData.data)
    let res = null;
    try {
      // 获取基路径
      const baseUrl = await app.config.IntraNet.baseUrl;
      // 获取url
      const url = await app.config.IntraNet.modifyStrategyUrl;
      console.log(baseUrl + url);
      res = await ctx.helper.onlineHttpUtil(ctx, baseUrl + url, 'POST', reqData);
      console.log('------------- 返回的数据 --------------');
      console.log(res.data);

      // 如果返回失败则发送错误提示
      res.data.result.code != 0 && ctx.returnErrorBody('接口code 不为 0');
      // 如果返回成功则发送错误提示
      res.data.result.code == 0 && ctx.returnDataBody('success', res.data.result.data);
    } catch (e) {
      console.log('------------- 捕获到异常 --------------');
      // 记录异常日志
      ctx.helper.errLogger(ctx, e);
      ctx.returnErrorBody('接口报错');
    }
  }
  /**
   * 接受行为数据的接口
   */
  async getBehaviorData() {
    const {
      app,
      ctx
    } = this;
    // 记录请求日志信息
    ctx.helper.infoLogger(ctx);
    // 获取请求参数
    let reqData = await ctx.request.body;
    console.log("======================= 接受行为数据的接口 =======================");
    console.log("----------- 接收的数据 -----------");
    console.log(reqData);
    // 遍历msgs数组 根据不同的type值进行处理
    reqData.msgs.forEach(item => {
      if(item.type === "1"){
        item.msg = item.msg.replace('${createTime}', Date.now()).replace('${ip}', ctx.ip);
      } else if (item.type === "2"){
        item.msg = item.msg.replace('${createTime}', Date.now());
      }
    })
    console.log("----------- 处理过的数据 -----------");
    console.log(reqData);
    let res = null;
    try {
      // 获取url
      const baseUrl = await app.config.IntraNet.baseUrl;
      // 获取url
      const url = await app.config.IntraNet.getBehaviorDataUrl;
      console.log(baseUrl + url)
      res = await ctx.helper.onlineHttpUtil(ctx, baseUrl + url, 'POST', reqData);
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

module.exports = logStoreTransferController;
