'use client'

import {useSelectedLayoutSegments, usePathname} from "next/navigation";
import Link from "next/link";
import {useMemo} from "react";

export default function NavLink({href, className, style = {}, children, ...otherProps}) {
    const pathname = usePathname();
    const pathSegments = pathname.substring(1, pathname.length).split('/');

    const hrefUrl = new URL(href, 'http://test.com');
    const hrefSegments = hrefUrl.pathname.substring(1, hrefUrl.pathname.length).split('/');
    let hasActiveChildren = false;

    const isActive = useMemo(() => {
        return hrefSegments.reduce((previousValue, currentValue, currentIndex) => {
            if (currentIndex >= pathSegments.length) return false;
            hasActiveChildren = hrefSegments.length < pathSegments.length && pathSegments[currentIndex] === hrefSegments[currentIndex] ? true : hasActiveChildren;
            return previousValue ? pathSegments[currentIndex] === hrefSegments[currentIndex] : false;
        }, true);
    }, [href, pathSegments]) && hrefSegments.length === pathSegments.length;

    return typeof children === 'function' ? children({isActive, hasActiveChildren}) : <Link
        href={href}
        className={`${typeof className === 'function' ? className({isActive, hasActiveChildren}) : className}`}
        style={typeof style === 'function' ? style({isActive, hasActiveChildren}) : style}
        {...otherProps} children={children}/>
}