const getAllThePosts = (req, res, next)=>{
  res.json({
    success: true,
    message: "req received getAllThePosts"
  })
};

const createANewPost = (req, res, next)=>{
  res.json({
    success: true,
    message: "req received createANewPost"
  })
};
const getAPost = (req, res, next)=>{
  res.json({
    success: true,
    message: "req received getSinglePost"
  })
};
const updateAPost = (req, res, next)=>{
  res.json({
    success: true,
    message: "req received updateSinglePost"
  })
};
const deleteAPost = (req, res, next)=>{
  res.json({
    success: true,
    message: "req received deleteSinglePost"
  })
};

// Comments Specific
const createAComment = (req, res, next)=>{
  res.json({
    success: true,
    message: "req received createASingleComment"
  })
};
const updateAComment = (req, res, next)=>{
  res.json({
    success: true,
    message: "req received updateASingleComment"
  })
};
const deleteAComment = (req, res, next)=>{
  res.json({
    success: true,
    message: "req received deleteASingleComment"
  })
};

const PostController = {
  getAllThePosts,
  createANewPost,
  getAPost,
  updateAPost,
  deleteAPost,
  createAComment,
  updateAComment,
  deleteAComment
};


export default PostController;