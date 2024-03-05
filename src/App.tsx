import DiagramGenerator from "./components/DiagramGenerator";
import NavigationBar from "./components/NavigationBar";
import { Grid, Flex } from '@radix-ui/themes';

function App() {


  return (
    <Grid columns="1">
      <Flex direction="column" gap="3">
        <NavigationBar />
      </Flex>
      <Flex direction="column" gap="3">
        <DiagramGenerator />
      </Flex>
    </Grid>
  );
}

export default App
