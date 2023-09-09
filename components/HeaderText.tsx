import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

export default function HeaderText() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    
    return (
        <div className="site-name">
            {
                // Is the homepage.
                '/' === pathname ?
                    <h1>Pro wrestling is life.</h1>
                // Is a search result and/or paginated page.
                : '/' === pathname && searchParams?.has( 'page' ) || searchParams?.has( 'query' ) || pathname?.includes( '/tag/' ) || pathname?.includes( '/category/' ) ?
                    <Link href="/">
                        <h1>Ganso Bomb</h1>
                    </Link>
                // Is a single article page.
                :
                    <Link href="/">
                        <p className="h1">Ganso Bomb</p>
                    </Link>
            }
        </div>
    )
}