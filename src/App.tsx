import React, { useState, useId, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addItem, removeItem } from './store/features/counterSlice'
import ReactDOM from 'react-dom'
import './App.css'
import data from './data.json'
import ModalQuery from './components/modal-query.jsx';
import ComponentList from './components/ComponentList.jsx';
import Body from './components/Body.jsx';
import { DndProvider, useDrag, useDrop  } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'



const style = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
}

const PetCard = ({ id, name }) => {
  const [{ isDragging }, dragRef] = useDrag({
      type: 'pet',
      item: { id, name },
      collect: (monitor) => ({
          isDragging: monitor.isDragging()
      })
  })
  return (
      <div className='pet-card' ref={dragRef}>
          {name}
          {isDragging && 'Oops'}
      </div>
  )
}


const PETS = [
  { id: 1, name: 'dog' },
  { id: 2, name: 'cat' },
  { id: 3, name: 'fish' },
  { id: 4, name: 'hamster' },
]

const Basket = () => {
  const [basket, setBasket] = useState([])
  const [{ isOver }, dropRef] = useDrop({
      accept: 'pet',
      drop: (item) => setBasket((basket) => 
                          !basket.includes(item) ? [...basket, item] : basket),
      collect: (monitor) => ({
          isOver: monitor.isOver()
      })
  })

  return (
      <React.Fragment>
          <div className='pets'>
              {PETS.map(pet => <PetCard draggable id={pet.id} name={pet.name} />)}
          </div>
          <div className='basket' ref={dropRef}>
              {basket.map(pet => <PetCard id={pet.id} name={pet.name} />)}
              {isOver && <div>Drop Here!</div>}
          </div>
      </React.Fragment>
  )
}



const Box = function Box({ name }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'box',
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))
  const opacity = isDragging ? 0.4 : 1
  return (
    <div ref={drag} style={{ ...style, opacity }} data-testid={`box`}>
      {name}
    </div>
  )
}


const Dustbin = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'box',
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))
  const isActive = canDrop && isOver
  let backgroundColor = '#222'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }
  return (
    <div ref={drop} style={{ ...style, backgroundColor }} data-testid="dustbin">
      {isActive ? 'Release to drop' : 'Drag a box here'}
    </div>
  )
}



function App() {
  const dataCount = useSelector((state) => state.counter.items);
  const dispatch = useDispatch();


  const [count, setCount] = useState(0);
  const [structures, setStructure] = useState(data);
  const [getData, setGetData] = useState();

  useEffect(() => {
    fetch('./data.json', {
      method: 'GET' 
    })
      .then(dat => dat.text())
      .then(res => {
        JSON.parse(res).structure.forEach( el => dispatch(addItem(el))); // TODO возможно нужно будет поправить
        console.log(dataCount)
      //  setStructure(JSON.parse(res));
      });
  }, []);


  return (
    <>
    <DndProvider backend={HTML5Backend}>
      <ComponentList />

      {/* <Basket /> */}
        <Body structures={dataCount} setStructure={setStructure} />
      </DndProvider>
      
    </>
  )
}

export default App
