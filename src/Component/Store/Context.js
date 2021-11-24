import React, { useContext, useState } from 'react'

const footballContext = React.createContext()

const Context = ({ children }) => {
  const [search, setSearch] = useState('')

  return (
    <footballContext.Provider value={{ search, setSearch }}>
      {children}
    </footballContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(footballContext)
}

export default Context
