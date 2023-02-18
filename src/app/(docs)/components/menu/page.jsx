'use client'

import Menu from "@/src/components/menu";

export default function Page() {

    return <div className='p-6 h-full'>
        <div className='flex justify-center'>
            <div className='w-64 flex justify-start'>
                <Menu
                    button={<button className='rounded-xl bg-neutral-900'>
                        <div className='flex gap-2 items-center'>
                            <i className="fa-regular fa-bars"></i>
                            Menu
                        </div>
                    </button>}
                    items={[
                        <button>Item 1</button>,
                        <Menu
                            button={<button>Item 2</button>}
                            items={[
                                <button>Item 1</button>,
                                <Menu
                                    button={<button>Item 2</button>}
                                    items={[
                                        <button>Item 1</button>,
                                        <button>Item 2</button>
                                    ]}
                                />
                            ]}
                        />
                    ]}
                    root
                />
            </div>
        </div>
    </div>
}