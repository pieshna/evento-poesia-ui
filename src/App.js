import logo from './logo.svg';
import './App.css';
import {useRoutes} from 'react-router-dom';
import Routes from './Routes/Routes';
import Navbar from './NavBar';

function App() {
  const routeResult = useRoutes(Routes);
  return (
    <div className='min-h-screen bg-Peach flex flex-col'>
      <Navbar />
    {routeResult}
    </div>
  );
}

export default App;
