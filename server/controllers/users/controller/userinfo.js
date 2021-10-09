const { user } = require("../../../models")
const jwt = require("jsonwebtoken")

module.exports = async(req, res) => {
    console.log(req.cookies.jwt);
    const token = req.cookies.jwt;
    const verify = jwt.verify(token,process.env.ACCESS_SECRET); //verify 추가
    if(!verify){
        res.status(401).json({ data: { userInfo : null }, message: "authorization is required" })
    }else{
        const userInfo = await user.findOne({
            where : { id : verify.id}
        })
        if(!userInfo){
            res.status(404).json({ data: { userInfo : null }, message: "user is not found" });
        }else{
            res.status(200).json({data : {userInfo : userInfo.dataValues}, message: "ok" });
        }
    }
}