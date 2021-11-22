import styled from "styled-components";
//CORES ULTILIZADAS
//AZUL CLARO: 65E3F4
//AZUL ESCURO: 1B8998
//PRETO: 2E2D2D
export const Container = styled.div`
  min-height: 100%;
`;

export const Titulo = styled.header`
  display: flex;
  justify-content: center;
`;

export const Principal = styled.main`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const Rodape = styled.footer`
  background-color: #65e3f4;
  color: #3d3d3d;
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2rem;
  text-align: center;
  line-height: 2rem;
`;

export const Logo = styled.figure`
  margin-top: 0.5rem;
`;

export const CadastroContainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  > div {
    width: 80%;
    > label {
      color: #d3d1d1;
      font-family: Fira Code;
    }
    > div {
      input {
        color: #d3d1d1;
        font-family: Fira Code;
      }
    }
  }
  > div,
  button {
    margin-bottom: 1rem;
  }
`;

export const ContainerModal = styled.div`
  background-color: white;
  padding: 2rem;
  height: 53%;
  width: 30%;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > button {
    margin-top: 1rem;
    width: 95%;
  }
  > div {
    width: 95%;
    > label {
      font-family: Fira Code;
    }
    > div {
      input {
        font-family: Fira Code;
      }
    }
  }
`;
