const { printErrorLog, formatErrorString } = require("./helper");

exports.wrapAsync = (func) => async (req, res, next) => {
  try {
    return await func(req, res, next);
  } catch (error) {
    console.log({ error });

    try {
      printErrorLog(`${req.originalUrl} catch: ` + formatErrorString(error));
    } catch (logErr) {
      console.error("Error while logging:", logErr);
    }

    return next(error);
  }
};

// exports.wrapAsync = (func) => (req, res, next) =>
//   Promise.resolve(func(req, res, next)).catch(next);
