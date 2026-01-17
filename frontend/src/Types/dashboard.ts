export type channelStatsType = {
  totalVideos: number;
  totalViews: number;
  totalSubscribers: number;
  totalLikes: number;
};

export type channelVideosType = {
  isPublished: boolean;
  thumbnail: string;
  title: string;
  likes: number;
  createdAt: string;
  _id: string;
  description: string;
};

export type user = {
  _id: string;
  avatar: string;
  channelsSubscribedToCount: number;
  coverImage: string;
  email: string;
  fullname: string;
  isSubscribed: boolean;
  subscribersCount: number;
  username: string;
};

export type tweetType = {
  "_id": string;
  "owner": {
    "_id": string;
    "fullname": string;
    "avatar": string;
  },
  "content": string;
  "updatedAt": string;
  "likesCnt": number;
  "isLiked": boolean;
}

export type subscribedChannelsType = {
  "_id": string;
  "subscriber": string;
  "channel": {
    "_id": string;
    "username": string;
    "fullname": string;
    "avatar": string;
    "subCnt": number
  }
}

export type subscribersChannelsType = {
  "_id": string
  "subscriber": {
      "_id": string;
      "username": string;
      "fullname": string;
      "avatar": string;
      "subCnt": number,
      "isSubscribed": boolean
  },
  "channel": string
}

export type commentType = {
  "_id": string;
  "content": string;
  "owner": {
    "_id": string;
    "username": string;
    "fullname": string;
    "avatar": string;  
  };
  "likes": 0,
  "isLiked": false
  "video": string;
  "createdAt": string;
  "updatedAt": string;
}