import React from "react";
import styled from "styled-components";
import heroImg from "../images/HeroImagesm.png";
import { ReactComponent as LogoSvg } from "../images/CatwikiLogo.svg";
import SearchBar from "./SearchBar";

/**
 * Main background container
 */
const Container = styled.div`
  padding: 21px 50% 24px 29px;
  box-sizing: border-box;
  width: 100%;
  min-height: 100px;
  border-radius: 42px 42px 0 0;
  background: black url(${heroImg}) no-repeat right;
  background-size: contain;
`;

/**
 * Logo inside the search section
 */
const Logo = styled.div.attrs(() => ({
  children: [<LogoSvg key="logo-text" fill="white" width="46" height="19" viewBox="20 10 40 33" />],
}))`
  width: 46px;
  height: 19px;
`;

/**
 * Page intro
 */
const Intro = styled.p`
  font-size: 10px;
  color: white;
  margin: 7px 0 18px 0;
`;

/**
 * Search section with search box
 * @returns Search section with some info and a search box
 */
function Search() {
  return (
    <Container>
      <Logo />
      <Intro>Get to know more about your cat breed</Intro>
      <SearchBar />
    </Container>
  );
}

export default Search;
