import React from "react";
import {
  AspectRatio,
  Box,
  Container,
  Text,
  Avatar,
  Flex,
  Badge,
  Grid,
} from "@radix-ui/themes";
import { CalendarIcon, ClockIcon } from "@radix-ui/react-icons";

const HeroSection = ({ id }) => {
  return (
    <Container className="mb-6">
      <Box className="relative overflow-hidden">
        <AspectRatio ratio={16 / 9}>
          <div
            className="w-full h-full bg-cover bg-center relative"
            style={{
              backgroundImage:
                "url(https://www.charlessturt.sa.gov.au/__data/assets/image/0029/836840/Dog-Person-Beach.png)",
            }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-end">
              <div className="relative z-10">
                <Grid columns="1 sm:2" className="gap-4">
                  <div className="">
                    <div className="hidden md:block">
                      <Badge
                        radius="full"
                        className="mb-2"
                        variant="solid"
                        size="2"
                      >
                        Lifestyle
                      </Badge>
                    </div>

                    {/* Title */}
                    <Text className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold line-clamp-2 max-w-4xl">
                      The Joy of Walking Your Dog: A Guide to Better Pet Bonding
                    </Text>

                    {/* Description (hidden on mobile) */}
                    <Text className="hidden sm:block text-gray-200 text-sm sm:text-base md:text-lg line-clamp-2 max-w-3xl">
                      Discover how regular walks can strengthen your
                      relationship with your furry friend while improving both
                      your physical and mental well-being.
                    </Text>
                  </div>

                  {/* Author and Post Info */}
                  <Flex
                    align="start"
                    justify="end"
                    gap="4"
                    direction="column"
                    className="flex-wrap sm:flex-nowrap"
                  >
                    <Flex
                      align="center"
                      gap="2"
                      direction="row"
                      justify="start"
                    >
                      <Avatar
                        size="2"
                        src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453"
                        fallback="A"
                        radius="full"
                      />
                      <div>
                        <Text className="text-white text-xs sm:text-base font-medium">
                          Sarah Johnson
                        </Text>
                        <Flex className="text-gray-300 text-xs sm:text-sm md:text-base">
                          <Flex align="center" gap="1" className="mr-2">
                            <CalendarIcon />
                            <Text>Dec 27, 2024</Text>
                          </Flex>
                          <Flex align="center" gap="1">
                            <ClockIcon />
                            <Text>5 min read</Text>
                          </Flex>
                        </Flex>
                      </div>
                    </Flex>
                  </Flex>
                </Grid>
              </div>
            </div>
          </div>
        </AspectRatio>
      </Box>
    </Container>
  );
};

export default HeroSection;
