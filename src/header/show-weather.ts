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
          .then(this.setResults);
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
