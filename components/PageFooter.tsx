'use client'

import { Suspense } from 'react'
import FooterText from './FooterText'

function FallbackFooter() {
    return (
        <footer>
            <p>Pro wrestling is life.</p>
        </footer>
    )
}

const PageFooter = () => {


    return (
        <Suspense fallback={<FallbackFooter />}>
            <FooterText />
        </Suspense>
    )
}

export default PageFooter;