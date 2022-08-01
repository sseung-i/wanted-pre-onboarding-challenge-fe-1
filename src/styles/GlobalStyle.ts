import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * { 
  box-sizing: border-box;
}

body {
  font-size: 14px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  margin: 0;
}

button {
  background: none;
  border: none;
  cursor: pointer;
}

  `;

export default GlobalStyle;
