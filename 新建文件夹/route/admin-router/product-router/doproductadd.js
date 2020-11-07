//cnpm i formidable --save 解析表单提交的文件数据
//下载模块
// 引入模块
let formidable = require("formidable")
let { Product } = require("../../../mongodb/product.js")
let path = require("path")
console.log(formidable);

module.exports = (req, res) => {
    //1.创建一个表单解析对象
    let form = new formidable.IncomingForm();
    //2.配置上传文件存放位置,放置在public文件夹下的uploads
    form.uploadDir = path.join(__dirname, "../", '../', '../', "public", "uploads")
    //3.保存上传文件的后缀名
    form.keepExtensions = true
    form.parse(req, async(err, fields, files) => {
        console.log(fields);//文本数据
        //console.log(files);//文件信息
        console.log(files.pic.path.split("public")[1]);
        let result = await Product.create({
            title: fields.title,
            pic: files.pic.path.split("public")[1],
            cate_id: fields.postage,
            goods_id:fields.goods_id,
            postage: fields.postage,
            price: fields.price,
            content:fields.content
        })
        if(result){
            res.redirect("/admin/productlist")
        }
    })
    // console.log(req);
}