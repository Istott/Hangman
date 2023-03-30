import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));

app.listen(4000, () => {
  console.log("application listening at http://localhost:4000");
});
