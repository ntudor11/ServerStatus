import express, { Request, Response } from "express";
const pgPromise = require("pg-promise");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { queries } = require("./database/queries");

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
  const servers = await db.any(queries.readServers);
  res.send(servers);
});

app.get("/api/server/:serverId", async (req: Request, res: Response) => {
  const { serverId } = req.params;

  const getServer = () => {
    return db.task((t: any) => {
      return t.oneOrNone(queries.readServer, [serverId], (server: any) => {
        if (server) {
          return t
            .any(queries.readServerMessages, [server.id])
            .then((data: any) => {
              server.serverLog = data;
              return server;
            });
        } else {
          return { error: "Cannot find current server" };
        }
      });
    });
  };

  getServer().then((server: any) => {
    res.send(server);
  });
});

app.post("/api/changeStatus", async (req: Request, res: Response) => {
  const { serverId, serverStatus, statusCode, message } = req.body;
  console.log(statusCode, message);
  const now = Date.now();

  try {
    await db.none(queries.updateServerStatus, [serverStatus, now, serverId]);

    await db.none(queries.writeServerMessage, [
      statusCode,
      now,
      message,
      serverId,
    ]);

    return res.send({
      status: 200,
      message: "ok",
    });
  } catch (err) {
    return res.send({ err });
  }
});

app.listen(PORT, () => console.log(`⚡️ Server running on port ${PORT} ⚡️`));
