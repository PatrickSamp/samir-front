<template>
  <v-container class="processos">
    <v-card>
      <v-card-title>Processos vindos do Beremir</v-card-title>
      <v-card-subtitle
        >Aqui você encontra uma tabela de processos que passaram pela triagem do
        Beremir.</v-card-subtitle
      >
    </v-card>
    <v-card class="mt-5">
      <v-card>
        <bloco-informacoes
        :exibir="{tudo: BlocoDeInformacoes_tudo, processos: BlocoDeInformacoes_processos }"
        @dados="BlocoDeInformacoes_tudo = $event"
        @processos="BlocoDeInformacoes_processos = $event"></bloco-informacoes>
    </v-card>
     
    </v-card>
  </v-container>
</template>

<script>
import BlocoDeInformacoes from "../components/BlocoDeInformacoes.vue";
export default {
  components: {
    "bloco-informacoes": BlocoDeInformacoes,
  },


  name: "Processos",
  data: function () {
    return {
      numeroDoProcesso: "",
      nome: "",
      dataAjuizamento: "",
      cpf: "",
      dibInicial: "",
      dibFinal: "",
      rmi: "",
      beneficio: "",
      nb: "",
      dip: "",
      aps: "",
      headers: [
        { value: "nup", text: "NUP" },
        { value: "interessados", text: "Interessados " },
        { value: "actions" },
      ],
       BlocoDeInformacoes_tudo:true,
      BlocoDeInformacoes_processos: false,
    };
  },
  methods: {
    redirectToCalculo() {
      this.$router.push({ name: "home" })
    },
  },
};
</script>

<style>
.processos {
  height: auto;
  min-height: 120vh;
}
</style>
