<template>
  <header class="main-header">
    <div class="container">
      <a class="main-logo" href="https://confianza.pe">
        <img
          src="https://confianza.pe/img/2021/05/logo.png"
          alt="Logo"
          height="50"
        />
      </a>
      <nav id="nav" class="main-nav">
        <header-links></header-links>
      </nav>
      <button id="button-menu" class="button-menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
</template>

<script>
import HeaderLinks from "./HeaderLinks.vue";

export default {
  components: {
    "header-links": HeaderLinks,
  },
  mounted() {
    const toggleButton = document.getElementById("button-menu");
    const navWrapper = document.getElementById("nav");

    toggleButton.addEventListener("click", () => {
      toggleButton.classList.toggle("close");
      navWrapper.classList.toggle("show");
    });

    navWrapper.addEventListener("click", (e) => {
      if (e.target.id === "nav") {
        navWrapper.classList.remove("show");
        toggleButton.classList.remove("close");
      }
    });
  },
};
</script>
