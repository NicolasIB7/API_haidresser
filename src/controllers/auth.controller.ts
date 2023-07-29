import db from "../db";
import { generateToken } from "../utils/generateToken";




interface ClientData {
  name: string;
  lastname: string;
  email: string;
  password: string;
  repassword: string;
  date: string;
  dni: number;
  photo: string;
  phone: number;
  location: string;
}
interface ClientDataLogin {
  email: string;
  password: string;
}

export const register = async (data: ClientData) => {
  try {
    const response = await db.Client.create(data);

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (data: ClientDataLogin) => {
  try {
    const email = data.email;
    const password = data.password;

    const client = await db.Client.findOne({where:{email}});
    if(!client) throw {message:'Client not found'};
    
    const confirmPassword = await client.comparePassword(password);
    if(!confirmPassword) throw {message:'Password is incorrect'}

    // const token= generateToken(client.id)


    return generateToken(client.id);


  } catch (error) {
    throw error
  }
};
