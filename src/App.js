import Navbar from './components/Navbar';

import Home from './pages/Home';
import Registration from './pages/Registration';
import ScoreCalculator from './pages/ScoreCalculator';

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
            <Route path="/score-calculator" element={<ScoreCalculator />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
