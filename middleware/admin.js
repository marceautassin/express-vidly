module.exports = function (req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send('Access denied'); // 401 is for unauthorized (not valid jwt) and 403 is for forbidden
  next();
};
