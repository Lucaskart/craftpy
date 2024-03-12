import { Grid, Flex } from '@radix-ui/themes';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import DiagramGenerator from "./components/DiagramGenerator";
import Help from './components/Help';
import Examples from './components/Examples';

function App() {


  return (
  <Grid columns="1">
    <Flex direction="column" gap="3">
      <BrowserRouter>
        <Routes>
          <Route path="/py2uml" element={<NavigationBar />}>
            <Route index element={<DiagramGenerator />} />
            <Route path="/py2uml/help" element={<Help />} />
            <Route path="/py2uml/examples" element={<Examples />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Flex>
  </Grid>
  );
}

export default App
