<template>
  <div>
    <v-progress-linear v-if="!beneficiosInacumulveisBanco[0]" indeterminate color="teal"></v-progress-linear>
    <v-row>
      <button @click="dadosActive()" style="cursor: pointer">
        Preencher Dados Manualmente <v-icon>mdi-menu-up</v-icon>
      </button>
    </v-row>
    <v-row v-if="exibir.tudo && beneficiosInacumulveisBanco[0]" class="mx-3">
      <v-col cols="12" sm="6" md="3">
        <label for="numeroProcesso" class="labels pb-3">Número do Processo</label>
        <v-text-field v-model="numeroDoProcesso" id="numeroProcesso" dense plyaaceholder="Número Processo"
          outlined></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <label for="nome" class="labels pb-3">Nome</label>
        <v-text-field v-model="nome" id="nome" dense placeholder="Nome" outlined></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <label for="dataAjuizamento" class="labels pb-3">Data Ajuizamento</label>
        <v-text-field v-model="dataAjuizamento" id="dataAjuizamento" dense type="text" outlined></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mx-3" v-if="exibir.tudo && beneficiosInacumulveisBanco[0]">
      <v-col cols="12" sm="6" md="3">
        <label for="cpf" class="labels pb-3">CPF</label>
        <v-text-field v-model="cpf" id="cpf" dense placeholder="cpf" outlined></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <label for="dtDibInicial" class="labels pb-3">Termo Inicial</label>
        <v-text-field v-model="dibInicial" id="dtDibInicial" dense type="text" outlined></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <label for="dtDibFinal" class="labels pb-3">Termo Final</label>
        <v-text-field v-model="dibFinal" id="dtDibFinal" dense type="text" outlined></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <label for="rmi" class="labels pb-3">RMI</label>
        <v-text-field v-model="rmi" id="rmi" dense placeholder="R$ - " @input="rmi = formataçao(rmi)"
          outlined></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mx-3" v-if="exibir.tudo && beneficiosInacumulveisBanco[0]">
      <v-col cols="12" sm="6" md="3">
        <label for="beneficio" class="labels pb-3">Benefício</label>
        <v-text-field v-model="beneficio" id="beneficio" dense placeholder="Beneficio" outlined></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <label for="nb" class="labels pb-3">Número do benefíco</label>
        <v-text-field v-model="nb" id="nb" dense placeholder="Número do benefício" outlined></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <label for="dip" class="labels pb-3">Data Início de Pagamento</label>
        <v-text-field v-model="dip" id="dip" dense type="text" outlined></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <label for="dip" class="labels pb-3">Citação</label>
        <v-text-field v-model="citacao" id="citacao" dense type="text" outlined></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mx-3" v-if="exibir.tudo && beneficiosInacumulveisBanco[0]">
      <v-col cols="12" sm="3" md="3">
        <label for="aps" class="labels pb-3">APS</label>
        <v-text-field v-model="aps" id="aps" dense placeholder="Aps" outlined></v-text-field>
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <label for="urlProcesso" class="labels pb-3">URL do processo</label>
        <v-text-field v-model="urlProcesso" id="urlProcesso" dense placeholder="Exp: https://sapiens.agu.gov.br"
          outlined></v-text-field>
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <label for="urlProcesso" class="labels pb-3">DIB-ANTERIOR</label>
        <v-text-field v-model="dibAnterior" id="dibAnterior" dense placeholder="Exp: 17/06/2000" outlined></v-text-field>
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <label for="tipo" class="labels pb-3">TIPO</label>
        <v-text-field v-model="tipo" id="tipo" dense placeholder="Ativo" outlined></v-text-field>
      </v-col>
      <v-row class="mx-3" v-if="exibir.tudo && beneficiosInacumulveisBanco[0]">
        <v-col cols="12" sm="6" md="2">
          <label for="beneficioAcumulado.beneficio" class="labels pb-3">Beneficio Acumulado?</label>
          <v-text-field v-model="beneficioAcumulado.beneficio" id="beneficioAcumulado_beneficio" dense placeholder=""
            outlined></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <label for="beneficioAcumulado.dib" class="labels pb-3">DIB </label>
          <v-text-field v-model="beneficioAcumulado.dib" id="beneficioAcumulado_dib" dense placeholder=""
            outlined></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <label for="beneficioAcumulado.dcb" class="labels pb-3">DCB</label>
          <v-text-field v-model="beneficioAcumulado.dcb" id="beneficioAcumulado_dcb" dense placeholder=""
            outlined></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <label for="beneficioAcumulado.rmi" class="labels pb-3">RMI</label>
          <v-text-field v-model="beneficioAcumulado.rmi" id="beneficioAcumulado_rmi" dense placeholder=""
            outlined></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <v-btn color="primary" @click="pushBeneficio()" id="beneficioBtn">Adicinar Beneficio</v-btn>
        </v-col>
      </v-row>
      <v-btn :loading="loading" color="primary" @click="pushInfos(infos)" id="adicionarButton">Adicionar</v-btn>
    </v-row>
    <v-card-title class="mt-5">
      <button @click="exibirActive(), redirectToCalculo()" style="cursor: pointer">
        Tabela de Processos <v-icon>mdi-menu-up</v-icon>
      </button>
      <v-btn depressed :loading="loading" color="primary" @click="traigemAutomatico">Triar Automatico</v-btn>
      <v-btn :loading="loading" depressed color="red" style="margin-left: 460px; color: whitesmoke;" target="_blank"
        @click="deletarTodosOsInfos()">Deletar Todas as Informações
      </v-btn>
    </v-card-title>
    <v-data-table v-if="exibir.processos" :headers="headers" :items="infos" item-key="name" class="elevation-1">
      <template v-slot:item="{ item }">
        <tr @click="tranferir(item.id); itemClicked = item.id">
          <td  class="py-3" style="color: rgb(107, 107, 218); cursor: pointer" @click="tranferir(item.id); itemClicked = item.id">
            {{ item.numeroDoProcesso }}
          </td>
          <td :style="{ color: itemClicked === item.id ? 'rgba(128, 128, 128, 0.5)' : 'inherit' }">{{ item.nome }}</td>
          <td :style="{ color: itemClicked === item.id ? 'rgba(128, 128, 128, 0.5)' : 'inherit' }">{{ item.tipo }}</td>
          <td :style="{ color: itemClicked === item.id ? 'rgba(128, 128, 128, 0.5)' : 'inherit' }">{{ item.cpf }}</td>
          <td>
            <v-icon v-if="item.beneficiosAcumulados[0]" color="green">
              mdi-check-outline
            </v-icon>
          </td>
          <td>
            <v-btn :loading="loading" icon @click="deletarInforPorID(item)">
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { deleteInformationForCalculoToID } from "../api/controle-usuario/informationCalculo/deleteInformationForCalculoToID"
import { deleternformationForCalculoInList } from "../api/controle-usuario/informationCalculo/deleternformationForCalculoInList"
import { salvarInformationForCalculoList } from "../api/controle-usuario/informationCalculo/salvarInformationForCalculoList"
import { salvarInformationForCalculo } from "../api/controle-usuario/informationCalculo/salvarInformationForCalculo"
import { getInformationsForCalcule } from "../api/controle-usuario/informationCalculo/getInformationsForCalcule"
import { getInformationFromSapienForSamir } from "../api/visao/getInformation/getInformationFromSapienForSamir"
import { getBeneficios } from "../api/calculadora/beneficios/getBeneficios"
import { EventBus } from "../eventBus/eventBus"

