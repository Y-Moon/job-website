import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  let url='http://127.0.0.1:8010/company/candidateList';
  let data=[{"id":-1,"name":"","state":"","school":"","phone":"","date":""}];
  const [candidate,setCandidate] = useState(data);
  const requestDate=(data)=>{
	  axios.get(url,{params:data}).then(resp=>{
		  console.log(resp);
		  if(resp.data.length!=0){
			console.log(resp.data);
			setCandidate(resp.data);
		  }
	  },error=>{
	  		  console.log(error);
	  });
  }
  React.useEffect(()=>{
	  console.log("effect is run...");
	  if(candidate[0].id==-1){
		let username=document.cookie;
		username=username.split('=')[1];
		let data={'username':username}
		console.log(data);
		console.log(username);
		requestDate(data);
	  }
  }
  );
  return (
    <Page
      className={classes.root}
      title="广场"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Results customers={candidate} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
