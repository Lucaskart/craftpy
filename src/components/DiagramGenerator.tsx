import React from 'react';
import { Box, Container, Grid, Flex, TextArea } from '@radix-ui/themes';

function DiagramGenerator() {


    return (
        <Box p="3" width="100%">
            <Grid columns="2" gap="5">
                <Flex>
                    <TextArea color="gray" size="3" variant="soft" placeholder="Insert code in Python." />
                </Flex>
            </Grid>
        </Box>
    );
  }
  
  export default DiagramGenerator