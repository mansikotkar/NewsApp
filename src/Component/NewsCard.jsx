import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { Button } from "@mui/material";
import { Link } from "react-router-dom";
let languageDitactor=localStorage.getItem("language")
languageDitactor=JSON.parse(languageDitactor)

export default function NewsCardas({ data }) {
 

  return (
    <>
      {data?.data?.map((ele) => {
        return (
          <>
            <Card sx={{ display: "flex"  }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" , }}>
                  <Typography component="div" variant="h5" >
                    
                    {ele?.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ color: "text.secondary" }}
                  >
                    {ele?.content}
                  </Typography>
                </CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                >
                 <Link to={ele?.readMoreUrl} target="_blank"><Button variant="contained">Read More</Button></Link>  
                </Box>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 300  
                    ,height: 260,
                    marginTop:'10',
                    padding:1
                  }}
                image={ele?.imageUrl}
                alt={"News Image"}
              />
            </Card>
            <br></br>
          </>
        );
      })}

    </>
  );
}
