import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../pages/home/index';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;