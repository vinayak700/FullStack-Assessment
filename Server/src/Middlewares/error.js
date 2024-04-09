const handleValidationError = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    const errors = {};
    for (const field in err.errors) {
      errors[field] = err.errors[field].message;
    }
    return res.status(400).json({ errors });
  }
  next(err);
};

const errorHandler = (err, req, res, next) => {
  res.status(500).json({ error: "Internal Server Error" });
};

export { errorHandler, handleValidationError };
