import PostModel from "../Models/Post.Model.mjs";
import CustomError from "../Utils/CustomError.mjs";
const getAllThePosts = (req, res, next) => {
  res.json({
    success: true,
    message: "req received getAllThePosts",
  });
};

const createANewPost = (req, res, next) => {
  try {
    req.body.author = req.user._id;
    console.log(req.body);
    const doc = new PostModel(req.body);
    doc.save();
    res.status(201).json({
      success: true,
      message: "req received createANewPost",
      postID: doc.id,
    });
  } catch (error) {
    next(
      new CustomError(500, "Failed to Create new post! (" + error.message + ")")
    );
  }
};
const getAPost = (req, res, next) => {
  // extracting id from params
  console.log(req);

  // await PostModel.findById()
  res.json({
    success: true,
    message: "req received getSinglePost",
  });
};
const updateAPost = (req, res, next) => {
  res.json({
    success: true,
    message: "req received updateSinglePost",
  });
};
const deleteAPost = (req, res, next) => {
  res.json({
    success: true,
    message: "req received deleteSinglePost",
  });
};

// Comments Specific
const createAComment = (req, res, next) => {
  res.json({
    success: true,
    message: "req received createASingleComment",
  });
};
const updateAComment = (req, res, next) => {
  res.json({
    success: true,
    message: "req received updateASingleComment",
  });
};
const deleteAComment = (req, res, next) => {
  res.json({
    success: true,
    message: "req received deleteASingleComment",
  });
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
