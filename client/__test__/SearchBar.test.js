import React from "react";
import { render } from "@testing-library/react";
import regeneratorRuntime from "regenerator-runtime";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import axios from "axios";
import SearchBar from "../../client/src/components/SearchBar";
import { expect } from "chai";

jest.mock("axios");

describe("Search bar tests", () => {
  test("entered search should return mocked response", async () => {
    const onClickItem = jest.fn((id) => {});

    const { getByLabelText, getByText, findByText } = render(
      <SearchBar onClickResult={onClickItem} />,
    );

    const data = {
      data: [
        { id: "id1", name: "Name 1" },
        { id: "id2", name: "Name 2" },
      ],
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    const input = getByLabelText("Search for breed");
    userEvent.type(input, "b");

    await findByText("Name 1");

    expect(axios.get).toHaveBeenCalledWith("/breeds/search/b");

    expect(getByText("Name 2")).toBeInTheDocument();
  });
});
