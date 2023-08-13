import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

export default function HeaderText() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    
    return (
        <div className="site-name">
            {
                '/' === pathname && ! searchParams?.has( 'page' ) ?
                    <h1>Pro wrestling is life.</h1>
                :
                    <Link href="/">
                        <h1>Ganso Bomb</h1>
                    </Link>
            }
        </div>
    )
}