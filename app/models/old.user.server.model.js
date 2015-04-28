var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/** Schema itself */
var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        index: true,
        match: /.+\@.+\..+/
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        validate: [
            function(password) {
                return password.length >= 6;
            },
            'Password should be longer'
        ]
    },
    website: {
        type: String,
        get: function(url) {
            if (!url) {
                return url;
            } else {
                if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
                    url = 'http://' + url;
                }
                return url;
            }
        }   
    },
    role: {
        type: String,
        enum: ['Admin', 'Owner', 'User']
    },
    created: {
        type: Date,
        default: Date.now
    }
});

/** Method that handles a virtual property 'fullName' */
UserSchema.virtual('fullName').get(function() {
    return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
    var splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

/** Static method to the UserSchema */
UserSchema.statics.findOneByUsername = function (username, callback) {
    this.findOne({ username: new RegExp(username, 'i') }, callback);
};

/** Instance method to the UserSchema */
UserSchema.methods.authenticate = function(password) {
    return this.password === password;
};

/** 
 * Tells to Mongoose to "call" the getters and virtuals when
 * performing a 'toJSON' method
 */
UserSchema.set('toJSON', { getters: true, virtuals: true });

mongoose.model('User', UserSchema);