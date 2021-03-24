'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };

exports.mysql={//使用MySQL
  enable:true,//是否开启
  package:'egg-mysql'//包名
}

exports.cors={//解决跨域问题
  enable:true,
  package:'egg-cors'
}
