'use client'
import { createContext, useEffect, useState } from "react"

export const UsuarioContext = createContext()

function UsuarioProvider({children}) {

  const [usuarioId, setUsuarioId] = useState(null)
  const [usuarioNome, setUsuarioNome] = useState("")

  useEffect(() => {
    if (localStorage.getItem("usuario_logado")) {
      const usuario = JSON.parse(localStorage.getItem("usuario_logado"))
      setUsuarioId(usuario.id)
      setUsuarioNome(usuario.nome)
    }  
  }, [])

  function mudaId(id) {
    setUsuarioId(id)
  }

  function mudaNome(nome) {
    setUsuarioNome(nome)
  }

  return (
    <UsuarioContext.Provider value={{usuarioId, usuarioNome, mudaId, mudaNome}}>
      {children}
    </UsuarioContext.Provider>
  )
}

export default UsuarioProvider