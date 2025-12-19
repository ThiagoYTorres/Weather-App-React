import React, {useState} from 'react';

function App() {

  const [weather, setWeather] = useState()
  const [estado, setEstado] = useState()
  const [lugar, setLugar] = useState('')
  const key = import.meta.env.VITE_API_KEY

  const language = 'pt'
  
  React.useEffect( () => {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${lugar}&limit=3&appid=${key}&lang=${language}`)
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
      
  },[lugar])

  function searchWeather(formData){
    const input = formData.get('lugar')
    setLugar(input)
  }
  return (
   
    <main>
      <div className='clima-search'>
        <form action={searchWeather}>
          <input type='text' className='lugar' name='lugar'></input>
        </form>
        {console.log(lugar)}
        <span className="material-symbols-outlined s" >search</span>
      </div>
      
      {weather && <section className='clima'>
        <div className='clima-content'>
            <div className='location'>
              <span className='loc'>{weather.name}, {estado[0].state}</span>
              <span className='country'>{weather.sys.country}</span>
            </div>
              
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
              className='weather-icon'></img> 
            <div>
              <h1 className='weather'>{weather.main.temp} °C</h1>
            </div>
            <div className='outrasInfo-cont'>
              <span>{weather.main.humidity}</span>
              <span>{weather.wind.speed}</span>
            </div>
        </div>
        
        
        
        </section>}
    </main>
  )
}

export default App