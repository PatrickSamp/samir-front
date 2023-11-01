<template>
  <v-app-bar class="pl-0 pdf-hidden default-toolbar" app color="rgb(194, 216, 235)" fixed dark clipped-left>
    <img class="logo-bar" height="90" max-height="90" src="../assets/logo2.png" />
    <v-spacer />
    <div class="logged">
      <span class="pr-3" style="color: black">{{ valid }}</span>
      <v-avatar color="indigo" size="36">
        <span class="white--text text-h5">{{ username[0] + username[1] }}</span>
      </v-avatar>
      <v-btn icon @click="logout()">
        <v-icon color="black">mdi-export</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import axios from "axios";
import { samirControle } from "../global";
export default {
  name: "Toolbar",
  data() {
    return {
      username: "",
      tentativa: 0,
    }
  },
  computed: {
    valid() {
      if (this.username == null || this.username == "") {
        /* eslint-disable */
        this.tentativa++
        this.getUsuario()
      }
      if (this.tentativa > 3) {
        this.logout()
      }
      return this.username
    }
  },
  methods: {
    getUsuario() {
      let baseURL = `${samirControle}users`;
       axios.get(baseURL, {
        headers: {
          'authorization': `bearer ${localStorage.getItem("authToken")}`
        }
      }).then((response) => {
        /* localStorage.setItem("sapiensCPF", response.data.cpf); */
        localStorage.setItem("Username", response.data.userName);
      /*   localStorage.setItem("sapiensSenha", response.data.passwordSapiens); */
        this.username = response.data.userName;
       /*  this.$router.push({ name: "login" }) */
        this.$router.push({ name: "sapienslogin" })
      })
        .catch((error) => {
          this.logout()
          console.log(error.response.data);
        });
    },
    logout() {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authRefreshToken");
      localStorage.removeItem("sapiensCPF");
      localStorage.removeItem("Username");
      localStorage.removeItem("sapiensSenha");
      localStorage.removeItem("sapiensSenha")
      this.$router.push({ name: "login" })
    },
  },
  mounted() {
    this.getUsuario()
  }
};
</script>

<style lang="scss">
.default-toolbar {
  .v-toolbar__extension {
    padding: 0;
  }

  img {
    height: 50px !important;
  }

  z-index: 9 !important;
}

.z-index {
  z-index: 9 !important;
}

.logged {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>