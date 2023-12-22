import { isObjectEmpty  } from '../core/general.js'
import { useSelector, useDispatch } from 'react-redux'
import { updateItem, removeComponent, getComponents, checkedCompontents, setComponentsId } from '../store/features/counterSlice.js'
import { useState } from 'react'
import { DndProvider, useDrag, useDrop  } from 'react-dnd'


const Section = (data) => {
    
    const items = useSelector((state) => state.counter.items)
    const components = useSelector((state) => state.counter.componentList.list)
    const dispatch = useDispatch()

    const arr = data.data.style;
  
    const styles = {gridTemplateColumns: `repeat(${data.data.cols}, 1fr)`}
  
  
    const children = data.data.children;

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

   // console.log(isObjectEmpty(children))
  
    const mutationData = (arr) => {
      // Возвращаем вместо массива объект, чтоб можно было преминить к стилям
      arr.map( elem => {
        const [name, value] = elem.split(':');
        styles[name] = value;
      });
      return styles;
    }
  
    const createMarkup = (element) => {
      return {__html: element};
    }



    const addCompontent = (idElement) => {
        // const updatedData = {
        //     name: 'Обновленные данные',
        //   };
          const id = data.data.id;
          dispatch(checkedCompontents({checked: true}));
          dispatch(setComponentsId({id: `${id}-${idElement}`}));
          dispatch(updateItem({ id, idElement: idElement, newData: components[0] }));
          console.log(idElement)
      //  const components =  dispatch(getComponents());

    }


    const removeCompontent = (idElement) => {
          const id = data.data.id;
          dispatch(removeComponent({ id, idElement: idElement }));
    }
  
  
    // console.log(mutationData(arr), arr);
  
    // const ff = (stylesArray) => {
    //   const stylesObject = stylesArray.reduce((result, style, index) => {
    //     result[`style${index + 1}`] = style;
    //     return result;
    //   }, {});
    // }
  
  
    return(
      
      <div className="section-edpg" style={mutationData(arr)}>
      {!isObjectEmpty(children) && (children.element.map( (el,ind) => {
        if (isObjectEmpty(el)) {
            return (
                <div key={ind} ref={drop} style={{ backgroundColor }} data-testid="dustbin">
                    <p>Добавить элемент</p>
                    <button onClick={() => addCompontent(ind)}>+</button>
                </div>
                )
        }
        
        
        return (
            <div key={ind} >
                <div dangerouslySetInnerHTML={createMarkup(el.content)}></div>
                <button onClick={() => removeCompontent(ind)}>Удалить</button>
            </div>
        )
      }))}
    </div>
    );
  }


  export default Section;