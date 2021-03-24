/* eslint valid-jsdoc: "off" */

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
  config.keys = appInfo.name + '_1584691745162_771';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };


  //设置mysql
  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: 'zhangrufu',
      // database
      database: 'react_blog',    
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };


//设置跨域
  config.security={
    csrf:{
      enable:false
    },
    domainWhiteList:['*']//白名单
  }
  config.cors={
    origin:'*',
    credentials:true, //允许cookie可以跨域
    allowMethods:'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS,UPDATE'
  }



  return {
    ...config,
    ...userConfig,
  };
};
