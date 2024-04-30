import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CognitoProvider from "next-auth/providers/cognito";
import { getProviders, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export const authConfig: NextAuthOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID as string,
      clientSecret: process.env.COGNITO_CLIENT_SECRET as string,
      issuer: process.env.COGNITO_ISSUER as string,
      checks: ['nonce'],
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {  
      if (account) {
        token.id_token = account.id_token;
      }
      return token;
    },
    async session({ session, token, user}) {
      //@ts-ignore
      session.id_token = token.id_token;
      return session
    }
  }
};

export async function loginIsRequiredServer() {
  const session = await getServerSession(authConfig);
  if (!session) return redirect("/");
}

//   export function loginIsRequiredClient() {
//     if (typeof window !== "undefined") {
//       const session = useSession();
//       const router = useRouter();
//       if (!session) router.push("/");
//     }
// }
