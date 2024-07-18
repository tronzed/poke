import Home from './Components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Single from './Components/Single';
import NotFound from './Components/NotFound';
import CreateBox from './Components/CreateBox';
import ListBox from './Components/ListBox';
import EditBox from './Components/EditBox';

function App() {
  return (
    <div className="App">

      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />  
          </Route>
          <Route path='/single/:id'>
            <Single />
          </Route>

          <Route path="/create" component={CreateBox}/>

          <Route path="/edit/:id" component={EditBox}/>

          <Route path='/list' component={ListBox} />            

          <Route path="*" component={NotFound} />

        </Switch>
      </Router>

    </div>
  );
}

export default App;
