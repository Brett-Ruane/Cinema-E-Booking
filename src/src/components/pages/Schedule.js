/* page for scheduling movies */

import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function Schedule() {
  const [select, setSelected] = useState("");
  const [optionList, setOptionList] = useState([]);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [theater, setTheater] = useState(0);
  const [showtime, setShowtime] = useState({
    date: "",
    time: "",
    theater: 0,
    m_id: 0,
  });

  const handleTimeChange = (event) => {
    const selectedTime = event.$d;
    const formattedTime = dayjs(selectedTime).format("HH:mm");
    setTime(formattedTime + ":00");
  };

  const handleTheaterChange = (event) => {
    setTheater(event.target.value);
  };

  //   const handleM_idChange = (event) => {
  //     setM_id(event.target.value);
  //   };

  const handleDateChange = (newDate) => {
    const month = (newDate.$M + 1).toString().padStart(2, "0");
    const dateString = `${newDate.$y}-${month}-${newDate.$D}`;
    setDate(dateString);
  };

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
  }, []);

  useEffect(() => {
    if (select) {
      fetchMovie();
      console.log(movie);
    }
  }, [select]);

  async function scheduleMovie(updatedShowtime) {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/showtime/getConflict?date=${date}&theater=${theater}&time=${time}`
      );
      const { data } = response;
      if (response.status === 200) {
        console.log(data);
        if (data === true) {
          alert("Movie already scheduled at that time");
        } else {
          try {
            const response = await axios.post(
              "http://localhost:8080/api/showtime/add",
              updatedShowtime
            );
            if (response.status === 200) {
              alert("Movie Scheduled");
              window.location.assign("http://localhost:3000/manage");
            } else {
            }
          } catch (error) {
            console.log(error);
          }
        }
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

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
          } else {
            //error handle section
          }
        })
        .catch((error) => console.log(error));
    }
  };
  const [movieInfo, setMovieInfo] = useState([]);
  const [movie, setMovie] = useState([]);

  async function handleSubmit() {
    try {
      const updatedShowtime = {
        ...showtime,
        date: date,
        time: time,
        theater: theater,
        m_id: movieInfo.m_id,
      };
      await setShowtime(updatedShowtime);
      await scheduleMovie(updatedShowtime);
    } catch (error) {
      console.log(error);
    }
    console.log(showtime);
    /* do not schedule the movie if the start time and the movie title matches with an existing schedule */
    // window.location.assign("http://localhost:3000/schedule");
  }

  return (
    <body style={{ backgroundColor: "crimson" }}>
      <h1
        style={{
          backgroundColor: "crimson",
          fontSize: "30px",
          color: "black",
          padding: "30px",
        }}
      >
        Schedule Movies
      </h1>

      <h2 style={{ color: "black" }}>Showing Date</h2>

      <div 
        style={{ display: "flex", justifyContent: 'center',padding: "10px", color: "black" }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              value={date}
              onChange={handleDateChange}
              label="Movie Date"
              variant="solid"
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>

      <div
        style={{ display: "flex", justifyContent: 'center',padding: "10px", color: "black" }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["TimePicker"]}>
            <TimePicker
              value={time}
              onChange={handleTimeChange}
              label="Movie Start Time"
              defaultValue={dayjs("2022-04-17T00:00")}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>

      <div
        style={{ padding: "10px", color: "black" }}
      >
        Theater # :
        <select onChange={handleTheaterChange}>
          <option value={1}>01</option>
          <option value={2}>02</option>
          <option value={3}>03</option>
          <option value={4}>04</option>
          <option value={5}>05</option>
          <option value={6}>06</option>
          <option value={7}>07</option>
          <option value={8}>08</option>
          <option value={9}>09</option>
          <option value={10}>10</option>
          <option value={11}>11</option>
          <option value={12}>12</option>
        </select>
      </div>
      <h3 style={{ padding: "10px", color: "black" }}>
        Select Movie to Show :
      </h3>
      <div classname="registerformat">
        <select
          disabled={false}
          value={select}
          onChange={(e) => setSelected(e.currentTarget.value)}
        >
          {optionList.map(
            (e) =>
              e.m_showing !== 0 && <option key={e.m_id}>{e.m_title}</option>
          )}
        </select>
      </div>
      
      <div style={{padding:'20px'}}>
      <button type="submit" className="submit-btn" onClick={handleSubmit}>
        Submit
      </button>
      </div>
    </body>
  );
}
