import React from "react";
import styled from "styled-components";
import Logo from "./components/Logo";
import Search from "./components/Search";
import Trending from "./components/Trending";

const Margin = styled.div`
  font-family: "Montserrat", sans-serif;
  margin: 0 18px;
`;

function App() {
  /**
   * Open page for the given breed id.
   * @param {string} id Breed Id.
   */
  function openCatBreedPage(id) {
    // TODO: page change
  }

  function openTopCatsPage() {
    // TODO: page change
  }

  return (
    <Margin>
      <Logo color="black" />
      <Search onClickResult={openCatBreedPage} />
      <Trending onClickCat={openCatBreedPage} onClickTopCats={openTopCatsPage} />
    </Margin>
  );
}

export default App;
