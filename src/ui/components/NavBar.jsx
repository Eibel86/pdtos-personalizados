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
                        to='/Register'
                        className={({ isActive }) => isActive ? 'activa' : ''}>
                        Register
                    </NavLink>
                </li>
            </ul >
        </nav >
    )
}
