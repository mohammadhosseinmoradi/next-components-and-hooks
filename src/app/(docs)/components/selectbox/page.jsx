'use client'

import {Listbox, Combobox} from '@/src/components/selectbox';
import {useEffect, useRef, useState} from "react";

const options = [
    {id: 1, name: 'Durward Reynolds', value: 'Durward Reynolds'},
    {id: 2, name: 'Kenton Towne', value: 'Kenton Towne'},
    {id: 3, name: 'Therese Wunsch', value: 'Therese Wunsch'},
    {id: 4, name: 'Benedict Kessler', value: 'Benedict Kessler'},
    {id: 5, name: 'Katelyn Rohan', value: 'Katelyn Rohan'}
];

export default function Page() {
    const [selected, setSelected] = useState(options[0]);
    const [selected2, setSelected2] = useState(options[0]);
    const ref = useRef();

    return <div className='p-6 h-full'>
        <div className='flex justify-center'>

            <div className='w-64'>
                <Combobox selected={selected} options={options} onChange={setSelected} placeholder='Select' withFilterbox/>
                <Listbox ref={ref} className='mt-6' selected={selected2} options={options} onChange={setSelected2} placeholder='Select' withFilterbox/>
            </div>

        </div>
    </div>
}