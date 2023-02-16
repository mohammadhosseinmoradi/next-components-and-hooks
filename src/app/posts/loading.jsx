import Link from "next/link";

export default function Loading() {

    return <div className='p-6'>
        <h1 className='font-bold text-xl'>
            Posts
        </h1>
        <div className='flex gap-4 flex-col mt-6'>
            {
                [1,2,3,4,5,6,7,8,9,10,11,12,13].map(item => {
                    return <div
                        key={item}
                        className='bg-neutral-800 animate-pulse w-full max-w-sm h-10 rounded-xl'
                    >
                    </div>
                })
            }
        </div>
    </div>
}