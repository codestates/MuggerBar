const { user } = require("../../../models")
const jwt = require("jsonwebtoken")

module.exports = async (req, res) => {
    const userInfo = await user.findOne({ 
        where : {user_email : req.body.user_email, user_password:req.body.user_password}
    })
    //유저정보가 바디에 담긴데이터에 유저정보가 있는지확인
    if(!userInfo){ //없으면 에러메시지
        res.status(401).json({ data: { userInfo : null }, message : "Invalid user or Wrong password" })
    }else{
        //있으면 비밀번호삭제후 토큰생성후 쿠키에담아서 토큰전달
        delete userInfo.dataValues.user_password
        const accessToken = jwt.sign(userInfo.dataValues,process.env.ACCESS_SECRET,{ expiresIn:'1d' });
        res
        .cookie("jwt", accessToken, {
            sameSite: "none",
            secure: true,
            httpOnly: true,
          })
        .status(200)
        .json({ data : { userinfo : userInfo.dataValues },message: "ok" });
    }
}