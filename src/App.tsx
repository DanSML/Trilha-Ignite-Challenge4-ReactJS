import { BrowserRouter as Router } from 'react-router-dom';

import { GlobalStyle } from './styles/global';

import {Routes} from './routes';
import { FoodContextProvider } from './Contexts/FoodContext';

function App() {
  return (
    <>
      <GlobalStyle/>
      <Router>
        <FoodContextProvider>
          <Routes/>
        </FoodContextProvider>
      </Router>
    </>
  )
}

export {App};
