<template>
  <v-card class="pa-3 my-3">
    <ValidadorDossiePrevidenciario/>
   <AtualizadorDosPrev/>
   <VerificadorDeProcessoDuplicado/>
   <AtualizadorTaxaSelic/>
  </v-card>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "../global";
import AtualizadorDosPrev from "../components/AtualizadorDosPrev.vue";
import ValidadorDossiePrevidenciario from "../components/ValidadorDossiePrevidenciario.vue";
import VerificadorDeProcessoDuplicado from "../components/VerificadorDeProcessoDuplicado.vue";
import AtualizadorTaxaSelic from "../components/AtualizadorTaxaSelic.vue";

export default {
  components: {
    AtualizadorDosPrev: AtualizadorDosPrev,
    ValidadorDossiePrevidenciario: ValidadorDossiePrevidenciario,
    AtualizadorTaxaSelic: AtualizadorTaxaSelic,
    VerificadorDeProcessoDuplicado: VerificadorDeProcessoDuplicado,
  },

  //name: "AdicionarTaxa",
  data: function () {
    return {
      taxa_inserida: 0,
      data_da_taxa: null,
      taxa_modelo: "correcao",
      headers: [
        { value: "data", text: "Data" },
        { value: "taxaAcumulada", text: "Taxa acumulada" },
      ],
      taxas_exibir: [],
      todos_taxas:[],
      id_taxa: null,

      options: [
        { text: "Correção", value: "correcao" },
        { text: "Reajuste", value: "reajuste" },
        { text: "Juros", value: "juros" },
      ],
      tipo_taxa: [],
      preguica: [1,2,3],
      tipo: "tipo 1, taxade 1023189dwjq,knSSds",
      informacao_taxa: [],
      descriçao_juros:[],
      descriçao_correcao:[],
      int: 0,
    };
  },
  methods: {
    limpa(){
      this.taxas_exibir = [];
      this.id_taxa = null;
      this.informacao_taxa = [];
      this.todos_taxas = [];
      this.int = 0;

    },
    seletarTipoTaxa() {
      this.informacao_taxa.reverse;
      this.int = 0;
      this.informacao_taxa.forEach((value) => {
        if (this.int <=6) {
          const objeto = {
            data: value.data,
            taxaAcumulada: value.taxaAcumulada,
          };
          this.taxas_exibir.push(objeto);
          console.log(objeto);
        }
        else{
          console.logo('nada')
        }
      });
      console.log(this.taxas_exibir);
    },
    tipo_execuçao() {
      const url = `${baseApiUrl}/${this.taxa_modelo}/procurarPorTipo/${this.tipo}`
    /*  axios
        .get(url)
        .then((response) => (this.informacao_taxa = response.data));*/
         axios(url)
        .then((res) => {
          this.todas_taxas = res.data.map((obj) => {
            if (obj) {
              let data = obj.data.split("T");
              let dataReajuste = data.splice(0, 1);

              obj.data = dataReajuste.toString().split("-").reverse().join("/");

              this.informacao_taxa.push(obj);
              this.seletarTipoTaxa();
            }
          });
        })
        
    },
    id_elemento(){
      let url = `${baseApiUrl}/${this.taxa_modelo}/listar`
      /* axios
        .get(url)
        .then((response) => (this.todos_taxas = response.data));
         this.id_taxa = this.todos_taxas.length;*/
         axios(url)
        .then((res) => {
          this.todas_taxas = res.data.map((obj) => {
            if (obj) {
              let data = obj.data.split("T");
              let dataReajuste = data.splice(0, 1);

              obj.data = dataReajuste.toString().split("-").reverse().join("/");

              this.todos_taxas.push(obj);
              this.id_taxa = this.todos_taxas.length + 1;
            }
          });
        })
         
    },
    verificar_descriçao(arry_descricao, tipo){
      for(let item of arry_descricao){
        if(item.tipo ==  tipo){
          return true
        }
      }
      return false;
    }
  },
  mounted(){
    const url = `${baseApiUrl}/juros/listar`;
    axios(url).then((res) => {
      let obj = {};
      this.descriçao_correcao = res.data;
        const array_juros = res.data;
        for (let item of array_juros){
          if(!this.verificar_descriçao(this.descriçao_juros, item.tipo)){
            obj = {descriçao: item.descricao, tipo: item.tipo}
            this.descriçao_juros.push(obj);
          }
        }
      });
  }
};
</script>

<style>
.select-valer {
  background-color: brown;
}
</style>