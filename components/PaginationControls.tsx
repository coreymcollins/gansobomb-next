'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FC } from 'react'
import { getSearchParams } from './SearchParams'

interface PaginationControlsProps {
	hasNextPage: boolean,
	hasPrevPage: boolean,
	totalPosts: number,
	postsPerPage: number,
	query: string,
}

const PaginationControls: FC<PaginationControlsProps> = ( props: any ) => {
	const { hasNextPage, hasPrevPage, totalPosts, postsPerPage } = props
	const searchParams = useSearchParams()
	const searchQuery = searchParams?.get( 'query' )
	const pageNumber = ( searchParams && searchParams.get( 'page' ) ) ?? 1
	const perPage = ( searchParams && searchParams.get( 'per' ) ) ?? postsPerPage
	
	return (
		<div className="pagination-container">
			<div className="previous-link-container">
				{
					hasPrevPage &&
						<Link
							className="previous-link"
							href={{
								query: {
									...( searchQuery && {query: searchQuery}),
									page: Number( pageNumber ) - 1,
									per: perPage
								}
							}}
						>
							&laquo; Previous Page
						</Link>
				}
			</div>
			
			<div>
				{pageNumber} / {Math.ceil(totalPosts / Number(perPage))}
			</div>

			<div className="next-link-container">
				{
					hasNextPage &&
						<Link
							className="next-link"
							href={{
								query: {
									...( searchQuery && {query: searchQuery}),
									page: Number( pageNumber ) + 1,
									per: perPage
								}
							}}
							passHref
						>
							Next Page &raquo;
						</Link>
				}
			</div>
		</div>
	)
}
	
export default PaginationControls