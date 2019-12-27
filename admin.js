var mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/itcast', {useNewUrlParser: true});

var Schema=mongoose.Schema

var AdminSchema=new Schema({
	username:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	}
})

//导出模型构造函数
module.exports=mongoose.model('Admin',AdminSchema)