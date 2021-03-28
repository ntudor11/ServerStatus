import { ServerStatus } from "./serverUtils";
const axios = require("axios").default;

export const changeStatus = async (
  serverId: string,
  serverStatus: ServerStatus,
  statusCode: number,
  message: string
) => {
  await axios.post("/api/changeStatus", {
    serverId,
    serverStatus,
    statusCode,
    message,
  });
};
