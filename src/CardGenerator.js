import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import data from './imagesData'

(pdfMake).vfs = pdfFonts.pdfMake.vfs;

const PI = "141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481"

export default function CardGenerator() {
    const [localData, setLocalData] = useState([...data])
    const [rows, setRows] = useState(4)
    const [columns, setColumns] = useState(5)
    const [disabled, setDisabled] = useState(true)
    const [name, setName] = useState("")
    const [document, setDocument] = useState(0)
    
    const [errors, setErrors] = useState("")

    const hasError = () => {
        let messages = []
        let error = false
        if(  rows * columns > localData.length){
            error = true
            messages.push("Rows * Columns canot be more than "+ localData.length)
        }
        if( rows > 4){
            error = true
            messages.push("Rows cannot be more than 4")
        }
        if( document === 0 || !document){
            error = true
            messages.push("Please fill a valid Document")
        }

        if(error){
            var finalString = ""
            messages.forEach(m => {
                finalString += m + " - "
            })
            setErrors(finalString.slice(0,-3))
        }else{
            setErrors("")
        }

        return error
    }

    const generateCard = (name, document) => {
        
        if(!hasError()){

        let body = []
        let images = {}
        let count = 0
        for (let i = 0; i < columns; i++) {
            let wBody = []
            for (let j = 0; j < rows; j++) {
                let random = parseInt( (parseInt(PI.charAt(count)) * document * columns * rows) % localData.length)
                let image = localData.splice(random , 1)
                if(image.length > 0){
                    wBody.push([
                        {image: image[0].photo, 
                        width: 70,
                        height: 70},{
                            text:image[0].name
                        }]
                        )
                    images[image[0].photo] = image[0].url
                    count++
                }
            }
            body.push(wBody)
        }
        const docDefinition = {
            content: [
                { text:"Card for: "+ name, alignment: 'center'},
                {
                    layout: {
                        defaultBorders: true
                    }, // optional
                    table: {
                    // headers are automatically repeated if the table spans over multiple pages
                    // you can declare how many rows should be treated as headers
                    headerRows: 1,
                    widths: [ '*', '*', '*', '*' ],
            
                    body: body
                    }
                }
            ],
            images: images
        }
        pdfMake.createPdf(docDefinition).download();
        setLocalData([...data])
        }
    }
    return (
        <Grid container justifyContent="center"  direction="row" style={{marginTop: 20}}>
            <Grid item xs></Grid>
            <Grid container justifyContent="center"  direction="column" style={{marginTop: 20}}>
                <TextField disabled={disabled} id="rows" label="Rows" value={rows} onChange={(e) => setRows(parseInt(e.target.value) ? parseInt(e.target.value)  : 0)} />
                <TextField disabled={disabled} id="columns" label="Columns" value={columns}  onChange={(e) => setColumns(parseInt(e.target.value) ? parseInt(e.target.value)  : 0)} />

                <TextField id="name" label="Name" value={name}  onChange={(e) => setName(e.target.value ?e.target.value  : "")} />
                <TextField id="document" label="Document" value={document}  onChange={(e) => setDocument(parseInt(e.target.value) ? parseInt(e.target.value)  : 0)} />

                {errors && errors!== "" && 
                errors.split("-").map(e => {
                    return (<Alert severity="error" variant="filled" style={{margin:10}}>{e}</Alert>
                    )
                })
                }

                <Button onClick={() => generateCard(name, document)} color="primary" variant="contained" style={{margin:5}}> Generate </Button>
                <Button onClick={() => setDisabled(!disabled)} color="primary" variant="contained" style={{margin:5}}> {disabled ? "Activate" : "Deactivate"} rows and columns </Button>
            
            </Grid>
            <Grid item xs></Grid>

        </Grid>
    )
}
