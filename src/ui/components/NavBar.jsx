import { useState } from "react"
import { NavLink } from "react-router"
import './NavBar.css'

export const NavBar = () => {

    const [isActive, setIsActive] = useState(false)

    return (
        <nav>
            <ul>
                <li>
                    <NavLink
                        to='/'
                        className={({ isActive }) => isActive ? 'activa' : ''}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/login'
                        className={({ isActive }) => isActive ? 'activa' : ''}>
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/register'
                        className={({ isActive }) => isActive ? 'activa' : ''}>
                        Register
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/user/product'
                        className={({ isActive }) => isActive ? 'activa' : ''}>
                        Product
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/user/editor'
                        className={({ isActive }) => isActive ? 'activa' : ''}>
                        Editor
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/user/favourite'
                        className={({ isActive }) => isActive ? 'activa' : ''}>
                        Favourite
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/admin/product'
                        className={({ isActive }) => isActive ? 'activa' : ''}>
                        Admin Product
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/admin/editor'
                        className={({ isActive }) => isActive ? 'activa' : ''}>
                        Admin Editor
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/admin/service'
                        className={({ isActive }) => isActive ? 'activa' : ''}>
                        Admin Service
                    </NavLink>
                </li>
            </ul >
        </nav >
    )
}
