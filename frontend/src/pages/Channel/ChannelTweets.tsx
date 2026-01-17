import { useDispatch, useSelector } from "react-redux";
import { tweetType } from "../../Types/dashboard";
import { Bird, Heart, Pencil, Save, Smile, Trash2 } from "lucide-react";
import { timeAgo } from "../../utils/calculateTime";
import { Button, EmptyPage, Input } from "../../components";
import { useEffect, useState } from "react";
import {
  createTweetAPI,
  deleteTweetAPI,
  getUserTweetsAPI,
  updateTweetAPI,
} from "../../api/tweets";
import toast from "react-hot-toast";
import {
  updateTweet as updateTweetRedux,
  deleteTweet as deleteTweetRedux,
  toggleLike as toggleLikeRedux,
  reset as resetRedux
} from "../../redux/slices/tweetSlice";
import { toggleTweetLikeAPI } from "../../api/like";

function ChannelTweets() {
  const dispatch = useDispatch();
  const channelOwner = useSelector((state: any) => state.channel.userData);
  const tweets = useSelector((state: any) => state.tweet.channelTweets);
  const userData = useSelector((state: any) => state.auth.userData);
  const [tweetValue, setTweetValue] = useState("");

  useEffect(() => {

    return () => {
      dispatch(resetRedux());
    };
  }, [dispatch]);

  useEffect(() => {
    const fetchTweets = async() => {
      try {
        const tweets = await getUserTweetsAPI(channelOwner?._id);
        console.log(tweets);
        dispatch(updateTweetRedux(tweets));
      } catch (error) {
        console.log(error);
      }
    }
    fetchTweets();
  },[]);

  const [editingTweet, setEditingTweet] = useState<{
    id: string | null;
    content: string;
  }>({ id: null, content: "" });

  const createTweet = async () => {
    try {
      if(tweetValue.trim() === "") return;
      const response = await createTweetAPI(tweetValue);
      dispatch(updateTweetRedux([response]));
      console.log(response);
      toast.success("Tweeted Successfully");
      setTweetValue("");
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred");
      console.error("ChannelTweets.tsx :: error :: ", error);
    }
  };

  const deleteTweet = async (id: string) => {
    try {
      const response = await deleteTweetAPI(id);
      dispatch(deleteTweetRedux(id));
      console.log(response);
      if (response) toast.success("Tweet deleted Successfully");
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred");
      console.error("ChannelTweets.tsx :: error :: ", error);
    }
  };

  const updateTweet = async (tweetId: string, content: string) => {
    try {
      const response = await updateTweetAPI(tweetId, content);
      dispatch(deleteTweetRedux(tweetId));
      dispatch(updateTweetRedux([response]));
      console.log(response);
      if (response) toast.success("Tweet updated Successfully");
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred");
      console.error("ChannelTweets.tsx :: error :: ", error);
    }
  };

  const toggleLike = async (tweetId:string) => {
    try {
      const res = await toggleTweetLikeAPI(tweetId);
      if(res) {
        dispatch(toggleLikeRedux(tweetId));
        toast.success("Tweet Liked Toggled");
      }
    } catch (error:any) {
      toast.error(error.message);
      console.log(error);
    }
  }

  return (
    <>
      <div className="py-4">
        {userData._id !== channelOwner._id ? (
         <></>
        ) : (
          <div className="mt-2 border pb-2">
            <textarea
              className="mb-2 h-10 w-full resize-none border-none bg-transparent px-3 pt-2 outline-none"
              placeholder="Write a tweet"
              value={tweetValue}
              onChange={(e) => setTweetValue(e.target.value)}
            ></textarea>
            <div className="flex items-center justify-end gap-x-3 px-3">
              <button className="inline-block h-5 w-5 hover:text-[#ae7aff]">
                <Smile />
              </button>
              <Button
                onClick={createTweet}
                className="bg-[#ae7aff] px-3 py-2 font-semibold text-black max-sm:w-[60px]"
              >
                Send
              </Button>
            </div>
          </div>
        )}

        {tweets.length > 0 ? (
          <>
            {tweets.map((tweet: tweetType) => {
              return (
                <div
                  key={tweet._id}
                  className="flex justify-between border-b border-gray-700 py-4 last:border-b-transparent"
                >
                  <div className="flex gap-3 w-full">
                    <div className="h-14 w-14 shrink-0">
                      <img
                        src={tweet.owner.avatar}
                        className="h-full w-full rounded-full"
                        alt={`Avatar of ${tweet.owner.fullname}`}
                      />
                    </div>
                    <div className="w-full">
                      <div className="mr-4 mb-1 flex justify-between gap-x-2">
                        <div>
                          <span className="font-semibold">
                            {tweet.owner.fullname}
                          </span>
                          &nbsp;
                          <span className="ml-3 max-sm:ml-0 inline-block text-sm text-gray-400">
                            {timeAgo(tweet.updatedAt)}
                          </span>
                        </div>
                        <div className="flex text-left items-center gap-2">
                          <button
                            onClick={() => {
                              if (editingTweet.id === tweet._id) {
                                updateTweet(tweet._id, editingTweet.content);
                                setEditingTweet({ id: null, content: "" });
                              } else {
                                setEditingTweet({
                                  id: tweet._id,
                                  content: tweet.content,
                                });
                              }
                            }}
                            className="h-5 w-5 inline-flex items-center gap-x-1 hover:text-[#ae7aff]"
                          >
                            {userData?._id === tweet?.owner?._id &&
                              (editingTweet.id === tweet._id ? (
                                <Save />
                              ) : (
                                <Pencil />
                              ))}
                          </button>
                          <button
                            onClick={() => deleteTweet(tweet._id)}
                            className="h-5 w-5 inline-flex items-center gap-x-1 hover:text-[#ae7aff]"
                          >
                            {userData?._id === tweet?.owner?._id && <Trash2 />}
                          </button>
                        </div>
                      </div>
                      {editingTweet.id === tweet._id ? (
                        <Input
                          value={editingTweet.content}
                          onChange={(e) =>
                            setEditingTweet({
                              ...editingTweet,
                              content: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <p className="mb-2">{tweet.content}</p>
                      )}
                      <div className="flex">
                          <button
                            className={`group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] focus:after:content-[attr(data-like-count-alt)] transition-transform transform hover:scale-110`}
                            onClick={() => toggleLike(tweet._id)}
                          >
                            {tweet?.isLiked ? (
                              <Heart color="red" fill="red" />
                            ) : (
                              <Heart />
                            )}
                          </button>
                          {tweet.likesCnt || 0}
                        </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <EmptyPage name="tweets" logo={<Bird />} />
        )}
      </div>
    </>
  );
}

export default ChannelTweets;
