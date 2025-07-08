
import { Navigate, Route, Routes } from "react-router"

import { HomePage } from "../auth/pages/HomePage"
import { LoginPage } from "../auth/pages/LoginPage"
import { RegisterPage } from "../auth/pages/RegisterPage"

import { ProductPage } from "../templateEditor/pages/ProductPage"
import { EditorPage } from "../templateEditor/pages/EditorPage"
import { FavouritePage } from "../templateEditor/pages/FavouritePage"

import { PdtoAdminPage } from "../admin/pages/PdtoAdminPage"
import { TemplateAdminPage } from "../admin/pages/TemplateAdminPage"
import { ServiceAdminPage } from "../admin/pages/ServiceAdminPage"
import { useState } from "react"

export const AppRoutes = () => {

    const [isLoged, setsLoged] = useState(true)

    return (
        <div className='container pt-3'>
            <p className='h1'>RUTAS APP</p>
            <hr />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='login' element={<LoginPage />} />
                <Route path='register' element={<RegisterPage />} />

                {
                    isLoged && <Route path='user/product' element={<ProductPage />} />
                }
                {
                    isLoged && <Route path='user/editor' element={<EditorPage />} />
                }
                {
                    isLoged && <Route path='user/favourite' element={<FavouritePage />} />
                }

                {
                    isLoged && <Route path='admin/product' element={<PdtoAdminPage />} />
                }
                {
                    isLoged && <Route path='admin/editor' element={<TemplateAdminPage />} />
                }
                {
                    isLoged && <Route path='admin/service' element={<ServiceAdminPage />} />
                }

                <Route path='/*' element={<Navigate to={'/'} />} />
            </Routes>
        </div >
    )
}
