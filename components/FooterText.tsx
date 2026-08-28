import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

export default function HeaderText() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    
    return (
        <footer>
            <div className="footer-top">
                {
                    '/' === pathname && ! searchParams?.has( 'page' ) ?
                        <>
                            <p>Ganso Bomb</p>
                        </>
                    :
                        <>
                            <p>Pro wrestling is life.</p>
                        </>
                }

                <Link href="mailto:gansobombdotcom@gmail.com?subject=I would like to pay you $5,000 to write something for me">Email me.</Link>
            </div>

            <div className="footer-bottom">
                <ul className="menu-navigation-list">
                    <li><Link href="/rss.xml">RSS Feed</Link></li>
                    <li><Link href="/write-forever">Write Forever</Link></li>
                    <li><Link href="/rewind">REWIND</Link></li>
                    <li><Link href="/g1-climax">G1 Climax</Link></li>
                    <li><Link href="/5-star-grand-prix">5-Star Grand Prix</Link></li>
                </ul>
            </div>
        </footer>
    )
}