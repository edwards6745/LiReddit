import { Box, IconButton, Link } from "@chakra-ui/core";
import React from "react";
import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const [{ data: meData }] = useMeQuery();
  const [, deletePost] = useDeletePostMutation();
  if (meData?.me?.id !== creatorId) {
    return null;
  }

  return (
    <Box>
      <NextLink href={`/post/edit/${encodeURIComponent(id)}`}>
        <IconButton
          as={Link}
          icon="edit"
          aria-label="Edit Post"
          mr={4}
        ></IconButton>
      </NextLink>
      <IconButton
        icon="delete"
        aria-label="Delete Post"
        onClick={() => {
          deletePost({ id: id });
        }}
      ></IconButton>
    </Box>
  );
};
