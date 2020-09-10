import React, {useState, createContext, useContext } from 'react';

const LoggerContext = createContext();

function LoggerProvider(props) {
    const [logger, setLogger] = useState([])

    const [loggerOptions, setLoggerOptions] = useState({
      2: 'Clue about nearby monster. Consult table.',
      3: 'Dungeon effect. Consult table.',
      4: 'Torches and Magic exhaust.',
      5: 'Torches and Lanterns exhaust.',
      6: 'Fatigue sets in.'
    })

    const updateLogger = line => {
        setLogger(prevLogger => prevLogger.slice().concat([line]));
    }

  return (
    <LoggerContext.Provider value={{logger, loggerOptions, setLoggerOptions, updateLogger}} {...props} />
  )
}

const useLogger = () => useContext(LoggerContext);

export {LoggerProvider, useLogger}