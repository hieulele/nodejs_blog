module.exports = function sortMiddleware(req, res, next) {
  res.locals._sort = {
    enabled: false,
    type: "default",
  };
  if (req.query.hasOwnProperty("_sort")) {
    const isValidtype = ["asc", "desc"].includes(req.query.type);
    isValidtype ? (req.query.type = req.query.type) : (req.query.type = "desc");
    Object.assign(res.locals._sort, {
      enabled: true,
      type: req.query.type,
      column: req.query.column,
    });
  }

  next();
};
