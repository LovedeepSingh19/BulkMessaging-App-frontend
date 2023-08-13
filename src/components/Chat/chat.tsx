import InstructionBox from "@/util/instructions-box";
import { GetSearchedUser } from "@/util/types";
import { Flex } from "@chakra-ui/react";
import axios from "axios";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import ConversationWrapper from "./Conversations/ConversationWrapper";
import FeedWrapper from "./Feed/FeedWrapper";

interface ChatProps {
  session: Session;
}

const Chat: React.FC<ChatProps> = ({ session }) => {
  const [items, setItems] = useState([]);
  const [counter, setCounter] = useState(0);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      console.log(`${process.env.NEXT_PUBLIC_TEMP_UR}`);
      try {
        if (counter < 3) {
          const response = await axios.post(
            `${apiUrl}/getContacts`,
            { uid: session.user?.email! },
            { headers: { "Content-Type": "application/json" } }
          );
          const data = response.data;
          setItems(data);
          console.log(items);
          setCounter((prevCounter) => prevCounter + 1); // Increment the counter
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchData();
  }, [counter]);

  const onDeleteitem = async (id: string) => {
    console.log(id);
    try {
      const response = await axios.post(
        `${apiUrl}/delete`,
        {
          uid: id,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      const data = response.data;
      // setTempItems(data);
      const index = items.findIndex(
        (element: GetSearchedUser) => element.email === id
      );
      if (index !== -1) {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
      }
    } catch (error) {
      console.error("Error Deleting items:", error);
    }
  };

  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <InstructionBox isOpen={isOpen} setIsOpen={setIsOpen} />
      <Flex height="100vh">
        <ConversationWrapper
          session={session}
          items={items}
          onDeleteitem={onDeleteitem}
        />
        <FeedWrapper
          helpIsOpen={setIsOpen}
          session={session}
          items={items}
          onDeleteitem={onDeleteitem}
        />
      </Flex>
    </>
  );
};
export default Chat;
