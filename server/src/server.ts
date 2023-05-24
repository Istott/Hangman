import express from "express";
import cors from "cors";
import { initTRPC } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { z } from "zod";

const t = initTRPC.create();
const appRouter = t.router({
  sayHi: t.procedure
    .input((v: unknown) => {
      if (typeof v === "string") return v;

      throw new Error(`Invalid input: ${typeof v}`);
    })
    .query(({ input }) => {
      return {
        text: `hello ${input ?? "world"} bob`,
      };
    }),
  logToServer: t.procedure
    .input((v) => {
      if (typeof v === "string") return v;

      throw new Error("Invalid input: Expected string");
    })
    .mutation((req) => {
      console.log(`client says: ${req.input}`);
      return true;
    }),
});

const app = express();

app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
  })
);
app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));

app.listen(4000, () => {
  console.log("application listening at http://localhost:4000");
});

export type AppRouter = typeof appRouter;
