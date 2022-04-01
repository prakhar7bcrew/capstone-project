import { useState, useEffect, useRef } from "react";
import { fetchGet } from "../../api/fetchGet";
import { BASE_URL, GRID_SIZE, IMAGES } from "../../constants/appConstants";
import Comments from "../comments/comments";

const ImageContainer = ({ activeImg, openComments, setOpenComments }) => {
  const [comments, setComments] = useState([]);
  const [points, setPoints] = useState(() => new Set([]));
  const [pointIds, setPointIds] = useState([]);
  const [commentsLoading, setCommentLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [divStyles, setDivStyles] = useState({});
  const containerRef = useRef();
  useEffect(() => {
    getLatestPoints(parseInt(activeImg) + 1);
  }, [activeImg]);

  const getLatestPoints = (imageId) => {
    setLoading(true);
    fetchGet(`${BASE_URL}/all-points?imageId=${imageId}`).then((res) => {
      setLoading(false);

      setPoints(() => new Set(res?.data?.map((item) => item?.gridLocation)));
      setPointIds(() =>
        res?.data?.map((item) => ({
          gridLocation: item?.gridLocation,
          pointId: item?.pointId,
        }))
      );
    });
  };
  const renderPoints = () => {
    const container = containerRef?.current;

    setDivStyles({
      height: container?.clientHeight / GRID_SIZE,
      width: container?.clientWidth / GRID_SIZE,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", renderPoints);
    return () => window.removeEventListener("resize", renderPoints);
  }, []);

  useEffect(renderPoints, [
    containerRef?.current?.clientWidth,
    containerRef?.current?.clientHeight,
  ]);

  const pointClicked = (row, col) => {
    const point = `${row}_${col}`;
    setOpenComments(point);

    if (points.has(point)) {
      setCommentLoading(true);
      fetchGet(
        `${BASE_URL}/all-comments?imageId=${
          parseInt(activeImg) + 1
        }&gridLocation=${point}`
      ).then((res) => {
        setCommentLoading(false);
        setComments(res?.data);
      });
    } else {
      setComments([]);
    }
  };

  return (
    <div className="position-relative" ref={containerRef}>
      {loading ? (
        <div
          className="position-absolute text-white d-flex align-items-center justify-content-center w-100 h-100"
          style={{
            backgroundColor: "#00000070",
          }}
        >
          Loading
        </div>
      ) : (
        <div
          className="position-absolute w-100 h-100"
          style={{
            backgroundColor: "#00000020",
          }}
        >
          {Array(GRID_SIZE)
            .fill(0)
            .map((_, row) => (
              <div key={row} className="d-flex">
                {Array(GRID_SIZE)
                  .fill(0)
                  .map((_, col) => (
                    <div
                      key={col}
                      onClick={() => pointClicked(row, col)}
                      className="d-flex align-items-center justify-content-center user-select-none"
                      style={{
                        ...divStyles,
                      }}
                    >
                      <span
                        style={{
                          borderRadius: 99,
                          width: 10,
                          height: 10,
                          backgroundColor: points.has(`${row}_${col}`)
                            ? "red"
                            : "transparent",
                        }}
                      ></span>
                      <div></div>
                      {`${row}_${col}` === openComments && (
                        <Comments
                          activeImg={activeImg}
                          commentsLoading={commentsLoading}
                          col={col}
                          row={row}
                          setCommentLoading={setCommentLoading}
                          comments={comments}
                          setComments={setComments}
                          pointIds={pointIds}
                          setPoints={setPoints}
                        />
                      )}
                    </div>
                  ))}
              </div>
            ))}
        </div>
      )}
      <img
        id="img"
        alt="random"
        className="img-fluid w-100 h-100"
        src={IMAGES[activeImg]?.src}
      />
    </div>
  );
};

export default ImageContainer;
