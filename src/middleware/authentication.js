const path = require("path");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { SALT_ROUND, SECRETE_TOKEN } = require("../config");

const authentication = async (req, res, next) => {
  const token = req.cookies.x_auth;

  User.findByToken(token, (err, user) => {
    if (err) {
      console.log(`Failed to findByToken ${err}`);
      // throw err;
      return res.json({ success: false, auth: false, err });
    }
    if (!user) {
      console.log(`Failed to findByToken`);
      return res.json({ success: false, auth: false });
    }

    req.token = token;
    req.user = user;
    next();
  });
};






// const accessToken = (req, res, next) => {
//   const { Authorization } = req.headers;
//   if (!Authorization) {
//     console.log("Failed to accessToken.headers");
//     return res.status(401).json({
//       success: false,
//       auth: false,
//       message: "로그인 정보가 없습니다."
//     });
//   }

//   const [tokenType, tokenValue] = Authorization.split(" ");
//   if (tokenType !== "Bearer") {
//     console.log("Failed to accessToken.tokenType");
//     return res.status(401).json({
//       success: false,
//       auth: false,
//       message: "로그인 정보가 올바르지 않습니다."
//     });
//   }

//   try {
//     jwt.verify(tokenValue, SECRETE_TOKEN, (error, decode) => {
//       if (error || !decode) {
//         console.log("Failed to accessToken.verify");
//         return res.status(401).json({
//           success: false,
//           auth: false,
//           message: "로그인 정보를 찾을 수 없습니다."
//         });
//       }

//       User.findOne({ _id: decode._id })
//         .then((user) => {
//           console.log(`accessToken ${user}`);
//           req.user = user;
//           next();
//         })
//         .catch((error) => {
//           console.log(`Failed to accessToken.findOne ${error}`);
//           return res.status(401).json({
//             success: false,
//             auth: false,
//             message: "로그인 정보를 찾을 수 없습니다."
//           });
//         });
//     })
//   } catch (error) {
//     console.log(`Failed to accessToken.catch ${error}`);
//     res.status(401).json({
//       success: false,
//       auth: false,
//       message: "로그인 정보가 올바르지 않습니다.",
//       error
//     });
//   }
// }

// /**
//  * 
//  * @param {request} req 
//  * @param {response} res 
//  * @param {nextRoute} next 
//  * @returns {object} error : { success, authentication, message, error }
//  */
// const refreshToken = (req, res, next) => {
//   const { authentication } = req.headers;
//   if (!authentication) {
//     console.log("Failed to verifyToken");
//     return res.status(401).json({
//       success: false,
//       auth: false,
//       message: "로그인 정보가 없습니다."
//     });
//   }

//   const [tokenType, tokenValue] = authentication.split(" ");
//   if (tokenType !== "Bearer") {
//     console.log("Failed to verifyToken");
//     return res.status(401).json({
//       success: false,
//       auth: false,
//       message: "로그인 정보가 올바르지 않습니다."
//     });
//   }

//   try {
//     jwt.verify(tokenValue, SECRETE_TOKEN, (error, decoded) => {
//       if (error) {
//         console.log(`Failed to jwt.verify ${error.name}`);
//         return res.status(401).json({
//           success: false,
//           auth: false,
//           message: "로그인 정보가 만료되었습니다.",
//           error
//         });
//       }
//       if (!decoded) {
//         console.log("Expired to verifyToken");
//         return res.status(401).json({
//           success: true,
//           auth: false,
//           message: "로그인을 실패하였습니다."
//         });
//       }

//       User.findOne({ _id: decoded._id })
//         .then((user) => {
//           req.user = user;
//           next();
//         })
//         .catch((err) => {
//           console.log(`Failed to jwt.verify ${err}`);
//           return res.status(401).json({
//             success: false,
//             auth: false,
//             message: "로그인 정보가 올바르지 않습니다."
//           });
//         });
//     });
//   } catch (error) {
//     console.log(`verifyToken Error ${error}`);
//     res.status(401).json({
//       success: false,
//       auth: false,
//       message: "로그인을 실패하였습니다.",
//       error
//     });
//   }
// };

module.exports = {
  authentication
};
