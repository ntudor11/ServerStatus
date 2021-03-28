import express, { Request, Response } from "express";
const pgPromise = require("pg-promise");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

export const PORT = process.env.PORT || 8000;
const cn =
  process.env.DATABASE_URL ||
  "postgres://serverstatus:server-status-local@localhost:5432/serverstatus_db";
const pgp = pgPromise();
export const db = pgp(cn);

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// GET route for retrieving the server list
app.get("/api/servers", async (req: Request, res: Response) => {
  const servers = await db.any(
    `
      select id,
        name as "serverName",
        server_status as "serverStatus",
        status_time_started as "statusTimeStarted",
        avg_uptime as "avgUptime"
      from servers
    `
  );

  res.send(servers)
}); 

app.listen(PORT, () => console.log(`⚡️ Server running on port ${PORT} ⚡️`));
