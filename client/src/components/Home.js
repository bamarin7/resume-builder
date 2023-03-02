import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import axios from 'axios';

const Home = ({ setResult }) => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [currentPosition, setCurrentPosition] = useState('');
  const [currentLength, setCurrentLength] = useState(1);
  const [currentTechnologies, setCurrentTechnologies] = useState('');
  const [headshot, setHeadshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [companyInfo, setCompanyInfo] = useState([{ name: '', positon: '' }]);

  // This will update the state with the user's input
  const handleAddCompany = () => setCompanyInfo([...companyInfo, { name: '', position: ''}]);

  // This will remove a selected item from the list
  const handleRemoveCompany = (index) => {
    const list = [...companyInfo];
    list.splice(index, 1);
    setCompanyInfo(list);
  };

  // This will update an item within the list
  const handleUpdateCompany = (e, index) => {
    const { name, value } = e.target;
    const list = [...companyInfo];
    list[index][name] = value;
    setCompanyInfo(list);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('headshotImage', headshot, headshot.name);
    formData.append('fullname', fullName);
    formData.append('currentPosition', currentPosition);
    formData.append('currentLength', currentLength);
    formData.append('ccurrentTechnologies', currentTechnologies);
    formData.append('workHistory', JSON.stringify(companyInfo));
    axios
      .post('http://localhost:4000/resume/create', formData, {})
      .then((res) => {
        console.log(res.data.data)
        if (res.data.message) {
          setResult(res.data.data);
          navigate('/resume');
        }
      })
      .catch((err) => console.error(err));
    setLoading(true);
  };

  // This will render the Loading component when you submit the form
  if (loading) {
    return <Loading />;
  }
  return (
    <div className='app'>
      <h1>Resume Builder</h1>
      <p>Generate a resume with ChatGPT in a few seconds!</p>
      <form
        onSubmit={handleFormSubmit}
        method='POST'
        encType='multipart/form-data'
      >
        <label htmlFor='fullName'>Enter your full name</label>
        <input
          type='text'
          required
          name='fullName'
          id='fullName'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <div className='nestedContainer'>
          <div>
            <label htmlFor='currentPOsition'>Current Position</label>
            <input
              type='text'
              required
              name='currentPositon'
              className='currentInput'
              value={currentPosition}
              onChange={(e) => setCurrentPosition(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='currentLength'>For how long? (years)</label>
            <input
              type='number'
              required
              name='currentLength'
              className='currentInput'
              value={currentLength}
              onChange={(e) => setCurrentLength(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='currentTechnologies'>Technology stack</label>
            <input
              type='text'
              required
              name='currentTechnologies'
              className='currentInput'
              value={currentTechnologies}
              onChange={(e) => setCurrentTechnologies(e.target.value)}
            />
          </div>
        </div>
        <label htmlFor='photo'>Upload your headshot!</label>
        <input
          type='file'
          name='photo'
          required
          id='photo'
          accept='image/x-png,image/jpeg'
          onChange={(e) => setHeadshot(e.target.files[0])}
        />
        {companyInfo.map((company, index) => (
          <div className='nestedContainer' key={index}>
            <div className='companies'>
              <label htmlFor='name'>Company Name</label>
              <input
                type='text'
                name='name'
                required
                onChange={(e) => handleUpdateCompany(e, index)}
              />
            </div>
            <div className='companies'>
              <label htmlFor='position'>Position Held</label>
              <input
                type='text'
                name='position'
                required
                onChange={(e) => handleUpdateCompany(e, index)}
              />
            </div>

            <div className='btn__group'>
              {companyInfo.length - 1 === index && companyInfo.length < 4 && (
                <button id='addBtn' onClick={handleAddCompany}>
                  Add
                </button>
              )}
              {companyInfo.length > 1 && (
                <button id='deleteBtn' onClick={() => handleRemoveCompany(index)}>
                  Del
                </button>
              )}
            </div>
          </div>
        ))}

        <button>Work your magic!</button>
      </form>
    </div>
  );
};

export default Home;