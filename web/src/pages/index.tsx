import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useDeletePostMutation, usePostsQuery } from "../generated/graphql";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
  Text,
} from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";
import { Layout } from "../components/Layout";
import { useState } from "react";
import { UpvoteSection } from "../components/UpvoteSection";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 20,
    cursor: null as null | string,
  });
  const [{ data, fetching, ...other }] = usePostsQuery({
    variables,
  });
  const [, deletePost] = useDeletePostMutation();

  if (!fetching && !data) {
    return <div>Query failed. No Posts</div>;
  }

  return (
    <Layout>
      {!data && fetching ? (
        <div>Loading...</div>
      ) : (
        <Stack spacing={6} mb={2}>
          {data!.posts.posts.map((p) =>
            !p ? null : (
              <Flex p={p.id} shadow="md" borderWidth="1px" padding={4}>
                <UpvoteSection post={p} />
                <Box flex={1}>
                  <NextLink href={`/post/${encodeURIComponent(p.id)}`}>
                    <Link>
                      <Heading fontSize="xl">{p.title}</Heading>
                    </Link>
                  </NextLink>
                  <Text ml="auto" fontSize={13}>
                    posted by {p.creator.username}
                  </Text>
                  <Flex>
                    <Text mt={4}>{p.textSnippet}</Text>
                    <IconButton
                      icon="delete"
                      variantColor="red"
                      aria-label="Delete Post"
                      ml="auto"
                      onClick={() => {
                        deletePost({ id: p.id });
                      }}
                    ></IconButton>
                  </Flex>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            Load More...
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
