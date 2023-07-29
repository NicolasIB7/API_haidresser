import jwt ,{ Secret } from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();


const JWT_SECRET:string | undefined = process.env.JWT_SECRET;

export const generateToken =(uid:string)=>{
    const expiresIn= 60 * 15
try {
    const token = jwt.sign({uid}, JWT_SECRET as Secret, {expiresIn})
    return {token,expiresIn};
} catch (error) {
    console.error(error)
}
}