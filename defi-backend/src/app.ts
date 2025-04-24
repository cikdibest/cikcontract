import express from "express";
import routes from "./routes";
import "reflect-metadata";

import { logRequest } from "./middleware/logRequest";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use(logRequest);          // ✅ her istek loglanacak
app.use("/api", routes);      // ✅ versiyonlu API yönlendirme
app.use(errorHandler);        // ✅ global hata yakalayıcı (log yazar)

export default app;
