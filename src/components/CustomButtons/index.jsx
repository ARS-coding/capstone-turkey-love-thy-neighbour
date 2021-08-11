import styled from "styled-components";

const BaseButton = styled.button`
  border: none;
  border-radius: 5px;
  color: var(--white);
`;

/* eslint-disable import/prefer-default-export */
// I had to disable the next line's import/prefer-default-export rule because since in this version we just have one export it keeps telling me that I should export it with default
export const CTAButton = styled(BaseButton)`
  background-color: var(--dark-blue);
  padding: 13px 65px;
  margin-top: 13px;
`;
