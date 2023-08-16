import { CurrentUser } from "@/util/types";
import { Button, Center, Stack, Text, Image, Input } from "@chakra-ui/react";
import axios from "axios";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

interface AuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FC<AuthProps> = ({ session, reloadSession }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;


  const onSubmit = async () => {
    try {

        const NewUser: CurrentUser = {
            name: session?.user.name!,
            phoneNumber: phoneNumber,
            email: session?.user.email!,
            image: session?.user.image!,
            emailVerified: false,
        }

        const response = await axios.post(
          `${apiUrl}/userUpdate`,
            { user: NewUser },
            { headers: { "Content-Type": "application/json" } }
          );
          console.log(response.data)
          reloadSession();
          
        
    } catch (error) {
        console.log("OnSubmitError: ", error)
    }
  }

  return (
    <Center height={"100vh"}>
      <Stack spacing={6} align={"center"}>
        {session ? (
          <>
            <Text>Set Phone Number</Text>
            <Input
              placeholder="Enter your Phone Number"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
            <Button onClick={onSubmit}>Save</Button>
            <Text fontSize={12} fontWeight={600} pt={5}>Server is Slow please wait a min</Text>
          </>
        ) : (
          <>
            <Text fontSize={"3xl"}>Messanger</Text>
            <Button
              onClick={() => signIn("google")}
              leftIcon={<Image alt="google" height="20px" src="/images/googlelogo.png" />}
            >
              Continue with Google
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};
export default Auth;