import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Button,
  VStack,
  Icon,
  useColorModeValue,
  Flex,
  Divider,
  Tag,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import type { SimulationType } from "../types";

// Define props type for SVG components
type IconProps = React.SVGProps<SVGSVGElement>;

// Simple icon components
const ColorBlindIcon = (props: IconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 2V22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 12H5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const KeyboardIcon = (props: IconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x="2"
      y="6"
      width="20"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 10H6.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 10H10.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 10H14.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 10H18.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 14H18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ScreenReaderIcon = (props: IconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 17.5V8.5C10 7.39543 10.8954 6.5 12 6.5H16C17.1046 6.5 18 7.39543 18 8.5V17.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 17.5V13.5C6 12.3954 6.89543 11.5 8 11.5H10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 20.5C14.2091 20.5 16 18.7091 16 16.5C16 14.2909 14.2091 12.5 12 12.5C9.79086 12.5 8 14.2909 8 16.5C8 18.7091 9.79086 20.5 12 20.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LowVisionIcon = (props: IconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 3L21 21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Card data type
type SimulationCardData = {
  title: string;
  description: string;
  icon: React.FC<IconProps>;
  type: SimulationType;
  stats: string;
  impact: "High" | "Critical";
};

const Dashboard = () => {
  const setCurrentSimulation = useAppStore(
    (state) => state.setCurrentSimulation
  );
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const accentColor = useColorModeValue("blue.500", "blue.300");

  const simulationCards: SimulationCardData[] = [
    {
      title: "Color Blindness",
      description:
        "Visualize how users with color vision deficiency experience your website.",
      icon: ColorBlindIcon,
      type: "colorBlindness" as SimulationType,
      stats: "8% of men, 0.5% of women affected globally",
      impact: "High",
    },
    {
      title: "Keyboard Navigation",
      description: "Simulate tab navigation for users who cannot use a mouse.",
      icon: KeyboardIcon,
      type: "keyboardNavigation" as SimulationType,
      stats: "Essential for 8% of users with motor disabilities",
      impact: "Critical",
    },
    {
      title: "Screen Reader",
      description:
        "Preview how screen reader technology interprets your website.",
      icon: ScreenReaderIcon,
      type: "screenReader" as SimulationType,
      stats: "Used by 1.3 million users in the US alone",
      impact: "Critical",
    },
    {
      title: "Low Vision",
      description: "Experience your site as users with visual impairments do.",
      icon: LowVisionIcon,
      type: "lowVision" as SimulationType,
      stats: "Affects over 246 million people worldwide",
      impact: "High",
    },
  ];

  const handleSimulationSelect = (type: SimulationType) => {
    setCurrentSimulation(type);
  };

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={10} align="stretch">
        <Box textAlign="center">
          <Heading
            as="h1"
            size="2xl"
            mb={4}
            color={accentColor}
            letterSpacing="tight"
          >
            CompliQ
          </Heading>
          <Text fontSize="xl" maxW="container.md" mx="auto">
            A real-time accessibility simulator for developers
          </Text>
        </Box>

        <Box>
          <Flex justifyContent="space-between" alignItems="center" mb={6}>
            <Heading as="h2" size="lg">
              Accessibility Simulations
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Select a simulation to begin
            </Text>
          </Flex>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            {simulationCards.map((card) => (
              <Card
                key={card.title}
                bg={cardBg}
                borderRadius="lg"
                boxShadow="sm"
                borderWidth="1px"
                borderColor={borderColor}
                overflow="hidden"
                transition="all 0.2s ease"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "md",
                  borderColor: "blue.200",
                }}
              >
                <CardHeader pb={0}>
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <Icon as={card.icon} boxSize={6} color={accentColor} />
                    <Tag
                      size="sm"
                      colorScheme={
                        card.impact === "Critical" ? "red" : "orange"
                      }
                    >
                      {card.impact} Impact
                    </Tag>
                  </Flex>
                  <Heading as="h3" size="md" mb={2}>
                    {card.title}
                  </Heading>
                </CardHeader>

                <CardBody>
                  <Text fontSize="sm" mb={4} color="gray.600">
                    {card.description}
                  </Text>

                  <Text fontSize="xs" color="gray.500" mb={4}>
                    {card.stats}
                  </Text>

                  <Button
                    as={RouterLink}
                    to="/simulate"
                    onClick={() => handleSimulationSelect(card.type)}
                    colorScheme="blue"
                    size="sm"
                    width="full"
                  >
                    Start Simulation
                  </Button>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Box>

        <Divider my={6} />

        <Box>
          <Heading as="h2" size="lg" mb={6}>
            Why Accessibility Matters
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            <Box
              p={5}
              bg={cardBg}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <Heading as="h3" size="md" mb={3} color={accentColor}>
                1.3 Billion Users
              </Heading>
              <Text fontSize="sm">
                Around 16% of the world's population experiences some form of
                disability, affecting how they interact with digital products.
              </Text>
            </Box>

            <Box
              p={5}
              bg={cardBg}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <Heading as="h3" size="md" mb={3} color={accentColor}>
                Legal Compliance
              </Heading>
              <Text fontSize="sm">
                Many regions require WCAG compliance by law, with organizations
                facing legal consequences for inaccessible websites.
              </Text>
            </Box>

            <Box
              p={5}
              bg={cardBg}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <Heading as="h3" size="md" mb={3} color={accentColor}>
                Universal Design
              </Heading>
              <Text fontSize="sm">
                Accessible websites are better for all users, including those
                with temporary limitations or situational constraints.
              </Text>
            </Box>
          </SimpleGrid>
        </Box>

        <Box textAlign="center" mt={4}>
          <Text fontSize="sm" color="gray.500">
            CompliQ is a developer tool designed to help build more inclusive
            web experiences.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default Dashboard;
