<template>
    <v-layout class="login-layout my-5" align-center justify-center row fill-height>
      <v-card class="login pa-5" color="#F3F3F3">
        <v-toolbar dark color="primary">
          <span class="pa-3 title"> Login Sapiens </span>
        </v-toolbar>
  
        <v-form class="pa-3" v-model="valid" lazy-validation>
          <v-text-field v-model="cpf" :rules="nameRules" label="CPF SAPIENS" @keydown.enter="loginUsuarioSapiens" required></v-text-field>
  
          <v-text-field v-model="senha" :rules="passwordRules" label="SENHA SAPIENS" :type="showPassword ? 'text' : 'password'" required @keydown.enter="loginUsuarioSapiens">
            <template v-slot:append>
        <v-icon @click="showPassword = !showPassword">
          {{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }} <!-- Ícone de visibilidade -->
        </v-icon>
      </template></v-text-field>
          <v-btn depressed :loading="loading" color="primary" @click="loginUsuarioSapiens">LOGIN</v-btn>
        </v-form>
      </v-card>
    </v-layout>
  </template>

<script>
import { VerificarUserSapiens } from '../api/verificar_login_sapiens_visao/users';
import { ValidationTokenSapiens } from '../api/verificar_login_sapiens_visao/validationTokenSapiens'
export default {
  name: "SapiensLogin",
  data: () => {
    return {
      cpf: "",
      senha: "",
      showPassword: false,
      valid: true,
      nameRules: [(v) => !!v || "Digite o Nome!"],
      passwordRules: [
        (v) => !!v || "Digite a Senha!",
        (v) => (v && v.length >= 6) || "Senha com menos de 6 caracteres!",
      ],
      loading: false,
    };
  },
  methods: {
    async getUsuarioSapiens() {
        await ValidationTokenSapiens().then(() => this.$router.push({ name: "home" }))
      
    },
    async loginUsuarioSapiens() {
      let body = {
        cpf: this.cpf,
        senha: this.senha,
      };
      try {
        this.loading = true;
        console.log("ENTROU AQUI")
        await VerificarUserSapiens(body);
        localStorage.setItem("sapiensCPF", body.cpf);
        localStorage.setItem("sapiensSenha", body.senha);
        this.loading = false;
        this.valid = true;
        this.$router.push({ name: "home" })
 /*        window.open("http://10.191.8.198:8080/home"); */
      } catch (error) {
        this.loading = false;
        let message = await error.message;
        console.log(message);
        console.log("message");
        this.valid = false;
        this.$alert(message, "Usuário Sapiens Incorreto", "error", {
          confirmButtonText: "Got it!",
        });
        /* this.$router.push({ name: "sapienslogin" }) */
      }
    },
  },
  mounted() {
    this.getUsuarioSapiens()
  }
};
</script>

<style>
  .login-layout {
    /* width: 100%; */
    height: auto;
    /* min-height: 110vh; */
    background-color: F3F3F3;
    /* display: flex;
    justify-content: center; */
  }
  
  #cadastrar {
    margin-left: 320px;
  }
  
  .login {
    margin-top: 100px;
    width: 600px;
  }
  </style>




























