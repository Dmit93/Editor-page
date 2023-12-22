import { useSelector, useDispatch } from 'react-redux'
import { getComponents, checkedCompontents, updateItem } from '../store/features/counterSlice.js'
import { DndProvider, useDrag, useDrop  } from 'react-dnd'



const ComponentListCard = ({addCompontentInId, content}) =>{
  const getId = useSelector((state) => state.counter.componentList.id);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'box',
//    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        // alert(`You dropped ${item.name} into ${dropResult.name}!`)
        addCompontentInId(getId, content)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))
  const opacity = isDragging ? 0.4 : 1;

  return(
    <div ref={drag} data-testid={`box`} className="list-component__element" onClick={() => addCompontentInId(content)}>
        {content.name}
    </div>
)
    
}

const ComponentList = () => {
  const components = useSelector((state) => state.counter.componentList.list);
  const componentsChecked = useSelector((state) => state.counter.componentList.checked);
  const getId = useSelector((state) => state.counter.componentList.id);
  const dispatch = useDispatch()

  const hideList = () => {
    dispatch(checkedCompontents({checked: false}));
  }

  const addCompontentInId = (component) => {
    const splitId = getId.split('-');
    dispatch(updateItem({ id: splitId[0], idElement: splitId[1], newData: component }));
    console.log(getId)
  }






  
  return (
    (componentsChecked &&
    <div className="list-component">
        {(components.map( (el,index) => {
            return(
              <ComponentListCard key={index} addCompontentInId={addCompontentInId} content={el}/>
            )
        }))}
        <button onClick={hideList}>Закрыть</button>
    </div>
    )
  )
}

export default ComponentList;