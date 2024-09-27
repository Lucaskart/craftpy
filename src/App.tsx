import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Home from "./components/Home";
import Help from './components/Help';
import Examples from './components/Examples';

function App() {
  document.documentElement.lang = 'pt-BR';

  return (
    /*  <div className="max-h-screen p-4  bg-red-800 flex flex-col"> */
    <div className="h-screen flex flex-col overflow-hidden">
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route index path="/craftpy" element={<Home />} />
          <Route path="/craftpy/help" element={<Help />} />
          <Route path="/craftpy/examples" element={<Examples />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
