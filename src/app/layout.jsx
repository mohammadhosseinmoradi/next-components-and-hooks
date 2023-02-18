import '@/src/styles/globals.css';
import '@/public/fontawesome/css/all.css'
import Link from "next/link";
import Navigation from "@/src/app/navigation";

export default function Layout({children}) {

    return <html className='min-h-full flex flex-col'>
    <head>
        <title>
            Next app
        </title>
    </head>
    <body className='grow flex flex-col min-h-full bg-black text-neutral-200'>
    <header className='sticky top-0 px-6 py-4 border-b border-neutral-900'>
        <div className='w-full max-w-7xl mx-auto'>
            <div className='flex gap-6 items-center'>
                <Link href=''>
                    <i className="fa-brands fa-react text-xl"></i>
                </Link>

                <Navigation/>
            </div>
        </div>
    </header>
    <main className='grow flex flex-col'>
        {
            children
        }
    </main>
    </body>
    </html>
}