import React from 'react';
import Markdown from 'markdown-to-jsx';
import Tweet from './Tweet';

interface TweetProps {
  content: string;
}

const MarkdownRenderer: React.FC<TweetProps> = ({ content }) => {
  return (
    <Markdown
      options={{
        overrides: {
          Tweet: {
            component: Tweet,
          },
        },
      }}
    >
      {content}
    </Markdown>
  );
};

export default MarkdownRenderer;