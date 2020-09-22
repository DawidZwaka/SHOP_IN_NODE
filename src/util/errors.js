//errors sections
const notFound = new Error("Object not found!");
notFound.value = 404;

//resolve errors

const resolveError = (err, res) => {
  const { value } = err;

  switch (value) {
    case 404:
      res.render("errors/404");
      break;
    case 500:
      res.render("errors/500");
      break;
  }
};

//exports
exports = { notFound, resolveError };
