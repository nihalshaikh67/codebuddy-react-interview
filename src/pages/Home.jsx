import Container from 'react-bootstrap/Container';
import Wizard from '../components/forms/wizard';

const Home = () => (
  <main>
    <h1 className="text-center mb-5">Sign Up</h1>
    <Container>
      <Wizard />
    </Container>
  </main>
);
export default Home;
