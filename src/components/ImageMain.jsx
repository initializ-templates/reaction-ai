// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import Loading from './Loading';
import '../assets/Main2.css';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

function ImageMain() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState(null);
    const [image, setImage] = useState('default.jpg');
    const [loading, setLoading] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        setImage(URL.createObjectURL(file));
    }

    const handleSubmit = async (event) => 
    {
        event.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('image', selectedImage);
            formData.append('question', question);
    
            const response = await axios.post('https://a-i-img-backend.test.psi.initz.run/upload', formData, 
            {
                headers: 
                {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            // Handle the response as needed
            if (response.status === 200) 
            {
                console.log('Image uploaded successfully');
                console.log('Generated Text:', response.data);
                setAnswer(response.data);
                setShowAnswer(true); 
            } 
            else 
            {
                console.error('Image upload failed');
                
            }
        } 
        catch (error) 
        {
            console.error('Error:', error);
            setAnswer('Error fetching data due to image size or some internal error');
            setShowAnswer(true);
        }
        finally
        {
            setLoading(false);
        }
    }

    return (
        <>
            <div className='container' style={{
                marginTop:"150px",
                color:"black",
            }}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
                <input type="text" name="question" value={question} onChange={(event) => setQuestion(event.target.value)} />
                <button type="submit">Upload</button>
            </form>
          
            <div>
                {image && <img src={image} alt="image" style={{width:'400px',}} className='input-img'/>}
                <div style={{textAlign:'left',display:'flex',justifyContent:'center'}}>
                    {showAnswer && <ReactMarkdown remarkPlugins={[gfm]}>{answer}</ReactMarkdown>}
                </div>
               
            </div>
            </div>
        
            {loading && <Loading/>}
        </>
    );
}

export default ImageMain;