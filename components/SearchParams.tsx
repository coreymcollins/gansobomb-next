export async function getSearchParams( searchParams: any, postCount: number = 12 ) {
    const resolvedSearchParams = await searchParams
    const page = resolvedSearchParams['page'] ?? 1
    const postsPerPage = postCount
    const perPage = resolvedSearchParams['per'] ?? postsPerPage
    const start = ( Number( page ) - 1 ) * Number( perPage )
    const end = start + Number( perPage )

    return {
        'page': page,
        'postsPerPage': postsPerPage,
        'start': start,
        'end': end,
        'query': resolvedSearchParams?.query
    }
  }