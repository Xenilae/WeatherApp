<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",

  data() {
    return {
      api_key: "775703c427ebbbec12adddb1b10bb5b4",
      url_base: "https://api.openweathermap.org/data/2.5/",
      query: "",
      weather: {},
    };
  },
  mounted() {
    if (localStorage.query) this.query = localStorage.query;
  },
  watch: {
    query(newQuery) {
      localStorage.query = newQuery;
    },
    showError(e) {
      // eslint-disable-next-line no-empty
      try {
      } catch (e) {
        console.log(e);
      }
    },
  },
  methods: {
    fetchWeather(e: { key: string }) {
      if (e.key === "Enter") {
        fetch(
          `${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`
        )
          .then((res) => {
            return res.json();
          })
          .then(this.setResults)
          .then(
            (res) => {
              console.log("ja");
            },
            (res) => {
              if (res.status === 404) {
                console.log("no");
                console.log(res);
              }
            }
          );
      }
    },
    setResults(results: number) {
      this.weather = results;
    },
    showDate() {
      const current = new Date();
      return `${current.getDate()}/${
        current.getMonth() + 1
      }/${current.getFullYear()}`;
    },
  },
});
</script>
<template>
  <div
    id="app"
    :class="
      typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : ''
    "
  >
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
          <div class="location">
            {{ weather.name }}, {{ weather.sys.country }}
          </div>
          <div class="date">{{ showDate() }}</div>
        </div>

        <div class="weather-box">
          <div class="temp">{{ Math.round(weather.main.temp) }}°C</div>
          <div class="weather">{{ weather.weather[0].main }}</div>
        </div>
      </div>
      <div
        class="weather-warning"
        v-else-if="typeof weather.main === 'undefined'"
      >
        Name a city
      </div>
    </main>
  </div>
</template>
<style scoped>
#app {
  background-image: url("../assets/cold-bg.jpg");
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}
#app.warm {
  background-image: url("../assets/warm-bg.jpg");
}
main {
  min-height: 100vh;
  padding: 25px;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.75)
  );
}
.search-box {
  width: 50%;
  margin-bottom: 10px;
}
.search-box .search-bar {
  top: 2vh;
  left: 24vw;
  align-self: center;
  display: block;
  position: relative;
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
.location-box {
  position: relative;
  left: 38vw;
  top: 5vh;
}
.location-box .location {
  color: #fff;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}
.location-box .date {
  color: #fff;
  font-size: 20px;
  font-weight: 300;
  text-align: center;
  font-style: italic;
}
.weather-box {
  text-align: center;
  position: relative;
  left: 38vw;
  bottom: 20vh;
}
.weather-box .temp {
  display: inline-block;
  bottom: 20px;
  color: #fff;
  font-size: 40px;
  font-weight: 900;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  margin: 10px 0;
}
.weather-box .weather {
  color: #fff;
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.3);
}
.weather-warning {
  color: #fff;
  font-size: 50px;
  font-weight: 300;
  text-align: center;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
</style>
