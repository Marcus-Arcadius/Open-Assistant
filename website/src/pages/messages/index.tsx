import { Box, CircularProgress, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import Head from "next/head";
import { getDashboardLayout } from "src/components/Layout";
import { MessageTable } from "src/components/Messages/MessageTable";
import fetcher from "src/lib/fetcher";
import useSWRImmutable from "swr/immutable";

const MessagesDashboard = () => {
  const boxBgColor = useColorModeValue("white", "gray.700");
  const boxAccentColor = useColorModeValue("gray.200", "gray.900");

  const { data: messages } = useSWRImmutable("/api/messages", fetcher, { revalidateOnMount: true });
  const { data: userMessages } = useSWRImmutable(`/api/messages/user`, fetcher, { revalidateOnMount: true });

  return (
    <>
      <Head>
        <title>Messages - Open Assistant</title>
        <meta name="description" content="Chat with Open Assistant and provide feedback." />
      </Head>
      <SimpleGrid fontFamily="Inter" columns={[1, 1, 1, 2]} gap={4}>
        <Box>
          <Text className="text-2xl font-bold" pb="4">
            Recent messages
          </Text>
          <Box
            backgroundColor={boxBgColor}
            boxShadow="base"
            dropShadow={boxAccentColor}
            borderRadius="xl"
            className="p-6 shadow-sm"
          >
            {messages ? <MessageTable enableLink messages={messages} /> : <CircularProgress isIndeterminate />}
          </Box>
        </Box>
        <Box>
          <Text className="text-2xl font-bold" pb="4">
            Your recent messages
          </Text>
          <Box
            backgroundColor={boxBgColor}
            boxShadow="base"
            dropShadow={boxAccentColor}
            borderRadius="xl"
            className="p-6 shadow-sm"
          >
            {userMessages ? <MessageTable enableLink messages={userMessages} /> : <CircularProgress isIndeterminate />}
          </Box>
        </Box>
      </SimpleGrid>
    </>
  );
};

MessagesDashboard.getLayout = getDashboardLayout;

export default MessagesDashboard;
