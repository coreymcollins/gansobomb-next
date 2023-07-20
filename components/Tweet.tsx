'use client'

import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

interface TweetProps {
    tweetId: string;
}

const Tweet: React.FC<TweetProps> = ({ tweetId }) => {
  return <TwitterTweetEmbed tweetId={tweetId} />;
};

export default Tweet;