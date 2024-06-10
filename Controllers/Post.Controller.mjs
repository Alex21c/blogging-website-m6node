import CommentModel from "../Models/Comment.Model.mjs";
import PostModel from "../Models/Post.Model.mjs";
import CustomError from "../Utils/CustomError.mjs";
const getAllThePosts = async (req, res, next) => {
  try {
    const posts = await PostModel.find();
    res.json({
      success: true,
      data: posts
    });
  } catch (error) {
    next(error);
  }

};

const createANewPost = (req, res, next) => {
  try {
    req.body.author = req.user._id;
    console.log(req.body);
    const doc = new PostModel(req.body);
    doc.save();
    res.status(201).json({
      success: true,
      message: "post created Successfully !",
      postID: doc.id,
    });
  } catch (error) {
    next(
      new CustomError(500, "Failed to Create new post! (" + error.message + ")")
    );
  }
};
const getAPost = async (req, res, next) => {
  // extracting id from params
  const { postID } = req.params;
  if (!postID) {
    next(new CustomError(200, "postID not provided in params!"));
    return;
  }

  // fetching doc
  const doc = await PostModel.findById(postID);
  // console.log(doc);

  // await PostModel.findById()
  res.json({
    success: true,
    data: doc,
  });
};
const updateAPost = async (req, res, next) => {
  // extracting id from params
  const { postID } = req.params;
  if (!postID) {
    next(new CustomError(200, "postID not provided in params!"));
    return;
  }
  // fetching req body
  const reqBody = req.body;
  // console.log(reqBody);

  // does post exist?
  const post = await PostModel.findById(postID);
  if(!post){
    next (new CustomError(200, 'postID invalid!'));
    return;
  }

  // fetching doc
  const doc = await PostModel.findByIdAndUpdate(postID, reqBody);

  // console.log(doc);

  // await PostModel.findById()
  res.json({
    success: true,
    data: "Updated Successfully !",
  });
};
const deleteAPost = async (req, res, next) => {
  try {
    
    // extracting id from params
    const { postID } = req.params;
    if (!postID) {
      next(new CustomError(200, "postID not provided in params!"));
      return;
    }
    
    await PostModel.findByIdAndDelete(postID);
    
    res.json({
      success: true,
      message: "post deleted Successfully !",
    });
  } catch (error) {
    next(error);
  }
  };
  
// Comments Specific
const createAComment = async (req, res, next) => {
  try {
    // extracting id from params
    const { postID } = req.params;
    if (!postID) {
      next(new CustomError(200, "postID not provided in params!"));
      return;
    }
    req.body.author = req.user._id;
    const reqBody = req.body;

    // create a comment doc
    const commentDoc = new CommentModel(reqBody);
    commentDoc.save();
    // add its id to the post comments array
    const post = await PostModel.findById(postID);
    post.comments.push(commentDoc._id);
    post.save();
    console.log(post);

    res.json({
      success: true,
      message: "Comment saved Successfully !",
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
const updateAComment = async (req, res, next) => {
  try {
    // comment id from params
    const { commentID } = req.params;
    if (!commentID) {
      next(new CustomError(200, "CommentID not provided in params!"));
      return;
    }
    // does comment exist ?
      const comment = await CommentModel.findById(commentID);
      if(!comment){
        next(new CustomError(200, "Invalid Comment ID"));
        return;
      }
    // find the comment and update it
    await CommentModel.findByIdAndUpdate(commentID, req.body);

    res.json({
      success: true,
      message: "Comment Updated Successfully !",
    });
  } catch (error) {
    next(error);
  }
};
const deleteAComment = async (req, res, next) => {
  try {
    // extracting ids from params
    const { postID } = req.params;
    if (!postID) {
      next(new CustomError(200, "postID not provided in params!"));
      return;
    }
    const { commentID } = req.params;
    if (!commentID) {
      next(new CustomError(200, "CommentID not provided in params!"));
      return;
    }

    // first find the comment and delete it
    await CommentModel.findByIdAndDelete(commentID);

    // then find the post, and remove comment id from it
    const post = await PostModel.findById(postID);
    post.comments = post.comments.filter((ID) => commentID != ID);
    post.save();

    res.json({
      success: true,
      message: "Comment Deleted Successfully !",
    });
  } catch (error) {
    next(error);
  }
};

const PostController = {
  getAllThePosts,
  createANewPost,
  getAPost,
  updateAPost,
  deleteAPost,
  createAComment,
  updateAComment,
  deleteAComment,
};

export default PostController;
