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

const SchoolAdmissionForm = (props) => {
    //get History
    const {history} = props
    //MUI useStyles hook
    const classes = useStyles()

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

//------------------------------------------------------------------VALIDATION----------------------------------------------------------//
    
    const [form,setForm] = useState({Name : '', LastName : '', Class : '', Year: '', Marks : '' })
    const [formError,setFormError] = useState({Name : '', LastName : '', Class : '', Year: '', Marks : '' })
    const [formValid,setFormValid] = useState({Name : false, LastName : false, Class : false, Year: false, Marks : false, buttonActive : false })
    const [textfieldError, setTextfieldError] = useState({Name : false, LastName : false, Class : false, Year: false, Marks : false})

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
        const regex2 = new RegExp(/^[0-9]{1,}[A-Za-z]{0,}$/)
        switch(name){
            case 'Name':
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
            case 'LastName':
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
            case 'Class':
                if(value.length === 0){
                    modifiedFormError[name] = 'Field Required'
                    modifiedFormValid[name] = false
                    modifiedTextfieldError[name] = true
                }
                else if(!(regex2.test(value))){
                    modifiedFormError[name] = 'Only alphabets and numbers are allowed'
                    modifiedFormValid[name] = false
                    modifiedTextfieldError[name] = true
                }
                else{
                    modifiedFormError[name] = ''
                    modifiedFormValid[name] = true
                    modifiedTextfieldError[name] = false
                }
                break
            case 'Year':
                if (value.length === 0) {
                    modifiedFormError[name] = "Field Required"
                    modifiedFormValid[name] = false
                    modifiedTextfieldError[name] = true
                }
                if(Number(value) > 2017){
                    modifiedFormError[name] = 'Year of passing should not be after 2017'
                    modifiedFormValid[name] = false
                    modifiedTextfieldError[name] = true
                }
                else{
                    modifiedFormError[name] = ''
                    modifiedFormValid[name] = true
                    modifiedTextfieldError[name] = false
                }
                break
            case 'Marks':
                if (value.length === 0) {
                    modifiedFormError[name] = "Field Required"
                    modifiedFormValid[name] = false
                    modifiedTextfieldError[name] = true
                }
                if(Number(value) < 0 || Number(value) > 100){
                    modifiedFormError[name] = 'Percentage of marks should be between 0 to 100'
                    modifiedFormValid[name] = false
                    modifiedTextfieldError[name] = true
                }
                else{
                    modifiedFormError[name] = ''
                    modifiedFormValid[name] = true
                    modifiedTextfieldError[name] = false
                }
                break
            default: break
        }
        modifiedFormValid.buttonActive = modifiedFormValid.Name && modifiedFormValid.LastName && modifiedFormValid.Class
                                         && modifiedFormValid.Year && modifiedFormValid.Marks
        
        setFormError(modifiedFormError)
        setFormValid(modifiedFormValid)
        setTextfieldError(modifiedTextfieldError)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        let obj = form
        axios.post('http://localhost:3001/createAdmission',obj).then(response => {
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
    


//--------------------------------------------------JSX-------------------------------------------------------------//
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
                                    <TextField value={form.Name} error={textfieldError.Name} onChange={handleChange} className={classes.textfield} fullWidth variant='outlined' name='Name' type='text' label='First Name' /><br/>
                                    <Typography variant='button' className={classes.errorTypography}>{formError.Name}</Typography>
                                </Grid>
                                <Grid item xs={11} md={4}>
                                    <TextField value={form.LastName} error={textfieldError.LastName} onChange={handleChange} className={classes.textfield} fullWidth variant='outlined' name='LastName' type='text' label='Last Name' /><br/>
                                    <Typography variant='button' className={classes.errorTypography}>{formError.LastName}</Typography>
                                </Grid>
                                <Grid item xs={11} md={4}>
                                    <TextField value={form.Class} error={textfieldError.Class} onChange={handleChange} className={classes.textfield} fullWidth variant='outlined' name='Class' type='text' label='Class' /><br/>
                                    <Typography variant='button' className={classes.errorTypography}>{formError.Class}</Typography>
                                </Grid>
                            </Grid>
                            <br/>
                            <Divider/>
                            <br/>
                            <Grid container direction='row'>
                                <Grid item xs={false} md={2}/>
                                <Grid item xs={11} md={4}>
                                    <TextField value={form.Year} error={textfieldError.Year} onChange={handleChange} className={classes.textfield} fullWidth variant='outlined' name='Year' type='number' label='Year of passing' /><br/>
                                    <Typography variant='button' className={classes.errorTypography}>{formError.Year}</Typography>
                                </Grid>
                                <Grid item xs={11} md={4}>
                                    <TextField value={form.Marks} error={textfieldError.Marks} onChange={handleChange} className={classes.textfield} fullWidth variant='outlined' name='Marks' type='number' label='Percentage of marks' /><br/>
                                    <Typography variant='button' className={classes.errorTypography}>{formError.Marks}</Typography>
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
                                    <Button className={classes.textfield} color='primary' variant='outlined' fullWidth onClick={() => history.push('/admin-school-admission-list')}>Go to Admin - School Admission Form Page</Button>
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

export default SchoolAdmissionForm;