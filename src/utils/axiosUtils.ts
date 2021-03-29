import axios from "axios";
import { ServerStatus } from "./serverUtils";
import { IUserState } from "../pages/Login";

export const login = async (user: IUserState) =>
  await axios.post("/api/login", {
    email: user.email,
    password: user.password,
  });

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
