import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import LocationInfo from './components/LocationInfo'
import ResidentInfo from './components/ResidentInfo'
import getRandomLocation from './Utils/getRandomLOcation'


function App() {
  
  const [location, setLocation] = useState()
  const [numberLocation, setNumberLocation] = useState(getRandomLocation())
  const [hasError, setHasError] = useState(false)
  const [listLocation, setListLocation] = useState()
  const [isShow, setIsShow] = useState(true)
  const [loading, setLoading] = useState(false)
  const imgLoa = 'public/loa.webp'

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${numberLocation}`
    setLoading(true)
    axios.get(url)
    .then(res => {setLocation(res.data)
    setHasError(false)
    })
    .catch(err =>{ console.log(err)
    setHasError(true)
    })
    .finally(()=> setLoading(false))
  }, [numberLocation])
  
  const handleSubmit = e => {
    e.preventDefault()
    if(e.target.inputLocation.value.trim().length === 0){
      setNumberLocation(getRandomLocation)
    }else{
      setNumberLocation(e.target.inputLocation.value.trim())
    }
    e.target.inputLocation.value = e.target.inputLocation.value.trim()
  } 
  const handleChange = e => {
    const url = `https://rickandmortyapi.com/api/location/?name=${e.target.value.trim()}`
    axios.get(url)
    .then(res => setListLocation(res.data.results))
    .catch(err => console.log(err)) 
    setIsShow(true)
  }
  
  // const handleFocus = () => setIsShow(true)
  // const handleBlur = () => setIsShow(false)
  // const handleClickList = id => setNumberLocation(id)
  
  return (
    <div className="app" onClick={() => setIsShow(false)}>
      <>
      <img className='img_baner' src='https://static.posters.cz/image/hp/66133.jpg' alt="" />
      </>
      
      <form className='form' onSubmit={handleSubmit}>
        <input 
        className='form_input'
        id='inputLocation' 
        type="text" 
        onChange={handleChange}
        // onFocus={handleFocus}
        // onBlur={handleBlur}
        />
        <button className='form_btn'>Search</button> 
      </form>
        
      {
        isShow &&
        <div className="lo">
          <ul className='ul_list'>
          {
            listLocation?.map(loc=>(
              <li onClick={()=>setNumberLocation(loc.id)} key={loc.id}>{loc.name}</li>
            ))
          }
        </ul>
        </div>
        
      }
      
      {
        loading ?
        <img className='img_load' src='https://play-lh.googleusercontent.com/fXQVXTma1ENwAFjsxJ4IT6GntBr3RxWP3HMSLbNdvycl-0tscOQEeJIEAmehcNOt5hCp=w600-h300-pc0xffffff-pd' alt="" />
        :
        hasError ?
        <>
          <h2 className='app_error'>❌ Hey! you must provide an id from 1 to 126 🥺</h2>
          <img className='img_error' src='https://images.squarespace-cdn.com/content/v1/5a553ed8c027d8cb5b2b6aeb/1519712033920-XTR6HWA3IQLCRTHLB46I/404error+message.jpg?format=1000w' alt="" />
        </>
          
        
          
        :
          <>
            <LocationInfo location={location} />
            <div className='resident_container'>
              {
                location?.residents.map(url => (
                  <ResidentInfo
                    key={url}
                    url={url}
                  />
                ))
              }
            </div>
          </>
      }
    </div>
  )
}

export default App
