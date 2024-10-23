import styled from "styled-components";

const StyledSearchBar = styled.input`
  border-radius: 5px;
  border: none;
  padding: 0.3rem;
  margin: 1rem auto;
  width: 90%;

  @media (min-width: 450px) {
    width: 65%;
  }

  @media (min-width: 600px) {
    width: 60%;
  }
`;

export { StyledSearchBar };
