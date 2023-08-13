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
        </footer>
    )
}