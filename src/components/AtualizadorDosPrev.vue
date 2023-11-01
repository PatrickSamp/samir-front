<template>
  <body class="container">
    <div class="AtualizadorDosPrev">
      <v-btn :loading="loading" @click="atualizarDosPrev()" class="button-AtualizadorDosPrev" color="primary">
        Atualização de Dossiê Previdenciário
      </v-btn>
    </div>
  </body>
</template>
  
  <script>
import {AtualizacaoDossiePrevidenciario} from "../api/visao/triagem/AtualizacaoDossiePrevidenciario"
export default {
  name: "AtualizadorDosPrev",
  data() {
    return {
      loading: false,
      cpfSapiens: localStorage.getItem("sapiensCPF"),
      username: localStorage.getItem("username"),
      senhaSapaiens: localStorage.getItem("sapiensSenha"),
    };
  },
  mounted() {
    this.cpfSapiens = localStorage.getItem("sapiensCPF");
    this.username = localStorage.getItem("Username");
    this.senhaSapaiens = localStorage.getItem("sapiensSenha");
  },
  methods: {
    atualizarDosPrev() {
      this.$prompt(
        "Qual é o nome das etiquetas? as etiquetas não pode conter a palvra ATUALIZAÇAO e FALHA",
        "LEGOLAS"
      ).then((etiqueta) => {
        if (etiqueta) {
          const body = {
            login: {
              cpf: this.cpfSapiens,
              senha: this.senhaSapaiens,
            },
            etiqueta,
          };
          this.loading = true;

          AtualizacaoDossiePrevidenciario(body).then(async (response) => {
              this.$alert(
                response.length,
                "Dossiês Previdenciários atualizados: ",
                "success"
              );
              this.loading = false;
            })
            .catch((error) => {
              this.loading = false;
              this.$confirm(
                "Falha ao  atualizar os Dossiês Previdenciários ",
                "Error",
                "error"
              )
                .then((r) => {
                  console.log(r);
                  this.loading = false;
                })
                .catch(() => {
                  console.log("OK not selected.");
                  this.loading = false;
                });
              console.log(error.message);
              console.log("error.message");
            });
        }
      });
    },
  },
};
</script>
  
  <style>
.AtualizadorDosPrev {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.button-AtualizadorDosPrev {
  margin: 0;
}
</style>
  