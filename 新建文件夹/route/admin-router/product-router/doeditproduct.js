//formidable解析表单中提交的文件数据
//下载模块
//cnpm i formidable --save 解析表单提交的文件数据
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
    form.parse(req, async (err, fields, files) => {
        //console.log(fields);//文本数据
        //console.log(files.pic.name);//根据files.oic.name是否为空来判断是否修改图片,为空没修改否则修改图片
        if (!files.pic.name) {
            var result = await Product.updateOne({ "_id": req.query.id }, {
                title: fields.title,
                postage: fields.postage,
                price: fields.price,
            })
        } else if (files.pic.name) {
            var result = await Product.updateOne({ "_id": req.query.id }, {
                title: fields.title,
                pic: files.pic.path.split("public")[1],
                postage: fields.postage,
                price: fields.price,
            })
        }
        if (result) {
            res.redirect("/admin/productlist")
        }
    })
}