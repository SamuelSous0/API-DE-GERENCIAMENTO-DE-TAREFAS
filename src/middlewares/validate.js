const validate = (schema) => async (req, res, next) => {
  const parsed = await schema.parseAsync({
    body: req.body,
    params: req.params,
    query: req.query,
  });

  if (parsed.body !== undefined) {
    req.body = parsed.body;
  }
  if (parsed.params !== undefined) {
    req.params = parsed.params;
  }

  return next();
};

export default validate;
export { validate };

