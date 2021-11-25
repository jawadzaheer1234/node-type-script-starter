module.exports = () => {
  return (context: any, next: any) => {
    console.log(`Came in fittings function.`);
    let error: any;
    let message: any;
    let statusCode: any;
    const name = context.error.name;
    const DBErrorTypes = [
      "SequelizeUniqueConstraintError",
      "SequelizeDatabaseError",
    ];
    console.log({ message: "came here" });
    if (
      context.error &&
      context.error.errors &&
      context.error.errors[0].code === "INVALID_REQUEST_PARAMETER"
    ) {
      // handles swagger error
      error =
        context.error.errors[0].errors[
          context.error.errors[0].errors.length - 1
        ];
      message = getSwaggerErrorMessage(error);

      // log error
      console.error({ error, message });

      statusCode = 400;
    } else if (DBErrorTypes.includes(name)) {
      // handles primary/unique key violations
      error = context.error;
      message = "Internal Server Error";
      statusCode = error.statusCode || 500;
      // log error
      console.error(error);
    } else if (name === "TypeError") {
      // handles runtime errors like reading property of undefined
      error = context.error;
      message = "Internal Server Error";
      statusCode = error.statusCode || 500;
      // log error
      console.error({ error, message });
    } else if (name === "SequelizeValidationError") {
      // handles not null
      error = context.error;
      message = "Internal Server Error";
      statusCode = error.statusCode || 500;
      // log error
      console.error({ error, message });
    } else if (name === "RestError") {
      // handles Azure storage service related error
      error = context.error;
      let errorMessage: string;
      if (error.code === "BlobNotFound") {
        message = "No file(s) available to download.";
        statusCode = 400;
        errorMessage = error.message.split("\n")[0];
      } else {
        message = "Internal Server Error";
        statusCode = 500;
        errorMessage = error.message.split("\n")[0];
      }
      // log error
      console.error({ error, message });
    } else if (context?.error?.isAxiosError) {
      // Axios errors
      error = context.error.toJSON();
      message = error.message;
      message = message[0].toUpperCase() + message.substr(1);
      statusCode = error.response?.data?.statusCode || 400;
      // log error
      if (statusCode >= 400 && statusCode < 500) {
        console.warn({ error, message });
      } else {
        console.error({ error, message });
      }
    } else if (
      context?.error?.name === "Error" &&
      context?.error?.response?.data
    ) {
      // portal errors
      error = context.error;
      message = `${error.response.data.message}`;
      message = message[0].toUpperCase() + message.substr(1);
      statusCode = error.response.data.statusCode || 400;
      // log error
      console.error({ error, message });
    } else {
      // handle controller errors
      error = context.error;
      message = error.message;
      statusCode = error.statusCode || 400;
      // log error
      console.error({ error, message });
    }

    return context.response.status(statusCode).send({ message, statusCode });
  };
};

// convert to sentence case
const toSentenceCase = (text: string) => {
  const result = text.replace(/([A-Z])/g, " $1");

  return result.charAt(0).toUpperCase() + result.slice(1);
};

function getSwaggerErrorMessage(error: any) {
  if (error.code === "OBJECT_MISSING_REQUIRED_PROPERTY") {
    return `${toSentenceCase(
      error.params[error.params.length - 1]
    )} is required`;
  } else if (error.code === "MIN_LENGTH") {
    return `${toSentenceCase(error.path[0])} should have atleast ${
      error.params[1]
    } character${error.params[1] > 1 ? "s" : ""}`;
  } else if (error.code === "MAX_LENGTH") {
    return `${toSentenceCase(error.path[0])} should not exceed ${
      error.params[1]
    } character${error.params[1] > 1 ? "s" : ""}`;
  } else if (error.code === "INVALID_TYPE") {
    return `${toSentenceCase(error.path[0])} should be ${
      error.params[0]
    } type but found ${error.params[1]}`;
  } else if (error.code === "PATTERN") {
    return `${toSentenceCase(error.path[0])} is incorrect. Please verify`;
  } else if (error.code === "ENUM_MISMATCH") {
    return `${toSentenceCase(error.path[0])} is incorrect. Please verify`;
  } else {
    return `Invalid ${toSentenceCase(error.path[0])}`;
  }
}
