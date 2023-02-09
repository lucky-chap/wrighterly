import {
  Box,
  Button,
  Center,
  Container,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
  useColorMode,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { FaICursor } from "react-icons/fa";
import {
  FiBookOpen,
  FiCalendar,
  FiCloud,
  FiCloudOff,
  FiCode,
  FiCommand,
  FiCornerRightDown,
  FiDownloadCloud,
  FiEdit,
  FiEye,
  FiGift,
  FiGlobe,
  FiHash,
  FiKey,
  FiMoon,
  FiMousePointer,
  FiPhone,
  FiStar,
  FiSun,
} from "react-icons/fi";
import {
  TbBulb,
  TbCode,
  TbCommand,
  TbDeviceMobile,
  TbEdit,
  TbKeyboard,
  TbMarkdown,
  TbMath,
  TbMathFunction,
  TbPeace,
  TbSmartHome,
  TbUserX,
} from "react-icons/tb";
import { GrainyTexture } from "../components/GrainyTexture";
import { GuestWarn } from "../components/GuestWarn";
import Logo from "../components/Logo";

const FeatureCard = ({
  icon,
  title,
  description,
  bg = "bgLight",
  link = "",
}: {
  icon: JSX.Element;
  title: string;
  description: string;
  bg?: string;
  link?: string;
}) => {
  return (
    <Box
      p={4}
      borderRadius={12}
      h="150px"
      w="290px"
      bg={bg}
      pr={3}
      shadow="base"
      as={link ? "a" : "div"}
      // @ts-ignore
      target="_blank"
      href={link || "#"}
    >
      <HStack alignItems="flex-start" spacing={3}>
        <Center p={2} bg="bg" borderRadius={8} w={10} h={10}>
          {icon}
        </Center>
        <VStack alignItems="flex-start" spacing={1}>
          <Text fontSize="20px" fontWeight="bold" lineHeight={1.3}>
            {title}
          </Text>
          <Text fontSize="15px" opacity={0.7} fontWeight="bold">
            {description}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

const Home: NextPage = () => {
  const {
    isOpen: isGuestWarnOpen,
    onOpen: onGuestWarnOpen,
    onClose: onGuestWarnClose,
  } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Head>
        <title>wrighterly</title>
      </Head>
      <GrainyTexture />
      <Box
        pos="absolute"
        top="0"
        left="0"
        w="full"
        id="waves-bg-overlay"
        zIndex="-1"
      ></Box>
      <Box
        pos="absolute"
        top="0"
        left="0"
        w="full"
        h=""
        id="waves-bg"
        zIndex="-2"
      ></Box>
      <Container maxW="8xl">
        <Stack
          w="full"
          justifyContent={{ md: "space-between", base: "none" }}
          alignItems={{ base: "center", md: "none" }}
          pt={4}
          flexDir={{ base: "column", md: "row" }}
        >
          <HStack
            w="50px"
            h="50px"
            spacing={3}
            justifyContent={{ md: "flex-start", base: "center" }}
          >
            <Box>
              <Logo />
            </Box>
            <Text fontWeight="800" fontSize="xl">
              wrighterly
            </Text>
          </HStack>
          <HStack spacing={4}>
            <IconButton
              variant="ghost"
              icon={colorMode === "dark" ? <FiSun /> : <FiMoon />}
              aria-label="theme toggle"
              onClick={toggleColorMode}
            />
            <Button as="a" fontWeight="800" href="/signin">
              Log In
            </Button>
            <Box bg="bg">
              <Button
                fontWeight="800"
                onClick={onGuestWarnOpen}
                variant="ghost"
              >
                Guest Mode
              </Button>
            </Box>
          </HStack>
        </Stack>
        <VStack
          mt={{ base: 14, md: 24 }}
          w="full"
          textAlign="center"
          spacing={1}
        >
          <Text
            fontSize={{ base: "md", md: "x-large" }}
            color="textLighter"
            fontWeight="bold"
          >
            All you need in a Markdown editor
          </Text>
          <Text
            fontSize={{ base: "xx-large", md: "5rem" }}
            fontWeight={800}
            lineHeight={1}
          >
            Simple. Elegant. Powerful. This is Wrighterly
          </Text>
          <Box h={8} />
          <Button size="lg" as="a" fontWeight="800" href="/signin">
            Start Wrighting!
          </Button>
          <Text fontSize="lg" color="textLighter" pt={8}>
            or
          </Text>
          <Button
            size="lg"
            fontWeight="800"
            variant="ghost"
            onClick={onGuestWarnOpen}
          >
            Start as a Guest
          </Button>
          <Text color="textLighter" fontSize="md">
            (no signup required)
          </Text>
        </VStack>

        <GuestWarn isOpen={isGuestWarnOpen} onClose={onGuestWarnClose} />
      </Container>
    </>
  );
};

export default Home;
