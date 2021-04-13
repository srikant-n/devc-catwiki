import React from "react";
import styled from "styled-components";
import { ReactComponent as SearchSvg } from "../images/SearchIcon.svg";

/**
 * Div holder for the search bar
 */
const SearchDiv = styled.div`
  position: relative;
  width: 75%;
  box-sizing: border-box;
`;

/**
 * Search box for non mobile screens
 */
const SearchBox = styled.input.attrs(() => ({ type: "search", placeholder: "Enter your breed" }))`
  display: none;
  min-height: 30px;
  border-radius: 59px;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;

  @media (min-width: 700px) {
    display: block;
  }
`;

/**
 * Search button for mobile screen
 */
const SearchButton = styled.input.attrs(() => ({ type: "button", value: "Search" }))`
  display: block;
  min-height: 30px;
  border-radius: 59px;
  width: 100%;
  box-sizing: border-box;
  padding: 13px 8px;
  text-align: left;

  @media (min-width: 700px) {
    display: none;
  }
`;

/**
 * Search Icon
 */
const SearchIcon = styled.div.attrs(() => ({
  children: [<SearchSvg key="search-icon" width="17" height="17" viewBox="0 0 24 24" />],
}))`
  position: absolute;
  right: 10px;
  top: 15px;

  @media (min-width: 700px) {
    right: 15px;
  }
`;

/**
 * Search section with search box
 * @returns Search section with some info and a search box
 */
function SearchBar() {
  return (
    <SearchDiv>
      <SearchBox />
      <SearchButton />
      <SearchIcon />
    </SearchDiv>
  );
}

export default SearchBar;
