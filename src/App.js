import logo from './logo.svg';
import './App.css';
import {useRoutes} from 'react-router-dom';
import Routes from './Routes/Routes';

function App() {
  const routeResult = useRoutes(Routes);
  return (
    <>
    {routeResult}
    </>
  );
}

export default App;
