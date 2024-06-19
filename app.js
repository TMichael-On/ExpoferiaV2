import express from "express";
import morgan from "morgan";
import { engine } from 'express-handlebars';
// const validator = require('express-validator');
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import multer from "multer";
import { PORT, FRONTEND_URL } from "./database/config.js";
import app_router from "./modules/app.router.js";
import cors from "cors";
const app = express();

// Middlewares
app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })
);
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
// Configura multer para manejar formData
const upload = multer();
app.use(upload.any()); // Permite manejar cualquier tipo de formData

// app.use(validator());

// Routes
app.use(app_router);

// Settings view
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

// Public
app.use(express.static('./public'));

// No found
app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

// Starting
app.listen(PORT)
console.log(`Server on port http://localhost:${PORT}`);
// export default app;
