//Make necessary imports
import React, { useState } from 'react';
//Material-ui Imports 
import {Grid,TextField,Divider,Button,Typography,Snackbar} from '@material-ui/core'
import {makeStyles,createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import {green} from '@material-ui/core/colors'
//Alert from Mui/lab
import MuiAlert from '@material-ui/lab/Alert';
//import axios
import axios from 'axios'


//core function for snackbar
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//MUI useSTyles
const useStyles = makeStyles({
    typography : {
        textAlign : "center"
    },    
    errorTypography : {
        color : 'red',
        marginLeft : '10px',
        textAlign: 'center'
    },
    textfield:{
        margin:'10px'
    }
})


//make an MUI theme
const theme = createMuiTheme({
    palette: {
        primary: green,
    }
})


const AdminStudentResultForm = (props) => {
    const classes = useStyles()
    //get History
    const {history} = props

    //snackbar state and handler
    const [open,setOpen] = useState(false)
    const handleClose = (e,reason) => {
        if(reason === 'clickaway'){
            return
        }
        setOpen(false)
    }
    const [successMessage,setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

//-----------------------------------------------VALIDATION------------------------------------------------------------//
const [form,setForm] = useState({name:'', rollNumber:'', Maths:'', English:'', Science:''})
const [formError,setFormError] = useState({name:'', rollNumber:'', Maths:'', English:'', Science:''})
const [formValid,setFormValid] = useState({name:false, rollNumber:false, Maths:false, English:false, Science:false,buttonActive:false})
const [textfieldError, setTextfieldError] = useState({name:false, rollNumber:false, Maths:false, English:false, Science:false})

//handleChange
const handleChange = e => {
    const {name,value} = e.target
    setForm({ ...form, [name]: value })
    validate(name,value)
}

const validate = (name,value) => {
    let modifiedFormError = formError
    let modifiedFormValid = formValid
    let modifiedTextfieldError = textfieldError
    const regex1 = new RegExp(/^[A-Za-z ]+$/)
    switch(name){
        case 'name' : 
            if(value.length === 0){
                modifiedFormError[name] = 'Field Required'
                modifiedFormValid[name] = false
                modifiedTextfieldError[name] = true
            }
            else if(value.length > 20){
                modifiedFormError[name] = 'Length can not be more that 20'
                modifiedFormValid[name] = false
                modifiedTextfieldError[name] = true
            }
            else if(!(regex1.test(value))){
                modifiedFormError[name] = 'Only alphabets are allowed'
                modifiedFormValid[name] = false
                modifiedTextfieldError[name] = true
            }
            else{
                modifiedFormError[name] = ''
                modifiedFormValid[name] = true
                modifiedTextfieldError[name] = false
            }
            break
        case 'rollNumber' : 
            if(value.length === 0){
                modifiedFormError[name] = 'Field Required'
                modifiedFormValid[name] = false
                modifiedTextfieldError[name] = true
            }
            else{
                modifiedFormError[name] = ''
                modifiedFormValid[name] = true
                modifiedTextfieldError[name] = false
            }
            break
        case 'Maths' : 
            if (value.length === 0) {
                modifiedFormError[name] = 'Field Required'
                modifiedFormValid[name] = false
                modifiedTextfieldError[name] = true
            }
            else if(Number(value)<0||Number(value)>50)
            {
                modifiedFormError[name] = 'Marks should be between 0 and 50'
                modifiedFormValid[name] = false
                modifiedTextfieldError[name] = true
            }
            else {
                modifiedFormError[name] = ''
                modifiedFormValid[name] = true
                modifiedTextfieldError[name] = false
            }
            break
        case 'English':
            if (value.length === 0) {
                modifiedFormError[name] = 'Field Required'
                modifiedFormValid[name] = false
                modifiedTextfieldError[name] = true
            }
            else if (Number(value) < 0 || Number(value) > 50) {
                modifiedFormError[name] = 'Marks should be between 0 and 50'
                modifiedFormValid[name] = false
                modifiedTextfieldError[name] = true
            }
            else {
                modifiedFormError[name] = ''
                modifiedFormValid[name] = true
                modifiedTextfieldError[name] = false
            }
            break
        case 'Science':
            if (value.length === 0) {
                modifiedFormError[name] = 'Field Required'
                modifiedFormValid[name] = false
                modifiedTextfieldError[name] = true
            }
            else if (Number(value) < 0 || Number(value) > 50) {
                modifiedFormError[name] = 'Marks should be between 0 and 50'
                modifiedFormValid[name] = false
                modifiedTextfieldError[name] = true
            }
            else {
                modifiedFormError[name] = ''
                modifiedFormValid[name] = true
                modifiedTextfieldError[name] = false
            }
            break
        default : break  
    }
    modifiedFormValid.buttonActive = modifiedFormValid.name && modifiedFormValid.rollNumber && modifiedFormValid.Maths
                                         && modifiedFormValid.English && modifiedFormValid.Science
        
    setFormError(modifiedFormError)
    setFormValid(modifiedFormValid)
    setTextfieldError(modifiedTextfieldError)
}

//----------------------------------------------------formSubmission-----------------------------------------------//
const handleSubmit = (e) => {
    e.preventDefault()
    let obj = {name:form.name,marks:{Maths:form.Maths, English:form.English, Science:form.Science},rollNumber:form.rollNumber}
    axios.post('http://localhost:3001/createResult',(obj)).then(response => {
        if(response.data.message){
            setSuccessMessage(response.data.message)
            setErrorMessage('')
            setOpen(true)
        }
    }).catch(err => {
        setSuccessMessage('')
        setErrorMessage(err.response.data.message)
        setOpen(true)
    })
    
}

//---------------------------------------------------------JSX-------------------------------------------------------//

    return (
        <>
          <ThemeProvider theme={theme}>
                <br/>
                <Typography color='primary' variant='h4' className={classes.typography}>
                    SCHOOL ADMISSION FORM
                </Typography>
                <br/>
                <Divider/>
                <br/>
                <Grid container direction='row'>
                    <Grid item xs={false} md={1}/>
                    
                        <Grid item xs={12} md={10}>
                            <form>
                            <Grid container direction='row'>
                                <Grid item xs={11} md={4}>
                                    <TextField value={form.name} error={textfieldError.name} onChange={handleChange} className={classes.textfield} fullWidth variant='outlined' name='name' type='text' label='Name' /><br/>
                                    <Typography variant='button' className={classes.errorTypography}>{formError.name}</Typography>
                                </Grid>
                                <Grid item xs={11} md={4}>
                                    <TextField value={form.rollNumber} error={textfieldError.rollNumber} onChange={handleChange} className={classes.textfield} fullWidth variant='outlined' name='rollNumber' type='text' label='Roll Number' /><br/>
                                    <Typography variant='button' className={classes.errorTypography}>{formError.rollNumber}</Typography>
                                </Grid>
                                <Grid item xs={11} md={4}>
                                    <TextField value={form.Maths} error={textfieldError.Maths} onChange={handleChange} className={classes.textfield} fullWidth variant='outlined' name='Maths' type='number' label='Marks in Maths' /><br/>
                                    <Typography variant='button' className={classes.errorTypography}>{formError.Maths}</Typography>
                                </Grid>
                            </Grid>
                            <br/>
                            <Divider/>
                            <br/>
                            <Grid container direction='row'>
                                <Grid item xs={false} md={2}/>
                                <Grid item xs={11} md={4}>
                                    <TextField value={form.English} error={textfieldError.English} onChange={handleChange} className={classes.textfield} fullWidth variant='outlined' name='English' type='number' label='Marks in English' /><br/>
                                    <Typography variant='button' className={classes.errorTypography}>{formError.English}</Typography>
                                </Grid>
                                <Grid item xs={11} md={4}>
                                    <TextField value={form.Science} error={textfieldError.Science} onChange={handleChange} className={classes.textfield} fullWidth variant='outlined' name='Science' type='number' label='Marks in Science' /><br/>
                                    <Typography variant='button' className={classes.errorTypography}>{formError.Science}</Typography>
                                </Grid>
                                <Grid item xs={false} md={2}/>
                            </Grid>
                            <br/>
                            <Divider/>
                            <br/>
                            <Grid container direction='row'>
                                <Grid item xs={false} md={4}/>
                                <Grid item xs={11} md={4}>
                                    <Button className={classes.textfield} color='primary' 
                                    variant='outlined' fullWidth disabled={!formValid.buttonActive}
                                    type='button' onClick={handleSubmit}
                                    >
                                    Submit</Button>
                                </Grid>
                                <Grid item xs={false} md={4}/>
                            </Grid>
                            </form>
                            <br/>
                            <Divider/>
                            <br/>
                            <Grid container direction='row'>
                                <Grid item xs={false} md={4}/>
                                <Grid item xs={11} md={4}>
                                    <Button className={classes.textfield} color='primary' variant='outlined' fullWidth onClick={() => history.push('/')}>Go to Student Result Board</Button>
                                </Grid>
                                <Grid item xs={false} md={4}/>
                            </Grid>
                        </Grid>
                   
                    <Grid item xs={false} md={1}/>
                </Grid>
          </ThemeProvider>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={errorMessage.length===0?'success':'error'}>
                    {
                        errorMessage.length === 0?
                        successMessage:
                        errorMessage
                    }
                </Alert>
            </Snackbar>

        </>
    );
};

export default AdminStudentResultForm;
