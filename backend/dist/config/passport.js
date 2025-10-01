import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
dotenv.config();
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('Google profile:', profile);
        console.log(profile); // ✅ Test output
        done(null, profile); // Pass profile for testing
    }
    catch (err) {
        done(err);
    }
}));
export default passport;
//# sourceMappingURL=passport.js.map