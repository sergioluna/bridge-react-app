import Navbar from './components/Navbar';

import Home from './pages/Home';
import Registration from './pages/Registration';

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
            <Route path="/registration" element={<Registration />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
