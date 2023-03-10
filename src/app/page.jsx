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

    return <div className='p-6'>
        <div className='w-full max-w-7xl mx-auto'>
            Index
        </div>
    </div>
}