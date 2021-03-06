import React from 'react';
import {
  Container,
  makeStyles,
  Divider,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Page from 'src/components/Page';
import MyCard from './card.js';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';
import TopBar from './topbar'
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.white,
    minHeight: '100%',
	padding:theme.spacing(10),
  },
  paginationStyle:{
  	  margin:theme.spacing(5),
  	  display:"flex",
  	  justifyContent:"center",
  },
  TabPanelStyle:{
  	  padding:0,
	  marginTop :40,
  }
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box >
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
const HotView = () => {
	const classes = useStyles();
	const [state,setState]=React.useState({"cardJson":[],"value":0});
	const [pageNumber,setPageNumber]=React.useState(1);
	let topvalue=0;
	let url='http://localhost:8010/employPage/hotList';
	function handlePage(e,number){
		setPageNumber(number);
	}
	const handleChange = (event, newValue) => {
	    topvalue=newValue; 
		// console.log(topvalue);
		let req={"hot":topvalue};
		requestService(req);
	  };
	const requestService=(req)=>{
	  axios.get(url,{params:req}).then(r => {
		let cardJson=r.data;
		setState({"cardJson":cardJson,"value":topvalue});
		// console.log(state);
	  },e=>{
		console.log(e);
	  });
	};
	React.useEffect(()=>{
		if(state.cardJson.length==0||state==null){
			let req={"hot":topvalue};
			requestService(req);
		}
	})
  return (
    <Page
      className={classes.root}
      title='热门招聘'
    >
	  <TopBar 
		handleChange={handleChange}
		value={state.value}
		/>
      <Divider/>
      <TabPanel value={topvalue} index={0} className={classes.TabPanelStyle}>
        <Grid
          container
          spacing={3}
      	>
			{state.cardJson.slice(12*pageNumber-12,12*pageNumber).map((s,i)=>(
				<Grid
				  item
				  lg={4}
				  sm={6}
				  xl={4}
				  xs={12}
				  key={i}
				>
				<MyCard 
					data={s}
				  />
				</Grid>
			))}
        </Grid>
      </TabPanel>
       <Pagination 
			count={Math.ceil(state.cardJson.length/12)} 
			className={classes.paginationStyle}
			onChange={handlePage}
			page={pageNumber}
			>
       </Pagination>
    </Page>
  );
};

export default HotView;
