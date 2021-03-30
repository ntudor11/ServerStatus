import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const pgPromise = require("pg-promise");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { isAuth, hashPass, secretKey } = require("./middleware");
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
  res.status(200).send(servers);
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
    res.status(200).send(server);
  });
});

app.post("/api/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // verify if the user exists in the db
  const dbUser = await db.oneOrNone(
    queries.readUserByEmail,
    email.toLowerCase()
  );
  if (!dbUser) {
    return res.status(401).send({ success: false, error: "User not found" });
  }
  const { id, email: dbEmail, userType, password: dbPassword } = dbUser;
  // compare password from req with hashed password from db
  if (!bcrypt.compareSync(password, dbPassword)) {
    return res.status(401).send({ error: "Wrong password" });
  }
  // JWT sign token
  const token = jwt.sign({ id, dbEmail, userType }, secretKey, {
    expiresIn: "2h",
  });
  // return token
  return res
    .cookie("token", token, { httpOnly: true })
    .send({ success: true, id });
});

app.post("/api/signup", async (req: any, res: Response) => {
  const { email, password, userType } = req.body;
  // verify if the user exists in the db
  const dbUser = await db.oneOrNone(
    queries.readUserByEmail,
    email.toLowerCase()
  );
  if (!dbUser) {
    const hash = hashPass(password);
    // create user
    await db.none(queries.writeUser, [email, userType, hash]);
    return res.status(200).send({
      message: "Your account was created successfully",
      success: true,
    });
  }
  return res
    .status(200)
    .send({ success: false, error: "This email is already registered" });
});

app.post("/api/changeStatus", async (req: Request, res: Response) => {
  const { serverId, serverStatus, statusCode, message } = req.body;
  const now = Date.now();

  try {
    await db.none(queries.updateServerStatus, [serverStatus, now, serverId]);
    await db.none(queries.writeServerMessage, [
      statusCode,
      now,
      message,
      serverId,
    ]);

    return res.status(200).send({
      message: "ok",
    });
  } catch (err) {
    return res.send({ error: err });
  }
});

app.get("/api/checkToken", isAuth(), (req: any, res: Response) => {
  res.send({
    userId: req.userId,
    emailAddress: req.emailAddress,
    type: req.userType,
  });
});

app.listen(PORT, () => console.log(`⚡️ Server running on port ${PORT} ⚡️`));
