import React from "react";
import styled from "styled-components";
import Logo from "./components/Logo";
import Search from "./components/Search";

const Margin = styled.div`
  font-family: "Montserrat", sans-serif;
  margin: 0 18px;
`;

function App() {
  return (
    <Margin>
      <Logo color="black" />
      <Search />
    </Margin>
  );
}

export default App;
