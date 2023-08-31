import styled from "styled-components";
import DropDownMenu from "./DropDownMenu/DropDownMenu";
import { useEffect, useState } from "react";
import useAppStore from "./useAppStore";

const Container = styled.div`
  position: fixed;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: rgb(31, 31, 31);
`;

const Header = styled.div`
  color: #fff;
  font-size: 50px;
  padding-bottom: 40px;
`;

const InnerContainer = styled.div`
  justify-content: center;
  gap: 100px;
  display: flex;
  width: 100%;
`;

function requestBackend(id) {
  const url = `http://www.exemlpo/rota/${id}`;
  // fetch(url) ...
  if (id === "id-marcas") {
    return [
      "MARCA_asdiasjd",
      "MARCA_dijsixx000",
      "MARCA_ijdasidjsij",
      "MARCA_ijsdijsdiaj",
    ];
  } else if (id === "id-modelo") {
    return [
      "MODELO_feafae",
      "MODELO_xxxxxsf",
      "MODELO_84f8",
      "MODELO_asfoijafso",
    ];
  } else if (id === "id-ano") {
    return [
      "ANO_feafae",
      "ANO_1231231asd8as4d8a48das2",
      "ANO_84f8",
      "ANO_asfoijafso",
    ];
  } else if (id === "id-versao") {
    return [
      "VERSAO_fqwfqfwqwfqfwfqwqfw",
      "VERSAO_14fafasfasawe",
      "VERSAO_fqfqwfqfqf",
      "VERSAO_eqeqeqweqweqw",
    ];
  }
}

function App() {
  const {
    clearAllAhead,
    getNext,
    setOptions,
    isVisible,
    getOptions,
    setSelectedOption,
  } = useAppStore();

  const [setou, setSetou] = useState(null);

  useEffect(() => {
    const data = requestBackend("id-marcas");
    console.log("setting marcas..");
    setOptions("id-marcas", data);
  }, []);

  useEffect(() => {
    function request() {
      clearAllAhead(setou);
      const proximoDoqueFoiSetado = getNext(setou);
      if (proximoDoqueFoiSetado === -1) return;
      console.info(" fetch opcoes do : ", proximoDoqueFoiSetado);
      const data = requestBackend(proximoDoqueFoiSetado);
      setOptions(proximoDoqueFoiSetado, data);
      setSelectedOption(proximoDoqueFoiSetado, null);
      console.info(isVisible("id-modelo"));
    }
    if (setou) {
      request();
    }
  }, [setou]);

  return (
    <Container>
      <Header>Titulo</Header>

      <InnerContainer>
        <div>
          <DropDownMenu
            nome="marcas"
            id="id-marcas"
            selecionei={setSetou}
            options={getOptions("id-marcas")}
          />
        </div>
        <div>
          <DropDownMenu
            nome="modelo"
            id="id-modelo"
            selecionei={setSetou}
            options={getOptions("id-modelo")}
          />
        </div>
        <div>
          <DropDownMenu
            nome="ano"
            id="id-ano"
            selecionei={setSetou}
            options={getOptions("id-ano")}
          />
        </div>
        <div>
          <DropDownMenu
            nome="versao"
            id="id-versao"
            selecionei={setSetou}
            options={getOptions("id-versao")}
          />
        </div>
      </InnerContainer>
    </Container>
  );
}

export default App;
