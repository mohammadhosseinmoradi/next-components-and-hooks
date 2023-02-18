import Float from "@/src/components/float";
import {Combobox as HeadlessUiCombobox, Dialog, Listbox as HeadlessUiListbox, Transition} from "@headlessui/react";
import {forwardRef, Fragment, useEffect, useRef, useState} from "react";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid";
import {useMediaQuery} from "@mantine/hooks";

export const Listbox = forwardRef(function Listbox({selected, options, onChange, multiple, placeholder, withFilterbox, ...otherProps}, ref) {

    return <_SelectBox ref={ref} type='listbox' selected={selected} options={options} onChange={onChange} multiple={multiple}
                       placeholder={placeholder} withFilterbox={withFilterbox} {...otherProps}/>
});

Listbox.displayName = 'Listbox';

export const Combobox = forwardRef(function Combobox({selected, options, onChange, multiple, placeholder, withFilterbox, ...otherProps}, ref) {

    return <_SelectBox ref={ref} type='combobox' selected={selected} options={options} onChange={onChange} multiple={multiple}
                       placeholder={placeholder}
                       withFilterbox={withFilterbox} {...otherProps}/>
});

Combobox.displayName = 'Combobox';

const _SelectBox = forwardRef(function _SelectBox({type, selected, options, onChange, multiple, placeholder, withFilterbox, className, ...otherProps}, ref) {
    const buttonRef = useRef();
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const [query, setQuery] = useState('');
    const searchBoxRef = useRef();

    const filteredOptions = query === '' ? options : options.filter((option) => option.name
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(query.toLowerCase().replace(/\s+/g, '')));

    const As = type === 'listbox' ? HeadlessUiListbox : HeadlessUiCombobox;

    return <As ref={ref} as='div' className={`relative ${className}`} value={selected} onChange={onChange} multiple={multiple} {...otherProps}>
        {({open}) => {
            return <Float strategy='absolute' placement="bottom">
                {({reference, floating, placement}) => {
                    return <>
                        {type === 'listbox' ? <As.Button
                            ref={ref => {
                                reference(ref)
                                buttonRef.current = ref;
                            }}
                            className={`${open && isDesktop ? (placement === 'top' ? 'rounded-b-xl' : 'rounded-t-xl') : 'rounded-xl'} ${open ? 'z-[999]' : ''} flex gap-2 items-center w-full h-full border border-neutral-800 px-4 py-2 bg-neutral-900`}>
                            {
                                multiple ? <div className='grow flex gap-2 flex-wrap'>
                                    {
                                        selected.length !== 0 ?
                                            selected.map(item => {
                                                return <span key={item.name} className='bg-black px-2 py-1 rounded-xl'>
                                              {
                                                  item.value
                                              }
                                          </span>
                                            }) : <span className='grow text-left text-neutral-500'>
                                                    {
                                                        placeholder
                                                    }
                                                </span>
                                    }
                                </div> : <span className='grow text-left'>
                                    {
                                        selected.value
                                    }
                                </span>
                            }
                            <ChevronUpDownIcon
                                className="shrink-0 w-5 h-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </As.Button> : <div className='relative'>
                            <As.Input as={multiple ? 'textarea' : 'input'}
                                      displayValue={
                                          multiple ?
                                              values => values.map((value) => value.name).join(', ') :
                                              value => value.value
                                      }
                                      onChange={(event) => {
                                          if (multiple) {
                                              let valueString = event.target.value.replaceAll(', ', ',');
                                              const values = valueString.split(',');
                                              onChange(options.filter((option) => {
                                                  return values.reduce((previousValue, currentValue) => {
                                                      return currentValue.toLowerCase() === option.name.toLowerCase() ? true : previousValue;
                                                  }, false);
                                              }));
                                              setQuery(values[values.length - 1]);
                                          } else {
                                              setQuery(event.target.value);
                                          }
                                      }}
                                      ref={ref => {
                                          reference(ref)
                                          buttonRef.current = ref;
                                      }}
                                      {
                                          ...multiple ? {rows: 1} : {}
                                      }
                                      placeholder={placeholder}
                                      style={{height: `${buttonRef.current?.scrollHeight}px`, resize: 'none'}}
                                      className={`${open && isDesktop ? (placement === 'top' ? 'rounded-b-xl' : 'rounded-t-xl') : 'rounded-xl'} ${open ? 'z-[999]' : ''} flex w-full border border-neutral-800 pl-4 pr-8 py-2.5 min-h-[2.7rem] overflow-hidden bg-neutral-900`}>
                            </As.Input>
                            <As.Button className="absolute inset-y-0 right-4 flex items-center">
                                <ChevronUpDownIcon
                                    className="w-5 h-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </As.Button>
                        </div>}

                        <Transition
                            show={open}
                            as={Fragment}
                            leaveTo="invisible"
                        >
                            <Dialog
                                ref={floating}
                                as="div"
                                className="relative md:absolute z-[999]"
                                style={isDesktop ? {width: `${buttonRef.current.getBoundingClientRect().width}px`} : {}}
                                onClose={() => {
                                }}>
                                {!isDesktop ? <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-black/50"/>
                                </Transition.Child> : null}
                                <div
                                    className="fixed md:static bottom-0 left-0 w-full h-full flex items-end md:justify-center md:items-center">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300 md:transition-none"
                                        enterFrom="opacity-0 translate-y-32 md:translate-y-0"
                                        enterTo="opacity-100 translate-y-0 md:translate-y-0"
                                        leave="ease-in duration-200 md:transition-none"
                                        leaveFrom="opacity-100 translate-y-0 md:translate-y-0"
                                        leaveTo="opacity-0 translate-y-32 md:translate-y-0"
                                    >
                                        <Dialog.Panel
                                            className={`${open && isDesktop ? (placement === 'top' ? `rounded-t-xl md:border-b-0` : 'rounded-b-xl border-t-0') : 'rounded-t-3xl'} flex w-full max-h-[90%] md:max-h-72 bg-neutral-900 border border-neutral-800 shadow-xl overflow-hidden relative`}>
                                                    <span
                                                        className='absolute md:hidden top-2 left-1/2 -translate-x-1/2 bg-white/50 w-10 h-1 rounded-lg'></span>
                                            <As.Options
                                                as='div'
                                                className={`${placement === 'top' ? 'flex-col md:py-2' : 'flex-col md:flex-col-reverse md:py-2'} grow flex gap-6 md:gap-4 pt-6 pb-2 overflow-hidden`}
                                            >
                                                <ul className='w-full max-w-full overflow-auto'>
                                                    {filteredOptions.map(option => {
                                                        return <As.Option key={option.id}
                                                                          value={option}
                                                                          as={Fragment}>
                                                            {({active, selected}) => <li
                                                                className={`${active ? 'bg-white/5' : ''} flex gap-2 items-center px-6 md:px-4 py-2.5 md:py-2 hover:bg-white/5 select-none cursor-pointer`}>
                                                                <div className='grow'>
                                                                    {option.value}
                                                                </div>
                                                                {selected ? <CheckIcon
                                                                    className='w-5 h-5'/> : null}
                                                            </li>}
                                                        </As.Option>
                                                    })}
                                                    {filteredOptions.length === 0 ?
                                                        <li className='px-6 md:px-4 py-2.5 md:py-2 text-neutral-500'>
                                                            Not found!
                                                        </li> : null}
                                                </ul>
                                                {(!isDesktop && withFilterbox || (!isDesktop && type === 'combobox')) || (isDesktop && withFilterbox && type !== 'combobox') ?
                                                    <div
                                                        className={`${placement === 'top' ? 'md:pb-2' : 'mb-4 md:mb-0 md:pt-2'} px-6 md:px-4`}>
                                                        <div className='relative'>
                                                            <input
                                                                autoFocus={false}
                                                                ref={searchBoxRef}
                                                                className='w-full bg-neutral-900 border border-neutral-700 pl-12 rounded-xl'
                                                                type='search'
                                                                value={query}
                                                                onChange={e => setQuery(e.target.value)}
                                                                placeholder='Filter'
                                                            />
                                                            <i className="absolute top-1/2 -translate-y-1/2 left-4 fa-light fa-magnifying-glass text-neutral-500 pointer-events-none"></i>
                                                        </div>
                                                    </div> : null}
                                            </As.Options>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </Dialog>
                        </Transition>
                    </>
                }}
            </Float>
        }}
    </As>
});

_SelectBox.displayName = '_SelectBox';