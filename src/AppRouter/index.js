import React, {useReducer, useEffect, useContext} from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import {WelcomeScreen, Question, Results} from "../Component_Markup";
import redux from "../Redux";

import {initialState} from "../Redux/reducers";

const Context = React.createContext();

function Index() {
  return WelcomeScreen();
}

function Questions() {
  //Context will give us access to both state, and dispatch 
  return Question(useContext(Context));
}

function Result() {
  //Context will give us access to both state, and dispatch 
  return Results(useContext(Context));
}

function AppRouter() {
  const {reducers, actionHandlers: {actionCreators}} = redux;
  const [state, dispatch] = useReducer(reducers.gameReducer, initialState);
  useEffect( () => {
    fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
    .then(response => response.json() )
    .then(response =>  dispatch(actionCreators.loadQuestions(response.results)));
  }, [actionCreators]);
  return (
    <Context.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/questions/" component={Questions} />
          <Route path="/results/" component={Result} />
        </Switch>
      </BrowserRouter>
    </Context.Provider>
  );
}
export default AppRouter;