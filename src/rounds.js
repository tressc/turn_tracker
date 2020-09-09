import React, {useState, createContext, useContext } from 'react';

const RoundsContext = createContext();

function RoundsProvider(props) {
    const [round, setRound] = useState(0)

  return (
    <RoundsContext.Provider value={{round, setRound}} {...props} />
  )
}

const useRounds = () => useContext(RoundsContext);

export {RoundsProvider, useRounds}