<template>
  <v-app>
    <v-content>
      <v-container fluid class="pa-0">
        {{ verificaoLogin() }}
        <transition-group>
          <div key="page-template" v-if="this.$route.name != 'cadastrar' && this.$route.name != 'login'">
            <toolbar />
          </div>
          <div key="page">
            <Content />
            <br>
            <br>
            <!-- <SapiensLogin/> -->
            
          </div>
        </transition-group>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
/* import SapiensLogin from "../src/pages/Sapiens.vue" */
import Content from "./config/routes/Content.vue";
import Toolbar from "./components/Toolbar.vue";
/* import Cadastrar from "../src/pages/Cadastrar.vue" */
/* import LoginSapiens from "./pages/loginSapiens.vue" */

export default {
  name: "App",

  components: {
    Toolbar,
    Content,
    /* SapiensLogin, */
  },

  data: () => ({
    //
  }),
  methods: {
    verificaoLogin() {
      if ((localStorage.getItem("authToken") == "" || localStorage.getItem("authToken") == null) && (this.$route.name != "login" && this.$route.name != "cadastrar")) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authRefreshToken");
        localStorage.removeItem("sapiensCPF");
        localStorage.removeItem("Username");
        localStorage.removeItem("sapiensSenha");
        this.$router.push({ name: "login" })
      }
    }
  },
};
</script>
