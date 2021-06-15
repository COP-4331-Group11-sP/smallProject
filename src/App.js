import './styles/App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PandaHeader from './components/PandaHeader.js';
import LoginPage from './pages/LoginPage.js';
import RegistrationPage from './pages/RegistrationPage.js';
import ContactPage from './pages/ContactPage.js';

function App() {
  return (
    <>
      <Router basename="/">
        <div className="App">
          <PandaHeader className="toBlur" />
          <Switch>
            <Route exact path="/">
              <LoginPage />
            </Route>
            <Route exact path="/contact">
              <ContactPage />
            </Route>
            <Route exact path="/register">
              <RegistrationPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
