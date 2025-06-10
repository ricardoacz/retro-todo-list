import React from 'react'
import { Outlet } from 'react-router-dom'

function LayoutComponent() {
    return (
        <div>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default LayoutComponent