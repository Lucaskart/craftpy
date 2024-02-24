import React from 'react';
import useTextManipulation from '../hooks/useTextManipulation';
import { Graphviz } from 'graphviz-react';

function TextManipulation() {
  const codeText = `
class Doctor:
def __init__(self, name: str, numberCRM: str):
    self.name = name
    self.numberCRM = numberCRM

def issue(void):
    return void

def select(void):
    return void


class Resident(Doctor):
def __init__(self, yearResidence: str):
    self.yearResidence = yearResidence


class Teacher(Doctor):
def __init__(self, academicTitle: str):
    self.academicTitle = academicTitle
  `;
  const [inputText, setInputText] = React.useState(codeText);
  const [manipulatedText, setManipulatedText] = useTextManipulation();

  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputText(event.target.value);
  };

  const handleButtonClick = () => {
    setManipulatedText(inputText);
  };

  return (
    <div className="container mx-auto mt-8 ">
      <div className="flex justify-center">
        <div className="w-full">
          <h1 className="text-2xl mb-4">Colete um código</h1>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Digite seu texto aqui"
            value={inputText}
            onChange={handleInputChange}
          />
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={handleButtonClick}
          >
            Manipular Texto
          </button>
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Texto Manipulado:</h2>
            <p className="mt-2">{manipulatedText}</p>
          </div>
          {manipulatedText != "" && <Graphviz dot={manipulatedText} />}
        </div>
      </div>
    </div>
  );
}

export default TextManipulation;
