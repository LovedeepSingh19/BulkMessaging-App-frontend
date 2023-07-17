import Auth from "@/components/Auth/Auth";
import Chat from "@/components/Chat/chat";
import { Box } from "@chakra-ui/react";
import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();

    const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  useEffect(() => {
    if (!session?.user) {
      // router.replace(process.env.NEXT_PUBLIC_BASE_URL as string);
    }
  }, [session?.user?.phoneNumber]);

  return (
    <Box>{session?.user?.phoneNumber ? <Chat session={session} /> : <Auth session={session} reloadSession={reloadSession} />}</Box>
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
