import e from "express";
import PostController from "../Controllers/Post.Controller.mjs";

const PostRoutes = e.Router();


PostRoutes.get('/get-all-the-posts', PostController.getAllThePosts);
PostRoutes.post('/create-a-new-post', PostController.createANewPost);
PostRoutes.post('/get-single-post/:postID', PostController.getAPost);
PostRoutes.put('/update-single-post/:postID', PostController.updateAPost);
PostRoutes.delete('/delete-single-post/:postID', PostController.deleteAPost);

// Comments Specific
PostRoutes.post('/create-a-new-comment/:postID', PostController.createAComment);
PostRoutes.put('/update-a-comment/:postID/:commentID', PostController.updateAComment);
PostRoutes.delete('/delete-a-comment/:postID/:commentID', PostController.deleteAComment);


export default PostRoutes;