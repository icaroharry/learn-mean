var User = require('mongoose').model('User');

/**
 * Method that creates a new User, with the informations
 * received by the application.
 * @param  {Object}             req  Object containing information about the HTTP request that raised the event
 * @param  {Object}             res  Object used to send back the desired HTTP response
 * @param  {Function}           next Callback used in situations that require serial execution of actions
 * @return {Function|Object}         User created or err callback
 */
exports.create = function(req, res, next) {
    var user = new User(req.body);
    
    user.save(function(err) {
        if (err) {
            return next(err);
        } else {
            res.json(user);
        }
    });
};

/**
 * List 10 Users, showing username and email.
 * @param  {Object}             req  Object containing information about the HTTP request that raised the event
 * @param  {Object}             res  Object used to send back the desired HTTP response
 * @param  {Function}           next Callback used in situations that require serial execution of actions
 * @return {Function|Object}         User founded or err callback
 */
exports.list = function(req, res, next) {
    User.find({}, 'username email', {
        limit: 10
    }, function(err, users) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    });
};

/**
 * Middleware that receives a User object and returns a JSON.
 * @param  {Object} req Object containing information about the HTTP request that raised the event
 * @param  {Object} res Object used to send back the desired HTTP response
 * @return {Object}     JSON User     
 */
exports.read = function(req, res) {
    res.json(req.user);
};

/**
 * Find one User, by the given ID.
 * @param  {Object}   req  Object containing information about the HTTP request that raised the event
 * @param  {Object}   res  Object used to send back the desired HTTP response
 * @param  {Function} next Callback used in situations that require serial execution of actions
 * @param  {Number}   id   ID of the user that's been searched
 * @return {Function}      err callback or next()
 */
exports.userByID = function(req, res, next, id) {
    User.findOne({
        _id: id
    }, function(err, user) {
        if (err) {
            return next(err);
        } else {
            req.user = user;
            next();
        }
    });
};

/**
 * Function that receives an User modified and saves it.
 * @param  {Object}          req    Object containing information about the HTTP request that raised the event
 * @param  {Object}          res    Object used to send back the desired HTTP response
 * @param  {Function}        next   Callback used in situations that require serial execution of actions
 * @return {Function|Object}        User updated or err callback
 */
exports.update = function(req, res, next) {
    User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
        if (err) {
            return next(err);
        } else {
            res.json(user);
        }
    });
};

/**
 * Function that deletes the given User.
 * @param  {Object}          req    Object containing information about the HTTP request that raised the event
 * @param  {Object}          res    Object used to send back the desired HTTP response
 * @param  {Function}        next   Callback used in situations that require serial execution of actions
 * @return {Function|Object}        User deleted or err callback
 */
exports.delete = function(req, res, next) {
    req.user.remove(function(err) {
        if (err) {
            return next(err);
        } else {
            res.json(req.user);
        }
    });
};