export function getSearchParams( searchParams: any ) {
    const page = searchParams['page'] ?? 1
    const postsPerPage = 10
    const perPage = searchParams['per'] ?? postsPerPage
    const start = ( Number( page ) - 1 ) * Number( perPage )
    const end = start + Number( perPage )

    return {
        'page': page,
        'postsPerPage': postsPerPage,
        'start': start,
        'end': end,
        'query': searchParams?.query
    }
  }
  
