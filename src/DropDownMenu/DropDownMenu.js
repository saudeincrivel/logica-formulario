import React, { useState } from "react";
import styled from "styled-components";
import useAppStore from "../useAppStore";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  list-style: none;
  padding: 0;
  margin: 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;

const DropdownItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f0f0f0;
  }
`;

const BlueBox = styled.div`
  background-color: rgb(25, 25, 25);
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  display: flex;
  color: #fff;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 115px;
`;
const Dropdown = ({
  id,
  options,
  selecionei,
  getSelectedOption,
  setSelectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(id, option);
    selecionei(id);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>
        {getSelectedOption(id) ? getSelectedOption(id) : "Select an option"}
      </DropdownButton>
      {isOpen && (
        <DropdownList>
          {options.map((option, index) => (
            <div>
              <DropdownItem
                key={`unique-${index}`}
                onClick={() => selectOption(option)}
              >
                {option}
              </DropdownItem>
            </div>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

const DropDownMenu = ({ id, nome, selecionei }) => {
  const { getOptions, isVisible, getSelectedOption, setSelectedOption } =
    useAppStore();

  return (
    <div style={{ minWidth: "150px" }}>
      <div>
        {isVisible(id) ? (
          <div>
            <h1 style={{ color: "#fff" }}>{nome}</h1>
            <Dropdown
              id={id}
              options={getOptions(id)}
              selecionei={selecionei}
              getSelectedOption={getSelectedOption}
              setSelectedOption={setSelectedOption}
            />
          </div>
        ) : (
          <div>
            <h1 style={{ color: "#fff" }}>{nome}</h1>
            <BlueBox>not visible</BlueBox>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDownMenu;
