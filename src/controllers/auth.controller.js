import userModel from "../models/user.model.js";
import sessionModel from "../models/session.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import cookieParser from "cookie-parser";

export async function register(req, res) {
  const { username, email, password } = req.body;
  const isAlredyRegistered = await userModel.findOne({
    $or: [
      // if koi user exist krta h with same username or email
      // ya both same se to say already exists
      { username },
      { email },
    ],
  });

  if (isAlredyRegistered) {
    res.status(409).json({
      message: "username or mail already exists",
    });
  }
  // pass to be saved in hashed format
  const hashedpassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
  const user = await userModel.create({
    username,
    email,
    password: hashedpassword,
  });
  //   access token -15min
  // refresh token - 5 din

  //   jb refresh token bna rhe tbhihm ek session bhi bna lenge in db
  // for logout from all devices
  const refreshToken = jwt.sign(
    {
      // use rki db id
      id: user._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  //   hashing the refresh token for session
  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  //   creating a session
  const session = await sessionModel.create({
    user: user._id,
    refreshTokenHash,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });

  const accessToken = jwt.sign(
    {
      // use rki db id
      id: user._id,
      //   session ki id bhi store krte h
      sessionId: session._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );

  //   refresh token ko cookie me save krte h
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, //client side js use decode nhi kr payegi
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, //7days
  });
  //   access token memory me save hota h to use res ki body me bhjna h
  res.status(201).json({
    message: "user registered successfully",
    user: {
      username: user.username,
      email: user.email,
    },
    accessToken,
  });
}

export async function login(req,res){
    // username , pass check kro then use access token do
    const {email,password}=req.body;
    const decoded=crypto.createHash("sha256").update(password).digest("hex")
    const user=await userModel.findOne({
      email,
      password:decoded,
    })
    if(!user){
     return  res.status(401).json({
        message:"invalid credintials"
      })
    }
    // to access token de do 
    // vhi same register wali 
    const refreshToken=jwt.sign(
      {
      id:user._id,
    },
    config.JWT_SECRET,
    {
      expiresIn:"7d"
    }
  )
  const refreshTokenHash=crypto.createHash("sha256").update(refreshToken).digest("hex")
  const session = await sessionModel.create({
    user: user._id,
    refreshTokenHash,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });
  const accessToken=jwt.sign(
    {
      id:user._id,
      sessionId:session._id
    },
    config.JWT_SECRET,
    {
      expiresIn:"15m"
    }
  )

  res.cookie("refreshToken",refreshToken,{
    httpOnly:true,
    secure:true,
    sameSite:"strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, //7days
  })

  res.status(201).json({
    message:"login successfully"
  })
}

// user konsa h ->via token
export async function getMe(req, res) {
  // req me bearer space token hota h token ese hi nikalenge [1]
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "unauthorised",
    });
  }
  // if other user acceess your token and server will treat other as you
  // therefore it is solved via saving method on frontend
  // if saved in localstorage then it is not right for users
  // so we use cookies to store the token but vha pe bhi token chori hoskta h
  // we store token in memory(a variable)
  // but page reload se memory clr ho jati h
  // we use 2 token -> access and refresh token
  // access token -> normal token konsa user h ye
  // refresh token-> alag api hoti h refresh tokenapi server  return krta h access token
  // refresh token se nye access token bnte h
  // and we store this refresh token in cookies , if any get it server kuch nhi dega for any db query
  //

  const decoded = jwt.verify(token, config.JWT_SECRET);
  // console.log(decoded)
  const user = await userModel.findById(decoded.id);
  res.status(200).json({
    message: "user fetched successfully",
    user: {
      username: user.username,
      email: user.email,
    },
  });
}

export async function refreshtheToken(req, res) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({
      message: "no valid refresh token",
    });
  }
  // yha hm session check krenge agr session revoked hoga to ab
  // gen nhi krenge
  const decoded = jwt.verify(refreshToken, config.JWT_SECRET);
  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

   const session= await sessionModel.findOne({
    refreshTokenHash,
    revoked:false
   })
//    ys to hash glt hoga ya revoked/logout ho gya  hoga dono case me nhi gen krna h
   if(!session){
    res.status(401).json({
        message:"invalid refresh token"
    })
   }


  //   refresh token me id hogi bs us id keliye nya accesss token bnado
  const accesstoken = jwt.sign(
    {
      id: decoded.id,
      sessionID:session._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );
  //   jb jb new access token bnate h tb hm ek nya refresh token bhi gen ke lete h extra layer of security
  const newRefreshToken = jwt.sign(
    {
      id: decoded.id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
//   new refrsh tokrn ke liye new hash update kkrna hoga session me
  const newRefreshTokenHash = crypto
    .createHash("sha256")
    .update(newRefreshToken)
    .digest("hex");

   session.refreshTokenHash=newRefreshTokenHash;
   await session.save();
  //   hr cookie res me same name jana chaiye cookie ka
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, //7days
  });
  res.status(200).json({
    message: "Access token refrehed sucessfully",
    accesstoken,
  });
}

// logout from all devices like laptop,tablet,phone etc..
// each device maintaiin a session
// {user,refreshtokenhash,ip,useragent,createdAT,updatedAt}
export async function logout(req, res) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    res.status(400).json({
      message: "refresh token is invalid",
    });
  }
  // convert it in hash for finding
  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const session = await sessionModel.findOne({
    refreshTokenHash,
    revoked: false,
  });
  if (!session) {
    res.status(400).json({
      message: "no session exists ",
    });
  }
  //   agr session mila tb cookie clr kro and
  // revoked true krke save kr do
  session.revoked = true;
//   jb logout kra tb hmne refresh token toinvalid kr dia 
// pr access token to ab bhi valid h na ab koibhi use use krke
// bhi use kr skta h web
// so we use blacklist like in redix etc..
// jo token blacklist me hoga server use bhi rew nhi dega
// other is lower the limit of accesstoken  like 5 min or 10 min
  await session.save();

  res.clearCookie("refreshToken");
  res.status(200).json({
    message: "logout successfully",
  });
}

export async function  logoutAll(req,res){
    const refreshToken=req.cookies.refreshToken;
    if(!refreshToken){
      res.status(401).json({
        message:"no valid refresh token"
      })
    }

    const decoded=jwt.verify(refreshToken,config.JWT_SECRET);

    await sessionModel.updateMany({
      user:decoded.id,
      revoked:false,
    },{
      revoked:true,
    })
    res.clearCookie("refreshToken")
    res.status(200).json({
      message:"logout form all devices successfully"
    })
}