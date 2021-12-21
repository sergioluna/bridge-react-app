import Navbar from './components/Navbar';
import Home from './pages/Home';
import Events from './pages/Events';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
