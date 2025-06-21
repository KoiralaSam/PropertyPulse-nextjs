import GoogleProvider from "next-auth/providers/google";

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
      // Check if user exists in the database
      // If user does not exist, create a new user
      // return true to allow sign in
    },

    //session callback function that modifies the session object
    async session({ session }) {
      // get the user from the database
      //assign user id from session
      //return session
    },
  },
};
