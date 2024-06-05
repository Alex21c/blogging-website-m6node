import {Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

const opts = {
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey : process.env.JWT_SECRET_KEY,
  issuer : 'accounts.examplesoft.com',
  audience : 'yoursite.net'

};
console.log('auth token is'  , ExtractJwt.fromAuthHeaderAsBearerToken());
const AuthJwtMiddleware = new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload);
    return done(null, 'sadf')
      // User.findOne({id: jwt_payload.sub}, function(err, user) {
      //     if (err) {
      //         return done(err, false);
      //     }
      //     if (user) {
      //         return done(null, user);
      //     } else {
      //         return done(null, false);
      //         // or you could create a new account
      //     }
      // });
  
  
  });



export default AuthJwtMiddleware;
