import React from 'react';

interface props {
	dateString: string;
}

const PostDate: React.FC<props> = ({ dateString }) => {
    const formatDate = ( dateString: string ) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
			timeZone: 'UTC',
        });
        
        return formattedDate;
    };
    
    return (
        <time className="post-date">
			{formatDate( dateString )}
        </time>
    );
};

export default PostDate;
