"use server"

import { scrapeAmazonProduct } from "./scrapper";

// this will scrape the product and save in database

export async function scrapeAndStoreProduct(productUrl: string) {
    if (!productUrl) return;

    // because because we are scarpping data and getting database access
    try {
        const scrappedProduct = await scrapeAmazonProduct(productUrl);
    } catch (error: any) {
        throw new Error(`Failed to create/update product: ${error.message}`)
    }
}
