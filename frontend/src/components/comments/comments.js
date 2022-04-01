import { useState } from "react";
import { fetchPost } from "../../api/fetchPost";
import { BASE_URL } from "../../constants/appConstants";

const Comments = ({
  activeImg,
  commentsLoading,
  row,
  col,
  setCommentLoading,
  comments,
  setPoints,
  pointIds,
  setComments,
}) => {
  const [newComment, setNewComment] = useState([]);

  const addNewComment = (e, gridLocation) => {
    e.preventDefault();
    setCommentLoading(true);
    const pointId = pointIds.filter(
      (point) => point?.gridLocation === gridLocation
    )[0]?.pointId;

    if (!pointId) {
      setPoints((prev) => new Set(prev).add(gridLocation));
    }
    fetchPost(`${BASE_URL}/new-comment`, {
      imageId: parseInt(activeImg) + 1,
      text: newComment,
      addPointToo: !pointId,
      gridLocation,
    }).then((res) => {
      setNewComment("");
      setCommentLoading(false);
      setComments(res?.data);
    });
  };

  return (
    <div className="position-relative">
      <div
        className="position-absolute bg-white border border-primary user-select-none p-2"
        style={{
          height: "250px",
          width: "250px",
          top: 0,
          borderRadius: 8,
        }}
      >
        <div
          style={{
            height: "84%",
          }}
        >
          <div className="py-2">
            {!commentsLoading && comments.length === 0 && (
              <p className="text-center text-muted">no comments</p>
            )}
            {commentsLoading ? (
              <div className="h-100 d-flexx align-items-center justify-content-center">
                Loading...
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment?.id} className="border-bottom mb-3">
                  <h6 className="my-1">{comment?.text}</h6>
                  <p className="m-0">
                    {comment?.createdAt.toLocaleString("en-US")}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
        <form
          onSubmit={(e) => addNewComment(e, `${row}_${col}`)}
          className="w-100"
        >
          <input
            type="text"
            className="form-control shadow-none"
            placeholder="Type..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default Comments;
