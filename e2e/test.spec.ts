import { test, expect } from '@playwright/test'

test.describe( 'New Test', () => {
    test( 'should verify the header and footer on the homepage', async ({ page }) => {
    
        // Start at the homepage.
        await page.goto( '/' )
    
        // Expect the search container to be there.
        await expect( page.locator( '.search-form-container' ) ).toBeVisible()
    
        // Expect the search form to be there.
        await expect( page.locator( '.search-form' ) ).toBeVisible()
    
        // Expect the search input to have placeholder text.
        await expect( page.locator( '.search-input' ) ).toHaveAttribute( 'placeholder', 'Enter Search...' )
    
        // Expect the homepage landing container h1 to have the expected text.
        await expect( page.locator( 'h1' ) ).toHaveText( 'Pro wrestling is life.' )
    
        // Expect the site footer to be there.
        await expect( page.locator( 'footer' ) ).toBeVisible()
    
        // Expect the site footer to have the expected text.
        await expect( page.locator( 'footer p' ) ).toHaveText( 'Ganso Bomb' )
    })
})