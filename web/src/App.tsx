import * as React from "react";
import { Route, Router } from "react-router-dom";
import HistoryManager from "src/singletons/HistoryManager";
import ConfiguredRouter from "./components/Router";

class App extends React.Component {
  public render() {
    return (
      <Router history={HistoryManager.getHistory()}>
        <Route component={ConfiguredRouter} />
      </Router>
    );
  }
}

export default App;
