'use strict';
/**
 * @author you
 * @date 2019/7/15
 * @version 1.0 v
 * @description: 公共方法封装类
 */
module.exports = {
  /**
   *@desc 记录日志
   *@author luofei
   *@date 2018-09-26 10:59:05
   *@params ctx
   */
  infoLogger(ctx) {
    // 去掉请求头
    ctx.logger.info('请求体: %j', ctx.request.body);
  },

  /**
   *@desc 记录错误日志
   *@author you
   *@date 2019-07-15 17:03:03
   *@params ctx
   *@params e
   */
  errLogger(ctx,e) {
    ctx.logger.error(e);
  },
  /**
   * @desc 发送http请求,只支持GET和POST请求
   * @author liup
   * @date 2018-11-14
   * @param ctx 上下文
   * @param serverUrl 请求路径，以http开头
   * @param methodType 请求类型，GET/POST
   * @param signature 验签
   * @param data 数据包 GET为数据串：参数1=值1&参数2=值2，POST为json数据包：{参数1=值1，参数2=值2}
   * @returns {*}
   */
  async onlineHttpUtil(ctx, serverUrl, methodType, data) {
    console.log('参数为：===', data);
    let result = null;
    if (methodType === 'GET') {
      let path = null;
      if (data === null) {
        path = serverUrl;
      } else {
        path = serverUrl + '?' + data;
      }
      result = await ctx.curl(path, { contentType: 'json', dataType: 'json' });
    } else if (methodType === 'POST') {
      result = await ctx.curl(serverUrl, {
        // 必须指定 method
        method: 'POST',
        // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
        contentType: 'json',
        data: data,
        // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
        dataType: 'json',
      });
    } else {
      result = { result: { 'code': '1', 'result': '请求失败,请求类型错误' } };
    }
    return result;
  },
  // 获取当前时间
  formatDate(date, format) {
    if (format === undefined) {
      format = date
      date = new Date()
    }
    var map = {
      'M': date.getMonth() + 1, // 月份
      'd': date.getDate(), // 日
      'h': date.getHours(), // 小时
      'm': date.getMinutes(), // 分
      's': date.getSeconds(), // 秒
      'q': Math.floor((date.getMonth() + 3) / 3) // 季度
    }
    format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
      var v = map[t]
      if (v !== undefined) {
        if (all.length > 1) {
          v = '0' + v
          v = v.substr(v.length - 2)
        }
        return v
      } else if (t === 'y') {
        return (date.getFullYear() + '').substr(4 - all.length)
      } else if (t === 'S') {
        const ms = `00${date.getMilliseconds()}`
        return ms.substr(ms.length - 3)
      }
      return all
    })
    return format
  },
  /**
     * 对参数对象进行字典排序
     *
     * @param {object} args 签名所需参数对象
     *
     * @return 'string'  排序后生成字符串
     **/
  toraw (args) {
    var keys = Object.keys(args).sort();
    var newArgs = {};
    keys.forEach(key => {
      newArgs[key.toLowerCase()] = args[key];
    });

    var string = '';
    for (var k in newArgs) {
      string += '&' + k + '=' + newArgs[k];
    }
    string = string.substr(1);
    return string;
  },
  async getAccessToken (ctx,app) {
        // 获取请求参数
        const reqData = await ctx.request.query;
        let result = null;
        let  access_token="";

        try {
            // 获取基路径
            const baseUrl = await ctx.config.token.baseUrl;
            // 获取url
            console.log("============"+app.config)
            const url = await app.config.token.tokenUrl;
            const app_id = await app.config.token.app_id;
            const secret_key = await app.config.token.secret_key;
            const data = "app_id="+app_id+"&secret_key="+secret_key;
            access_token= await  ctx.app.redis.get("access_token");
            if(access_token){
                const data = {"access_token":access_token,
                    "expires_in":6000}
                ctx.returnDataBody('success', data);
            }else{
                result = await onlineHttpUtil(ctx, baseUrl + url, 'GET', data);
                //将access_token放入redis
                ctx.app.redis.set("access_token", result.data.data.access_token);
                ctx.app.redis.expire("access_token",6000)
            }

        } catch (e) {
            // 记录异常日志
            ctx.helper.errLogger(ctx, e);
        }

        return access_token;

    },
};
