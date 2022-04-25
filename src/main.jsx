import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Home from './Home'
import Cesta from './Cesta'
import Productos from './Productos'
import Producto from './Producto'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createContext, useState } from 'react'

export const Context = createContext(null)

const queryClient = new QueryClient()

function Main() {
  const [estado, setEstado] = useState({ cesta: [] })
  return <React.StrictMode>
    <Context.Provider value={[estado, setEstado]}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home></Home>} >
              <Route index element={<Productos />} />
              <Route path="*" element={<Productos />} />
              <Route path="productos" element={<Productos />} />
              <Route path="cesta" element={<Cesta />} />
              <Route path="productos/:id" element={<Producto />} />
            </Route>
          </Routes>
        </BrowserRouter >
      </QueryClientProvider>
    </Context.Provider>
  </React.StrictMode>
}

ReactDOM.render(
  <Main />
  ,
  document.getElementById('root')
)
