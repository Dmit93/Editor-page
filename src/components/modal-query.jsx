import React, { useState, useId, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addItem, removeItem } from '../store/features/counterSlice.js'
import { generateRandomSet } from '../core/general.js'


// Функция для проверки наличия записи с заданным id в объекте
function isIdPresent(object, id) {
  return Object.keys(object).some(key => object[key].id === id);
}

const ModalQuery = ({structures, setStructure, addBlock, setaddBlock, addSection, setBlockVisible}) => {
    const [coordinates, setCoordinates] = useState(null);


    const counts = useSelector((state) => state.counter.variable)
    const dispatch = useDispatch()

   
 
    const handleClick = (event) => {
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX;
      const y = event.clientY - (rect.height * 2);
      setCoordinates({ x, y });
    };
  
    const handleAddCols = (event) => {  

      const id = generateRandomSet();
      const obj = structuredClone(counts[0]);
      const cols = event.target.innerText;
      const arrayElement = Array.from({length: cols}, (elem) => elem = {});
      obj.id = id;
      obj.cols =  cols;
      obj.children.element = arrayElement

      dispatch(addItem(obj))
      setCoordinates(false);
      setBlockVisible(false)
    //   const id = generateRandomSet(structures);

    //   console.log(structures)
    //   // setaddBlock((prevBlock) => ({
    //   //   ...prevBlock,
    //   //   cols: event.target.innerText,
    //   //   id: id
    //   // }));
    //   const obj = addBlock;
    //   obj.id = id;
    //   obj.cols = event.target.innerText;
    //   setaddBlock(obj);

    //   setStructure((prevState) => ({
    //   structure: [...prevState.structure, addBlock],
    // }));

    //    const updatedStructure = structures.structure ? structures.structure : structures;
    //   // let ids = addBlock.id;
    //   // ids = id
    
    //   // // Добавляем новый объект в массив
    //   console.log(updatedStructure)
    //   updatedStructure.push(obj);
      
    //   // // Обновляем состояние
    //  setStructure(updatedStructure);
    //   //setStructure(structures.structure.push(addBlock))
    //   console.log(addBlock)
    };
  
  
    const spanClick = (event) => {
      const newCols = event.target.innerText;
  
      setaddBlock((prevBlock) => ({
        ...prevBlock,
        cols: newCols,
      }));
      addSection(event);
    }
  
    const numbers = Array.from({ length: 12 }, (_, index) => index + 1);
  
    return (
      <div>
        <button onClick={handleClick}>
          Нажми меня!
        </button>
        {coordinates && ReactDOM.createPortal(
          <div
            style={{
              position: 'absolute',
              left: coordinates.x,
              top: coordinates.y,
              background: 'white',
              padding: '8px',
              borderRadius: '4px',
              width: '1000px',
              color: '#000'
            }}
          >
            <p>Выберите количество столбцов</p>
            <div className="section-grid">
              {numbers.map((number) => (
                <span key={number} onClick={handleAddCols}>
                  {number}
                </span>
              ))}
            </div>
          </div>,
          document.body
        )}
      </div>
    );
  };

  export default ModalQuery