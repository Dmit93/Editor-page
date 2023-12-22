import { createSlice } from '@reduxjs/toolkit'
import { isObjectEmpty } from '../../core/general.js'


const componentsList = [
    {
        type: 'text',
        content: '<textarea></textarea>',
        name: 'Текст'
    },
    {
        type: 'button',
        content: '<button></button>',
        name: 'Кнопка'
    },
    {
        type: 'button123',
        content: '<input type="text">',
        name: 'Кнопка'
    }
]


const counterSlice = createSlice({
    name: 'mySlice',
    initialState: {
        items: [],
        variable: [{
            id: '',
            type: "section",
            cols: 0,
            style: [],
            children: {
                element: []
            }
        }],
        componentList: {
            list: componentsList,
            checked: false,
            id: 0
        }
    },
    reducers: {
        getComponents: (state, action) => {
            return state.componentList;
        },
        setComponentsId: (state, action) => {
            const { id } = action.payload;
            state.componentList.id = id;
        },
        checkedCompontents: (state, action) => {
            const { checked } = action.payload;
            state.componentList.checked = checked;
        },
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        addVariable: (state, action) => {
            state.variable.push(action.payload)
        },
        updateItem: (state, action) => {
            const { id, newData, idElement } = action.payload;
            const index = state.items.findIndex(item => item.id === id);
            console.log(id, idElement)
            if (index !== -1) {
                //const arr = [...state.items[index].children.element];

                state.items[index].children.element[idElement] = newData

                // console.log(id, )
                // state.items[index].children.element.filter((elem, ind) => {
                //     if (isObjectEmpty(elem)) {
                //         elem
                //         state.items[index].children.element = [...state.items[index].children.element[ind], newData]
                //         // state.items[index].children.element = [...state.items[index].children.element[ind], newData]
                //     }
                // })

                // console.log(state.items[index])
                // state.items[index] = { ...state.items[index], ...newData };
            }
        },
        removeComponent: (state, action) => {
            const { id, idElement } = action.payload;
            const index = state.items.findIndex(item => item.id === id);
            if (index !== -1) {
                state.items[index].children.element[idElement] = {}
            }
        },
    },
});


export const { addItem, removeItem, updateItem, removeComponent, getComponents, checkedCompontents, setComponentsId } = counterSlice.actions;

export default counterSlice.reducer;
