import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user"; // adjust path to your model
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
          role: user.role, // ⭐ include role here
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // attach role to token
        console.log(user.role);
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role; // make role available in session
      return session;
    },
    async redirect({ url, baseUrl, token }) {
      // 🔁 Role-based redirects
      if (token?.role === "admin") return `${baseUrl}/admin`;
      if (token?.role === "mentor") return `${baseUrl}/mentor`;
      if (token?.role === "mentee") 
        console.log('mentee') 
        return `${baseUrl}/mentee`;
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
