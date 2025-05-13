import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Releases from "../pages/Releases";
import Trailers from "../pages/Trailers";

export default function HomePage() {
  return (
    <>
      <div>
        <h1 style={{ padding: "20px", fontSize: "30px", color: "white" }}>
          Athens Booking Company
        </h1>
        <div>
        <Slide  autoplay={true}>
          <div className="each-slide-effect">
            <div 
              style={{ backgroundImage: "url(oppenheimer-sixteen_nine.png)" }}
            ></div>
          </div>
          <div className="each-slide-effect">
            <div style={{ backgroundImage: "url(sawx.png)" }}></div>
          </div>
          <div className="each-slide-effect">
            <div style={{ backgroundImage: "url(elemental.png)" }}></div>
          </div>
        </Slide>
        </div>
      </div>
      <div style={{ background: "black" }}>
        <Trailers />
      </div>
      <div style={{ background: "black" }}>
        <Releases />
      </div>
    </>
  );
}
