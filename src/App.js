import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CycloneIcon from '@mui/icons-material/Cyclone';
import { ThemeProvider, createTheme, getContrastRatio } from '@mui/material/styles';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#76bc21',
      contrastText: getContrastRatio('#76bc21', '#fff') > 4.5 ? '#fff' : '#111',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box
          sx={{
            width: 250,
            height: 200,
            boxShadow: 1,
            borderRadius: 2,
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.light',
              opacity: [0.9, 0.8, 0.7],
            }
          }}
        >
          <CycloneIcon sx={{color: 'primary.contrastText', fontSize: 40}} className="App-logo"/>
          <br/>
          <Box sx={{ color: 'primary.contrastText' }}>
            CPU Fan Speed:
            <Box sx={{ color: 'primary.contrastText', fontSize: 34, fontWeight: 'bold' }}>
              <span id="cpu-fan-speed">----</span> rpm.
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
