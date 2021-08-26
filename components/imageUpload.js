import React from 'react';
import {useState} from 'react'
import {API_URL} from "@/config/index";

export default function ImageUpload({evtId, imageUploaded}) {
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('files', image);
        formData.append('ref', 'events');
        formData.append('refId', evtId);
        formData.append('field', 'image');
        const res = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            body: formData
        });

        if (res.ok){
            imageUploaded()
        }

    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0])
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange}/>
                <input type="submit" className="btn btn-primary d-block w-100 mt-5" value="Upload"/>
            </form>
        </div>
    );
}
