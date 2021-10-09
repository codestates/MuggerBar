const { user } = require("../../../models")
const jwt = require("jsonwebtoken")

module.exports = async(req, res) => {
    console.log(req.cookies.jwt)
    const token = req.cookies.jwt; 
    if(!token){
        res.status(403).json({ data: { userInfo : null }, message: "authorization is required" })
    }else{
        //있으면 토큰을 해독하여 유저정보존재여부 확인
        const verify = jwt.verify(token,process.env.ACCESS_SECRET); //verify가 안됐을시 추가
        if(!verify){
            res.status(401).json({ data: { userInfo : null }, message: "authorization is required" } )
        }else{
            await user.findOne({
                where : { id : verify.id }
            })
            res.status(200).json({ data: { userInfo : null }, message: "successfully logout!" })
        }
    }
}