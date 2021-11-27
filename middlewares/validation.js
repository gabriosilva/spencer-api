const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (!error) {
      next();
    } else {
      const { details } = error;
      const message = details.map((obj) => obj.message).join(",");

      console.log("Validation error: ", message);
      res.status(422).json({ message });
    }
  };
};

module.exports = {
  validationMiddleware,
};
