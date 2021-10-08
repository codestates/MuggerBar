const { user } = require("../../../models")
const jwt = require("jsonwebtoken")

module.exports = async(req, res) => {
    const userInfo = await user.findOne({
        where : { email:req.body.user_email }
    })
    // 바디에담긴 데이터가 유저정보에 없으면 새로생성
    if(userInfo === null){
        const create = user.create({
            where : {
                email:req.body.user_email,
                password:req.body.user_password,
                nickname : req.body.user_nickname
            }
        });
        //비밀번호삭제 후 토큰생성 -> 쿠키에담아서 전달
        delete create.dataValues.user_password;
        const accessToken = jwt.sign(create.dataValues,process.env.ACCESS_SECRET,{ expiresIn:'1d' });
        res.cookie('jwt',accessToken,{
            sameSite: "none",
            secure: true,
            httpOnly: true,
          });
          res.status(201).json({ data: { accessToken: accessToken }, message: "ok" });
    }else{
        //이미 같은 이메일이 있다.
        res.status(409).json({ data: { userInfo : null }, message: "This email already exists." })
    }
}