import styled from "styled-components";

/**
 * Main background container
 */
const PaddedContainer = styled.div`
  padding: 11px 19px 14px 19px;
  box-sizing: border-box;
  width: 100%;
  border-radius: 21px;
  background-size: contain;

  @media (min-width: 400px) {
    padding: 21px 29px 24px 29px;
  }

  @media (min-width: 700px) {
    padding: 2% 3% 5% 3%;
    border-radius: 42px;
  }

  @media (min-width: 1200px) {
    padding: 3% 5% 7% 5%;
  }

  @media (min-width: 1500px) {
    padding: 45px 108px 100px 108px;
  }
`;

export default PaddedContainer;
