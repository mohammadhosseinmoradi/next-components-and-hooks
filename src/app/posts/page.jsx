import Link from "next/link";

export default async function Page() {

    const posts = await fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json());

    return <div className='p-6'>
        <h1 className='font-bold text-xl'>
            Posts
        </h1>
        <div className='flex gap-4 flex-col mt-6'>
            {
                posts.map(post => {
                    return <Link
                        key={post.id}
                        href=''
                        className='bg-neutral-800 truncate max-w-sm p-2 rounded-xl'
                    >
                        {
                            post.title
                        }
                    </Link>
                })
            }
        </div>
    </div>
}