import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * { 
  box-sizing: border-box;
  padding : 0;
  margin: 0;
}

html {
  font-size: 100%;
  font-weight: 400;
  font-family: 'Noto Sans KR', sans-serif;
}

button {
  background: none;
  border: none;
  cursor: pointer;
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
  color: inherit
}

  `;

export default GlobalStyle;
