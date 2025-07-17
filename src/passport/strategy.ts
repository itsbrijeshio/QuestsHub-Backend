import passport, { DoneCallback } from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { UserService } from "../services";
import { env } from "../config";

passport.use(
  new GitHubStrategy(
    {
      clientID: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      callbackURL: env.GITHUB_CB_URL,
    },
    async function (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: DoneCallback
    ) {
      const userService = new UserService();
      const { id, username } = profile;
      const { _id, role } = await userService.github(id, username);
      done(null, { _id, role });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  if (user) {
    done(null, user);
  } else {
    done(null, null);
  }
});

export default passport;
