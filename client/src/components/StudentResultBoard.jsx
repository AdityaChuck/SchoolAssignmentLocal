import React, { useState,useEffect } from 'react';
//Material-ui Imports
import {Grid, Divider, Typography,
        Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@material-ui/core'
import {createMuiTheme, ThemeProvider, makeStyles} from '@material-ui/core/styles'
import {green} from '@material-ui/core/colors'
//import data/data.json
// import Data from '../data/data.json'
//Our REST API is ready. Lets fetch data from that
//we will need axios
import axios from 'axios'
//makeStyles from MUI
const useStyles = makeStyles((theme) => ({
    typography : {
        textAlign : "center"
    },
    table: {
        minWidth: 650,
    },
    topper:{
        color:'green'
    },
    pass:{
        color:'black'
    },
    fail:{
        color:'red'
    },
    heading:{
        fontWeight:'bold'
    },
    subHeading:{
        fontStyle:'italic'
    }
}))


//make a MUI theme
const theme = createMuiTheme({
    palette: {
        primary: green,
    }
})

const StudentResultBoard = () => {

    //useStyles hook
    const classes = useStyles()
    
    //state for table data
    const [tableData,setTableData] = useState([])

    //Helper function to capitalize first character
    const firstCharacterCapitalize = (data) => {
        data.forEach(item => {
            const firstName = item.name.split(' ')[0]
            let modifiedFirstName = firstName.charAt(0).toUpperCase()
            for(let i=1;i<firstName.length;i++){
                modifiedFirstName += firstName.charAt(i)
            }
            item.name = modifiedFirstName
        })
        return data
    }

    
    let [errorMessage, setErrorMessage] = useState('')

    


    

    //useEffect on first render to process the table data and set it to the state
    useEffect(() => {

        //helper function to process the data to get it in desired form
    const dataProcess = (data) => {
            //sort the names as per alphabetical order
            const arr = data.map(item => item.name)
            arr.sort()
            let dataArray = []
            arr.forEach(name => {
                data.forEach(item => {
                    if (item.name === name) {
                        dataArray.push(item)
                    }
                })
            });
            //function that capitalizes the first character of names
            dataArray = firstCharacterCapitalize(dataArray)
            console.log('dataArray ---> ', dataArray);
            //now lets design the data to fed into the table
            //Data that should go into the td(s) should be in the following format   ----->
            //{"Student Name" : '', "Roll Number" : '', "Total Marks" : '', "Status" : ''  }

            let finalData = dataArray.map(item => {
                let tempObj = {}
                tempObj['name'] = item.name
                tempObj['rollNumber'] = item.rollNumber
                let totalMarks = 0
                for (let prop in item.marks) {
                    totalMarks += Number(item.marks[prop])
                }
                tempObj['totalMarks'] = totalMarks
                let status = ''
                let color = ''
                for (let prop in item.marks) {
                    if (Number(item.marks[prop]) < 20) {
                        status = 'Fail'
                        color = classes.fail
                        break
                    }
                    else {
                        status = 'Pass'
                        color = classes.pass
                    }
                }
                tempObj['status'] = status
                tempObj['color'] = color
                return tempObj
            })

            //Get the topper and assign his/her status to be Topper
            let totalMarksArray = finalData.map(item => item.totalMarks)
            const highestMark = Math.max(...totalMarksArray)
            const index = totalMarksArray.indexOf(highestMark)
            finalData[index]['status'] = 'Topper'
            finalData[index]['color'] = classes.topper
            return finalData
        }

//----------------------------------------fetch the data-----------------------------------------------------------------------------------//
        axios.get('http://localhost:3001/getResults').then(response => {
            console.log('data.message ---> ', response.data.message);
            if (response.data.message && response.data.message.length !== 0) {
                const data = dataProcess(response.data.message)
                setTableData(data)
                setErrorMessage('')
            }
        }).catch(err => {
            setErrorMessage(err.response.data.message)
        })
    }, [classes.pass,classes.fail,classes.topper])

//----------------------------------------------------------JSX------------------------------------------------------------------------//
    return (
        <>
            <ThemeProvider theme={theme}>
                <br/>
                <Typography color='primary' variant='h4' className={classes.typography}>
                    STUDENT RESULT BOARD
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
                                    <TableCell className={classes.heading}>STUDENT RESULT BOARD</TableCell>
                                    <TableCell  ></TableCell>
                                    <TableCell  ></TableCell>
                                    <TableCell  ></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.subHeading}>Student Name</TableCell>
                                    <TableCell className={classes.subHeading} align="right">Roll Number</TableCell>
                                    <TableCell className={classes.subHeading} align="right">Total Marks</TableCell>
                                    <TableCell className={classes.subHeading} align="right">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row" className={row.color}>
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right" className={row.color}>{row.rollNumber}</TableCell>
                                        <TableCell align="right" className={row.color}>{row.totalMarks}</TableCell>
                                        <TableCell align="right" className={row.color}>{row.status}</TableCell>
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

export default StudentResultBoard;