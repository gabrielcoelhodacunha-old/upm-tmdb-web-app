import { createGlobalStyle } from 'styled-components';

const black = '#0e0e0e';

const GlobalStyle = createGlobalStyle`

  * {
    margin: 5px;
    padding: 5px;
    text-align: center;
    background-color: ${black};
    color: white;
    border-color: white;
    border-radius: 4px;
  }

  :disabled {
    background-color: grey;
    color: lightgray;
    border-color: grey;
  }

  input, textarea {
    text-align: left;
    resize: none;
    width: 10rem;
  }

  table {
    margin: 0 auto;
    border-spacing: 0;
    border-collapse: 0;
    table-layout: fixed;
    width: 100%;
  }

  th, td {
    border-bottom: 1px outset white;
    border-radius: 0;
    overflow-wrap: break-word;
  }

  select {
    max-width: 100%;
  }

  img {
    height: 40vw;
    max-height: 500px;
    border-radius: 10px;
  }

  form {
    margin: 0px;
    padding: 0px;
  }
`;

export default GlobalStyle;
