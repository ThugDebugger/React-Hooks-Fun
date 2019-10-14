import React from "react";
import { Link, Redirect } from "react-router-dom";
import redux from "../Redux";
import createMarkup from "../utils/createMarkup";
import useStyles from "./Styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import CheckCircle from "@material-ui/icons/CheckCircle";
import NotInterested from "@material-ui/icons/NotInterested";
import Button from "@material-ui/core/Button";

export default function Result(props) {
  const {
    actionHandlers: { actionCreators }
  } = redux;
  const style = useStyles();

  return (
    <>
      {props.state.points === 0 ? <Redirect to="/" /> : null}
      <div className={style.center}>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="primary" />
            </ListItemIcon>
            <ListItemText style={style.bold} primary="Correct" />
          </ListItem>
          {props.state.correct.map((question, index) => {
            return (
              <ListItem key={index}>
                {" "}
                {createMarkup("strong", {
                  question,
                  className: style.strong
                })}{" "}
              </ListItem>
            );
          })}
          <Divider />
          <ListItem>
            <ListItemIcon>
              <NotInterested color="error" />
            </ListItemIcon>
            <ListItemText style={style.bold} primary="Incorrect" />
          </ListItem>
          {props.state.incorrect.map((question, index) => {
            return (
              <ListItem key={index}>
                {" "}
                {createMarkup("strong", {
                  question,
                  className: style.strong
                })}{" "}
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <Link to="/">
          <Button
            color="primary"
            variant="contained"
            className={style.button}
            onClick={() => props.dispatch(actionCreators.reset())}
          >
            Play again?
          </Button>
        </Link>
      </div>
    </>
  );
}
