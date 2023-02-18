'use client'

import NavLink from "@/src/components/nav-link";

export default function Navigation() {

    return <ul className='flex gap-4'>
        {
            [
                {
                    name: 'Components',
                    url: '/components',
                },
                {
                    name: 'Hooks',
                    url: '/hooks',
                },
            ].map(menuItem => {
                return <li className='text-neutral-500 hover:text-neutral-200' key={menuItem.name}>
                    <NavLink
                        href={menuItem.url}
                        className={({isActive, hasActiveChildren}) => {
                            return isActive || hasActiveChildren ? 'text-neutral-200' : '';
                        }}
                    >
                        {
                            menuItem.name
                        }
                    </NavLink>
                </li>
            })
        }
    </ul>
}