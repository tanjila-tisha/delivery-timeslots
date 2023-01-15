import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DeliveryOptions from "./components/DeliveryOptions";
import Confirmation from "./components/Confirmation";
import Box from "@mui/material/Box";

function App() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box>
        <Router>
          <Routes>
            <Route path="/confirmation" element={<Confirmation />}></Route>
            <Route path="/" element={<DeliveryOptions />}></Route>
          </Routes>
        </Router>
      </Box>
    </Box>
  );
}

export default App;
