<template>
    <v-container fluid id="app">
        <v-alert prominent id="alerta" type="error" v-if="verificadoInformacao">
            <v-row align="center">
                <v-col class="grow">
                    {{ alertTexto }}
                </v-col>
                <v-col class="shrink">
                    <v-btn @click="verificadoInformacao = false">Fechar</v-btn>
                </v-col>
            </v-row>
        </v-alert>
        <div class="title pl-5 py-3">
            <h1>Samir</h1>
        </div>
        <v-card>
            <v-tabs>
                <v-tabs-slider color="green"></v-tabs-slider>
                <v-tab @click="add_taxa = false">Cálculo</v-tab>
                <v-tab @click="acessoPortalADM()">Portal ADM</v-tab>
            </v-tabs>
        </v-card>
        <PortalADM v-if="add_taxa" />
        <v-container fluid id="calculadora" v-if="!add_taxa">
            <bloco-informacoes v-if="!add_taxa" @calculo="atualizarTodosDados($event)" :exibir="{
                tudo: BlocoDeInformacoes_tudo,
                processos: BlocoDeInformacoes_processos,
            }" @dados="BlocoDeInformacoes_tudo = $event" @processos="BlocoDeInformacoes_processos = $event">
            </bloco-informacoes>
        </v-container>
    </v-container>
</template>




<script>
import BlocoDeInformacoes from "../components/BlocoDeInformacoes.vue";
export default {
  name: "processoshome",
  components: {
    "bloco-informacoes": BlocoDeInformacoes,
  }  
};



</script>





<style></style>