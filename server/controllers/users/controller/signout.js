const { user } = require("../../../models")
const jwt = require("jsonwebtoken")

module.exports = async(req, res) => {
    const token = req.cookies.jwt; 
    if(!token){//토큰없으면 실패 실패메세지 api문서상 수정필요할듯
        res.status(403).json({ data: { userInfo : null }, message: "authorization is required" })
    }else{ //401변경
        const verify = jwt.verify(token,process.env.ACCESS_SECRET); 
        //쿠키가 있으면 해당하는 아이디를 삭제
        if(!verify){
            res.status(401).json({ data: { userInfo : null }, message: "authorization is required" })
        }else{
            await user.destroy({
                where : { id : verify.id }
            })
            res.status(200).json({ data: { userInfo : null }, message: "successfully signout!" })
        }   
    }
}