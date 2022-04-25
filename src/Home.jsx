import React from 'react'
import { Outlet , Link} from 'react-router-dom'

export default function Home() {
    return (
        <div className='container'>
            <div className='text-end '>
                <Link className='mx-2' to="/cesta">Cesta</Link>
                <Link to="/productos">Productos</Link>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}
