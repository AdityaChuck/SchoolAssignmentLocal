//necessary imports
import React from 'react';

//Material-ui Imports
import {Grid, Button, Divider} from '@material-ui/core'
import {createMuiTheme, ThemeProvider, makeStyles} from '@material-ui/core/styles'
import {green} from '@material-ui/core/colors'

//react-router-dom imports
import {Switch,Route,Link} from 'react-router-dom'

//Import Components
import StudentResultBoard from './components/StudentResultBoard'
import SchoolAdmissionForm from './components/SchoolAdmissionForm'
import AdminSchoolAdmissionList from './components/AdminSchoolAdmissionList'
import AdminStudentResultForm from './components/AdminStudentResultForm'

//make a MUI theme
const theme = createMuiTheme({
  palette: {
    primary: green,
  }
})

//makeStyles form MUI
const useStyles = makeStyles((theme) => ({
  appbar:{
    backgroundColor:'white'
  },
  primaryGrid:{
    marginLeft : '20px',
    marginRight : '20px'
  },
  button:{
    fontSize:'13px',
    textAlign:'center',
    fontWeight : 'bolder'
  }
}))


const App = () => {
  const classes = useStyles()
  return (
    <>
    <ThemeProvider theme={theme}>
        <br/>
          <Grid container direction='row'>
            <Grid item xs={false} md={2}/>
            <Grid item xs={12} md={2}>
              <Button color='primary' component={Link} to='/' className={classes.button}>
                  Student result board
              </Button> 
            </Grid>
            <Grid item xs={12} md={2}>
              <Button color='primary' component={Link} to='/admission-form' className={classes.button}>
                  School Admission Form
              </Button>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button color='primary' component={Link} to='/admin-school-admission-list' className={classes.button}>
                  Admin - School Admission List
              </Button>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button color='primary' component={Link} to='/admin-student-result-form' className={classes.button}>
                  Admin - Student Result Form
              </Button>
            </Grid>
            <Grid item xs={false} md={2}/>
          </Grid>
          <br/>
          <Divider/>
    </ThemeProvider>
    <Switch>
      <Route exact path='/' render={(props) => <StudentResultBoard {...props}/>}/>
      <Route exact path='/admission-form' render={(props) => <SchoolAdmissionForm {...props}/>}/>
      <Route exact path='/admin-school-admission-list' render={(props) => <AdminSchoolAdmissionList {...props}/>}/>
      <Route exact path='/admin-student-result-form' render={(props) => <AdminStudentResultForm {...props}/>}/>
    </Switch>
    </>
  );
};

export default App;