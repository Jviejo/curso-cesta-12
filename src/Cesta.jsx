import React from 'react'
import { useContext } from 'react'
import { useEffect, useState } from 'react'
import { Context } from './main'
import { Link } from 'react-router-dom'
import { ethers, utils } from 'ethers';
export default function Cesta() {
  const [estado, setEstado] = useContext(Context)
  const [cuenta, setCuenta] = useState(null)
  const [saldo, setSaldo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [txOk, setTxOk] = useState(false)
  const [txRechazo, setTxRechazo] = useState(false)

  const total = estado.cesta.reduce((acumulador, item) => acumulador + item.total, 0)

  useEffect(() => {
    ethereum && ethereum.request({ method: 'eth_requestAccounts' }).then(i => {
      setCuenta(i[0])
      setIsLoading(true)

      ethereum.on('accountsChanged', (i) => {
        setCuenta(i[0])
      })
    });
  }, [])


  async function pagar() {
    setTxOk(false)
    setTxRechazo(false)
    const transactionParameters = {
      to: '0x280f1db3d104dad8705c0696fb81bd8e78141caf', // Required except during contract publications.
      from: ethereum.selectedAddress, // must match user's active address.
      value: ethers.utils.parseEther(total.toString()).toHexString()
    };
    try {
      const txHash = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
      setTxOk(txHash)

    } catch (error) {
      setTxRechazo(error)

    } finally {
      // final
    }
    
  }

  
  return (
    <div>
      <h3>Cesta</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {estado.cesta.map(i => (
            <tr key={i.producto.ProductID}>
              <td>
                <Link to={`/productos/${i.producto.ProductID}`}>{i.producto.ProductName}</Link>
              </td>
              <td>
                {i.producto.UnitPrice}
              </td>
              <td>
                {i.cantidad}
              </td>
              <td>
                {i.total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total compra {total}</h3>
      <div>
        address {cuenta} <br />
        <button className='btn btn-primary my-3' onClick={() => pagar(total)}>Pagar</button>
      </div>
      {txOk && <div className="mt-3 alert alert-info">Transaccion realizada {txOk}</div>}
      {txRechazo && <div className="mt-3 alert alert-danger">Transaccion rechazada {txRechazo.message}</div>}
    </div>
  )
}
