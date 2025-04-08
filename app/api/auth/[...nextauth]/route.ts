import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import connectMongoDB from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectMongoDB();

        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("User not found");

        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) throw new Error("Invalid password");
        
        return {
          id: user._id,
          email: user.email,
          role: user.role, 
          profileCompleted: user.profileCompleted,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.profileCompleted = user.profileCompleted;

      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub; 
      session.user.role = token.role;
      session.user.profileCompleted = token.profileCompleted;
      return session;
    },
    async redirect({ url, baseUrl, token }) {
      if (token?.role) {
        const user = await User.findById(token.sub); 
        if (user) {
          if (token.role === "admin") return `${baseUrl}/test_match`;
          if (token.role === "mentor") {
            if (user.profileSetup) {
              return `${baseUrl}/mentor/dashboard`;
            } else {
              return `${baseUrl}/mentor/profile_setup`;
            }
          }
          if (token.role === "mentee") {
            if (user.profileSetup) {
              return `${baseUrl}/mentee/dashboard`;
            } else {
              return `${baseUrl}/mentee/profile_setup`;
            }
          }
        }
      }
      return baseUrl;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
