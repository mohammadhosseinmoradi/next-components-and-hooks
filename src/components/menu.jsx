import {Dialog, Popover, Transition} from "@headlessui/react";
import {Fragment, useEffect, useRef, useState} from "react";
import Float from "@/src/components/float";
import {useMediaQuery} from "@mantine/hooks";
import {CheckIcon} from "@heroicons/react/20/solid";

export default function Menu({button, items = [], root = false}) {
    const buttonRef = useRef();
    const [open, setOpen] = useState(false);
    const {className = '', children, ...otherProps} = button.props;
    const isDesktop = useMediaQuery('(min-width: 768px)');

    return <Popover
        as='div'
        onMouseEnter={() => {
            if (!open && isDesktop && !root)
                buttonRef.current.click();
        }}
        onMouseLeave={() => {
            if (open && isDesktop)
                buttonRef.current.click();
        }}
        className='relative'
    >
        {
            ({open, close}) => {

                useEffect(() => {
                    setOpen(open);
                }, [open]);

                return <Float strategy='absolute' placement={root ? 'bottom-start' : 'right-start'}>
                    {
                        ({reference, floating, placement}) => {

                            return <>
                                <Popover.Button
                                    ref={ref => {
                                        reference(ref);
                                        buttonRef.current = ref;
                                    }}
                                    className={`${root ? '' : (open ? 'bg-white/5' : 'hover:bg-white/5')} flex gap-2 items-center w-full px-4 py-2 transition ${className}`} {...otherProps}>
                                    <span className='grow text-left'>
                                        {
                                            children
                                        }
                                    </span>
                                    <i className={`${open ? 'rotate-180' : ''} fa-regular fa-chevron-down transition`}></i>
                                </Popover.Button>
                                {
                                    items.length > 0 ? <Popover.Panel ref={floating}
                                                                      className={`absolute w-full min-w-[12rem] ${(() => {
                                                                          switch (placement.split('-')[0]) {
                                                                              case 'top':
                                                                                  return 'pb-2';
                                                                              case 'right':
                                                                                  return 'pl-2';
                                                                              case 'bottom':
                                                                                  return 'pt-2';
                                                                              case 'left':
                                                                                  return 'pr-2';
                                                                          }
                                                                      })()}`}>
                                        <Popover.Group onClick={() => {
                                            if (!isDesktop) {
                                                // buttonRef.current.click();
                                            }
                                        }} className='flex flex-col bg-neutral-900 rounded-xl py-2'>
                                            {
                                                items.map((item, index) => {
                                                    const isMenu = item.type.name === 'Menu';

                                                    if (isMenu) {
                                                        return <div
                                                            onClick={() => {
                                                                buttonRef.current.click();
                                                            }}
                                                            key={index}
                                                        >
                                                            <Menu {...item.props} />
                                                        </div>
                                                    } else {
                                                        const {className = '', ...otherProps} = item.props;

                                                        return <Fragment key={index}>
                                                            <Popover.Button as={item.type}
                                                                            className={`w-full text-left px-4 py-2 hover:bg-white/5 transition ${className}`} {...otherProps}/>
                                                        </Fragment>
                                                    }
                                                })
                                            }
                                        </Popover.Group>
                                    </Popover.Panel> : null
                                }
                            </>
                        }
                    }
                </Float>
            }
        }
    </Popover>
}

Menu.displayName = 'Menu';