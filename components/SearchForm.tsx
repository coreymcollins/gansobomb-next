'use client'

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation'

const SearchForm = () => {

    const router = useRouter()
    const pathname = usePathname()

    let pageHeading = 'wow';
    pageHeading = '/' === pathname ? 'okay' : 'wow'

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const searchQuery = event.target.searchInput.value;
        if (searchQuery) {
            router.push( `/search/?query=${encodeURIComponent( searchQuery )}` )
        }
    };

    return (
        <header className="search-form-container">
            <div className="site-name">
                {
                    '/' === pathname ?
                        <h1>Pro wrestling is life.</h1>
                    :
                        <Link href="/">
                            <h1>Ganso Bomb</h1>
                        </Link>
                }
            </div>
            <form onSubmit={handleSubmit} className="search-form">
                <input type="text" name="searchInput" className="search-input" placeholder="Enter Search..." />
                <button type="submit" className="search-submit">Search</button>
            </form>
        </header>
    );
};

export default SearchForm;