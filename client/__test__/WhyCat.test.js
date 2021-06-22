import React from "react";
import { render } from "@testing-library/react";
import WhyCat from "../src/components/WhyCat";
import "@testing-library/jest-dom";

describe("Test to see if WhyCat component is rendering", () => {
    test("Having a cat... text is rendered", () => {
        const { getByText } = render(<WhyCat />);

        expect(getByText("Having a cat around you can actually trigger the release of calming chemicals in your body which lower your stress and anxiety levels")).toBeInTheDocument();
    });
});