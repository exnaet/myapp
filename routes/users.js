var express = require('express');
var router = express.Router();

var mysql = require('mysql'); //引入mysql 模块

//创建mysql连接池 参数字段很明显了就不说明了
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '851025',
  database: 'aisensor'
});

//我要执行的mysql语句
var sql = 'SELECT * from users';


/* GET users listing. */
router.get('/', function(req, res, fields) {
  //res.send('这就拿到了users的数据?!');
  //从连接池获取连接
  pool.getConnection(function (err, conn) {
    if (err) {
      res.send(JSON.stringify({
        code: '0x000000000',
        status: 0,
        remark: '服务器异常',
        message: null,
        data: null
      }));
    } else {
      conn.query(sql, function (qerr, vals, fields) {
        if (qerr) {
          res.send(JSON.stringify({
            code: '0x000000000',
            status: 0,
            remark: '获取用户列表',
            message: '请求失败',
            data: null
          }));
        }
        //释放连接
        conn.release();
        res.send(JSON.stringify({
          code: '0x000000000',
          status: 1,
          remark: '获取用户列表',
          message: '请求成功',
          data: vals
        }));
      });
    }
  });

});

module.exports = router;
