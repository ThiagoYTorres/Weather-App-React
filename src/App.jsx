import {useState, useEffect} from 'react';
import { MoonLoader } from 'react-spinners'

function App() {

  const [weather, setWeather] = useState()
  const [estado, setEstado] = useState()
  const [lugar, setLugar] = useState('')
  const [loading,setLoading] = useState(false)

  const key = import.meta.env.VITE_API_KEY

  const language = 'pt'

  
  useEffect( () => {
    async function getWeather(){
      
      if(lugar !== ''){
        try{
          const resp = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${lugar}&limit=3&appid=${key}&lang=${language}`)
          const data = await resp.json()
          setLoading(true)
      if (!data || data.length === 0){
        throw new Error('Cidade não encontrada')
      }
        setEstado(data)
        const secondRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=${key}&units=metric`)
        const data2 = await secondRes.json()
        setWeather(data2)
        setLoading(false)
        }
      catch(error){
        console.log(error)
        setWeather(null)
        setEstado(null)
        setLoading(false)
      }
      
      }
    }
    getWeather()

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
        
        <MoonLoader
              color="#ffffff"
              speedMultiplier={0.7}
              size={40}
              loading={loading}
            />

      { weather === null ? <div className='erro'>
        <span className="material-symbols-outlined">cloud_alert</span>
        <h1>CIDADE NÃO ENCONTRADA</h1> 
        <p>Verifique se a cidade está escrita corretamente.</p>
      </div>
      : null }
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
                <div className='data'> 
                  <span className="material-symbols-outlined u" >water</span> 
                  <p>{weather.main.humidity}%</p>
                </div> 
                <p className='about'>Umidade</p>
              </div>
              
              <div className='wind'>
                <div className='data'>  
                  <span className="material-symbols-outlined w">air</span>
                  <p> {weather.wind.speed} <span className='km'>km/h</span></p>
                </div>
                <p className='about'>Vento</p>
              </div>
              
            </div>
        </div>
        
        
        
        </section>}
        
        </div>
       
    </main>
  )
}

export default App