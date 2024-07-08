/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import '../assets/Main.css'; // Import the CSS file for styling
import Loading from './Loading';
import Submit from './Submit';

const YourComponent = () => {
  const [inputData, setInputData] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await axios.post('https://ai-text-backend.test.psi.initz.run/',{
          prompt: inputData,
        });

      const data = res.data;
      setResponse(data.response);
      setShowResponse(true); 
    } catch (error) {
      setResponse('Error fetching data');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    setShowResponse(false);
  }, [inputData]);

  return (
    <>
    <div className='main-container' style={{
      marginTop:"150px",
      color:"black",
    }}>
      <input
        type="text"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder="Enter data..."
        name='prompt'
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            fetchData();
          }
        }}
        autoComplete='off'
        className='input'
      />
         
        <button onClick={fetchData} disabled={loading} type='submit' className='fetch-button' style={{margin:'0',padding:0, marginLeft:20,marginBottom:10, color: 'black'}}>
            {loading ? "Fetching" : <Submit/>}
        </button>
        
        </div>
        {loading ? <Loading/> : ''}
        

        <div className={`response-container ${showResponse ? 'incoming' : ''}`} style={{ textAlign: 'left',display:'flex',justifyContent:'center',flexDirection:'column',color:'Black'}}>
        <ReactMarkdown remarkPlugins={[gfm]}>{response}</ReactMarkdown>
        </div>



        
   
    </>
  );
};

export default YourComponent;
