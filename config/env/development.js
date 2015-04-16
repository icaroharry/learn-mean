module.exports = {
    db: 'mongodb://localhost/mean-book',
    sessionSecret: 'developmentSessionSecret',
    facebook: {
        clientID: '826355274117675',
        clientSecret: '215d9f623fe7750f702a535c943660ba',
        callbackURL: 'http://localhost:3000/oauth/facebook/callback'
    },
    google: {
        clientID: '390717311094-foufr2d2j20cr9ronu570pjftona3qbo.apps.googleusercontent.com',
        clientSecret: 'ctoP0OPjLCqSMQ25hnRX0oZc',
        callbackURL: 'http://localhost:3000/oauth/google/callback'
    }
};