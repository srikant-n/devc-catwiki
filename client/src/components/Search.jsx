import React from "react";
import styled from "styled-components";
import heroImg from "../images/HeroImagesm.png";
import { ReactComponent as LogoSvg } from "../images/CatwikiLogo.svg";

/**
 * Main background container
 */
const Container = styled.div`
  padding: 21px 29px;
  box-sizing: border-box;
  width: 100%;
  min-height: 100px;
  border-radius: 42px 42px 0 0;
  background: black url(${heroImg}) no-repeat right;
  background-size: contain;
`;

const Logo = styled.div.attrs(() => ({
  children: [<LogoSvg key="logo-text" fill="white" width="46" height="19" viewBox="20 10 40 33" />],
}))`
  width: 46px;
  height: 19px;
  /* margin: 12px 0; */
`;

function Search() {
  return (
    <Container>
      <Logo />
    </Container>
  );
}

export default Search;
