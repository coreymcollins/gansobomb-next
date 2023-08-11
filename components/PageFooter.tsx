'use client'

import { usePathname } from 'next/navigation'

const PageFooter = () => {

    const pathname = usePathname()

    return (
        <footer>
            {
                '/' === pathname ?
                    <p>Ganso Bomb</p>
                :
                    <p>Pro wrestling is life.</p>
            }
        </footer>
    )
}

export default PageFooter;