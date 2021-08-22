import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";
import { Layout } from "../components/Layout";

const Index = () => {
  const [{ data, fetching }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  });

  if (!fetching && !data) {
    return <div>Query failed. No Posts</div>;
  }

  return (
    <Layout>
      <Flex align="center">
        <Heading>Message Board</Heading>
        <NextLink href="/create-post">
          <Link ml="auto">Create Post</Link>
        </NextLink>
      </Flex>
      <br />
      {!data && fetching ? (
        <div>Loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.map((p) => (
            // <div key={p.id}>{p.title}</div>
            <Box p={p.id} shadow="md" borderWidth="1px" padding={4}>
              <Heading fontSize="xl">{p.title}</Heading>
              <Text mt={4}>{p.textSnippet}</Text>
            </Box>
          ))}
        </Stack>
      )}
      {data ? (
        <Flex>
          <Button isLoading={fetching} m="auto" my={8}>
            Load More...
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
