import Enzyme from "enzyme";
import React from "react";
import { mount, shallow } from "enzyme";
import AppRouter from './index';

describe(`initial data`, ()=> {
    it(`should initilize the data structure in Context`, () => {
        const dispatch = jest.fn();
        const container = shallow(<AppRouter/>);
        const expected = { points: 0, incorrect: [], correct: [], questions: [], count: 0 };
        let given = container.find(`ContextProvider`).props().value.state;
        expect(given).toEqual(expected)

    });
})