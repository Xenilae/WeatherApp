<script>
export default {
  name: 'App',
  data () {
    return {
      api_key: "775703c427ebbbec12adddb1b10bb5b4",
      url_base: 'https://api.openweathermap.org/data/2.5/',
      query: "",
      weather: {}
    }
  },
  mounted() {
    if(localStorage.query) this.query = localStorage.query;
  },
  watch: {
    query(newQuery) {
      localStorage.query = newQuery
    },
  },
  methods: {
    fetchWeather (e) {
      if (e.key === "Enter") {
        fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
            .then(res => {
              return res.json();
            }).then(this.setResults);
      }
    },
    setResults (results) {
      this.weather = results;
    },
    showDate () {
      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
      return date;
    }
  }
}
</script>

<template>
  <div id="app" :class="typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : ''">
    <main>
      <div class="search-box">
        <input
            type="text"
            class="search-bar"
            placeholder="Search..."
            v-model="query"
            @keydown="fetchWeather"
        />
      </div>

      <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
        <div class="location-box">
          <div class="location">{{ weather.name }}, {{ weather.sys.country }}</div>
          <div class="date">{{ showDate() }}</div>
        </div>

        <div class="weather-box">
          <div class="temp">{{ Math.round(weather.main.temp) }}°C</div>
          <div class="weather">{{ weather.weather[0].main }}</div>
        </div>
      </div>
      <div class="weather-warning" v-else-if="typeof weather.main === 'undefined'">
        Type the name of the city you would like to see the weather, then press enter
      </div>
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "montserrat", sans-serif;
}

#app {
  background-image: url("./assets/cold-bg.jpg");
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}

#app.warm {
  background-image: url("./assets/warm-bg.jpg");
}

main {
  min-height: 100vh;
  padding: 25px;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
}

.search-box {
  width: 100%;
  margin-bottom: 30px;
}

.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 15px;

  color: #313131;
  font-size: 20px;
  appearance: none;
  border: none;
  outline: none;

  box-shadow: 0 0 16px rgba(0, 0, 0, 0.25);
  background: rgba(255, 255, 255, 0.25) none;
  border-radius: 16px;
  transition: 0.4s;
}

.search-box .search-bar:focus {
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 5px;
}

.location-box .location {
  color: #FFF;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}

.location-box .date {
  color: #FFF;
  font-size: 20px;
  font-weight: 300;
  text-align: center;
  font-style: italic
}

.weather-box {
  text-align: center;
}

.weather-box .temp{
  display: inline-block;
  padding: 30px 25px;
  color: #FFF;
  font-size: 102px;
  font-weight: 900;

  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  margin: 30px 0;
}

.weather-box .weather {
  color: #FFF;
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.30);
}

.weather-warning {
  color: #FFF;
  font-size: 50px;
  font-weight: 900;
  text-align: center;

  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

</style>
