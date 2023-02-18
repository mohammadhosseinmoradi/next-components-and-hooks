'use client'

import '@/src/styles/globals.css';
import '@/public/fontawesome/css/all.css'
import NavLink from "@/src/components/nav-link";

export default function Layout({children}) {

    return <div className='grow flex flex-col'>
        <div className='grow w-full max-w-7xl mx-auto flex'>
            <div className='shrink-0 w-64 p-4 flex flex-col border-r border-neutral-900'>
                <NavLink
                    href='/components/selectbox'
                    className={({isActive}) => {
                        return `${isActive ? 'text-neutral-200' : 'text-neutral-500 hover:text-neutral-200'} w-full px-4 py-2`
                    }}>
                    Selectbox
                </NavLink>
                <NavLink
                    href='/components/menu'
                    className={({isActive}) => {
                        return `${isActive ? 'text-neutral-200' : 'text-neutral-500 hover:text-neutral-200'} w-full px-4 py-2`
                    }}>
                    Menu
                </NavLink>
            </div>
            <div className='grow'>
                {
                    children
                }
            </div>
        </div>
    </div>
}