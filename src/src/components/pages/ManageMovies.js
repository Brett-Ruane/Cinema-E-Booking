/* page for printing all movies */

import { useState, useEffect } from "react";
import "./ManageMovies.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ManageMovies({ Data }) {
  const [map_data, setmap_data] = useState(Data);

  useEffect(() => {
    // Initialize map_data when Data changes
    setmap_data(Data);
  }, [Data]);

  return (
    <>
      <div style={{display: "flex",justifyContent: "center",alignItems: "center",}}className="whole-map">
        {map_data.map((e) => (
          <div key={e.m_id} className="map-data">
            <Card sx={{ maxWidth: 345, maxHeight:360 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={e.m_poster}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <div className="map-name">
              <p className="">{e.m_title}</p>
            </div>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {e.m_synopsis}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
            
          </div>
        ))}
      </div>
    </>
  );
}
