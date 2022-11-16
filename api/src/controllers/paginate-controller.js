function paginatedData(req, res, next) {
  const { limit, offset } = req.query;
  const { count, rows } = res.locals.data;
  const pagination = {
    count,
    limit: limit || 10,
    offset: offset || 0,
    pages: Math.ceil(count / limit),
    rows,
  };
  res.locals.data = pagination;
  next();
}