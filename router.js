/*
	路由模块
	只负责路由配置，别的不管
 */

var fs=require('fs')

var Student=require('./student')
var Admin=require('./admin')

//express专门用来包装路由的
var express=require('express')

//1、创建一个路由容器
var router=express.Router()

//2、把路由都挂载到router路由容器中
router.get('/',function(req,res){
	res.render('login.html')
})

router.post('/login',function(req,res){
	var Username=req.body.username
	var Password=req.body.password
	Admin.findOne({username:Username,password:Password}, function(err,admin){
		if(err){
			return res.status(500).send('Server error.')
		}
		if(admin===null){
			res.redirect('/')
		}
		else{
			res.redirect('/students')
		}
	})
})

router.get('/register',function(req,res){
	res.render('register.html')
})

router.post('/register',function(req,res){
	new Admin(req.body).save(function(err){
		if(err){
			return res.status(500).send('Server error.')
		}
		res.redirect('/')
	})
})

router.get('/students',function(req,res){
// fs.readFile('./db.json',function(err,data){
// 	if (err) {
// 		return res.status(500).send('Server error.')
// 	}
// 	//从文件中读出的数据都是字符串类型，必须转化为JSON对象
// 	var students=JSON.parse(data).students

// 	res.render('index.html',{
// 		fruits:[
// 			'苹果',
// 			'香蕉',
// 			'橘子',
// 			'西瓜'
// 			],
// 		//从文件中读出的数据都是字符串类型，必须转化为JSON对象
// 		students:students
// 		})
// 	})	

Student.find(function(err, students){
	if(err){
		return res.status(500).send('Server error.')
	}
	res.render('index.html',{
		//从文件中读出的数据都是字符串类型，必须转化为JSON对象
		students:students
		})
	})
})

router.get('/students/new',function(req,res){
	res.render('new.html')
})

router.post('/students/new',function(req,res){
	//1、獲取表單數據
	//2、處理
	//3、發送響應
	  new Student(req.body).save(function(err){
		if(err){
			return res.status(500).send('Server error.')
		}
		res.redirect('/students')
	})
})

//渲染编辑学生页面
router.get('/students/edit',function(req,res){
	//1、在客户端的列表页中处理链接问题（需要有id参数）
	//2、获得要编辑的学生的id
	//3、渲染编辑页面
	//     (1)、根据id把学生信息查出来
	//     (2)、使用模板引擎渲染页面
	// res.render('edit.html',{
	// 	student:
	// })
	
	// replace使用正则表达式将id中的“全部替换为空，否则会报错
	Student.findById(req.query.id.replace(/"/g,""), function(err,student){
		if(err){
			return res.status(500).send('Server error.')
		}
		res.render('edit.html',{
			student:student
		})
	})
})

//处理编辑学生
router.post('/students/edit',function(req,res){
	//1、获取表单数据
	//		req.body
	//2、更新
	//    	Student.update()
	//3、发送响应
	var id=req.body.id.replace(/"/g,"")
	Student.findByIdAndUpdate(id,req.body,function(err){
		if(err){
			return res.status(500).send('Server error.')
		}
		res.redirect('/students')
	})
})

//处理删除学生
router.get('/students/delete',function(req,res){
	//1、获取要删除的id
	//2、根据id执行删除操作
	//3、根据操作结果发送响应数据
	var id=req.query.id.replace(/"/g,"")
	Student.findByIdAndRemove(id,function(err){
		if(err){
			return res.status(500).send('Server error.')
		}
		res.redirect('/students')
	})
})

//查询学生
router.get('/students/search',function(req,res){
	res.render('search.html')
})

router.post('/students/search',function(req,res){
	// var AllStudents=Student.find()
	var StudentNumber=req.body.number
	Student.findOne({number:StudentNumber}, function(err,students){
		if(err){
			return res.status(500).send('Server error.')
		}
		res.render('search.result.html',{
		students:students
		})
		// console.log(students)
	})
})


//3、把router导出
// export.router=router
module.exports=router

