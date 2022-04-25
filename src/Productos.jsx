import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

export default function Productos() {
  const { data, isLoading } = useQuery("products", () => {
    return fetch("http://localhost:5555/products")
      .then(res => res.json())
  })
  if (isLoading) {
    return <div>Cargando...</div>
  }
  return (
    <div>
      <h3>Productos</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {data.map(product => (
            <tr key={product.ProductID}>
              <td>
                <Link to={`/productos/${product.ProductID}`}> {product.ProductName}</Link>
              </td>
              <td>
                {product.UnitPrice}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}
