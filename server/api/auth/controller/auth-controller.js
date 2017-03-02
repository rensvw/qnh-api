var authController = (User, jwt, config) => {

    var signUp = (req, res) => {
        let user = new User(req.body);
        user.admin = false;
        User.findOne({userName: user.userName}, (err,existingUser) => {
            if(err || existingUser){
                // send true for existing user
                res.json("Error, username already exists!");
            }
            if (!existingUser){
                user.save();
                res.status(201).send(user);
            }
            })};

    var authenticate = (req, res) => {
        User.findOne({
            userName: req.body.userName
        }, (err, user) => {
            if (err) {
                throw err;
            }
            if (!user) {
                res.status(404).send("Authentication failed user not found!");
            } else if (user) {
                if (user.password != req.body.password) {
                    res.status(401).send("Authentication failed. Wrong password!");

                } else {
                    var token = jwt.sign({
                            data: user
                        },
                        config.secret, {
                            expiresIn: 1440
                        }
                    );
                    res.status(200).send({
                        succes: true,
                        message: 'Enjoy your token',
                        user: user,
                        token: token
                    });
                }
            }
        })
    }

    var verifyToken = (req,res,next) =>{
         var token = req.body.token || req.query.token || req.headers['x-access-token'];
         if(token){
             jwt.verify(token, config.secret, (err,decoded)=>{
                 err ? res.status(403).send('Failed to authenticate token.') : req.decoded = decoded; next();
             });
         }
         else{
            res.status(403).send({
                succes:false,
                message: 'No token provided'
            });
         }
    }

    return {
        signUp: signUp,
        authenticate: authenticate,
        verifyToken: verifyToken
    }
}

module.exports = authController;