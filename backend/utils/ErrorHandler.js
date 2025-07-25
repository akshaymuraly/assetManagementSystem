module.exports = (err, req, res, next) => {
  console.log(err?.message);
  return res.status(500).json({
    status: false,
    message: err.message || "Internal Server Error",
  });
};
