'use client'

import { usePathname } from 'next/navigation';
import SearchForm from './SearchForm';
import HeaderText from './HeaderText';
import { Suspense } from 'react';

function FallbackHeader() {
    return (
        <header className="search-form-container">
            <div className="site-name">
                <h1>Ganso Bomb</h1>
            </div>
            <SearchForm />
        </header>
    )
}

const PageHeader = () => {
    const pathname = usePathname()
    
    return (
        <header className="search-form-container">
            <Suspense fallback={<FallbackHeader />}>
                <HeaderText />
            </Suspense>
            <SearchForm />
        </header>
    )
}

export default PageHeader;