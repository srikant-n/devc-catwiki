import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ReactComponent as SearchSvg } from "../images/SearchIcon.svg";
import { getSearchResults } from "../api";

/**
 * Div holder for the search bar
 */
const SearchDiv = styled.div`
  position: relative;
  width: ${(props) => (props.width ? props.width : "75%")};
  box-sizing: border-box;
`;

const SearchModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
  position: relative;
  background-color: white;
  margin: 20px;
  padding: 78px 18px 18px 18px;
  box-sizing: border-box;
  border-radius: 12px;
`;

/**
 * Search box for non mobile screens
 */
const SearchBox = styled.input.attrs(() => ({ type: "search", placeholder: "Enter your breed" }))`
  display: ${(props) => (props.showInMobile ? props.showInMobile : "none")};
  min-height: 30px;
  border-radius: 59px;
  width: 100%;
  box-sizing: border-box;
  padding: 12px 20px;
  outline: none;

  @media (min-width: 700px) {
    display: block;
  }

  @media (min-width: 900px) {
    padding: 20px;
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
const SearchIcon = styled(SearchSvg ? SearchSvg : SearchDiv)`
  width: 17px;
  height: 17px;
  position: absolute;
  right: 10px;
  top: 15px;

  // Set for modal
  ${SearchBox}+& {
    right: 15px;
  }

  @media (min-width: 900px) {
    top: 21px;
    right: 17px;
    width: 20px;
    height: 20px;
  }
`;

/**
 * Close button displayed in modal
 */
const CloseButton = styled.input.attrs(() => ({ type: "button", value: "X" }))`
  position: absolute;
  top: 7px;
  right: 19px;
  width: 40px;
  height: 40px;
  font-size: 14px;
  background-color: rgba(151, 151, 151, 0.1);
  border: none;
  border-radius: 8px;
`;

/**
 * Div to hide the scroll bar overflowing from rounded components
 */
const SearchResultContainer = styled.div`
  display: ${(props) => (props.showInMobile ? props.showInMobile : "none")};
  border-radius: 24px;
  padding: 0;
  overflow: hidden;
  width: 100%;

  @media (min-width: 700px) {
    position: absolute;
    margin-top: 17px;
  }
`;

/**
 * Container for displaying search results
 */
const SearchResults = styled.div`
  /* border-radius: 24px; */
  width: 100%;
  max-height: 70vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 18px;
  box-sizing: border-box;
  overflow: auto;

  @media (min-width: 700px) {
    padding: 0 11px;
    max-height: 220px;
  }
`;

/**
 * Component for result item to display search results
 */
const ResultItem = styled.p`
  border-radius: 12px;
  width: 100%;
  /* height: 56px; */
  text-align: left;
  padding: 20px 10px;
  margin: 0;
  &:hover {
    background-color: rgba(151, 151, 151, 0.1);
  }
`;

/**
 * Search section with search box
 * @returns Search section with some info and a search box
 */
function SearchBar(props) {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  /**
   * Fetch results for new search query.
   * @param {Event} event Search query change event.
   */
  function onEnterSearchText(event) {
    setSearch(event.target.value);
    getSearchResults(event.target.value).then((data) => setResults(data));
  }

  /**
   * @returns Result items to display.
   */
  function getResultItems() {
    return (
      results &&
      results.map((result) => (
        <ResultItem key={result.id} onClick={() => props.onClickResult(result.id)}>
          {result.name}
        </ResultItem>
      ))
    );
  }

  return (
    <div>
      <SearchDiv>
        <SearchBox value={search} onChange={onEnterSearchText} aria-label="Search for breed" />
        <SearchButton onClick={() => setShowModal(true)} aria-label="Search button" />
        <SearchIcon />
        {/* Display only if there are results */}
        {results.length > 0 && (
          <SearchResultContainer>
            <SearchResults>{getResultItems()}</SearchResults>
          </SearchResultContainer>
        )}
      </SearchDiv>
      {/* Show modal if button is tapped */}
      {showModal && (
        <SearchModal>
          <ModalContainer>
            <CloseButton onClick={() => setShowModal(false)} />
            <SearchDiv width="100%">
              <SearchBox
                showInMobile
                value={search}
                onChange={onEnterSearchText}
                aria-label="Search for breed"
              />
              <SearchIcon />
            </SearchDiv>
            <SearchResultContainer showInMobile>
              <SearchResults>{getResultItems()}</SearchResults>
            </SearchResultContainer>
          </ModalContainer>
        </SearchModal>
      )}
    </div>
  );
}

SearchBar.propTypes = {
  onClickResult: PropTypes.func.isRequired,
};

export default SearchBar;
