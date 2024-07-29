import { Heart, Pencil, Save, Smile, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "..";
import { useState } from "react";
import toast from "react-hot-toast";
import { commentType } from "../../Types/dashboard";
import { timeAgo } from "../../utils/calculateTime";
import {
  addCommentAPI,
  deleteCommentAPI,
  updateCommentAPI,
} from "../../api/comment";
import { useParams } from "react-router-dom";
import {
  updateComment as updateCommentRedux,
  deleteAComment as deleteACommentRedux,
  toggleLike as toggleLikeRedux,
} from "../../redux/slices/commentSlice";
import { toggleCommentLikeAPI } from "../../api/like";

function VideoComments() {
  const comments = useSelector((state: any) => state.comment.videoComments);
  const totalComments = useSelector((state: any) => state.comment.totalComment);
  const userData = useSelector((state: any) => state.auth.userData);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [commentValue, setCommentValue] = useState("");
  const [editingComment, setEditingComment] = useState<{
    id: string | null;
    content: string;
  }>({ id: null, content: "" });

  const createComment = async () => {
    try {
      const response = await addCommentAPI(id!, commentValue);
      dispatch(
        updateCommentRedux({ totalDocs: totalComments + 1, docs: [response] })
      );
      console.log(response);
      toast.success("Commented Successfully");
      setCommentValue("");
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred");
      console.error("CreateComment :: error :: ", error);
    }
  };

  const deleteComment = async (tweetId: string) => {
    try {
      const response = await deleteCommentAPI(tweetId!);
      dispatch(deleteACommentRedux(tweetId));
      if (response) toast.success("Commented deleted Successfully");
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred");
      console.error("DeleteComment :: error :: ", error);
    }
  };

  const updateComment = async (tweetId: string, content: string) => {
    try {
      const response = await updateCommentAPI(tweetId, content);
      dispatch(deleteACommentRedux(tweetId));
      dispatch(
        updateCommentRedux({ totalDocs: totalComments + 1, docs: [response] })
      );
      toast.success("Comment Updated Successfully");
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred");
      console.error("ChannelTweets.tsx :: error :: ", error);
    }
  };

  const toggleLike = async (commentId:string) => {
    try {
      const res = await toggleCommentLikeAPI(commentId!);
      if(res) {
        dispatch(toggleLikeRedux(commentId));
        toast.success("Comment Like toggled");
      }
    } catch (error) {
      console.log(error);
    }
  } 

  return (
    <>
      <button className="peer w-full rounded-lg border p-4 text-left duration-200 hover:bg-white/5 focus:bg-white/5 sm:hidden">
        <h6 className="font-semibold">See {totalComments} Comments...</h6>
      </button>
      <div className="fixed inset-x-0 top-full z-[60] h-[calc(100%-69px)] overflow-auto rounded-lg border bg-[#121212] p-4 duration-200 hover:top-[67px] peer-focus:top-[67px] sm:static sm:h-auto sm:max-h-[500px] lg:max-h-none">
        <div className="block">
          <textarea
            className="mb-2 h-10 w-full resize-none border-none bg-transparent px-3 pt-2 outline-none"
            placeholder="Write a tweet"
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
          ></textarea>
          <div className="flex items-center justify-end gap-x-3 px-3">
            <button className="inline-block h-5 w-5 hover:text-[#ae7aff]">
              <Smile />
            </button>
            <Button
              onClick={createComment}
              className="bg-[#ae7aff] px-3 py-2 font-semibold text-black max-sm:w-[60px]"
            >
              Send
            </Button>
          </div>
        </div>
        <hr className="my-4 border-white" />
        <div>
          {comments.length > 0 ? (
            <>
              {comments.map((comment: commentType) => {
                return (
                  <div
                    key={comment._id}
                    className="flex justify-between border-b border-gray-700 py-4 last:border-b-transparent"
                  >
                    <div className="flex gap-3 w-full">
                      <div className="h-14 w-14 shrink-0">
                        <img
                          src={comment.owner.avatar}
                          className="h-full w-full rounded-full"
                          alt={`Avatar of ${comment.owner.fullname}`}
                        />
                      </div>
                      <div className="w-full">
                        <div className="mr-4 mb-1 flex justify-between gap-x-2">
                          <div>
                            <span className="font-semibold">
                              {comment.owner.fullname}
                            </span>
                            &nbsp;
                            <span className="ml-3 max-sm:ml-0 inline-block text-sm text-gray-400">
                              {timeAgo(comment.updatedAt)}
                            </span>
                          </div>
                          <div className="flex text-left items-center gap-2">
                            <button
                              onClick={() => {
                                if (editingComment.id === comment._id) {
                                  updateComment(
                                    comment._id,
                                    editingComment.content
                                  );
                                  setEditingComment({ id: null, content: "" });
                                } else {
                                  setEditingComment({
                                    id: comment._id,
                                    content: comment.content,
                                  });
                                }
                              }}
                              className="h-5 w-5 inline-flex items-center gap-x-1 hover:text-[#ae7aff]"
                            >
                              {userData?._id === comment?.owner?._id &&
                                (editingComment.id === comment._id ? (
                                  <Save />
                                ) : (
                                  <Pencil />
                                ))}
                            </button>
                            <button
                              onClick={() => deleteComment(comment._id)}
                              className="h-5 w-5 inline-flex items-center gap-x-1 hover:text-[#ae7aff]"
                            >
                              {userData?._id === comment?.owner?._id && (
                                <Trash2 />
                              )}
                            </button>
                          </div>
                        </div>
                        {editingComment.id === comment._id ? (
                          <Input
                            value={editingComment.content}
                            onChange={(e) =>
                              setEditingComment({
                                ...editingComment,
                                content: e.target.value,
                              })
                            }
                          />
                        ) : (
                          <p className="mb-2">{comment.content}</p>
                        )}
                        <div className="flex">
                          <button
                            className={`group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] focus:after:content-[attr(data-like-count-alt)] transition-transform transform hover:scale-110`}
                            onClick={() => toggleLike(comment._id)}
                          >
                            {comment?.isLiked ? (
                              <Heart color="red" fill="red" />
                            ) : (
                              <Heart />
                            )}
                          </button>
                          {comment.likes || 0}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="text-white text-4xl">No tweets done so far</div>
          )}
        </div>
      </div>
    </>
  );
}

export default VideoComments;
