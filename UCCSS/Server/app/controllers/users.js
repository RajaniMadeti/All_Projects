var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose')
    User = mongoose.model('User'),
    asyncHandler = require('express-async-handler');

    passportService = require('../../config/passport'),
    passport = require('passport');
    
    var requireLogin = passport.authenticate('local', { session: false });
    var requireAuth = passport.authenticate('jwt', { session: false });


   

    
module.exports = function (app, config) {
    app.use('/api', router);

    //replace this with the Get all async user handler
   // router.route('/users').get(function (req, res, next) {
   //     logger.log('info', 'Get all users');
   //     res.status(200).json({ message: 'Get all users' });
   // });


    router.get('/users', requireAuth, asyncHandler(async (req, res) => {
            logger.log('info','Get all users');
            let query = User.find();
            query.sort(req.query.order)
            await query.exec().then(result => {
                res.status(200).json(result);
            })
        })); 
    

     router.get('/users/:id', requireAuth, asyncHandler(async (req, res) => {
                logger.log('info','Get user %s',req.params.id);
                await User.findById(req.params.id).then(result => {
                    res.status(200).json(result); 
                })
            }));
        
    //router.route('/users/:id').get( function (req, res, next) {
      //  logger.log('info', 'Get user %s', req.params.id);

        //res.status(200).json({ message: 'Get user ' + req.params.id });
    //});
// comment this out when using async
    //router.route('/users').post(function (req, res, next){
      //  logger.log('info','Create user');
        //res.status(200).json({message: 'Creating User' });
        //logger.log('Create User', 'verbose');
        //var user = new User(req.body);
       // user.save()
       // .then(result => {
       //     res.status(201).json(result);
       // })
       // .catch( err => {
       //    return next(err);
       // });
  
    //});

      router.post('/users', requireAuth, asyncHandler(async (req, res) => {
                logger.log('info', 'Creating user');
                var user = new User(req.body);
                const result = await user.save()
                res.status(201).json(result);
            }));
        

        // router.put('/users/password/:userId', requireAuth, function (req, res, next) {
        //             logger.log('Update user ' + req.params.userId, 'verbose');
        //             User.findById(req.params.userId)
        //                 .exec()
        //                 .then(function (user) {
        //                     if (req.body.password !== undefined) {
        //                         user.password = req.body.password;
        //                     }
        //                     user.save()
        //                         .then(function (user) {
        //                             res.status(200).json(user);
        //                         })
        //                         .catch(function (err) {
        //                             return next(err);
        //                         });
        //                 })
        //                 .catch(function (err) {
        //                     return next(err);
        //                 });
        //         });


        router.put('/users/password/:userId', requireAuth, asyncHandler(async (req, res) => {
            logger.log('Update user ' + req.params.userId, 'verbose');
    
            await User.findById(req.params.userId)
                .exec()
                .then(function (user) {
                    if (req.body.password !== undefined) {
                        user.password = req.body.password;
                    }
                    user.save()
                        .then(function (user) {
                            res.status(200).json(user);
                        })
                        .catch(function (err) {
                            return next(err);
                        });
                })
                .catch(function (err) {
                    return next(err);
                });
        }));
    
        router.put('/users', requireAuth, asyncHandler(async (req, res) => {
            logger.log('info', 'Updating user');
            await User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
                .then(result => {
                    res.status(200).json(result);
                })
        }));
    
            
        //  router.put('/users', asyncHandler(async (req, res) => {
        //             logger.log('info', 'Updating user');
        //             await User.findOneAndUpdate({_id: req.body._id}, req.body, {new:true})
        //             .then(result => {
        //                 res.status(200).json(result);
        //             })
        //         }));
            

              router.delete('/users/:id', requireAuth, asyncHandler(async (req, res) => {
                        logger.log('info', 'Deleting user %s', req.params.id);
                        await User.remove({ _id: req.params.id })
                            .then(result => {
                                res.status(200).json(result);
                            })
                    }));
                

    //router.route('/users').put(function (req, res, next){
      //  logger.log('info','Updating user');
       // res.status(200).json({message: 'Updating user ' });
    //});


   // router.route('/users/:id').delete(function (req, res, next){
    //    logger.log('info','deleting user');
   //     res.status(200).json({message: 'Deleting user ' });
    //});

   ;

   router.route('/users/login').post(requireLogin, login);
//     router.route('/login').post(function(req, res, next)
//     {
//         console.log(req.body);
//         var email = req.body.email
//         var password = req.body.password;
  
//         var obj = {'email' : email, 'password' : password};
//       res.status(201).json(obj);
//   });
  


};
