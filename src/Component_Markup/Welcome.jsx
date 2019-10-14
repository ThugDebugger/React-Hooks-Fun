import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import useStyles from "./Styles";

export default function WelcomeScreen() {
  const style = useStyles();
  return (
    <div className={style.center}>
      <h1>Welcome to the Trivia Challenge</h1>
      <h2>You will be presented with 10 true or false questions</h2>
      <h3>Can you score 100%</h3>
      <Link to="/questions/">
        <Button variant="contained" color="primary">
          Lets Begin!
        </Button>
      </Link>
    </div>
  );
}
