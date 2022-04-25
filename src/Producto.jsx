import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useContext, useState } from 'react'
import { Context } from './main'
import { useForm } from 'react-hook-form'

export default function Producto() {
  const params = useParams()
  const [estado, setEstado] = useContext(Context)
  const [ifAdd, setIfAdd] = useState(false)
  const { data, isLoading } = useQuery("products", () => {
    return fetch(`http://localhost:5555/products/${params.id}`)
      .then(res => res.json())
  })
  const cantidad = estado.cesta.find(i => i.producto.ProductID == params.id)?.cantidad
  const { register, handleSubmit, watch, formState: { errors } } = useForm(
    { mode: 'onChange', defaultValues: { cantidad: cantidad } }
  );

  function onSubmit(datos) {
    if (datos.cantidad == 0)
      return;
      
    setIfAdd(true);
    setTimeout(() => { setIfAdd(false) }, 3000)
    setEstado({
      ...estado, cesta:
        [...estado.cesta.filter(i => i.producto.ProductID != data[0].ProductID), { producto: data[0], total: datos.cantidad * data[0].UnitPrice, cantidad: datos.cantidad }]
    })
  }


  if (isLoading) {
    return <div>Cargando...</div>
  }
  return (
    <div>
      <h3>Producto</h3>
      <table className="table w-50">
        <thead>
          <tr>
            <th>Id</th>
            <td>{data[0].ProductID}</td>
          </tr>
          <tr>
            <th>Nombre</th>
            <td>{data[0].ProductName}</td>
          </tr>
          <tr>
            <th>Precio</th>
            <td>{data[0].UnitPrice}</td>
          </tr>

        </thead>
      </table>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Introduzca cantidad</label>
          <input {...register('cantidad')} type="number" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Añadir al carrito</button>
      </form>
      {ifAdd && <div className='mt-3 alert alert-info'>Producto añadido al carrito</div>}
    </div>
  )
}
