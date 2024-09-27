'use client';

import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import style from './styles/module/page.module.css';
import 'react-toastify/dist/ReactToastify.css';

interface City {
  id: number;
  nome: string;
}

export default function Home() {
  const [city, setCity] = useState('goiania'); // Estado para a cidade
  const [cities, setCities] = useState<City[]>([]); // Estado para armazenar cidades

  const forecast = `${process.env.NEXT_PUBLIC_BASE_URL}/forecast.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${city}`;

  const [temperature, setTemperature] = useState(null);
  const [minTemperature, setMinTemperature] = useState(0);
  const [maxTemperature, setMaxTemperature] = useState(0);
  const [chanceRain, setChanceRain] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind_kph, setWind_kph] = useState(0);

  const forecastAPI = async () => {
    try {
      const response = await fetch(forecast, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        toast.error(`Erro ao buscar previsão do tempo`);
        return;
      }

      const data = await response.json();
      const currentTemp = data.current.temp_c;
      const maxTemp = data.forecast.forecastday[0].day.maxtemp_c;
      const minTemp = data.forecast.forecastday[0].day.mintemp_c;
      const chanceOfRain = data.forecast.forecastday[0].day.daily_chance_of_rain;
      const humidity = data.current.humidity;
      const wind = data.current.wind_kph;

      setTemperature(currentTemp);
      setMinTemperature(minTemp);
      setMaxTemperature(maxTemp);
      setChanceRain(chanceOfRain);
      setHumidity(humidity);
      setWind_kph(wind);
    } catch (error) {
      toast.error(`Erro: ${error}`);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios');
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
    }
  };

  useEffect(() => {
    fetchCities(); // Busca cidades ao montar o componente
  }, []);

  useEffect(() => {
    forecastAPI(); // Atualiza a previsão quando a cidade muda
  }, [city]);

  const handleCityChange = (e: any) => {
    setCity(e.target.value); // Atualiza a cidade selecionada
  };

  const progressValueWind = wind_kph <= 20 ? 'green' : wind_kph > 20 && wind_kph <= 61 ? 'orange' : 'red';
  const progressValueHumidity = humidity <= 30 ? 'red' : humidity > 30 && humidity <= 40 ? 'orange' : 'green';
  const messageValueHumidity = humidity <= 30 ? 'PERIGO!' : humidity > 30 && humidity <= 40 ? 'ALERTA!' : 'NORMAL!';
  const messageprogressValueWind = wind_kph <= 20 ? 'NORMAL!' : wind_kph > 20 && wind_kph <= 61 ? 'ALERTA!' : 'PERIGO!';
  const progressValueChanceOfRain = chanceRain !== null ? ((chanceRain - 0) / (100 - 0)) * 100 : 0;
  const progressValueTemp = temperature !== null ? ((temperature - minTemperature) / (maxTemperature - minTemperature)) * 100 : 0;

  return (
    <>
      <main>
        <ToastContainer />

        <div className={style.containerAll}>
        <div className={style.containerSelect}>
            {/* Select das cidades */}
            <label htmlFor="city"><h4 className={style.titleSelect}>Selecione uma cidade:</h4></label>
            <select id="city" value={city} onChange={handleCityChange} className={style.select}>
              {cities.map((city) => (
                <option key={city.id} value={city.nome}>
                  {city.nome}
                </option>
              ))}
            </select>
        </div>
          <div className={style.divContent}>
            <div className={style.divTitle}>
              <h5 className={style.title}>Últimas ocorrências</h5>
              <h5 className={style.Namecity}>Dados de: {city}</h5>
            </div>

            {/* Previsão de chuva */}
            <div className={style.containerData}>
              <div className={style.typeDataAndValue}>
                <h1 className={style.value}>{chanceRain}%</h1>
                <p className={style.type}>Chuva</p>
              </div>
              <div className={style.maxMinProgressBarContainer}>
                <div className={style.maxMin}>
                  <div className={style.min}>
                    <p>Min.: 0%</p>
                  </div>
                  <div className={style.max}>
                    <p>Máx.: 100%</p>
                  </div>
                </div>
                <div className={style.DivprogressBar}>
                  <div
                    className={style.progressBar}
                    style={{ width: `${progressValueChanceOfRain}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Previsão de temperatura */}
            <div className={style.containerData}>
              <div className={style.typeDataAndValue}>
                <h1 className={style.value}>{temperature}°C</h1>
                <p className={style.type}>Temperatura</p>
              </div>
              <div className={style.maxMinProgressBarContainer}>
                <div className={style.maxMin}>
                  <div className={style.min}>
                    <p>Min.: {minTemperature}°C</p>
                  </div>
                  <div className={style.max}>
                    <p>Máx.: {maxTemperature}°C</p>
                  </div>
                </div>
                <div className={style.DivprogressBar}>
                  <div
                    className={style.progressBar}
                    style={{ width: `${progressValueTemp}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Previsão de umidade */}
            <div className={style.containerData}>
              <div className={style.typeDataAndValue}>
                <h1 className={style.value}>{humidity}%</h1>
                <p className={style.type}>Umidade</p>
              </div>
              <div className={style.maxMinProgressBarContainer}>
                <div className={style.maxMin}>
                  <p>Umidade atual: {humidity}%</p>
                </div>
                <div className={style.bar}>
                  <div className={style.DivprogressBar}>
                    <div
                      className={style.progressBar}
                      style={{
                        width: '100%',
                        backgroundColor: `${progressValueHumidity}`,
                      }}
                    ></div>
                  </div>
                  <div className={style.divMessageAlertHumidity}>
                    <p>{messageValueHumidity}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Previsão de velocidade do vento */}
            <div className={style.containerData}>
              <div className={style.typeDataAndValue}>
                <h1 className={style.value}>{wind_kph} km/h</h1>
                <p className={style.type}>Velocidade do Vento</p>
              </div>
              <div className={style.maxMinProgressBarContainer}>
                <div className={style.maxMin}>
                  <p>Velocidade do vento: {wind_kph} km/h</p>
                </div>
                <div className={style.bar}>
                  <div className={style.DivprogressBar}>
                    <div
                      className={style.progressBar}
                      style={{
                        width: '100%',
                        backgroundColor: `${progressValueWind}`,
                      }}
                    ></div>
                  </div>
                  <div className={style.divMessageprogressValueWind}>
                    <p>{messageprogressValueWind}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
