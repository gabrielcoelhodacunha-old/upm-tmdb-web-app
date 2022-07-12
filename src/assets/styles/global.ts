import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --black: #0e0e0e;
  }

  * {
    margin: 5px;
    padding: 5px;
    text-align: center;
    background-color: var(--black);
    color: white;
    border-color: white;
    border-radius: 4px;
  }

  :disabled {
    background-color: grey;
    color: lightgray;
    border-color: grey;
  }

  input,
  textarea {
    text-align: left;
    resize: none;
    width: 10rem;
  }

  table {
    margin: 0 auto;
    border-spacing: 0;
    border-collapse: 0;
  }

  img {
    height: 40vh;
    border-radius: 10px;
  }
`;

export default GlobalStyle;
