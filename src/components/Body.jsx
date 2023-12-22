import React, { useState, useId, useEffect } from 'react'
import Section from '../components/Section.jsx';
import ModalQuery from '../components/modal-query.jsx';

const Body = ({structures, setStructure}) => {
   
  
    // const a = Object.entries(structure)[0][1];
  
  const [addBlock, setaddBlock] = useState({
        id: '',
        type: "section",
        cols: 0,
        style: [],
        children: {}
  });
    const [blockVisible, setBlockVisible] = useState(false);
    const [blockPosition, setBlockPosition] = useState({ x: 0, y: 0, width: 0 });
  
    const handleClick = (event) => {
      const buttonPosition = event.target.getBoundingClientRect();
      setBlockVisible(true);
      setBlockPosition({ x: buttonPosition.left, y: buttonPosition.top - 50, width: buttonPosition.width });
    };
  
  
  
  
    const updateStructure = () => {
      setStructure((prevState) => ({
        structure: prevState.structure.concat(prevState.structure[0])
      }));
    }
  

  
    const addSection = (event) => {
      const obj = [...structures.structure];
      setStructure((prevState) => ({
        structure: prevState.structure.concat(prevState.structure[0])
      }));
      console.log(event.target, structures)
    }
  
  
    const dataStruct = structures.structure ? structures.structure : structures;
  
    // console.log(dataStruct, 'YOOOOOOOOOOOOOOOOOOO')
    return (
      <div className="main">
        {/* <Section data={structures.structure}/> */}
        {structures.map( (el, ind) => {
         return <Section key={ind} data={el}/>
         
        })}
        {blockVisible && (
          <div
            style={{
              position: 'absolute',
              top: `${blockPosition.y}px`,
              left: `${blockPosition.x}px`,
              background: 'lightgray',
              padding: '10px',
              width: `${blockPosition.width}px`
            }}
          >
            <div>
              <button onClick={addSection}>Добавить секцию</button>
              <ModalQuery structures={structures} setBlockVisible={setBlockVisible} setStructure={setStructure} addBlock={addBlock} setaddBlock={setaddBlock} />
            </div>
          </div>
        )}
        {/* <Counter addBlock={addBlock} /> */}
        <button className="add-section" onClick={handleClick}>+</button>
      </div>
    );
  }

  export default Body;