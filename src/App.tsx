import { Box, Container } from '@mui/material';
import ChildList from './components/ChildList';

const App = () => (
  <Container maxWidth="lg">
    <Box m={6}>
      <ChildList />
    </Box>
  </Container>
);

export default App;
