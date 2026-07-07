import userModel from "../models/user.model.js";
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

  const accessToken = jwt.sign(
    {
      // use rki db id
      id: user._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );
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

  const decoded = jwt.verify(refreshToken, config.JWT_SECRET);
  //   refresh token me id hogi bs us id keliye nya accesss token bnado
  const accesstoken = jwt.sign(
    {
      id: decoded.id,
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
