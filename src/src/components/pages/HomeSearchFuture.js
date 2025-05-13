import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import "./HomeSearch.css";

export default function HomeSearchFuture({ Data }) {
  const [map_data, setmap_data] = useState(Data);

  useEffect(() => {
    // Initialize map_data when Data changes
    setmap_data(Data);
  }, [Data]);

  function searchdata(e) {
    var i, td, filter, txtValue;
    filter = e.target.value.toLowerCase();
    var show_datas = [];
    for (i = 0; i < Data.length; i++) {
      td = Data[i];
      if (td && td.m_title && !td.m_showing) {
        txtValue = td.m_title;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
          show_datas.push(Data[i]);
        }
      }
    }
    var arr = show_datas.filter(function (item, index, inputArray) {
      return inputArray.indexOf(item) === index;
    });

    // Update map_data directly to trigger re-render
    setmap_data(arr);
  }

  return (
    <>
      <div className="search-bar">
        <h1 style={{color: 'black'}}>Search :</h1>
        <input type="search" onChange={searchdata}></input>
      </div>
      <div style={{display: "flex",justifyContent: "center",alignItems: "center",}}className="whole-map">
        {map_data.map(
          (e) =>
            e.m_showing === 0 && (
              <div style={{background: 'black', border: 'black'}} key={e.m_id} className="map-data">
                    
                <Card sx={{ maxWidth: 345, maxHeight:400, background: "crimson" }}>
                  <a style= {{display: "flex", justifyContent: "center", alignItems: "center", background: "crimson", padding: "10px"}}
                      href= {e.m_trailer}
                      target="_blank"
                    >
                      <button style={{paddingLeft: '10px', paddingRight: '10px'}}>Trailer</button>
                  </a>
                <CardActionArea>
                <CardMedia 
                  component="img"
                  height="200"
                  image={e.m_poster}
                />
                <CardContent >
                <Typography gutterBottom variant="h5" component="div">
                <div className="map-name">
                  <p className="">{e.m_title}</p>
                </div>
                </Typography>
                <Typography  variant="body2" color="text.secondary">
                  {e.m_synopsis}
                </Typography>
                  
                </CardContent>
                  
                </CardActionArea>
                  
                </Card>
              </div>
            )
        )}
      </div>
    </>
  );
}
