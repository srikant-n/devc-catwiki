import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import heroImgW625 from "../images/HeroImagesm.png";
import heroImgW1248 from "../images/HeroImagemd.png";
import heroImgW1873 from "../images/HeroImagelg.png";
import { ReactComponent as LogoSvg } from "../images/CatwikiLogo.svg";
import SearchBar from "./SearchBar";

/**
 * Main background container
 */
const Container = styled.div`
  padding: 21px 50% 24px 29px;
  box-sizing: border-box;
  width: 100%;
  border-radius: 42px 42px 0 0;
  background: black url(${heroImgW625}) no-repeat right;
  background-size: contain;

  @media (min-width: 700px) {
    padding: 5% 50% 8% 3%;
    background-image: url(${heroImgW1248});
  }

  @media (min-width: 1200px) {
    padding: 7% 50% 9% 5%;
  }

  @media (min-width: 1500px) {
    padding: 115px 50% 145px 108px;
    background-image: url(${heroImgW1873});
  }
`;

/**
 * Logo inside the search section on mobile screens
 */
const LogoMobile = styled.div.attrs(() => ({
  children: [
    LogoSvg && (
      <LogoSvg key="logo-text" fill="white" width="46" height="19" viewBox="20 10 40 33" />
    ),
  ],
}))`
  width: 46px;
  height: 19px;

  @media (min-width: 700px) {
    display: none;
  }
`;

/**
 * Logo inside the search section
 */
const Logo = styled.div.attrs(() => ({
  children: [
    LogoSvg && (
      <LogoSvg key="logo-text" fill="white" width="230" height="87" viewBox="0 0 128 43" />
    ),
  ],
}))`
  display: none;
  width: 230px;
  height: 87px;

  @media (min-width: 700px) {
    display: block;
  }
`;

/**
 * Page intro
 */
const Intro = styled.p`
  font-size: 10px;
  color: white;
  margin: 7px 0 18px 0;
  font-weight: 500;

  @media (min-width: 700px) {
    font-size: 18px;
    margin: 11px 0 24px 0;
  }

  @media (min-width: 900px) {
    font-size: 24px;
    margin: 11px 0 52px 0;
  }
`;

/**
 * Search section with search box
 * @returns Search section with some info and a search box
 */
function Search({ onClickResult }) {
  return (
    <Container>
      <LogoMobile />
      <Logo />
      <Intro>Get to know more about your cat breed</Intro>
      <SearchBar onClickResult={onClickResult} />
    </Container>
  );
}

Search.propTypes = {
  onClickResult: PropTypes.func.isRequired,
};

export default Search;
