import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Image from "./Image";
import PaddedContainer from "./PaddedContainer";
import { getTopCats } from "../api";

/**
 * Main container div.
 */
const Container = styled(PaddedContainer)`
  background-color: #e3e1dc;
  border-radius: 0 0 42px 42px;
`;

/**
 * Heading text.
 */
const Heading = styled.h3.attrs()`
  font-size: 12px;
  font-weight: 500;
  text-align: left;
  color: #291507;
  margin-bottom: 5px;

  @media (min-width: 700px) {
    font-size: 14px;
  }

  @media (min-width: 900px) {
    font-size: 18px;
    margin-bottom: 8px;
  }
`;
/**
 * Underline after the heading.
 */
const HeadingUnderline = styled.hr`
  width: 59px;
  border-top: 1px solid #4d270c;
  margin: 0;

  @media (min-width: 900px) {
    border-top: 3px solid #4d270c;
  }
`;

/**
 * Info and "See more" container.
 */
const InfoContainer = styled.div`
  margin-top: 2%;
  margin-bottom: 3%;
  padding: 0;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;

  @media (min-width: 1500px) {
    margin-top: 36px;
    margin-bottom: 46px;
  }
`;

/**
 * Info text.
 */
const Info = styled.p`
  font-size: 18px;
  margin: 0;
  padding: 0;
  color: #291507;
  font-weight: 700;
  max-width: 70%;

  @media (min-width: 700px) {
    font-size: 21px;
  }

  @media (min-width: 900px) {
    font-size: 30px;
  }

  @media (min-width: 1200px) {
    font-size: 48px;
  }
`;

/**
 * Button to open the top cats page.
 */
const TopCatsButton = styled.button`
  position: absolute;
  right: 0;
  color: rgba(41, 21, 7, 0.6);
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 5px;
  background-color: transparent;
  outline: none;
  border: none;

  @media (min-width: 900px) {
    font-size: 18px;
    margin-bottom: 12px;
  }
`;

/**
 * Container for cat images.
 */
const CatImagesContainer = styled.div`
  /* overflow: hidden; */
  gap: 2.5vw;
  max-height: 530px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (min-width: 700px) {
    flex-wrap: nowrap;
  }
`;

const CatName = styled.p`
  color: #291507;
  font-weight: 600;
  font-size: 12px;
  position: absolute;
  left: 4px;
  bottom: -12px;

  @media (min-width: 700px) {
    font-size: 14px;
    bottom: -14px;
  }

  @media (min-width: 900px) {
    font-size: 16px;
    bottom: -18px;
  }

  @media (min-width: 1200px) {
    font-size: 18px;
    bottom: -22px;
  }
`;

const CatImageAndName = styled.div.attrs((props) => ({
  children: [
    <Image key={`img${props.key}`} src={props.src} alt={props.name} />,
    <CatName key={`name${props.key}`}>{props.name}</CatName>,
  ],
}))`
  position: relative;
  padding-bottom: 24px;
  width: 35vw;
  height: 35vw;
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  @media (min-width: 700px) {
    width: 15vw;
    height: 15vw;
  }
`;

function Trending({ onClickTopCats, onClickCat }) {
  const [topCats, setTopCats] = useState([]);

  /**
   * Get top cats to display images and name.
   * Called only on once.
   */
  useEffect(() => {
    getTopCats().then((data) => setTopCats(data));
  }, []);

  /**
   * Display up to 4 cat images.
   * @returns Components to display cat images with name.
   */
  function getCatImages() {
    return topCats
      .slice(0, 4)
      .map((cat) => (
        <CatImageAndName
          key={cat.id}
          src={cat.image}
          name={cat.name}
          onClick={() => onClickCat(cat.id)}
        />
      ));
  }
  // Render only if there are any top cats to show
  return topCats.length > 0 ? (
    <Container>
      <Heading>Most Searched Breeds</Heading>
      <HeadingUnderline />
      <InfoContainer>
        <Info>66+ Breeds For you to discover</Info>
        <TopCatsButton onClick={onClickTopCats}>See More &rarr;</TopCatsButton>
      </InfoContainer>
      <CatImagesContainer>{getCatImages()}</CatImagesContainer>
    </Container>
  ) : (
    <></>
  );
}

Trending.propTypes = {
  onClickCat: PropTypes.func.isRequired,
  onClickTopCats: PropTypes.func.isRequired,
};

export default Trending;
