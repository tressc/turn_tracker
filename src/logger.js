import React, {useState, createContext, useContext } from 'react';

const LoggerContext = createContext();

function LoggerProvider(props) {
    const [logger, setLogger] = useState([])

    const updateLogger = line => {
        setLogger(prevLogger => prevLogger.slice().concat([line]));
    }

  return (
    <LoggerContext.Provider value={{logger, updateLogger}} {...props} />
  )
}

const useLogger = () => useContext(LoggerContext);

export {LoggerProvider, useLogger}