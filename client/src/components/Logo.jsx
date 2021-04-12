import React from "react";
import styled from "styled-components";
import { ReactComponent as LogoSvg } from "../images/CatwikiLogo.svg";

/**
 * Logo
 */
const Logo = styled.div.attrs((props) => ({
  children: [<LogoSvg key="logo" fill={props.color ? props.color : "black"} />],
}))`
  width: 128px;
  height: 43px;
  margin: 12px 0;
`;

export default Logo;
