import { Box, Container } from '@mui/material';
import ChildrenList from './components/ChildrenList';

const App = () => (
  <Container maxWidth="lg">
    <Box m={6}>
      <ChildrenList />
    </Box>
  </Container>
);

export default App;
