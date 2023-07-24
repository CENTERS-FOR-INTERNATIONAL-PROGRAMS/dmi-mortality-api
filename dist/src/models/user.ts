import { Request, Response, Router, Express } from "express";
import cors from "cors";
import express from "express";
import config from "../../config";
import connection from "../db/connection";

class Server {
  private app: Express;

  constructor() {
    this.app = express();
    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  private async dbConnection() {
    try {
      await connection.authenticate();
      console.log("Database connected");
    } catch (error) {
      console.error(error, "Error connecting to DB");
    }
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    // this.app.use(express.static("public"));
  }

  private routes() {
    const router = Router();

    router.get("/users", async (req: Request, res: Response) => {
      const result = await getUsers();
      res.send(result);
    });

    router.get("/user/:id", async (req: Request, res: Response) => {
      const id = req.params.id;
      const User = await getUser(id);
      if (!User) res.status(404).send("User not found");
      res.send(User);
    });

    this.app.use(router);
  }

  public start() {
    const server = this.app.listen(config.port, () => {
      console.log(`Server up and running at port: ${config.port}`);
    });

    // Handle server shutdown gracefully
    process.on("SIGINT", () => {
      console.log("Shutting down server gracefully.");
      server.close(() => {
        console.log("Server closed.");
        process.exit(0);
      });
    });
  }
}

export default Server;
