import mongoose from 'mongoose';
import express, { Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors";
import passport from "passport"
import authRouter from "./auth/auth.routes"
import session from "express-session";
import MongoStore from "connect-mongo";
dotenv.config({ path: "./configs/server.env" });
import { checkAccessLevel, checkAuthenticated } from './middlewares/auth';
import {errorLogger, errorHandler} from './middlewares/errors'
import userRoutes from './routes/user.routes';



const app = express();
const port = process.env.PORT || 8080;
const mongo_uri = process.env.MONGO_URI

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};
mongoose.connect(`${mongo_uri}`)
const connection = mongoose.connection;
connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
});

app.use(cors(process.env.DEV_MODE ? options : undefined));
app.use(express.json());
app.use(session({
  name: "sid",
  saveUninitialized: false,
  resave: false,
  secret: "tef2fster2f2t23i9",
  store: new MongoStore({
      mongoUrl: mongo_uri,
      collectionName: 'sessions'
  }),
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));
app.use(passport.initialize())
app.use(passport.session());
import "./auth/passport"
app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello world!")
})
app.use("/api/auth", authRouter)
app.use("/api/users", checkAuthenticated, userRoutes)
app.use(errorLogger)
app.use(errorHandler)

app.listen(port, () => {
    // perform a database connection when server starts
    console.log(`Server is running on port: ${port}`);
});
