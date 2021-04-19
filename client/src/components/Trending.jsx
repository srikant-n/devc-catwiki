import React from "react";
import styled from "styled-components";
import PaddedContainer from "./PaddedContainer";

/**
 * Main container div
 */
const Container = styled(PaddedContainer)`
  background-color: #e3e1dc;
  border-radius: 0 0 42px 42px;
`;


function Trending() {
  return <Container></Container>;
}

export default Trending;
