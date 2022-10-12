import express from "express";

const PORT = process.env.PORT || 3500;

export const createApp = () => {
  const app = express();

  app.all("*", (req, res) => {
    res.end(req.path);
  });

  return app;
};

if (process.env.NODE_ENV !== "test") {
  const app = createApp();
  app.listen(PORT || 3500);
}
