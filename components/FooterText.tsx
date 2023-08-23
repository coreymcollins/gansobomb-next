import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

export default function HeaderText() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    
    return (
        <footer>
            {
                '/' === pathname && ! searchParams?.has( 'page' ) ?
                    <p>Ganso Bomb</p>
                :
                    <p>Pro wrestling is life.</p>
            }

            <Link href="mailto:gansobombdotcom@gmail.com?subject=I would like to pay you $5,000 to write something for me">Email me.</Link>
        </footer>
    )
}