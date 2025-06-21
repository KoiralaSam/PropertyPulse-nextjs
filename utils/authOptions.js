import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/db";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on sucessfull sign in
    async signIn({ profile }) {
      // connect to db
      await connectDB();
      // Check if user exists in the database
      const userExists = await User.findOne({ email: profile.email });
      // If user does not exist, create a new user
      if (!userExists) {
        //truncate username if too long!
        const username = profile.name.slice(0, 20);

        const user = new User({
          email: profile.email,
          username,
          image: profile.picture,
        });

        user.save();
      }
      // return true to allow sign in
      return true;
    },

    //session callback function that modifies the session object
    async session({ session }) {
      // get the user from the database
      const user = await User.findOne({ email: session.user.email });
      //assign user id from session
      session.user.id = user._id.toString();
      //return session
      return session;
    },
  },
};
