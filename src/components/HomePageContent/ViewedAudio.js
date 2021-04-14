import React, { Component,useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import ImportContactsOutlinedIcon from "@material-ui/icons/ImportContactsOutlined";
import CloudDownloadOutlinedIcon from "@material-ui/icons/CloudDownloadOutlined";
import { IconButton} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { setPdfURL } from "../../store/personalDevelopment/actionCreator";
import carasoul1 from '../../images/carasoul1.png'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'left',
      maxWidth: 450,
      paddingLeft : 10,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    fonts:{
        fontSize:20,
        fontStyle: 'italic',
        align: 'left',
        fontWeight : 'bold',
       color:'darkgreen'
       
    },
  }));


function ViewedAudio() {
    const [viewedAudio, setViewedAudio] = useState([]);
    const [error, setError] = useState(null);
    const classes = useStyles();
   const history= useHistory();
 

    useEffect(() => {
        fetch("http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/users/23/recently_viewed_books?book_type=AUDIO_BOOK")
           .then(res => res.json())
           .then(
             (result) => {
                 
                     setViewedAudio(result);
                     console.log(result)
                },
             (error) => {
                setError(error);
             }
           )
           
       }, [])

       const handleRoute = (route) => {
        history.push(`${route}`)
      };

     
       return(
           
        <div>
           <IconButton className={classes.backArrow} aria-label="delete">
                  <ArrowBackIcon onClick={() => handleRoute('/')} />
                </IconButton>
        <text className={classes.fonts}>Recently Viewed Audio Books</text> 
         <Divider variant="middle" />
         <ul>
 {viewedAudio.map(item => (
     <div className={classes.root}>
   <Paper className={classes.paper}>
     <Grid container spacing={2}>
     <Grid item xs={12} sm container>
       <Grid item>
         <ButtonBase className={classes.image}>
           <img className={classes.img} alt="complex" src={item.book.thumbnail_url}
           onError={(e)=>{e.target.onerror = null; e.target.src= carasoul1}}
           onClick={
             () => 
             handleRoute(`/audiobook/${item.book.file_name}/${item.book.title}`)
                 
          } />
         </ButtonBase>
       </Grid>
     
         <Grid item xs container direction="column" spacing={2}>
           <Grid item xs>
             <Typography gutterBottom variant="subtitle1">
               {item.book.title}
             </Typography>
             <Typography variant="body2" gutterBottom>
               Author: {item.book.author}
             </Typography>
             <Typography variant="body2" color="textSecondary">
               Category: {item.book.category}<br/>
               Page No. {item.book.total_pages}
             </Typography>
           </Grid>
           <Grid item>
             {/* <IconButton aria-label="delete">
               <ImportContactsOutlinedIcon  onClick={() => readClicked(item.pdflink)}/>
             </IconButton>
             <IconButton aria-label="delete">
               <a href={item.pdflink} download={item.title}><CloudDownloadOutlinedIcon /></a>
             </IconButton> */}
           </Grid>
         </Grid>
       </Grid>
     </Grid>
   </Paper>
 </div>
          
))}
</ul>

     </div>
       )
           
        
 }

export default ViewedAudio