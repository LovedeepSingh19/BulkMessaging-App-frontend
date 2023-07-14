import Auth from "@/components/Auth/Auth";
import Chat from "@/components/Chat/chat";
import { Box } from "@chakra-ui/react";
import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import { Session } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();

  return (
    <Box>{session?.user?.phoneNumber ? <Chat session={session} /> : <Auth session={session} reloadSession={function (): void {
      throw new Error("Function not implemented.");
    } } />}</Box>
  );
}

export async function getServerSideProps(content: NextPageContext) {
  const session = await getSession(content);

  return {
    props: {
      session,
    },
  };
}
