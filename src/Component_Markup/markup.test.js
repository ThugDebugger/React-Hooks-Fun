import Enzyme from "enzyme";
import React from "react";
import { shallow, mount } from "enzyme";
import Question from "./Question";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";


let mockState = {
  questions: [
    {
      category: "Entertainment: Video Games",
      correct_answer: "True",
      difficulty: "hard",
      incorrect_answers: ["False"],
      question:
        "The retail disc of Tony Hawk&#039;s Pro Skater 5 only comes with the tutorial.",
      type: "boolean"
    }
  ],
  count: 0
};

describe("Questions View", () => {
  it("should Render", () => {
    shallow(<Question state = {mockState} />);
  });

  it("Should render a loader while loading questions", () => {
      let noQuestions = {...mockState, questions: []}
      const container = shallow(<Question state={noQuestions} />);
      expect(container.find(`strong`).length).toEqual(1);
  })

  it("should have two answer buttons", () => {
    const container = shallow(<Question state={mockState} />);
    expect(container.find(Button).length).toEqual(2);
  });

  it("should have one true button", () => {
    const container = shallow(<Question state={mockState} />);
    expect(
      container
        .find(Button)
        .at(0)
        .text()
    ).toEqual("True");
  });

  it(`Should display one question`, () => {
    const container = shallow(<Question state={mockState} />);
    expect(
      container
        .find(Typography)
        .at(3)
        .props()
    ).toEqual({
      dangerouslySetInnerHTML: {
        __html:
          "The retail disc of Tony Hawk&#039;s Pro Skater 5 only comes with the tutorial."
      },
      question:
        "The retail disc of Tony Hawk&#039;s Pro Skater 5 only comes with the tutorial.",
      variant: "body2"
    });
  });

  it(`Should display one category`, () => {
    const container = shallow(<Question state={mockState} />);
    expect(
      container
        .find(Typography)
        .at(2)
        .props()
    ).toEqual({
      children: ["difficulty: ", "hard"],
      className: "makeStyles-pos-4",
      color: "textSecondary"
    });
  });
});

describe("Questions Actions", () => { 
    it('should handle selecting True', () => {
        const dispatch = jest.fn();
        const container = shallow(<Question state = {mockState} dispatch = {dispatch} />);
        container.find(Button).at(0).simulate(`click`);
        expect(dispatch).toHaveBeenCalledTimes(1);
    })
    it('should handle selecting True w/ correct response from user', () => {
        const dispatch = jest.fn();
        const expectResult = {"chosenAnswer": "True", "correct_answer": "True", "question": "The retail disc of Tony Hawk&#039;s Pro Skater 5 only comes with the tutorial.", "type": "RECORD"};
        const container = shallow(<Question state = {mockState} dispatch = {dispatch} />);
        container.find(Button).at(0).simulate(`click`);
        expect(dispatch).toHaveBeenCalledWith(expectResult);
    })
});