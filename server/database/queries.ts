import path from "path";
import { QueryFile } from "pg-promise";

const sql = (file: string) => {
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath, { minify: true });
};

module.exports = {
  queries: {
    readServers: sql("queries/readServers.sql"),
    readServer: sql("queries/readServer.sql"),
    readServerMessages: sql("queries/readServerMessages.sql"),
    updateServerStatus: sql("queries/updateServerStatus.sql"),
    writeServerMessage: sql("queries/writeServerMessage.sql"),
  },
};
