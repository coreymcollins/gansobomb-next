'use client'

import { useRouter } from 'next/navigation'

const SearchForm = () => {

    const router = useRouter()

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const searchQuery = event.target.searchInput.value;
        if (searchQuery) {
            router.push( `/search/?query=${encodeURIComponent( searchQuery )}` )
        }
    };

    return (
        <div className="search-form-container">
            <form onSubmit={handleSubmit} className="search-form">
                <input type="text" name="searchInput" className="search-input" placeholder="Enter Search..." />
                <button type="submit" className="search-submit">Search</button>
            </form>
        </div>
    );
};

export default SearchForm;