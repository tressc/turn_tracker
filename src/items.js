import React, {useState, createContext, useContext } from 'react';
import Light from './light';
import Spell from './spell';

const ItemsContext = createContext();

function ItemsProvider(props) {
    const [items, setItems] = useState({
        lights: [],
        spells: []
    })

    const checkForCollision = id => {
        return items.lights.concat(items.spells).some(item => item.id === id)
    }

    const addItem = type => {
        let randomId = String(Math.random()).slice(2);
        let collision = checkForCollision(randomId);
        while (collision) {
            randomId = String(Math.random()).slice(2)
            collision = checkForCollision(randomId)
        }

        const newItem = type === 'lights' ? newLight(randomId) : newSpell(randomId)

        const added = items[type].slice().concat([newItem])
        setItems({
            ...items,
            [type]: added
        })
    }

    const removeItem = (type, id) => {
        setItems(prevState => ({
            ...prevState,
            [type]: prevState[type].filter(item => item.id !== id)
        }))
    }


    const newLight = id => ({
        id,
        item: <Light id={id}/>
    })

    const newSpell = id => ({
        id,
        item: <Spell id={id}/>
    })


  return (
    <ItemsContext.Provider value={{items, addItem, removeItem}} {...props} />
  )
}

const useItems = () => useContext(ItemsContext);

export {ItemsProvider, useItems}