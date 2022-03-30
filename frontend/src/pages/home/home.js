import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { GRID_SIZE, IMAGES } from "../../constants/appConstants";

const Home = () => {
  const [activeImg, setActiveImg] = useState(0);
  const [divStyles, setDivStyles] = useState({});
  const [points, setPoints] = useState(() => new Set(["4_2", "10_5"]));
  const [openComments, setOpenComments] = useState("");

  const containerRef = useRef();

  const pointClicked = (row, col) => {
    const point = `${row}_${col}`;
    if (!points.has(point)) {
      setPoints((prev) => new Set(prev).add(point));
      setOpenComments(point);
    } else {
      setPoints((prev) => {
        const next = new Set(prev);

        next.delete(point);

        return next;
      });

      setOpenComments("");
    }
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
  return (
    <div className="container">
      <div className="row align-items-center justify-content-center">
        <div className="col-12 col-md-8 p-0 py-5">
          <select
            onChange={(e) => {
              const { value } = e.target;
              setActiveImg(value);
            }}
            className="form-select shadow-none my-5"
            aria-label="Default select example"
          >
            {IMAGES.map(({ src, id }, idx) => (
              <option key={id} value={idx}>
                {idx + 1}
              </option>
            ))}
          </select>

          <div className="position-relative" ref={containerRef}>
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
                            <div className="position-relative">
                              <div
                                className="position-absolute bg-white border border-primary user-select-none"
                                style={{
                                  height: "250px",
                                  width: "250px",
                                  top: 0,
                                  borderRadius: 16,
                                }}
                              ></div>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                ))}
            </div>
            <img
              id="img"
              alt="random"
              className="img-fluid w-100 h-100"
              src={IMAGES[activeImg]?.src}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
