'use strict';
/**
 * @author you
 * @date 2019/7/16
 * @version 1.0 v
 * @description: context.js
 */
module.exports = {
  /**
   *@desc 封装请求成功的返回体
   *@author you
   *@date 2019-07-16 10:46:51
   *@params message
   */
  returnSuccessBody(message) {
    this.body = {
        result:{
          code:'0',
          message:message
      } };
  },

  /**
   *@desc 封装请求成功并有返回数据的返回体
   *@author you
   *@date 2019-07-16 10:59:45
   *@params message
   *@params data
   */
  returnDataBody(message,data) {
    this.body = {
      result:{
        code:'0',
        message:message
      } ,
      data:data
    };
  },

  /**
   *@desc 封装请求失败的返回体
   *@author you
   *@date 2019-07-16 10:48:51
   *@params message
   */
  returnErrorBody(message) {
    this.body = {
      result:{
        code:'1',
        message:message
      } };
  },
    /**
     *@desc 封装请求失败并有返回数据的返回体
     *@author 张旭
     *@date 2019-08-02
     *@params message
     *@params data
     */
    returnErroeDataBody(message,data) {
        this.body = {
            result:{
                code:'1',
                message:message
            } ,
            data:data
        };
    },
};
