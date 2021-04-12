import React from "react";
import styled from "styled-components";
import Logo from "./components/Logo";

const Margin = styled.div`
  margin: 0 18px;
`;

function App() {
  return (
    <Margin>
      <Logo color="black" />
    </Margin>
  );
}

export default App;
