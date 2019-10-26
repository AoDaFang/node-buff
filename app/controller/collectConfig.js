/**
 *
 * @Created by Wang Xinjie On  。
 */
'use strict';

const Controller = require('egg').Controller;

class CollectConfigController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hello egg';
  }

  // 配置信息获取 查询接口
  async queryConfig() {
    const { app, ctx } = this;

    // 记录请求日志信息
    ctx.helper.infoLogger(ctx);
    // 获取query中的参数
    const req = `key=${ctx.query.key}`;
    // 获取请求路径
    const configUrl = await app.config.IntraNet.configUrl;
    const url = await app.config.configure.query;
    let result = null;

    try {
      result = await ctx.helper.onlineHttpUtil(ctx, configUrl + url, 'GET', req);
    } catch (e) {
      ctx.helper.errLogger(ctx, e);
      ctx.returnErrorBody('fail');
    }
    // ctx.returnDataBody('success', result.data);
    // result.data.code === 0 ? ctx.returnDataBody(result.data.msg, result.data.data) : ctx.returnDataBody(result.data.msg, result.data.data);
    ctx.returnDataBody(result.data.msg, result.data.data);
  }

  // 增删改
  async handleConfig() {
    const { app, ctx } = this;

    // 记录请求日志
    ctx.helper.infoLogger(ctx);
    // 获取请求参数
    const reqData = await ctx.request.body;
    // 设置校验规则
    const checkRule = {
      test: { type: 'string', required: true },
    };
    // 参数校验
    const validateResult = await ctx.validate(checkRule, reqData);
    // 校验不通过后面的程序不执行
    if (!validateResult) return;

    reqData.createTime = await ctx.helper.formaDate('yyyy-MM-dd hh:mm:ss'); // 创建时间
    reqData.updateTime = await ctx.helper.formaDate('yyyy-MM-dd hh:mm:ss'); // 更新时间

    // 获取请求路径
    const handleUrl = await app.config.IntraNet.configUrl;
    const url = await app.config.configure.handle;
    let result = null;

    try {
      result = await ctx.helper.onlineHttpUtil(ctx, handleUrl + url, 'POST', reqData);
    } catch (e) {
      // 记录异常日志
      ctx.helper.errLogger(ctx, e);
      ctx.returnErrorBody('fail');
    }
    // result.data.code === 0 ?
    //   ctx.returnDataBody('success', result.data.data) : ctx.returnDataBody('fail', result.data.data);
    ctx.returnDataBody(result.data.msg, result.data.data);
  }
}

module.exports = CollectConfigController;
