//necessary imports
import React, { useState, useEffect} from 'react';
//Material-UI imports
import {Grid,Divider,Typography,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@material-ui/core'
import {makeStyles,createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import {green} from '@material-ui/core/colors'
//import axios
import axios from 'axios'

// MUI-makeStyles
const useStyles = makeStyles((theme) => ({
    typography : {
        textAlign : "center"
    },
    table: {
        minWidth: 650,
    }
}))

//make a MUI theme
const theme = createMuiTheme({
    palette: {
        primary: green,
    }
})

//-------------------------------------------------------------useStyles-----------------------------------------------------------------//
const AdminSchoolAdmissionList = () => {

    //fetch data from the API link
    const [tableData,setTableData] = useState([])
    const [errorMessage,setErrorMessage] = useState('')
    useEffect(() => {
        axios.get('http://localhost:3001/getAdmissions').then(response => {
            if(response.data.message && response.data.message.length !==0){
                setTableData(response.data.message)
                setErrorMessage('')
            }
        }).catch(err => {
            setTableData([])
            setErrorMessage(err.response.data.message)
        })
    })

    const classes = useStyles()
    return (
        <>
            <ThemeProvider theme={theme}>
                <br/>
                <Typography color='primary' variant='h4' className={classes.typography}>
                    ADMIN - STUDENT ADMISSION LIST
                </Typography>
                <br/>
                <Divider />  
                <br/>
                <Grid container direction='row'>
                    <Grid item xs={false} md={1}/>
                    <Grid item xs={12} md={10}>
                    {
                        errorMessage.length === 0 ? <TableContainer component={Paper} elevation={0}>
                        <Table className={classes.table} size='small'>
                            <TableHead>
                                <TableRow>
                                    <TableCell >STUDENT ADMISSION LIST</TableCell>
                                    <TableCell  ></TableCell>
                                    <TableCell  ></TableCell>
                                    <TableCell  ></TableCell>
                                    <TableCell  ></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell >First Name</TableCell>
                                    <TableCell  align="center">Last Name</TableCell>
                                    <TableCell  align="center">Class</TableCell>
                                    <TableCell  align="center">Year of passing</TableCell>
                                    <TableCell  align="center">Percentage of marks</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.map((row) => (
                                    <TableRow key={row.Name}>
                                        <TableCell  component="th" scope="row" className={row.color}>
                                            {row.Name}
                                        </TableCell>
                                        <TableCell key={row.LastName} align="center" >{row.LastName}</TableCell>
                                        <TableCell key={row.Class} align="center" >{row.Class}</TableCell>
                                        <TableCell key={row.Year} align="center" >{row.Year}</TableCell>
                                        <TableCell key={row.Marks} align="center" >{row.Marks}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>:
                    <Typography style={{color:'red'}} variant='h6' className={classes.typography}>
                        {errorMessage}
                    </Typography>
                    }
                    </Grid>
                    <Grid item xs={false} md={1}/>  
                </Grid>
            </ThemeProvider>
        </>
    );
};

export default AdminSchoolAdmissionList;