module.exports = {
  setupMiddlewares: function (devServer) {
    devServer.app.get("/some/path", function (req, res) {
      res.json({ custom: "response" });
    });
  },
  setupMiddlewares: function (devServer) {
    devServer.app.get("/some/path", function (req, res) {
      res.json({ custom: "response" });
    });
  },
};
