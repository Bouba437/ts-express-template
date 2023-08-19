import express from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import morgan from "morgan";
import exampleRoute from "./routes/exampleRoutes";
import { PORT, DB } from "./config";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/", exampleRoute)

app.use(() => {
    throw createHttpError(404, "Page non trouvé...")
})

app.use(errorHandler);

mongoose.connect(DB)
    .then(() => {
        console.log("Connecté à la base de données");
        app.listen(PORT, () => {
            console.log(`Serveur lancé sur le port ${PORT}`);   
        })
    })
    .catch(() => {
        throw createHttpError(501, "Echec de connexion avec la base de données");
    });
