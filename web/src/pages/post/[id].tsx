import { Box, Flex, Heading } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { Layout } from "../../components/Layout";
import { usePostQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromURL } from "../../utils/useGetPostFromURL";

export const Post = ({}) => {
  const [{ data, error, fetching }] = useGetPostFromURL();

  if (fetching) {
    return (
      <Layout>
        <div>Loading....</div>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>Could not find the Post....</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Flex>
        <Heading mb={4}>{data.post.title}</Heading>
        <Box ml="auto">
          <EditDeletePostButtons
            id={data.post.id}
            creatorId={data.post.creator.id}
          />
        </Box>
      </Flex>
      <Box mb={4}>{data.post.text}</Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