export default {
  name: "Processos",
  props: ["exibir"],
  data: function () {
    return {
      id: 0,
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
      citacao: "",
      aps: "",
      urlProcesso: "",
      tipo: "",
      dibAnterior: "",
      itemClicked: null,
      beneficiosInacumulveisBanco: [],
      headers: [
        { value: "numeroDoProcesso", text: "Número do Processo" },
        { value: "nome", text: "Nome" },
        { value: "tipo", text: "Benefício" },
        { value: "cpf", text: "CPF" },
        { value: "beneficioAcumuladoBoolean", text: "Benefício Acumulado" },
        { value: "actions", text: "Delete" },
      ],
      infos: [],
      calculo: {},
      beneficioAcumulado: { beneficio: null, dib: null, dcb: null, rmi: null },
      array_beneficioAcumulado: [],
      beneficioAcumuladoBoolean: false,
      loading: false,
      senhaSapaiens: "",
      cpfSapiens: "",
      username: "",
      //exibir: {tudo: true, processos: false },
    };
  },
  methods: {
    //teste
    deletarInforPorID(dado) {
      console.log("ENTROU POR")
      console.log(typeof(dado.id))
      console.log(dado.id)
      this.$prompt("Digite seu nome de usuario").then(async (text) => {
        if (text == this.username) {
          this.loading = true;
          try {
            await deleteInformationForCalculoToID(dado.id)
            this.getInfos();
            this.loading = false;
          } catch (error) {
            this.$alert(error.message);
          }
        } else {
          this.loading = false;
          this.$alert("Nome errado");
        }
        this.loading = false;
      });
    },
    async deletarPeloHome(dado){
      console.log("ENTROU POR2")
      console.log(dado)
      console.log(typeof(dado))
      this.loading = true;
      try {
            await deleteInformationForCalculoToID(dado)
            this.getInfos();
            this.loading = false;
          } catch (error) {
            this.$alert(error.message);
          }
    },
    deletarTodosOsInfos() {
      this.$prompt("Digite seu CPF").then(async (text) => {
        if (text == this.cpfSapiens) {
          this.loading = true;
          try {
            await deleternformationForCalculoInList(this.calculoLote);
            this.getInfos();
            this.loading = false;
          } catch (error) {
            this.loading = false;
            this.$alert(error.message);
          }
        } else {
          this.$alert("CPF errado");
          this.loading = false;
        }
        this.loading = false;
      });
    },
    traigemAutomatico() {
      if (this.cpfSapiens == null || this.cpfSapiens == "") {
        this.cpfSapiens = localStorage.getItem("sapiensCPF");
        this.username = localStorage.getItem("Username");
        this.senhaSapaiens = localStorage.getItem("sapiensSenha");
      }
      this.$prompt(
        "Qual é o nome das etiquetas?",
        ""
      ).then(async (etiqueta) => {
        if (etiqueta) {
          const body = {
            login: {
              cpf: this.cpfSapiens,
              senha: this.senhaSapaiens,
            },
            etiqueta,
          };
          this.loading = true;
          try {
            let informationCalculo = await getInformationFromSapienForSamir(body);
            await salvarInformationForCalculoList(informationCalculo);
            this.infos.push(informationCalculo);
            this.$alert(informationCalculo.length, "Processo adicionado: ", "success");
            this.saveInfos();
            this.redirectToCalculo();
            this.getInfos();
            this.$emit("processos", true);
            this.loading = false;
          } catch (error) {
            this.loading = false;
            this.$alert(error.message);
          }

        }
      });
    },
    redirectToCalculo() {
      this.$router.push({ name: "home" })
    },
    dadosActive() {
      let dados = !this.exibir.tudo;
     console.log("DADOSSSSSSSSSSSSSSSSSSSSSSSSS: ".dados)
      this.$emit("dados", dados);
    },
    exibirActive() {
      let processos = !this.exibir.processos;
      this.$emit("processos", processos);
    },
    pushInfos() {
      if (!this.numeroDoProcesso) {
        return;
      }
      const body = {
        // id: this.infos.length,
        numeroDoProcesso: this.numeroDoProcesso,
        nome: this.nome,
        dataAjuizamento: this.dataAjuizamento,
        cpf: this.cpf,
        dibInicial: this.dibInicial,
        dibFinal: this.dibFinal,
        rmi: this.rmi,
        beneficio: this.beneficio,
        nb: this.nb,
        dip: this.dip,
        aps: this.aps,
        citacao: this.citacao,
        beneficiosAcumulados: this.array_beneficioAcumulado,
        urlProcesso: this.urlProcesso,
        dibAnterior: this.dibAnterior,
        beneficioAcumuladoBoolean: this.beneficioAcumuladoBoolean,
        tipo: this.tipo,
      };

      this.loading = true;
      salvarInformationForCalculo(body).then(() => {
        this.$alert(1, "Processo adicionado: ", "success");
        this.$emit("processos", true);
        this.loading = false;
        this.getInfos();
        console.log("Chamou a saveInfos Novamente")
        this.saveInfos();
        this.cleanFields();
      }).catch(error => {
        this.$alert(error.message);
        this.loading = false;
      });
    },
    removeCat(x) {
      this.infos.splice(x, 1);
      this.saveInfos();
    },
     getInfos() {
       getInformationsForCalcule().then((response) => {
        this.infos = response;
        this.saveInfos();
        this.$emit("processos", true);
      }).catch((error) => {
        this.$confirm("Falha ao receber os processo", "Error", "error")
          .then((r) => {
            console.log(r);
          })
          .catch(() => {
            console.log("OK not selected.");
          });
        console.log(error.message);
        console.log("error.message");
      });
    },
    saveInfos() {
      const parsed = JSON.stringify(this.infos);
      localStorage.setItem("infos", parsed);
    },
    cleanFields() {
      this.numeroDoProcesso = "";
      this.nome = "";
      this.dataAjuizamento = "";
      this.cpf = "";
      this.dibInicial = "";
      this.dibFinal = "";
      this.rmi = "";
      this.beneficio = "";
      this.nb = "";
      this.dip = "";
      this.aps = "";
      this.citacao = "";
      this.array_beneficioAcumulado = [];
      this.urlProcesso = "";
      this.dibAnterior = "";
      this.beneficioAcumuladoBoolean = false;
      this.tipo = "";
    },
    formataçao(valor) {
      return valor;
    },
    preencherFields(y) {
      const processo = this.infos.find((info) => info.id == y);
      this.numeroDoProcesso = `${processo.numeroDoProcesso}`;
      this.nome = processo.nome;
      this.dataAjuizamento = processo.dataAjuizamento;
      this.cpf = processo.cpf;
      this.dibInicial = processo.dibInicial;
      this.dibFinal = processo.dibFinal;
      this.rmi = processo.rmi;
      this.beneficio = processo.beneficio;
      this.nb = processo.nb;
      this.dip = processo.dip;
      this.aps = processo.aps;
      this.citacao = processo.citacao;
      this.urlProcesso = processo.urlProcesso;
      this.dibAnterior = processo.dibAnterior;
      this.tipo = processo.tipo;
    },
    pushBeneficio() {
      let dataDib = this.beneficioAcumulado.dib.split("/");
      let dataDcb = this.beneficioAcumulado.dcb.split("/");
      let dataincial = this.dibInicial.split("/");
      let dataFinal = this.dip.split("/");
      if (
        this.beneficiosInacumulveilVerificadorPeriodo(
          dataDib,
          dataDcb,
          dataincial,
          dataFinal
        ) &&
        this.verificarBeneficio()
      ) {
        this.array_beneficioAcumulado.push(this.beneficioAcumulado);
        this.beneficioAcumuladoBoolean = true;
        this.cleanBeneficio();
      } else {
        this.cleanBeneficio();
      }
    },
    verificarBeneficio() {
      console.log("Chamou verificarBeneficio")
      let beneficiovalido;
      this.beneficiosInacumulveisBanco.forEach((value) => {
        if (
          parseInt(value.name.split("-")[0]) ==
          parseInt(this.beneficio.split("-")[0])
        ) {
          value.inacumulavel.forEach((dado, index) => {
            if (
              parseInt(dado.split("-")[0]) ==
              parseInt(this.beneficioAcumulado.beneficio.split("-")[0])
            ) {
              beneficiovalido = true;
            } else if (index - 1 == value.inacumulavel.length) {
              beneficiovalido = false;
            }
          });
        }
      });
      return beneficiovalido;
    },
    beneficiosInacumulveilVerificadorPeriodo(
      dataDib,
      dataDcb,
      dataincial,
      dataFinal
    ) {
      console.log("BeneficioNoPeriodo")
      if (dataDib[2] <= dataFinal[2] && dataDcb[2] >= dataincial[2]) {
        if (dataDcb[2] == dataincial[2]) {
          if (dataDcb[1] == dataincial[1]) {
            if (dataDcb[0] >= dataincial[0]) {
              console.log("Retornou true")
              return true;
            } else {
              console.log("Retornou false")
              return false;
              
            }
          } else if (dataDcb[1] > dataincial[1]) {
            console.log("Retornou true2")
            return true;
          } else {
            console.log("Retornou false2")
            return false;
          }
        } else {
          console.log("Retornou true3")
          return true;
        }
      } else {
        console.log("Retornou false4")
        return false;
      }
    },
    cleanBeneficio() {
      this.beneficioAcumulado = {
        beneficio: null,
        dib: null,
        dcb: null,
        rmi: null,
      };
    },
    tranferir(y) {
      this.isNomeActive = true;
      this.redirectToCalculo();
      this.preencherFields(y);
      this.calculo = this.infos.find((info) => info.id == y);
      this.$emit("calculo", this.calculo);
    },
  },
  mounted() {
    this.cpfSapiens = localStorage.getItem("sapiensCPF");
    this.username = localStorage.getItem("Username");
    this.senhaSapaiens = localStorage.getItem("sapiensSenha");
    this.getInfos();
    if (localStorage.getItem("infos")) {
      try {
        this.infos = JSON.parse(localStorage.getItem("infos"));
      } catch (e) {
        localStorage.removeItem("infos");
      }
    }
    getBeneficios().then((res) => {
      this.beneficiosInacumulveisBanco = res;
    });
    EventBus.$on('deletarPeloHome', this.deletarPeloHome)
  },
};
</script>

<style >

.active-item {
  color: red; /* Adicione a sombra desejada */
}

.shadowed-text {
  color: red; /* Adicione a sombra no texto quando estiver ativo */
}


</style>
