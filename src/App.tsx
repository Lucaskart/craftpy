import DiagramGenerator from "./components/DiagramGenerator";
import { Grid, Flex } from '@radix-ui/themes';

function App() {


  return (
    <Grid columns="1">
      <Flex direction="column" gap="3">
        <DiagramGenerator />
      </Flex>
    </Grid>
  );
}

export default App
