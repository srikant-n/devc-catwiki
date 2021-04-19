import React from "react";
import TestRenderer from "react-test-renderer";
import Search from "../../client/src/components/Search";

describe("Search section tests", () => {
  test("renders correctly", () => {
    const tree = TestRenderer.create(<Search onClickResult={jest.fn}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
