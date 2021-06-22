import styled from "styled-components";

/**
 * Main background container
 */
const Flex = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  align-items: ${(props) => props.align || "center"};
  justify-content: ${(props) => props.justify || "space-between"};
  gap: ${(props) => props.gap || 0};
`;

export default Flex;
