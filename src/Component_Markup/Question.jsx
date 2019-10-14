import React from "react";
import { Redirect } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import redux from "../Redux";
import createMarkup from "../utils/createMarkup";
import useStyles from "./Styles";

export default function Question(props) {
  const style = useStyles();
  if (props.state.questions.length === 0) {
    return loadingQuestions();
  }
  let { question, category, correct_answer, difficulty } =
    props.state.count < 10 && props.state.questions[props.state.count];
  let buttonText = [
    { value: "True", class: "primary" },
    { value: "False", class: "secondary" }
  ];
  const {
    actionHandlers: { actionCreators }
  } = redux;

  return (
    <div className={style.center}>
      <Card className={`${style.card} ${style.center}`}>
        {props.state.count > 9 ? <Redirect to="/results" /> : null}
        <CardContent>
          <Typography
            className={style.title}
            color="textSecondary"
            gutterBottom
          >
            Category
          </Typography>
          <Typography variant="h5" component="h2">
            {category}
          </Typography>
          <Typography className={style.pos} color="textSecondary">
            difficulty: {difficulty}
          </Typography>
          {createMarkup(Typography, { question, variant: "body2" })}
        </CardContent>
        <CardActions>
          {buttonText.map(selectedAnswer => (
            <Button
              key={selectedAnswer.class}
              variant="contained"
              color={selectedAnswer.class}
              className={style.button}
              onClick={() =>
                props.dispatch(
                  actionCreators.record(
                    question,
                    correct_answer,
                    selectedAnswer.value
                  )
                )
              }
            >
              {selectedAnswer.value}
            </Button>
          ))}
        </CardActions>
      </Card>
    </div>
  );
}

function loadingQuestions() {
  return <strong>Loading Questions</strong>;
}
