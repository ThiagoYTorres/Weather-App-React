import React, {useState} from 'react';

function App() {

  const [weather, setWeather] = useState()
  const [estado, setEstado] = useState()
  const [lugar, setLugar] = useState('')
  const key = import.meta.env.VITE_API_KEY

  const language = 'pt'

  
  React.useEffect( () => {
    if(lugar !== ''){
      fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${lugar}&limit=3&appid=${key}&lang=${language}`)
      .then( resp => resp.json())
      .then( data  => {
        setEstado(data)
        console.log(data)
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=${key}&units=metric`)
          .then( resp => resp.json())
          .then( data2 => {
          console.log(data2)
          setWeather(data2)
        })
      })
    }
  },[lugar])

  function searchWeather(event){
    event.preventDefault()
    const form = event.currentTarget
    console.log(form)
    const formData = new FormData(form)
    const input = formData.get('lugar') 
    setLugar(input)
    form.reset()
  }

  return (
   
    <main>
      <div className='container'>
      <div className='clima-search'>
        <form onSubmit={searchWeather}>
          <input type='text' className='lugar' name='lugar'></input>
          <button>
          <span className="material-symbols-outlined s">search</span>

          </button>
        </form>
       
      </div>
      
      {weather && <section className='clima'>
        <div className='clima-content'>
            
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
              className='weather-icon'></img> 
            <div>
              <h1 className='weather'>{(weather.main.temp).toFixed(1)}°C</h1>
            </div>
            
            <div className='location'>
              <span className='loc'>{weather.name} </span>
              <span className='country'>{weather.sys.country} </span>
              
            </div>
              <span className='estado'>{estado[0].state}</span>
            <div className='outrasInfo-cont'>
             
              <div className='umidade'>
                <span className="material-symbols-outlined u" >water</span> 
                <p>{weather.main.humidity}%</p>
              </div>
              
              <div className='wind'>
                <span className="material-symbols-outlined w">air</span>
                <p> {weather.wind.speed} km/h</p>
              </div>
              
            </div>
        </div>
        
        
        
        </section>}
        </div>
    </main>
  )
}

export default App