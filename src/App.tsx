import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Home from "./components/Home";
import Help from './components/Help';
import Examples from './components/Examples';

function App() {
  document.documentElement.lang = 'pt-BR';

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/craftpy" element={<NavigationBar />}>
          <Route index element={<Home />} />
          <Route path="/craftpy/help" element={<Help />} />
          <Route path="/craftpy/examples" element={<Examples />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
