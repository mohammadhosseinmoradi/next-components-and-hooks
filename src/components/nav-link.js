'use client'

import {useSelectedLayoutSegments} from "next/navigation";
import Link from "next/link";
import {useMemo} from "react";

export default function NavLink({href, className, style = {}, ...otherProps}) {
    const layoutSegments = useSelectedLayoutSegments();
    const url = new URL(href, 'http://test.com');
    const path = url.pathname;
    const urlSegments = path.substring(1, path.length).split('/');
    let hasActiveChildren = false;

    const isActive = useMemo(() => {
        return urlSegments.reduce((previousValue, currentValue, currentIndex) => {
            if (currentIndex >= layoutSegments.length) return false;
            hasActiveChildren = urlSegments.length < layoutSegments.length && layoutSegments[currentIndex] === urlSegments[currentIndex] ? true : hasActiveChildren;
            return previousValue ? layoutSegments[currentIndex] === urlSegments[currentIndex] : false;
        }, true);
    }, [href, layoutSegments]) && urlSegments.length === layoutSegments.length;

    return <Link
        href={href}
        className={`${typeof className === 'function' ? className({isActive, hasActiveChildren}) : className}`}
        style={typeof style === 'function' ? style({isActive, hasActiveChildren}) : style}
        {...otherProps}/>
}