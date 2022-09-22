<script>
import ShowWeather from "@/components/show-weather";

export default {
  component: {
    "show-weather": ShowWeather,
  },
};
</script>
<template>
  <show-weather></show-weather>
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
</style>
