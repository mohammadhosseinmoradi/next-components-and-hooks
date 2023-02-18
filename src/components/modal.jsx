import {Dialog, Transition} from "@headlessui/react";
import {Fragment} from "react";

export default function Modal({open, setOpen, className, children, maxWidth}) {

    return <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-[999] text-sm" onClose={() => setOpen(false)}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black/50"/>
            </Transition.Child>
            <div className="fixed bottom-0 left-0 w-full h-full flex items-end md:justify-center md:items-center md:p-6">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-32 md:translate-y-0 md:scale-95"
                    enterTo="opacity-100 translate-y-0 md:translate-y-0 md:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 md:translate-y-0 md:scale-100"
                    leaveTo="opacity-0 translate-y-32 md:translate-y-0 md:scale-95"
                >
                    <Dialog.Panel
                        className={`flex w-full ${maxWidth} max-h-[90%] md:max-h-full rounded-t-3xl md:rounded-2xl bg-neutral-900 shadow-xl overflow-hidden relative`}>
                        <span
                            className='absolute md:hidden top-2 left-1/2 -translate-x-1/2 bg-white/50 w-10 h-1 rounded-lg'></span>
                        {
                            children ?
                                <div className={`grow flex gap-6 flex-col overflow-hidden ${className}`}>
                                    {
                                        children
                                    }
                                </div> : ''
                        }
                    </Dialog.Panel>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition>
}