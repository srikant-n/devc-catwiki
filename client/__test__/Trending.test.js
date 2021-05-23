import React from "react";
import { render } from "@testing-library/react";
import regeneratorRuntime from "regenerator-runtime";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import axios from "axios";
import Trending from "../src/components/Trending";

jest.mock("axios");

describe("Trending section tests", () => {
  const data = {
    data: [
      { id: "1", image: "https://www.petshopsuk.co.uk/images/cat/390/cats.jpg", name: "Cat 1" },
      {
        id: "2",
        image: "http://www.wildcatconservation.org/wp-content/uploads/2013/08/i-5nwvBhL-Th.jpg",
        name: "Cat 2",
      },
      {
        id: " 3",
        image:
          "https://4.bp.blogspot.com/-E6aefZTMgSI/UYRf2zi4hyI/AAAAAAAABIw/Bjyi7Hmfja4/s1600/CatShowingTeeth.jpg",
        name: "Cat 3",
      },
      {
        id: "4",
        image: "https://www.petshopsuk.co.uk/images/cat/380/cats.jpg",
        name: "Cat 4",
      },
      {
        id: "5",
        image: "https://www.petshopsuk.co.uk/images/cat/370/cats.jpg",
        name: "Cat 5",
      },
    ],
  };

  test("images and names for given 2 cats should be visible", async () => {
    const onClickTopCats = jest.fn();
    const onClickCat = jest.fn((id) => {});

    axios.get.mockImplementationOnce(() => Promise.resolve({ data: data.data.slice(0, 2) }));

    const { getByText, findByText, findByAltText } = render(
      <Trending onClickTopCats={onClickTopCats} onClickCat={onClickCat} />,
    );

    expect(await findByText("Most Searched Breeds")).toBeInTheDocument();

    // Cat 1 image and name
    const cat1image = await findByAltText(data.data[0].name);
    expect(cat1image).toBeInTheDocument();
    expect(getByText(data.data[0].name)).toBeInTheDocument();

    // Cat 2 image and name
    const cat2image = await findByAltText(data.data[1].name);
    expect(cat2image).toBeInTheDocument();
    expect(getByText(data.data[1].name)).toBeInTheDocument();
  });

  test("5th image is not rendered", async () => {
    const onClickTopCats = jest.fn();
    const onClickCat = jest.fn((id) => {});

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    const { getByText, findByText, queryByText, queryByAltText, findByAltText } = render(
      <Trending onClickTopCats={onClickTopCats} onClickCat={onClickCat} />,
    );

    expect(await findByText("Most Searched Breeds")).toBeInTheDocument();

    // Cat 4 image and name
    const cat4image = await findByAltText(data.data[3].name);
    expect(cat4image).toBeInTheDocument();
    expect(getByText(data.data[3].name)).toBeInTheDocument();

    // Cat 5 image and name
    expect(queryByAltText(data.data[4].name)).not.toBeInTheDocument();
    expect(queryByText(data.data[4].name)).not.toBeInTheDocument();
  });

  test("Clicking on cat triggers function with id and see more triggers top cats", async () => {
    const onClickTopCats = jest.fn();
    const onClickCat = jest.fn((id) => {});

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    const { getByText, findByAltText } = render(
      <Trending onClickTopCats={onClickTopCats} onClickCat={onClickCat} />,
    );

    // click on cat and get callback with id
    const catimage = await findByAltText(data.data[0].name);
    userEvent.click(catimage);
    expect(onClickCat.mock.calls.length).toBe(1);
    expect(onClickCat.mock.calls[0][0]).toBe(data.data[0].id);
    
    // See more callback
    userEvent.click(getByText("See More →"));
    expect(onClickTopCats.mock.calls.length).toBe(1);
  });

  test("nothing is rendered when empty result is obtained", async () => {
    const onClickTopCats = jest.fn();
    const onClickCat = jest.fn((id) => {});

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    const { queryByText } = render(
      <Trending onClickTopCats={onClickTopCats} onClickCat={onClickCat} />,
    );

    expect(queryByText("Most Searched Breeds")).not.toBeInTheDocument();
  });
});
