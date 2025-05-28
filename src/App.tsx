import { ChakraProvider, Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import theme from "./lib/theme";

// Import pages
import Dashboard from "./components/Dashboard";
import SimulationPage from "./components/SimulationPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg="bg.app">
        <NavBar />
        <Box as="main" pt="72px" px={4}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/simulate" element={<SimulationPage />} />
          </Routes>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
