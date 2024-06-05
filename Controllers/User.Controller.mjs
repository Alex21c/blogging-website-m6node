const signUp = (req, res, next)=>{
  res.json({
    success: true,
    message: "req received sign-up"
  })
};


const login = (req, res, next)=>{
  res.json({
    success: true,
    message: "req received login"
  })
};

const logout = (req, res, next)=>{
  res.json({
    success: true,
    message: "req received logout"
  })
};

const UserController = {
  signUp,
  login,
  logout
};


export default UserController;