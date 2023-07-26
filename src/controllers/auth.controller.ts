import db from "../db";
import axios from "axios";

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

export const login = (resp: ClientDataLogin) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
