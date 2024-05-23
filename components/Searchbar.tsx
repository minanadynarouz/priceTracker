"use client"

import { scrapeAndStoreProduct } from '@/lib/actions';
import React, { FormEvent, useState } from 'react'

// Function below to check if link is valid or not
const isValidAmazonProductUrl = (url: string) => {
    try {
        const parsedUrl = new URL(url);  // throws an error if invalid
        const hostname = parsedUrl.hostname;

        if (
            hostname.includes('amazon.com') ||
            hostname.includes('amazon.') ||
            hostname.endsWith('amazon')
        ) {
            return true;
        }
    } catch (error) {
        return false;
    }
    return false;
}

const Searchbar = () => {
    // we have to keep track of the link will be inserted by user will do that by UseState property

    const [searchPrompt, setSearchPrompt] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isValidLink = isValidAmazonProductUrl(searchPrompt)

        if (!isValidLink) return alert('Please provide a valid Amazon link')

        try {
            setIsLoading(true);
            // scrape our product
            const product = await scrapeAndStoreProduct(searchPrompt);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form className=' flex flex-wrap gap-4 mt-12'
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                value={searchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)}
                placeholder='Enter product link'
                className="searchbar-input"
            />

            <button
                type="submit"
                className="searchbar-btn"
                disabled={searchPrompt === ''}
            >
                {isLoading ? 'Searching...' : 'Search'}
            </button>
        </form>
    )
}

export default Searchbar