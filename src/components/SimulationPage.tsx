import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  HStack,
  VStack,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { useAppStore } from "../store/useAppStore";
import type { ColorBlindnessType } from "../types";

const SimulationPage = () => {
  const {
    currentSimulation,
    colorBlindnessType,
    keyboardNavigationActive,
    screenReaderActive,
    lowVisionActive,
    setCurrentSimulation,
    setColorBlindnessType,
    toggleKeyboardNavigation,
    toggleScreenReader,
    toggleLowVision,
    setUrl,
    urlInput,
  } = useAppStore();

  // URL state
  const [localUrl, setLocalUrl] = useState(urlInput.url);

  // Update local state when store changes
  useEffect(() => {
    setLocalUrl(urlInput.url);
  }, [urlInput.url]);

  // Handle URL input
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalUrl(e.target.value);
  };

  const handleUrlSubmit = () => {
    // Check for special "demo" URL
    if (localUrl.toLowerCase() === "demo") {
      setUrl("demo");
      setUseDemoContent(true);
      return;
    }

    // Basic URL validation
    try {
      const url = new URL(localUrl);
      setUrl(url.toString());
    } catch (e) {
      // Invalid URL
      console.error("Invalid URL:", e);
    }
  };

  // Handle the special "demo" URL case
  useEffect(() => {
    if (urlInput.url === "demo") {
      setUseDemoContent(true);
    }
  }, [urlInput.url]);

  // Handle simulation selection
  const handleSimulationChange = (simulationType: string | null) => {
    setCurrentSimulation(simulationType as any);
  };

  // ColorBlindness simulation options
  const colorBlindnessOptions: ColorBlindnessType[] = [
    "protanopia",
    "deuteranopia",
    "tritanopia",
    "achromatopsia",
    "normal",
  ];

  // Add a state to track iframe loading status
  const [iframeError, setIframeError] = useState(true); // Default to true to show demo option initially

  // Handle iframe loading error
  const handleIframeError = () => {
    setIframeError(true);
  };

  // Reset iframe error when URL changes but keep it true initially
  useEffect(() => {
    // Only set to false if there's actually a URL
    if (urlInput.url) {
      setIframeError(true); // Start with true and let the iframe onLoad event set it to false if successful
    }
  }, [urlInput.url]);

  // Add a demo content state for when iframe fails
  const [useDemoContent, setUseDemoContent] = useState(false);

  // Reset demo content when URL changes
  useEffect(() => {
    setUseDemoContent(false);
  }, [urlInput.url]);

  // Ensure demo content is reset when changing simulation type
  useEffect(() => {
    if (!currentSimulation) {
      setUseDemoContent(false);
    }
  }, [currentSimulation]);

  // Render appropriate simulation panel based on selection
  const renderSimulationControls = () => {
    if (!currentSimulation) {
      return (
        <Box p={4} textAlign="center">
          <Text fontSize="lg">Select a simulation type to begin</Text>
        </Box>
      );
    }

    switch (currentSimulation) {
      case "colorBlindness":
        return (
          <Box p={4}>
            <VStack spacing={6} align="stretch">
              <FormControl>
                <FormLabel>Color Blindness Type</FormLabel>
                <Select
                  value={colorBlindnessType}
                  onChange={(e) =>
                    setColorBlindnessType(e.target.value as ColorBlindnessType)
                  }
                >
                  {colorBlindnessOptions.map((option) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <Card>
                <CardBody>
                  <Heading size="sm" mb={3}>
                    What is color blindness?
                  </Heading>
                  <Text mb={3}>
                    Color blindness affects approximately 1 in 12 men and 1 in
                    200 women globally. Users with color blindness have
                    difficulty distinguishing certain colors.
                  </Text>
                  <Text mb={3}>
                    <strong>Protanopia:</strong> Reduced sensitivity to red
                    light
                  </Text>
                  <Text mb={3}>
                    <strong>Deuteranopia:</strong> Reduced sensitivity to green
                    light
                  </Text>
                  <Text mb={3}>
                    <strong>Tritanopia:</strong> Reduced sensitivity to blue
                    light
                  </Text>
                  <Text>
                    <strong>Achromatopsia:</strong> Complete color blindness
                    (only sees in grayscale)
                  </Text>
                </CardBody>
              </Card>
            </VStack>
          </Box>
        );

      case "keyboardNavigation":
        return (
          <Box p={4}>
            <VStack spacing={6} align="stretch">
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="keyboard-nav" mb="0">
                  Enable Keyboard Navigation Mode
                </FormLabel>
                <Switch
                  id="keyboard-nav"
                  isChecked={keyboardNavigationActive}
                  onChange={toggleKeyboardNavigation}
                />
              </FormControl>

              <Card>
                <CardBody>
                  <Heading size="sm" mb={3}>
                    What is keyboard navigation?
                  </Heading>
                  <Text mb={3}>
                    Many users navigate the web using only their keyboard due to
                    motor disabilities, preference, or when using screen
                    readers.
                  </Text>
                  <Text mb={3}>
                    When activated, this simulation will highlight the current
                    focused element and track the tab order through the page.
                  </Text>
                  <Text>
                    Common issues include: focus not visible, inaccessible
                    elements, incorrect tab order, and keyboard traps.
                  </Text>
                </CardBody>
              </Card>
            </VStack>
          </Box>
        );

      case "screenReader":
        return (
          <Box p={4}>
            <VStack spacing={6} align="stretch">
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="screen-reader" mb="0">
                  Enable Screen Reader Preview
                </FormLabel>
                <Switch
                  id="screen-reader"
                  isChecked={screenReaderActive}
                  onChange={toggleScreenReader}
                />
              </FormControl>

              <Card>
                <CardBody>
                  <Heading size="sm" mb={3}>
                    What is a screen reader?
                  </Heading>
                  <Text mb={3}>
                    Screen readers are assistive technologies that convert text
                    and other elements on the screen to speech or braille
                    output.
                  </Text>
                  <Text mb={3}>
                    When activated, this simulation will show how a screen
                    reader would interpret the elements on the page.
                  </Text>
                  <Text>
                    Common issues include: missing alternative text, improper
                    heading structure, unlabeled form controls, and inaccessible
                    custom widgets.
                  </Text>
                </CardBody>
              </Card>
            </VStack>
          </Box>
        );

      case "lowVision":
        return (
          <Box p={4}>
            <VStack spacing={6} align="stretch">
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="low-vision" mb="0">
                  Enable Low Vision Simulation
                </FormLabel>
                <Switch
                  id="low-vision"
                  isChecked={lowVisionActive}
                  onChange={toggleLowVision}
                />
              </FormControl>

              <Card>
                <CardBody>
                  <Heading size="sm" mb={3}>
                    What is low vision?
                  </Heading>
                  <Text mb={3}>
                    Low vision refers to visual impairments that cannot be
                    corrected with standard glasses or contact lenses.
                  </Text>
                  <Text mb={3}>
                    When activated, this simulation will apply a blur effect to
                    mimic how users with low vision might see the page.
                  </Text>
                  <Text>
                    Common issues include: insufficient text contrast, small
                    text size, reliance on color alone to convey information,
                    and inflexible layouts.
                  </Text>
                </CardBody>
              </Card>
            </VStack>
          </Box>
        );

      default:
        return null;
    }
  };

  // Get colorblindness style based on selected type
  const getColorBlindnessStyle = () => {
    if (currentSimulation !== "colorBlindness") return {};

    switch (colorBlindnessType) {
      case "protanopia":
        // Red-blind simulation using CSS filters
        return {
          filter: "sepia(0.5) hue-rotate(320deg)",
        };
      case "deuteranopia":
        // Green-blind simulation using CSS filters
        return {
          filter: "sepia(0.3) hue-rotate(280deg)",
        };
      case "tritanopia":
        // Blue-blind simulation using CSS filters
        return {
          filter: "sepia(0.2) hue-rotate(180deg)",
        };
      case "achromatopsia":
        // Complete color blindness simulation
        return {
          filter: "grayscale(100%)",
        };
      default:
        return {};
    }
  };

  useEffect(() => {
    // Apply keyboard navigation highlighting
    if (
      currentSimulation === "keyboardNavigation" &&
      keyboardNavigationActive
    ) {
      // Add custom CSS to highlight focused elements
      const style = document.createElement("style");
      style.id = "keyboard-nav-style";
      style.innerHTML = `
        :focus {
          outline: 5px solid #4299E1 !important;
          outline-offset: 3px !important;
          position: relative !important;
          box-shadow: 0 0 0 2px white, 0 0 0 5px #4299E1 !important;
        }
        
        button:focus, a:focus, input:focus, [tabindex]:focus {
          position: relative;
        }
        
        button:focus::after, a:focus::after, input:focus::after, [tabindex]:focus::after {
          content: "Focused Element";
          position: absolute;
          top: -25px;
          left: 0;
          background-color: #4299E1;
          color: white;
          padding: 2px 8px;
          font-size: 12px;
          border-radius: 4px;
          z-index: 100;
        }
      `;
      document.head.appendChild(style);

      // Add keyboard navigation indicator
      if (useDemoContent) {
        // Focus the first focusable element when demo content is shown
        setTimeout(() => {
          const firstButton = document.querySelector('button[tabindex="0"]');
          if (firstButton) {
            (firstButton as HTMLElement).focus();
          }
        }, 500);
      }

      return () => {
        // Clean up
        const existingStyle = document.getElementById("keyboard-nav-style");
        if (existingStyle) {
          existingStyle.remove();
        }
      };
    }
  }, [currentSimulation, keyboardNavigationActive, useDemoContent]);

  // Demo website content for simulation
  const DemoContent = () => (
    <Box
      width="100%"
      height="500px"
      bg="white"
      p={6}
      borderRadius="md"
      overflowY="auto"
      position="relative"
      style={
        currentSimulation === "lowVision" && lowVisionActive
          ? { filter: "blur(2px) brightness(0.9)" }
          : {}
      }
      sx={
        currentSimulation === "colorBlindness" ? getColorBlindnessStyle() : {}
      }
    >
      <Box as="header" borderBottom="1px" borderColor="gray.200" pb={4} mb={6}>
        <Heading
          as="h1"
          size="xl"
          color={
            currentSimulation === "colorBlindness" ? "red.500" : "blue.500"
          }
        >
          Demo Website
        </Heading>
        <HStack spacing={6} mt={4}>
          <Button colorScheme="blue" tabIndex={0}>
            Home
          </Button>
          <Button colorScheme="gray" variant="ghost" tabIndex={0}>
            About
          </Button>
          <Button colorScheme="gray" variant="ghost" tabIndex={0}>
            Services
          </Button>
          <Button colorScheme="gray" variant="ghost" tabIndex={0}>
            Contact
          </Button>
        </HStack>
      </Box>

      <Box as="main">
        <Heading as="h2" size="lg" mb={4}>
          Welcome to our Website
        </Heading>
        <Text mb={4}>
          This is a demo page for testing accessibility features. The text and
          elements here can be used to test various accessibility simulations
          like color blindness, keyboard navigation, and screen reader
          compatibility.
        </Text>

        <Box mb={8}>
          <Heading as="h3" size="md" mb={3}>
            Our Services
          </Heading>
          <HStack spacing={4} mb={4}>
            <Box
              p={4}
              bg={
                currentSimulation === "colorBlindness" ? "red.100" : "blue.100"
              }
              borderRadius="md"
              width="33%"
            >
              <Heading size="sm" mb={2}>
                Web Design
              </Heading>
              <Text fontSize="sm">
                Beautiful, accessible websites built to modern standards.
              </Text>
            </Box>
            <Box
              p={4}
              bg={
                currentSimulation === "colorBlindness"
                  ? "green.100"
                  : "purple.100"
              }
              borderRadius="md"
              width="33%"
            >
              <Heading size="sm" mb={2}>
                Development
              </Heading>
              <Text fontSize="sm">
                Custom solutions for businesses of all sizes.
              </Text>
            </Box>
            <Box p={4} bg="orange.100" borderRadius="md" width="33%">
              <Heading size="sm" mb={2}>
                Accessibility
              </Heading>
              <Text fontSize="sm">Ensuring your site works for everyone.</Text>
            </Box>
          </HStack>
        </Box>

        <Box mb={8}>
          <Heading as="h3" size="md" mb={3}>
            Contact Us
          </Heading>
          <FormControl mb={4}>
            <FormLabel htmlFor="demo-name">Name</FormLabel>
            <Input id="demo-name" placeholder="Your name" tabIndex={0} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="demo-email">Email</FormLabel>
            <Input id="demo-email" placeholder="Your email" tabIndex={0} />
          </FormControl>
          <Button colorScheme="blue" tabIndex={0}>
            Submit
          </Button>
        </Box>

        <Box>
          <img
            src="https://via.placeholder.com/800x400"
            alt=""
            style={{ width: "100%", borderRadius: "4px" }}
          />
          <Text fontSize="sm" color="gray.500" mt={1}>
            This image is missing an alt text, which is an accessibility issue.
          </Text>
        </Box>
      </Box>
    </Box>
  );

  // Screen reader simulation overlay for demo content
  const ScreenReaderOverlay = () => (
    <Box
      position="absolute"
      top="0"
      left="0"
      width="100%"
      height="100%"
      bg="rgba(0, 0, 0, 0.85)"
      color="white"
      p={6}
      overflowY="auto"
      zIndex={10}
    >
      <Heading size="md" mb={4}>
        Screen Reader Output Preview
      </Heading>
      <Text fontFamily="monospace" whiteSpace="pre-line" fontSize="sm">
        [Page Title] Demo Website
        {"\n\n"}
        [Navigation Region] Main navigation
        {"\n"}
        [Button] Home
        {"\n"}
        [Button] About
        {"\n"}
        [Button] Services
        {"\n"}
        [Button] Contact
        {"\n\n"}
        [Main Content Region]
        {"\n"}
        [Heading Level 2] Welcome to our Website
        {"\n\n"}
        [Text] This is a demo page for testing accessibility features. The text
        and elements here can be used to test various accessibility simulations
        like color blindness, keyboard navigation, and screen reader
        compatibility.
        {"\n\n"}
        [Heading Level 3] Our Services
        {"\n\n"}
        [Group] Web Design
        {"\n"}
        [Heading Level 4] Web Design
        {"\n"}
        [Text] Beautiful, accessible websites built to modern standards.
        {"\n\n"}
        [Group] Development
        {"\n"}
        [Heading Level 4] Development
        {"\n"}
        [Text] Custom solutions for businesses of all sizes.
        {"\n\n"}
        [Group] Accessibility
        {"\n"}
        [Heading Level 4] Accessibility
        {"\n"}
        [Text] Ensuring your site works for everyone.
        {"\n\n"}
        [Heading Level 3] Contact Us
        {"\n"}
        [Form] Contact form
        {"\n"}
        [Label] Name
        {"\n"}
        [Text Input] required
        {"\n"}
        [Label] Email
        {"\n"}
        [Text Input] required
        {"\n"}
        [Button] Submit
        {"\n\n"}
        [Image] unlabelled image - Missing alternative text
        {"\n"}
        [Text] This image is missing an alt text, which is an accessibility
        issue.
      </Text>
    </Box>
  );

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading as="h1" size="xl" mb={2}>
            Accessibility Simulation
          </Heading>
          <Text fontSize="lg">
            Experience your website through different accessibility simulations
          </Text>
        </Box>

        <Box>
          <FormControl>
            <FormLabel>Enter Website URL</FormLabel>
            <HStack>
              <Input
                value={localUrl}
                onChange={handleUrlChange}
                placeholder="https://example.com"
                size="md"
              />
              <Button onClick={handleUrlSubmit} colorScheme="blue">
                Load
              </Button>
            </HStack>
          </FormControl>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={4}>
            Select Simulation Type
          </Heading>
          <Tabs
            variant="enclosed"
            onChange={(index) => {
              const simulationTypes = [
                "colorBlindness",
                "keyboardNavigation",
                "screenReader",
                "lowVision",
              ];
              handleSimulationChange(
                index === 4 ? null : simulationTypes[index]
              );
            }}
            index={
              currentSimulation
                ? [
                    "colorBlindness",
                    "keyboardNavigation",
                    "screenReader",
                    "lowVision",
                  ].indexOf(currentSimulation)
                : 4
            }
          >
            <TabList>
              <Tab>Color Blindness</Tab>
              <Tab>Keyboard Navigation</Tab>
              <Tab>Screen Reader</Tab>
              <Tab>Low Vision</Tab>
              <Tab>None</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {currentSimulation === "colorBlindness" &&
                  renderSimulationControls()}
              </TabPanel>
              <TabPanel>
                {currentSimulation === "keyboardNavigation" &&
                  renderSimulationControls()}
              </TabPanel>
              <TabPanel>
                {currentSimulation === "screenReader" &&
                  renderSimulationControls()}
              </TabPanel>
              <TabPanel>
                {currentSimulation === "lowVision" &&
                  renderSimulationControls()}
              </TabPanel>
              <TabPanel>
                <Box p={4} textAlign="center">
                  <Text>No simulation active</Text>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={4}>
            Simulation Preview
          </Heading>
          <Box
            border="1px"
            borderColor="gray.200"
            borderRadius="md"
            minH="400px"
            display="flex"
            flexDirection="column"
            overflow="hidden"
            position="relative"
          >
            {/* Display simulation status bar when active */}
            {currentSimulation && (urlInput.url || useDemoContent) && (
              <Box
                bg="blue.500"
                color="white"
                py={2}
                px={4}
                width="100%"
                textAlign="center"
              >
                <Text fontWeight="bold">
                  Active Simulation:{" "}
                  {currentSimulation === "colorBlindness"
                    ? `Color Blindness (${colorBlindnessType})`
                    : currentSimulation === "keyboardNavigation"
                    ? "Keyboard Navigation"
                    : currentSimulation === "screenReader"
                    ? "Screen Reader"
                    : currentSimulation === "lowVision"
                    ? "Low Vision"
                    : ""}
                </Text>
              </Box>
            )}

            {urlInput.url || useDemoContent ? (
              <Box width="100%" height="100%" position="relative" flex="1">
                {useDemoContent ? (
                  <Box width="100%" height="100%">
                    {currentSimulation === "screenReader" &&
                      screenReaderActive && <ScreenReaderOverlay />}
                    <DemoContent />
                  </Box>
                ) : (
                  <>
                    {currentSimulation === "screenReader" &&
                      screenReaderActive && <ScreenReaderOverlay />}
                    {iframeError ? (
                      <Box
                        width="100%"
                        height="100%"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        bg="gray.100"
                        p={8}
                        textAlign="center"
                      >
                        <Heading size="md" mb={4} color="red.500">
                          Unable to Load Website
                        </Heading>
                        <Text mb={3}>
                          The website could not be embedded due to cross-origin
                          restrictions.
                        </Text>
                        <Text mb={5}>
                          Many websites prevent embedding in iframes for
                          security reasons.
                        </Text>
                        <Button
                          colorScheme="blue"
                          onClick={() => setUseDemoContent(true)}
                          mb={5}
                          size="lg"
                        >
                          Use Demo Content Instead
                        </Button>
                        <Text fontSize="sm" color="gray.600">
                          For a full-featured experience, a browser extension
                          would be required to bypass these limitations.
                        </Text>
                      </Box>
                    ) : (
                      <iframe
                        src={urlInput.url}
                        title="Website Preview"
                        width="100%"
                        height="500px"
                        style={{
                          border: "none",
                          borderRadius: "4px",
                          backgroundColor: "#fff",
                        }}
                        sandbox="allow-same-origin allow-scripts"
                        onError={handleIframeError}
                        onLoad={(e) => {
                          // Always attempt to access contentDocument to detect if cross-origin blocked
                          try {
                            const iframe = e.target as HTMLIFrameElement;
                            // Try to access the content document - will throw if blocked
                            const doc =
                              iframe.contentDocument ||
                              iframe.contentWindow?.document;

                            // If we can access the document, we're good
                            if (doc) {
                              setIframeError(false);
                            } else {
                              setIframeError(true);
                            }
                          } catch (err) {
                            // Cross-origin error occurred
                            console.error(
                              "Cross-origin frame access denied:",
                              err
                            );
                            setIframeError(true);
                          }
                        }}
                      />
                    )}
                  </>
                )}
              </Box>
            ) : (
              <VStack
                spacing={6}
                width="100%"
                p={10}
                justifyContent="center"
                flex="1"
              >
                <Text fontSize="lg">Enter a URL above to begin simulation</Text>
                <HStack spacing={4}>
                  <Button
                    colorScheme="blue"
                    onClick={() => {
                      setUrl("https://example.com");
                    }}
                  >
                    Try Example.com
                  </Button>
                  <Button
                    colorScheme="green"
                    onClick={() => {
                      setUrl("demo");
                      setUseDemoContent(true);
                    }}
                  >
                    Use Interactive Demo Content
                  </Button>
                </HStack>
                <Text fontSize="sm" color="gray.500">
                  Note: Many websites block embedding in iframes. The demo
                  content provides the best experience.
                </Text>
              </VStack>
            )}
          </Box>
        </Box>
      </VStack>
    </Container>
  );
};

export default SimulationPage;
