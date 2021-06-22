import React from "react";
import styled from "styled-components";
import Flex from "./Flex";
import PaddedContainer from "./PaddedContainer";
import image1 from "../images/image 1.png";
import image2 from "../images/image 2.png";
import image3 from "../images/image 3.png";

/**
 * Main container div.
 */
const Container = styled(PaddedContainer)`
  display: flex;
  flex-direction: column;
  gap: 60px;

  @media (min-width: 1200px) {
    flex-direction: row;
  }
`;

const Line = styled.div`
  width: 52px;
  height: 4px;
  border-radius: 77px;
  background-color: #4d270c;
`;

const TextContainer = styled.div`
  max-width: 450px;
`;

const Heading = styled.h2`
  font-size: 40px;
  font-weight: 700;
  line-height: 48px;
`;

const Text = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin: 26px 0;
`;

const ReadMore = styled.a.attrs(() => ({ href: "/why-have-a-cat" }))`
  color: rgba(41, 21, 7, 0.6);
  font-size: 12px;
  font-weight: 700px;
`;

const ImageContainer = styled(Flex)`
  max-width: ${(props) => props.maxWidth || "initial"};
  max-height: 500px;
  gap: 10px;

  @media (min-width: 400px) {
    gap: 17px;
  }

  @media (min-width: 700px) {
    gap: 27px;
  }
`;

const CatImage = styled.img`
  object-fit: contain;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  max-height: ${(props) => props.maxHeight || "100%"};
  max-width: ${(props) => props.maxWidth || "100%"};
  box-sizing: border-box;

  @media (min-width: 400px) {
    border-radius: 16px;
  }

  @media (min-width: 700px) {
    border-radius: 24px;
  }
`;

function WhyCat() {
  return (
    <Container>
      <div>
        <Line />
        <TextContainer>
          <Heading>Why should you have a cat?</Heading>
          <Text>
            Having a cat around you can actually trigger the release of calming chemicals in your
            body which lower your stress and anxiety levels
          </Text>
          <ReadMore />
        </TextContainer>
      </div>
      {/* Cat images */}
      <ImageContainer maxWidth="600px" align="flex-start" justify="flex-end">
        <ImageContainer maxWidth="274px" column align="flex-end">
          <CatImage src={image2} alt="" maxWidth="274px" maxHeight="168px" />
          <CatImage src={image1} alt="" maxWidth="70%" maxHeight="294px" />
        </ImageContainer>
        <CatImage src={image3} alt="" maxWidth="44%" maxHeight="77%" />
      </ImageContainer>
    </Container>
  );
}

export default WhyCat;
