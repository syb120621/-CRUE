/*
  入口模块
  职责：
  创建服务
   做服务配置
   监听端口服务
   挂載路由
 */
var express=require('express')
var router=require('./router')
var bodyParser=require('body-parser')

var app=express()

app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))

//配置模板引擎
app.engine('html',require('express-art-template'))

//配置body-parser第三方插件  一定要放在挂載路由之前
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//挂載路由
app.use(router)
// router(app)

app.listen(3000,function(){
	console.log('Server is running...')
})