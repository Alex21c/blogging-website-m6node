import e from "express";
import PostController from "../Controllers/Post.Controller.mjs";
import passport from "../PassportJS/passport-config.mjs";
import PostInputValidationMiddleware from "../Middlewares/PostInputValidation.Middleware.mjs";
import CommentInputValidationMiddleware from "../Middlewares/CommentInputValidation.Middleware.mjs";
const PostRoutes = e.Router();

PostRoutes.get("/get-all-the-posts", PostController.getAllThePosts);
PostRoutes.post(
  "/create-a-new-post",
  passport.authenticate("jwt", { session: false }),
  PostInputValidationMiddleware,
  PostController.createANewPost
);
PostRoutes.get("/get-single-post/:postID", passport.authenticate("jwt", { session: false }),PostController.getAPost);
PostRoutes.put(
  "/update-single-post/:postID",
  passport.authenticate("jwt", { session: false }),
  PostController.updateAPost
);
PostRoutes.delete(
  "/delete-single-post/:postID",
  passport.authenticate("jwt", { session: false }),
  PostController.deleteAPost
);

// Comments Specific
PostRoutes.post(
  "/create-a-new-comment/:postID",
  passport.authenticate("jwt", { session: false }),
  CommentInputValidationMiddleware,
  PostController.createAComment
);
PostRoutes.put(
  "/update-a-comment/:commentID",
  passport.authenticate("jwt", { session: false }),
  CommentInputValidationMiddleware,
  PostController.updateAComment
);
PostRoutes.delete(
  "/delete-a-comment/:postID/:commentID",
  passport.authenticate("jwt", { session: false }),
  PostController.deleteAComment
);

export default PostRoutes;
