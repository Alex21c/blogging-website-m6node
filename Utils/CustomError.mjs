export default class CustomError {
  constructor(statusCode, customMessage){
    const error =  new Error();
    error.statusCode = statusCode;
    error.customMessage = customMessage;
    return error;
  }
}