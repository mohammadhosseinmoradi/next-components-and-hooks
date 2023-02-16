import '@/src/styles/globals.css';
import '@/public/fontawesome/css/all.css'
import Link from "next/link";
import Navigation from "@/src/app/components/navigation";

export default function Layout({children}) {

    return <html>
    <head>
        <title>
            Next app
        </title>
    </head>
    <body className='bg-black text-neutral-200'>
    <header className='bg-neutral-800 px-6 py-4'>
        <div className='w-full max-w-7xl'>
            <div className='flex gap-6 items-center'>
                <Link href=''>
                    <i className="fa-brands fa-react text-xl"></i>
                </Link>

                <Navigation/>
            </div>
        </div>
    </header>
    <main>
        {
            children
        }
    </main>
    </body>
    </html>
}