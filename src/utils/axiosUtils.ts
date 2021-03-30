import axios from "axios";
import { ServerStatus } from "./serverUtils";

export const login = async (user: any) =>
  await axios.post("/api/login", {
    email: user.email,
    password: user.password,
  });

export const signup = async (user: any) =>
  await axios.post("/api/signup", user);

export const changeStatus = async (
  serverId: string,
  serverStatus: ServerStatus,
  statusCode: number,
  message: string
) =>
  await axios.post("/api/changeStatus", {
    serverId,
    serverStatus,
    statusCode,
    message,
  });
