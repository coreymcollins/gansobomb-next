import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

function trimStringTo30Words( inputString ) {
  // Split the string into words using a regular expression
  const words = inputString.split(/\s+/);

  // Select the first 30 words
  const trimmedWords = words.slice(0, 30);

  // Join the words back into a string
  let trimmedString = trimmedWords.join(' ');

  // Add an ellipsis if there are more words in the original string
  if (words.length > 30) {
    trimmedString += '...';
  }

  return trimmedString;
}

const getRssForAllPosts = () => {

	const folder = path.join(process.cwd(), 'posts');
	const files = fs.readdirSync( folder );
	const markdownPosts = files.filter( ( file ) => file.endsWith( '.md' ) );
	
	const posts = markdownPosts.map( ( filename ) => {
		const fileContents = fs.readFileSync( `${folder}/${filename}`, 'utf8' );
		const matterResult = matter( fileContents );
    const matterPostContent = matterResult.data.excerpt ? matterResult.data.excerpt : trimStringTo30Words( matterResult.content );

		return {
			title: matterResult.data.title,
			date: matterResult.data.date,
			excerpt: matterPostContent,
			link: `https://www.gansobomb.com/post/${ matterResult.data.slug }`,
		}
	});
    
    posts.sort( ( a, b ) => {
        if ( a.date < b.date ) {
            return 1;
        } else {
            return -1;
        }
    });

	return posts
}

const getXmlItems = ( posts ) => {

    return posts
        .map(( post ) => {
            return `<item>
                <title>${ post.title }</title>
                <link>${ post.link }</link>
                <guid>${ post.link }</guid>
                <pubDate>${ post.date }</pubDate>
                <description>${ post.excerpt }</description>
                <dc:creator>Ganso Bomb</dc:creator>
            </item>`
        })
        .join('')
}

const getRssXml = ( xmlItems, latestPostDate ) => {
    return `<?xml version="1.0" ?>
    <rss
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      xmlns:content="http://purl.org/rss/1.0/modules/content/"
      xmlns:atom="http://www.w3.org/2005/Atom"
      version="2.0"
    >
      <channel>
          <title>Ganso Bomb</title>
          <link>https://www.gansobomb.com</link>
          <description>Pro wrestling is life.</description>
          <language>en</language>
          <lastBuildDate>${new Date(latestPostDate).toUTCString()}</lastBuildDate>
          ${xmlItems}
      </channel>
    </rss>
    `
}

const postData = getRssForAllPosts();
const xmlItems = getXmlItems( postData );
const rssXml = getRssXml( xmlItems, postData[0].date );

const generatedSitemap = fs.writeFile(path.join( 'public', 'rss.xml' ), rssXml, ( err ) => {
  if ( err ) {
    console.log( err );
  } else {
    console.log( 'RSS feed written successfully' );
  }
});

export default generatedSitemap