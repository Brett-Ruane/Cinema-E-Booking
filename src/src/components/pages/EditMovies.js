/* page for editing movies */

import * as React from "react";
import axios from "axios";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { lightBlue } from "@mui/material/colors";
import { useEffect, useState } from "react";

export default function EditMovies() {
  const [optionList, setOptionList] = useState([]);
  const [select, setSelected] = useState("");
  const fetchData = () => {
    axios
      .get("http://localhost:8080/api/movie/getAll")
      .then((response) => {
        const { data } = response;
        if (response.status === 200) {
          //check the api call is success by stats code 200,201 ...etc
          setOptionList(data);
          if (data.length > 0) {
            setSelected(data[0].m_title);
            fetchMovie();
          }
        } else {
          //error handle section
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
    fetchMovie();
  }, []);

  useEffect(() => {
    if (select) {
      fetchMovie();
      console.log(movie);
    }
  }, [select]);
  const fetchMovie = () => {
    if (select) {
      axios
        .get(`http://localhost:8080/api/movie/getByName?m_title=${select}`)
        .then((response) => {
          const { data } = response;
          if (response.status === 200) {
            //check the api call is success by stats code 200,201 ...etc
            setMovieInfo(data);
            setMovie(data);
            console.log(data);
            console.log(movie);
            console.log(movieInfo);
          } else {
            //error handle section
          }
        })
        .catch((error) => console.log(error));
    }
  };
  const [movieInfo, setMovieInfo] = useState([]);
  const [movie, setMovie] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(movie);
    // window.location.assign("http://localhost:3000/manage");
    // alert("Movie Added")
    try {
      const response = await axios.post(
        "http://localhost:8080/api/movie/add",
        movie
      );

      if (response.status === 200) {
        // Movie added successfully
        alert("Movie change successfully");
      } else {
        // Handle errors
        alert("Movie change Failed");
      }
    } catch (error) {
      alert("ERROR");
    }
    window.location.assign("http://localhost:3000/manage");
  }

  return (
    <body style={{ backgroundColor: "crimson" }}>
      <h1 style={{ fontSize: "30px", color: "black", padding: "20px" }}>
        Edit Movie :
      </h1>
      <form onSubmit={handleSubmit}>
        <h1 style={{ color: "black" }}>Select Movie to Edit</h1>
        <div classname="registerformat" style={{ padding: "20px" }}>
          <select
            disabled={false}
            value={select}
            onChange={(event) => {
              setSelected(event.currentTarget.value);
            }}
          >
            {optionList.map((item) => (
              <option key={item.m_id}>{item.m_title}</option>
            ))}
          </select>
        </div>

        <div
          className="registerformat"
          style={{ padding: "20px", color: "black" }}
        >
          Movie Title :<label htmlFor="movieTitle"></label>
          <input
            type="text"
            name="m_title"
            defaultValue={movieInfo.m_title}
            onChange={(event) => {
              setMovie({
                ...movie,
                m_title: event.target.value,
              });
            }}
          />
        </div>

        <div
          className="registerformat"
          style={{ padding: "20px", color: "black" }}
        >
          Movie ISBN :<label htmlFor="movieIsbn"></label>
          <input
            type="text"
            name="m_isbn"
            defaultValue={movieInfo.m_isbn}
            onChange={(event) => {
              setMovie({
                ...movie,
                m_isbn: event.target.value,
              });
            }}
          />
        </div>

        <div
          className="registerformat"
          style={{ padding: "20px", color: "black" }}
        >
          Producer :<label htmlFor="producer"></label>
          <input
            type="text"
            name="m_producer"
            defaultValue={movieInfo.m_producer}
            onChange={(event) => {
              setMovie({
                ...movie,
                m_producer: event.target.value,
              });
            }}
          />
        </div>

        <div
          className="registerformat"
          style={{ padding: "20px", color: "black" }}
        >
          Director :<label htmlFor="director"></label>
          <input
            type="text"
            name="m_director"
            defaultValue={movieInfo.m_director}
            onChange={(event) => {
              setMovie({
                ...movie,
                m_director: event.target.value,
              });
            }}
          />
        </div>

        <div
          className="registerformat"
          style={{ padding: "20px", color: "black" }}
        >
          Cast :<label htmlFor="cast"></label>
          <input
            type="text"
            name="m_cast"
            defaultValue={movieInfo.m_cast}
            onChange={(event) => {
              setMovie({
                ...movie,
                m_cast: event.target.value,
              });
            }}
          />
        </div>

        <div
          className="registerformat"
          style={{ padding: "20px", color: "black" }}
        >
          Category :<label htmlFor="category"></label>
          <input
            type="text"
            name="m_category"
            defaultValue={movieInfo.m_category}
            onChange={(event) => {
              setMovie({
                ...movie,
                m_category: event.target.value,
              });
            }}
          />
        </div>

        <div
          className="registerformat"
          style={{ padding: "20px", color: "black" }}
        >
          Poster URL :<label htmlFor="poster"></label>
          <input
            type="text"
            name="m_poster"
            defaultValue={movieInfo.m_poster}
            onChange={(event) => {
              setMovie({
                ...movie,
                m_poster: event.target.value,
              });
            }}
          />
        </div>

        <div
          className="registerformat"
          style={{ padding: "20px", color: "black" }}
        >
          Image1 URL :<label htmlFor="image1"></label>
          <input
            type="text"
            name="m_image1"
            defaultValue={movieInfo.m_image1}
            onChange={(event) => {
              setMovie({
                ...movie,
                m_image1: event.target.value,
              });
            }}
          />
        </div>

        <div
          className="registerformat"
          style={{ padding: "20px", color: "black" }}
        >
          Image2 URL :<label htmlFor="image2"></label>
          <input
            type="text"
            name="m_image2"
            defaultValue={movieInfo.m_image2}
            onChange={(event) => {
              setMovie({
                ...movie,
                m_image2: event.target.value,
              });
            }}
          />
        </div>

        <div
          className="registerformat"
          style={{ padding: "20px", color: "black" }}
        >
          Trailer URL :<label htmlFor="trailer"></label>
          <input
            type="text"
            name="m_trailer"
            defaultValue={movieInfo.m_trailer}
            onChange={(event) => {
              setMovie({
                ...movie,
                m_trailer: event.target.value,
              });
            }}
          />
        </div>

        <div
          className="registerformat"
          style={{ padding: "20px", color: "black" }}
        >
          MPAA-US film rating code :
          <select
            name="m_mark"
            value={movieInfo.m_mark}
            onChange={(event) => {
              setMovie({
                ...movie,
                m_mark: event.target.value,
              });
            }}
          >
            <option value="G">G</option>
            <option value="PG-13">PG-13</option>
            <option value="R">R</option>
            <option value="Adult">18+</option>
          </select>
        </div>

        <div
          className="registerformat"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            color: "black",
          }}
        >
          Review Ratings :
          <select
            name="m_reviews"
            value={movieInfo.m_reviews}
            onChange={(event) => {
              setMovie({
                ...movie,
                m_reviews: event.target.value,
              });
            }}
          >
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>

        <div
          className="registerformat"
          style={{ padding: "20px", color: "black" }}
        >
          <h1 style={{ padding: "10px" }}>Synopsis</h1>
          <label htmlFor="description"></label>
          <textarea
            style={{ padding: "10px" }}
            rows={10}
            cols={50}
            name="m_synopsis"
            defaultValue={movieInfo.m_synopsis}
            onChange={(event) => {
              setMovie({
                ...movie,
                m_synopsis: event.target.value,
              });
            }}
          />
        </div>

        <div
          className="registerformat"
          style={{ display: "flex", justifyContent: 'center',padding: "10px", color: "black" }}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name="m_showing"
                  checked={movieInfo.m_showing === 1} // Check if movie.m_showing is 1
                  onChange={(event) => {
                    const newValue = event.target.checked ? 1 : 0; // If checked, set to 1; otherwise, set to 0
                    setMovie({
                      ...movie,
                      m_showing: newValue,
                    });
                    console.log("m_showing:", newValue);
                  }}
                  sx={{
                    color: lightBlue[800],
                    "&.Mui-checked": { color: lightBlue[600] },
                  }}
                />
              }
              label="Currenty Showing"
            />
          </FormGroup>
        </div>

        <div style={{padding:'20px',display: "flex", justifyContent: 'center'}}>
        <button  type="submit" className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
        </div>
      </form>
    </body>
  );
}
