import CustomError from "../Utils/CustomError.mjs";

export default function CommentInputValidationMiddleware(req, res, next) {
  const { body } = req.body;

  // is title provided?
  if (!body) {
    next(new CustomError(400, "Empty comment not allowed !"));
    return;
  }

  next();
}
