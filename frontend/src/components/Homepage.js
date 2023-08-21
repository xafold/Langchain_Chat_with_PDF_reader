import { useState } from "react";
import { Grid } from "@mui/material";
import axios from "axios";
import "../static/css/Homepage.css";

function Homepage(props) {
    const [files, setFiles] = useState([]);
    const [msg, setMsg] = useState(null);
    const [dragOver, setDragOver] = useState(false);

    const handleFilesDrop = (e) => {
        e.preventDefault();
        const droppedFiles = [...e.dataTransfer.files];
        setFiles(droppedFiles);
        setDragOver(true);
    };

    const handleUpload = () => {
        setMsg(null);
        if (!files.length) {
            setMsg("No file selected");
            return;
        }

        const fd = new FormData();
        for (let i = 0; i < files.length; i++) {
            fd.append(`file${i + 1}`, files[i]);
        }

        setMsg("uploading.....");
        axios
            .post("/home/", fd, {
                headers: {
                    "Custom-Header": "value",
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                setMsg("Upload Successful");
                console.log(res.data);
                setFiles([]);
            })
            .catch((err) => {
                setMsg("Upload failed");
                console.log(err);
            });
    };

    return (
        <div className="homepage-container">
            <Grid container spacing={2} align="center">
                <Grid item xs={12} align="center">
                    <h1>Upload Your File</h1>
                    <div
                        className={`drop-zone ${dragOver ? "drag-over" : ""}`}
                        onDrop={handleFilesDrop}
                        onDragOver={(e) => {
                            e.preventDefault();
                            setDragOver(true);
                        }}
                        onDragLeave={() => setDragOver(false)}
                        onClick={() => setDragOver(false)}
                    >
                        {dragOver ? "Drop Files Here" : "Drag & Drop Files Here"}
                        {files.length > 0 && (
                            <div className="file-names">
                                {files.map((file, index) => (
                                    <div key={index}>{file.name}</div>
                                ))}
                            </div>
                        )}
                    </div>
                    <label className="choose-files-button">
                        Choose Files
                        <input
                            onChange={(e) => {
                                setFiles([...e.target.files]);
                                setDragOver(true);
                            }}
                            type="file"
                            multiple
                        />
                        {files.length > 0 && (
                            <div className="file-names">
                                {files.map((file, index) => (
                                    <div key={index}>{file.name}</div>
                                ))}
                            </div>
                        )}
                    </label>
                    {msg && <span className="error-msg">{msg}</span>}
                    <div className="buttons-container">
                        <button className="upload-button" onClick={handleUpload}>
                            Upload
                        </button>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default Homepage;
