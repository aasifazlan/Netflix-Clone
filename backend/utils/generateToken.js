import jwt from 'jsonwebtoken'
import { ENV_VARS } from '../config/envVars.js';

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ id: userId }, ENV_VARS.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('jwt-netflix-token', token, {
         maxAge: 7 * 24 * 60 * 60 * 1000,
         httpOnly: true, // prevents XSS attacks cross-site scripting attacks, make it not accesed by js, only accesed by browser
         sameSite: "strict", // prevents CSRF attacks cross-site request forgery attacks
        secure: ENV_VARS.NODE_ENV !== "development", //
        });
    return token;
 }