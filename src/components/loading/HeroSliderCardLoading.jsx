import React from "react";
import {
  Container,
  Box,
  AspectRatio,
  Flex,
  Spinner,
  Text,
  Card,
} from "@radix-ui/themes";

const HeroSliderCardLoading = () => {
  return (
    <Container className="mb-6">
      <Box className="relative overflow-hidden">
        <AspectRatio ratio={16 / 9}>
          {/* Loading Overlay */}
          <Box
            className="w-full h-full  bg-black/35"
            style={{
              backdropFilter: "blur(4px)", // Adds a subtle blur effect
            }}
          >
            <Flex
              className="w-full h-full"
              direction="column"
              align="center"
              justify="center"
              gap="3"
            >
              <Spinner size="3" />
            </Flex>
          </Box>
        </AspectRatio>
      </Box>
    </Container>
  );
};

export default HeroSliderCardLoading;
