import { useState } from "react";
import { Grid, } from "@mui/material"
import axios from "axios";


function Homepage(props) {
    const [files, setFiles] = useState(null);
    const [progress, setProgress] = useState({started:false, pc:0});
    const [msg, setMsg] =useState(null);
    const handleUpload = () => {
        if (!files) {
            setMsg("No file selected");
            return;
        }

        const fd = new FormData();
        for (let i=0; i<files.length; i++){
            fd.append(`file${i+1}`, files[i]);
        }

        setMsg("uploading.....");
        setProgress(prevState => {
            return {...prevState, started:true}
        })
        axios.post('/home/', fd, {
            onUploadProgress:(progressEvent) => {setProgress(prevState =>{
                return {...prevState, pc:progressEvent.progress*100 }
            }) },
            headers:{
                "Custom-Header":"value",
                "Content-Type":"multipart/form-data",
            }
        })
        .then(res=>{
            setMsg("Upload Successful");
            console.log(res.data);
        })
        .catch(err=>{
            setMsg("Upload failed");
            console.log(err);

        });
    }

    return (
        <div>
            <Grid container spacing={1} align ="center">
                <Grid item xs={12} alig="center">
                    <h1>
                        Upload your file
                    </h1>
                    <input onChange={ (e) => { setFiles(e.target.files) }} type="file" multiple/>
                    <button onClick={handleUpload}>Upload</button>
                    {progress.started && <progress max="100" value={progress.pc}></progress>}
                    {msg && <span>{msg}</span>}
                </Grid>
            </Grid>
        </div>
    );
}
export default Homepage;
