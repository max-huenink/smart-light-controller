import './App.css';
import Container from 'react-bootstrap/Container';
import Home from './components/Home';
import NavMenu from './components/NavMenu';

function App() {
  return (<>
    <NavMenu />
    <Container>
      <Home />
    </Container>
  </>
  );
}

export default App;
