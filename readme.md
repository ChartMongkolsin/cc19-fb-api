CC19-Fakebook-API
===
### env guide
PORT=8899
DATABASE_URL = "mysql://root:1234@localhost:3306/cc19-Fakebook-api"
JWT_SECRET = ***

---
###service
|path |method |authen|params|query|body|
|:--|:--|:--|:--|:--|:-- |
|/auth/register|post|-|-|-| {identity, firstName, lastName,password,confirmPassowrd}
|/auth/login|post|-|-|-| {identity, password}
|/auth|get/me|y|-|-|-|
|/post|get|y|-|-|-|
|/post|post|y|-|-|{message, image(file)}
|/post|put|y|:id|-|{message, image(file)}
|/post|delete|y|:id|-|-
|/comment|post|y|-|-|{message, postId} 
|/like|post|y|-|-|{postId}
|/like|delete|y|:id|-|-

---
## Note
1. npx prisma init

2. npm i express cors dotenv
require('dotenv').config()
const express = require('express')
const app = (express()) 

//route
เรียกใช้ router หลัก / มีกี่เส้น

3. สร้าง middleware (notfound status 404 msg: Service not found, error status (500).json {error:err.message} )
- middleware module.exports
- create notfound
- app.use(notfound)
- create error middlewares (err,req,res,next)
- app.use(error)

4. สร้าง routing ดูตาม server.js ที่จะยิงย่อย มีกี่เส้น ยิงอะไร
- auth-routes const authRotue = express.Router(), module.exports = authRoute
auth.post("/register",(req,res)=>{})
auth.get("/me",(req,res)=>{})
- app.use ("/auth", authRoute) ใน server.js

5. Create Controller ไม่ได้ยุ่งกับ server ยุ่งกับ route ย่อยมีกี่เส้น module.exports.register สร้างฟังชั่น
- module.exports.register = (req,res)=>{res.json({msg:register})}
- เชื่อมกับ route auth.post("/register", register)