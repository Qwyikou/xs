const mongoose = require("mongoose")
require('./database')

//创建一个用户集合规则
const ProductSchema = new mongoose.Schema({
    title: {
        type: String,   //类型
        required: [true, "用户名不能为空"],  //开启验证
        trim: true   //去除空格
    },
    pic: {
        type: String,
    },
    cate_id: {
        type: String,
    },
    goods_id: {
        type: String,
    },
    postage: {
        type: String,
    },
    price: {
        type: Number,
    },
    content: {
        type: String
    }
})

//使用集合规则创建集合
const Product = mongoose.model('Product', ProductSchema);

//暴露
module.exports = {
    Product,
}