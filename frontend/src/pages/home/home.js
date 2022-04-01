import { useState } from "react";
import { IMAGES } from "../../constants/appConstants";
import ImageContainer from "../../components/image-container/image-container";
const Home = () => {
  const [activeImg, setActiveImg] = useState(0);
  const [openComments, setOpenComments] = useState("");

  return (
    <div className="container">
      <div className="row align-items-center justify-content-center">
        <div className="col-12 col-md-8 p-0 py-5">
          <select
            onChange={(e) => {
              const { value } = e.target;
              setActiveImg(value);
              setOpenComments("");
            }}
            className="form-select shadow-none my-5"
            aria-label="Default select example"
          >
            {IMAGES.map(({ id }, idx) => (
              <option key={id} value={idx}>
                {idx + 1}
              </option>
            ))}
          </select>
          <ImageContainer
            activeImg={activeImg}
            openComments={openComments}
            setOpenComments={setOpenComments}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
