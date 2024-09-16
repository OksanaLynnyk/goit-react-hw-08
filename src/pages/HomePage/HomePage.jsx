import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";

import { Typography } from "@mui/material";

const HomePage = () => {
  return (
    <>
      <DocumentTitle>Home</DocumentTitle>
      <Typography 
        variant="h1" 
        sx={{mt:5, 
             color:"rgb(244, 164, 96)", 
             textAlign:"center", pt: 20, 
             fontSize: '10vw'
        }}>
        PhoneBook
      </Typography>
      <Typography 
        variant="h6" 
        sx={{color:"rgb(107, 142, 35)", 
             textAlign:"center" 
        }}>
        Stay Organized, Stay Connected.
      </Typography>
    </>
  );
}

export default HomePage