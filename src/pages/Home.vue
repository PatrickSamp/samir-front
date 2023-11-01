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
        <v-tab @click="acessoPortalADM()">Ajuda</v-tab>
      </v-tabs>
    </v-card>
    <PortalADM v-if="add_taxa" />
    <v-container fluid id="calculadora" v-if="!add_taxa">
      <v-card>
        <bloco-informacoes v-if="!add_taxa" @calculo="atualizarTodosDados($event)" :exibir="{
            tudo: BlocoDeInformacoes_tudo,
            processos: BlocoDeInformacoes_processos,
          }" @dados="BlocoDeInformacoes_tudo = $event" @processos="BlocoDeInformacoes_processos = $event">
        </bloco-informacoes>
        
      </v-card>
      
      <v-card class="pa-3 my-3" v-if="add_taxa == false">
        
        <v-row>
          
          <v-col cols="12" sm="6" md="3">
            <label for="data-inicial" class="labels pb-3">Nome</label>
            <v-text-field  v-model="nmprocesso" id="nome-processo" dense outlined required>  
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <label for="data-inicial" class="labels pb-3">Data Inicial <b class="item-obrigatorio">*</b></label>

            <v-text-field v-mask="'##/##/####'" v-model="dtInicial" id="data-inicial" dense outlined required>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <label for="data_final" class="labels pb-3">Data Final <b class="item-obrigatorio">*</b></label>
            <v-text-field v-mask="'##/##/####'" v-model="dtFinal" id="data-final" dense outlined required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <label for="valor-devido R$" class="labels pb-3">RMI <b class="item-obrigatorio">*</b></label>
            <v-text-field type="number" v-model="salarioInicial" id="valor-devido" dense placeholder="nada"
              @input="salarioInicial = formataçao(salarioInicial)" outlined required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <label for="inicio_Juros" class="labels pb-3">Início dos juros <b class="item-obrigatorio">*</b></label>
            <v-text-field v-mask="'##/##/####'" v-model="inicio_juros" id="data-final" dense outlined required>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <label for="honorarios_Advocativos" class="labels pb-3">Honorários Advocatício Até (Data)</label>
            <v-text-field v-mask="'##/##/####'" v-model="DataHonorarios" id="data-final" dense outlined></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <label for="honorarios_Advocativos" class="labels pb-3">Honorários advocatícios Percentual</label>
            <v-text-field type="number" v-model="porcentagemHonorarios" id="data-final" dense outlined></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <label for="honorarios_Advocativos" class="labels pb-3">Acordo %</label>
            <v-text-field type="number" v-model="procntagem_acordo" id="data-final" dense outlined></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <label for="porcentagemRMI" class="labels pb-3">Porcentagem RMI%</label>
            <v-text-field type="number" v-model="porcentagemRMI" id="porcentagemRMI" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="2">
            <label class="labels pb-3">Juros <b class="item-obrigatorio">*</b></label>
            <v-select outlined placeholder="Escolha uma opção" :items="optionsJuros" v-model="tipoJuros"></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <label class="labels pb-3">Correção <b class="item-obrigatorio">*</b></label>
            <v-select outlined placeholder="Escolha uma opção" :items="optionsCorrecao" v-model="tipoCorrecao"></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <label for="atualizacao" class="labels pb-2">Atualizar Até <b class="item-obrigatorio">*</b></label>
            <v-text-field v-mask="'##/####'" v-model="atulizacao" id="atualizacao" placeholder="Ex: 06/2022" dense
              outlined required>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <label for="dibAnterior" class="labels pb-2">NB Anterior</label>
            <v-text-field v-mask="'##/##/####'" v-model="dibAnterior" id="dibAnterior" placeholder="Ex: 17/06/2022" dense
              outlined>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <input class="form-check-input" type="checkbox" style="margin-right: 5px" v-model="limiteMinimoMaximo"
              :value="limiteMinimoMaximo" />
            <label for="limiteMinimoMaximo" class="labels pb-2">Limite Minimo e Máximo</label>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <input class="form-check-input" type="checkbox" style="margin-right: 5px" v-model="salarioMinimo"
              :value="salarioMinimo" />
            <label for="salarioMinimo" class="labels pb-2">Salário Mínimo</label>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <input type="checkbox" class="form-check-input" style="margin-right: 5px" :value="alcadaBoolean"
              v-model="alcadaBoolean" id="flexCheckDefault" />
            <label for="alcadaBoolean" class="labels pb-2">Alçada</label>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <input class="form-check-input" type="checkbox" style="margin-right: 5px" v-model="boolJuros"
              :value="boolJuros" />
            <label for="boolJuros" class="labels pb-2">Juros</label>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <input class="form-check-input" type="checkbox" style="margin-right: 5px" v-model="salario13"
              :value="salario13" />
            <label for="salario13" class="labels pb-2">13° Salário</label>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <label for="beneficio" class="labels">Qual Benefício?</label>
            <v-autocomplete @input="atulizarvalor()" dense outlined id="beneficio" value="info_calculo.beneficio"
              :items="beneficiosInacumulveisBancoName" v-model="info_calculo.beneficio" type="text" size="sm"
              placeholder="57 - APOSENTADORIA POR  TEMPO DE CONTRIBUIÇÃO DE PROFESSOR">
            </v-autocomplete>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <label for="info_calculo.nb" class="labels">N.B</label>
            <v-text-field @input="atulizarvalor()" dense outlined id="info_calculo.nb" v-model="info_calculo.nb"
              type="number" size="sm" placeholder="Ex: 01100110 01110101 01100011 01101011">
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <label for="info_calculo.dib" class="labels">DIB</label>
            <v-text-field v-mask="'##/##/####'" @input="atulizarvalor()" dense outlined id="info_calculo.dib"
              v-model="info_calculo.dibInicial" type="text" size="sm" placeholder="Ex: 22/10/2020">
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <input class="form-check-input" type="checkbox" style="margin-right: 5px" v-model="salario13Obrigatorio"
              :value="salario13Obrigatorio" />
            <label for="salario13" class="labels pb-2">13° Salário Obrigatorio</label>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <input class="form-check-input" type="checkbox" style="margin-right: 5px" v-model="selic" :value="selic" />
            <label for="salario13" class="labels pb-2">Selic</label>
          </v-col>
        </v-row>

        <!-- CHECKBOX  -->
        
        <b-row class="row-one my-3 align-items-center">
          <b-col sm="2">
            <input class="form-check-input" style="margin-right: 5px" type="checkbox" :value="beneficio"
              v-model="beneficio" id="flexCheckDefault" />
            <label class="form-check-label labels" for="flexCheckDefault">
              Recebeu Benefício
            </label>
          </b-col>
          <b-col sm="2" v-if="beneficio === true">
            <b-button id="button-beneficio" color="primary" @click="pushBeneficiosAcumulados()">Adicionar Beneficio
            </b-button>
          </b-col>
        </b-row>

        <b-card v-for="obj_beneficioAcumulado of arrayBenficios" :key="obj_beneficioAcumulado">
          <b-row class="row-one my-3 align-items-center">
            <b-col sm="3" v-if="beneficio === true">
              <v-autocomplete id="beneficio" :items="beneficiosInacumulveisBancoName"
                v-model="obj_beneficioAcumulado.beneficio" type="text" size="sm" placeholder="Qual Benefício?"
                @input="beneficiosEspecialInfo(obj_beneficioAcumulado)">
              </v-autocomplete>
            </b-col>
            <b-col sm="3" v-if="beneficio === true">
              <label for="beneficio_inicial" class="labels">Inicio do Desconto</label>
              <b-form-input v-mask="'##/##/####'" id="beneficio_inicial" v-model="obj_beneficioAcumulado.dib" type="text"
                size="sm">
              </b-form-input>
            </b-col>
            <b-col sm="3" v-if="beneficio === true">
              <label for="beneficio_final" class="labels">Fim do Desconto</label>
              <b-form-input v-mask="'##/##/####'" v-model="obj_beneficioAcumulado.dcb" id="beneficio_final" type="text"
                size="sm">
              </b-form-input>
            </b-col>
            <b-col sm="3" v-if="beneficio === true">
              <label for="beneficio" class="labels">RMI</label>
              <b-form-input type="number" v-model="obj_beneficioAcumulado.rmi" id="beneficio" size="sm"
                placeholder="Ex:1000">
              </b-form-input>
            </b-col>
            
          </b-row>
          <b-row>
            <b-col sm="3" v-if="beneficio === true">
              <label for="beneficio" class="labels">Limite de Minimo e Maximo</label>

              <input :disabled="disableBeneficiosEspecial(obj_beneficioAcumulado)"
                v-model="obj_beneficioAcumulado.limiteMinimoMaximo" :value="obj_beneficioAcumulado.limiteMinimoMaximo"
                class="form-check-input" style="margin-left: 5px" type="checkbox" id="beneficio" size="sm" />
            </b-col>
            <b-col sm="2" v-if="beneficio === true">
              <label for="beneficio" class="labels">13 Salario</label>
              <input :disabled="disableBeneficiosEspecial(obj_beneficioAcumulado)"
                v-model="obj_beneficioAcumulado.salario13" :value="obj_beneficioAcumulado.salario13"
                class="form-check-input" style="margin-left: 5px" type="checkbox" id="beneficio" size="sm" />
            </b-col>
            <b-col sm="2" v-if="beneficio === true">
              <label for="beneficio" class="labels">Salario Minimo</label>

              <input :disabled="disableBeneficiosEspecial(obj_beneficioAcumulado)"
                v-model="obj_beneficioAcumulado.salarioMinimo" :value="obj_beneficioAcumulado.salarioMinimo"
                class="form-check-input" style="margin-left: 5px" type="checkbox" id="beneficio" size="sm" />
            </b-col>

            <b-col sm="3" v-if="beneficio === true">
              <label for="beneficio" class="labels">13 Salario Obrigatorio</label>

              <input :disabled="disableBeneficiosEspecial(obj_beneficioAcumulado)"
                v-model="obj_beneficioAcumulado.salario13Obrigatorio" :value="obj_beneficioAcumulado.salario13Obrigatorio"
                class="form-check-input" style="margin-left: 5px" type="checkbox" id="beneficio" size="sm" />
            </b-col>

            <b-col sm="2" v-if="beneficio === true">
              <v-btn :loading="loading"  icon @click="deletarBeneficio(obj_beneficioAcumulado)">
                <v-icon color="red">mdi-delete</v-icon>
                <span class="icon-text">Excluir</span>
              </v-btn>
            </b-col>  




            <b-col sm="3" v-if="beneficio === true">
              <label for="beneficio" class="labels">Desconto obrigatório</label>
              <input :disabled="disableBeneficiosEspecial(obj_beneficioAcumulado)"
                v-model="obj_beneficioAcumulado.obrigatorio" :value="obj_beneficioAcumulado.obrigatorio"
                class="form-check-input" style="margin-left: 5px" type="checkbox" id="beneficio" size="sm" />
            </b-col>

            <b-col sm="2" v-if="beneficio === true">
              <label for="beneficio" class="labels">RMI%</label>
              <b-form-input type="number" v-model="obj_beneficioAcumulado.porcentagemRmi" id="beneficio" size="sm"
                placeholder="Ex:1000">
              </b-form-input>
            </b-col>
            <b-col sm="2" v-if="beneficio === true">
              <label for="beneficio" class="labels">N.B</label>
              <b-form-input type="text" v-model="obj_beneficioAcumulado.nb" id="beneficio" size="sm">
              </b-form-input>
            </b-col>

            <b-col sm="2" v-if="beneficio === true">
              <label for="beneficio" class="labels">Data N.B Anterior</label>
              <b-form-input v-mask="'##/##/####'" v-model="obj_beneficioAcumulado.nbAnterior" id="beneficio" size="sm">
              </b-form-input>
            </b-col>

          </b-row>
        </b-card>

        <!-- BOTÕES -->

        <v-row>
          <v-col>
            <label for="valor-devido" class="labels alertCalculoComObservacoes"
              v-if="(alertCalculoComObservacoes() != '')">
              {{ alertCalculoComObservacoes() }}
            </label>
          </v-col>
        </v-row>
        <v-row class="my-3">
          <v-col cols="1" class="mr-6">
            <v-btn depressed color="primary" style="margin-left: 5px; color: whitesmoke" :loading="loading"
              @click="zeraDadosDocalculo(), (mode = 'table'), novoCalculo()">Calcular</v-btn>
          </v-col>

          <v-col cols="1">
            <v-btn depressed color="primary" style="margin-left: -5px; color: whitesmoke" :href="info_calculo.urlProcesso" target="_blank">
              Consultar Processo</v-btn>
          </v-col>

          <v-col cols="2">
            <v-btn :loading="loading" depressed color="primary" style="margin-left: 105px; color: whitesmoke" @click="atualizarItemParaBanco()"
              target="_blank">Atualizar</v-btn>
          </v-col>
        </v-row>
      </v-card>


      <br>
      <br>
      <br>

      <v-col cols="2">
        <div style="display: flex; justify-content: space-between;">
            <v-btn depressed color="blue" style="color: whitesmoke;" @click="verificarAdicaoNoLote()"
              target="_blank">Adicionar ao Lote</v-btn>
            <v-btn :loading="loading" depressed color="blue" style="margin-left: 10px; color: whitesmoke;" 
              @click="(mode = 'table'), AnexarMinutas()" target="_blank">Anexar Minutas</v-btn>
            <v-btn :loading="loading" depressed color="red" style="margin-left: 10px; color: whitesmoke;" target="_blank"
              @click="deletarLote()">Deletar lote</v-btn>
          </div>
      </v-col>

      <h3 class="mt-5" style="cursor: pointer" @click="exibirCalculoEmLote = !exibirCalculoEmLote">
        Beneficios para calculo em lote
      </h3>
      
      <template v-if="exibirCalculoEmLote">
        <v-data-table :headers="headersCalculoLote" :items="calculoLote" class="elevation-1">
          <template v-slot:item="{ item }">
            <tr>
              <td class="py-3" style="color: rgb(107, 107, 218); cursor: pointer" @click="atulizarInfosLote(item)">
                {{ item.numeroDoProcesso }}
              </td>
              <td>{{ item.nome }}</td>
              <td>{{ item.tipo }}</td>
              <td>
                <v-icon v-if="item.nomeBeneficioBeneficioAcumulado[0]" color="red">
                  mdi-check-outline
                </v-icon>
              </td>
              <td>
                <v-btn icon @click="atulizarInfosLote(item)">
                  <v-icon color="success">mdi-file-eye-outline</v-icon>
                </v-btn>
                <v-btn :loading="loading" icon @click="removerItemLote(item)">
                  <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </template>

      <portal-a-d-m v-if="add_taxa == true" />
      
      <!-- TABELA PRNCIPAL -->
      <br />
      <h1 v-if="add_taxa == false" class="titulo">PREENCHA OS DADOS</h1>
      <h4 v-if="add_taxa == false" class="center">CONFERÊNCIA DE BENEFÍCIOS CALCULADOS</h4>
      <div v-if="add_taxa == false" class="rowInputs">
        <div v-if="add_taxa == false" class="column">
          <label class="camposInput">
            Processo:
            <input v-model="info_calculo.numeroDoProcesso" @input="atulizarvalor()"
              placeholder="XXXX-XX.XXXX.XXX.XXXX" /></label>
          <label class="inputToPrint" id="processoForm" />
          <br />
          <label class="camposInput">
            Autor:
            <input v-model="info_calculo.nome" @input="atulizarvalor()" placeholder="Jennifer Walters" /></label>
          <label class="inputToPrint" id="autorForm" />
          <br />
          <label class="camposInput">Objeto:
            <input v-model="objetoDoCalculo" placeholder="Ex.: CÁLCULO DE BENEFÍCIO PREVIDENCIÁRIO" /></label><label
            class="inputToPrint" id="objetoForm" />
          <br />
          <label class="camposInput">Vara:
            <input v-model="varaPrevidenciaria" placeholder="Ex.: Previdenciária" /></label><label class="inputToPrint"
            id="varaForm" />
          <br />
          <label class="camposInput">Juros: <input placeholder="Ex.: 12% a.a. até 06/09 + ..." /></label><label
            class="inputToPrint" id="jurosForm" />
          <br />
        </div>
        <div class="column">
          <label class="camposInput">Ajuizamento:
            <input v-mask="'##/##/####'" v-model="info_calculo.dataAjuizamento" @input="atulizarvalor()"
              placeholder="XX/XX/XXXX" /></label><label class="inputToPrint" id="ajuizamentoForm" />
          <br />
          <label class="camposInput">Início do Juros:
            <input v-mask="'##/##/####'" v-model="inicio_juros" placeholder="XX/XXXX" /></label><label
            class="inputToPrint" id="inicioJurosForm" />
          <br />
          <!-- Criar Função -->
          <label class="camposInput">Valido até:
            <input v-mask="'##/####'" placeholder="XX/XXXX" v-model="atulizacao" /></label><label class="inputToPrint"
            id="calculadoEmForm" />
          <br />
          <label class="camposInput">Honorário:
            <input placeholder="Ex.:" v-model="textoHonorarios" /></label><label class="inputToPrint"
            id="honorarioForm" />
          <br />
        </div>
      </div>
      <h4 class="center" v-if="add_taxa == false">RESUMO DO PROCESSO</h4>
      <div v-if="add_taxa == false">
        <div class="resumoProcesso">
          <div class="columnResumoProcesso">
            <h6>N.B.</h6>
            <input type="number" v-model="info_calculo.nb" @input="atulizarvalor()" placeholder="XXX.XXX.XXX-X" />
            <label class="inputToPrintResumo" id="resumoNB" />
          </div>
          <div class="columnResumoProcessoParte">
            <h6>Parte</h6>
            <input v-model="info_calculo.nome" @input="atulizarvalor()" placeholder="Ex.: Matthew M. Murdock" />
            <label class="inputToPrintResumoParte" id="resumoParte" />
          </div>
          <div class="columnResumoProcesso">
            <h6>Principal R$</h6>
            <input type="number" v-model="valor_corrigido" placeholder="XX.XXX,XX" />
            <label class="inputToPrintResumo" id="resumoPrincipal" />
          </div>
          <div class="columnResumoProcesso">
            <h6>Juros R$</h6>
            <input type="number" v-model="valor_juros" placeholder="X.XXX,XX" />
            <label class="inputToPrintResumo" id="resumoJuros" />
          </div>
          <div class="columnResumoProcesso">
            <h6>Total R$</h6>
            <b>
              {{
                Math.floor(
                  (parseFloat(valor_corrigido) + parseFloat(valor_juros)) * 100
                ) / 100
              }}</b>
            <label class="inputToPrintResumo" id="resumoTotal" />
          </div>
        </div>
      </div>
      <br />
      <div class="rowCalculo" v-if="add_taxa == false">
        <div class="columnRight">
          <label class="camposInput">Soma do Principal: R$</label>
          <br />
          <label class="camposInput">Juros de mora: R$</label>
          <br />
          <label class="camposInput">12 Parcelas Vincendas: R$</label>
          <br />
          <br />
          <label class="camposInput">Devido ao(s) Reclamante(s): R$</label>
          <br />
          <label class="camposInput">Honorários Advocatícios: R$</label>
          <br />
          <br v-if="procntagem_acordo != 0 && procntagem_acordo != null" />
          <label class="camposInput" v-if="procntagem_acordo != 0 && procntagem_acordo != null">Acordo: %</label>
          <br v-if="procntagem_acordo != 0 && procntagem_acordo != null" />
          <label class="camposInput" v-if="procntagem_acordo != 0 && procntagem_acordo != null">Devido ao(s) Reclamante(s)
            (Acordo): R$</label>
          <br v-if="procntagem_acordo != 0 && procntagem_acordo != null" />
          <label v-if="procntagem_acordo != 0 && procntagem_acordo != null" class="camposInput">Honorários Advocatícios
            (Acordo): R$</label>
          <br v-if="procntagem_acordo != 0 && procntagem_acordo != null" />
          <br />
          <label class="camposInput">Total do Processo: R$</label>
          <br />
          <br />
        </div>

        <div class="column">
          <input type="number" v-model="valor_corrigido" placeholder="XX.XXX,XX" />
          <label class="inputCalculo" id="somaPrincipal" />
          <br />
          <input type="number" v-model="valor_juros" placeholder="XX.XXX,XX" />
          <label class="inputCalculo" id="somaJuros" />
          <br />
          <input type="number" placeholder="XX.XXX,XX" v-model="pacelasVencidas" />
          <label class="inputCalculo" id="parcelasVincendas" />
          <br />
          <br />

          {{
            Math.floor(
              (parseFloat(valor_corrigido) +
                parseFloat(valor_juros) -
                parseFloat(pacelasVencidas)) *
              100
            ) / 100
          }}
          <br />
          <input type="number" v-model="valorHonorarios" placeholder="XX.XXX,XX" id="honorariosAdvocativos" />
          <label class="inputCalculo" />
          <br />
          <br v-if="procntagem_acordo != 0 && procntagem_acordo != null" />
          <input type="number" v-if="procntagem_acordo != 0 && procntagem_acordo != null" v-model="procntagem_acordo"
            placeholder="XX.XXX,XX" />
          <label class="inputCalculo" id="honorariosAdvocativos" />
          <br v-if="procntagem_acordo != 0 && procntagem_acordo != null" />

          <b v-if="procntagem_acordo != 0 && procntagem_acordo != null">{{
            procntagem_acordo != 0 && procntagem_acordo != null
            ? Math.floor(
              (((parseFloat(valor_corrigido) +
                parseFloat(valor_juros) -
                parseFloat(pacelasVencidas)) *
                parseFloat(procntagem_acordo)) /
                100) *
              100
            ) / 100
            : Math.floor(
              (parseFloat(valor_corrigido) +
                parseFloat(valor_juros) -
                parseFloat(pacelasVencidas)) *
              100
            ) / 100
          }}
          </b>
          <label class="inputCalculo" id="honorariosAdvocativos" />
          <br v-if="procntagem_acordo != 0 && procntagem_acordo != null" />

          <b v-if="procntagem_acordo != 0 && procntagem_acordo != null">{{
            procntagem_acordo != 0 && procntagem_acordo != null
            ? Math.floor(
              ((parseFloat(valorHonorarios) * parseFloat(procntagem_acordo)) /
                100) *
              100
            ) / 100
            : Math.floor(parseFloat(valorHonorarios) * 100) / 100
          }}</b>
          <label class="inputCalculo" id="honorariosAdvocativos" />
          <br v-if="procntagem_acordo != 0 && procntagem_acordo != null" />
          <br />

          {{
            procntagem_acordo != 0 && procntagem_acordo != null
            ? Math.floor(
              (((parseFloat(valor_corrigido) +
                parseFloat(valor_juros) -
                parseFloat(pacelasVencidas) +
                parseFloat(valorHonorarios)) *
                parseFloat(procntagem_acordo)) /
                100) *
              100
            ) / 100
            : Math.floor(
              (parseFloat(valor_corrigido) +
                parseFloat(valor_juros) -
                parseFloat(pacelasVencidas) +
                parseFloat(valorHonorarios)) *
              100
            ) / 100
          }}

          <label class="inputCalculo" id="totalProcesso" />
          <br />
        </div>
      </div>
      <v-row class="mx-3" v-for="beneficio of arrayBeneficioAcumuladosContaveis" :key="beneficio.dib">
        <v-col cols="12" sm="6" md="3">
          <p>Beneficio recebido: {{ beneficio.beneficio }}</p>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <p>DIB: {{ beneficio.dib }}</p>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <p>DCB: {{ beneficio.dcb }}</p>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <p>RMI: R${{ beneficio.rmi }}</p>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <p>RMI%: {{ beneficio.porcentagemRmi }}</p>
        </v-col>
      </v-row>

      <!-- TETO DE ALÇADA -->
      <div v-if="alcadaBoolean == true">
        <h3 class="center">TETO DE ALÇADA</h3>
        <h5 class="center">{{ textoPeriodoAlcada }}</h5>
        <div class="columnRightAlcada">
          <label class="camposInputAlcada">a) Total a ser considerado (Até 12 parcelas vincendas após
            ajuizamento): R$</label>
          <br />
          <label class="camposInputAlcada">b) 60 salários mínimos no ajuizamente: R$</label>
          <br />
          <label class="camposInputAlcada">c) Eventual renúncia do total: R$</label>
          <br />
          <br />
        </div>
        <div class="column">
          <input type="number" @input="parcelasDevida()" class="inputTetoAlcada" v-model="alcadaValor"
            placeholder="X,XX" /><label class="inputCalculo" id="c" />
          <br />
          <input type="number" @input="parcelasDevida()" class="inputTetoAlcada" v-model="salariominimosAlcada"
            placeholder="X,XX" /><label class="inputCalculo" id="d" />
          <br />
          {{ alcadaTotal }}
          <label class="inputCalculo" id="e" />
          <br />
          <br />
        </div>
        <h5 class="center">d) Valores renunciados no ajuizamento atualizados:</h5>
        <div class="columnRightAlcada">
          <label class="camposInputAlcada">d.1) Valor de eventual renúncia: R$</label>
          <br />
          <label class="camposInputAlcada">d.2) Coeficiente de atualização:</label>
          <br />
          <label class="camposInputAlcada">d.3) Valor atualizado da renúncia: R$</label>
          <br />
          <label class="camposInputAlcada">d.4) Taxa de juros de mora:</label>
          <br />
          <label class="camposInputAlcada">d.5) Juros de mora: R$</label>
          <br />
          <label class="camposInputAlcada">d.6) Total: R$</label>
          <br />
          <br />
        </div>
        <div class="column">
          {{ alcadaTotal }}
          <label class="inputCalculo" id="i" />
          <br />
          <input type="number" @input="parcelasDevida()" class="inputTetoAlcada" v-model="alcadaCorrecaoPorcetagem"
            placeholder="X,XX" /><label class="inputCalculo" id="j" />
          <br />
          {{ Math.floor(alcadaTotal * alcadaCorrecaoPorcetagem * 100) / 100 }}

          <label class="inputCalculo" id="k" />
          <br />
          <input type="number" @input="parcelasDevida()" class="inputTetoAlcada" v-model="alcadaJurosPorcentagem"
            placeholder="X,XX" /><label class="inputCalculo" id="l" />
          <br />
          {{
            Math.floor(
              alcadaTotal *
              alcadaCorrecaoPorcetagem *
              alcadaJurosPorcentagem *
              100
            ) / 100
          }}

          <label class="inputCalculo" id="m" />
          <br />
          {{
            Math.floor(
              (Math.floor(alcadaTotal * alcadaCorrecaoPorcetagem * 100) / 100 +
                Math.floor(
                  alcadaTotal *
                  alcadaCorrecaoPorcetagem *
                  alcadaJurosPorcentagem *
                  100
                ) /
                100) *
              100
            ) / 100
          }}
          <label class="inputCalculo" id="n" />
          <br />
        </div>
      </div>

      <h4 class="center">PLANILHA DE CÁLCULO</h4>
      <div class="rowInputs">
        <div class="column">
          <label class="camposInputAlcada">
            Parte:
            <input v-model="info_calculo.nome" @input="atulizarvalor()"
              placeholder="Nome + (CPF 000.000.000-00)" /></label>
          <label class="inputToPrint" id="partePlanilha" />
          <br />
          <label class="camposInputAlcada">
            Espécie:
            <input v-model="info_calculo.beneficio" @input="atulizarvalor()" placeholder="XX(XXXXXXXXXX)" /></label>
          <label class="inputToPrintAlcada" id="autorPlanilha" />
          <br />
          <label class="camposInputAlcada">DIB Jud:
            <input v-mask="'##/##/####'" v-model="info_calculo.dib" placeholder="00/00/0000" /></label><label
            class="inputToPrint" id="dibJudPlanilha" />
          <br />
          <label class="camposInputAlcada">DIB Anterior:
            <input v-mask="'##/##/####'" v-model="info_calculo.dibAnterior" @input="atulizarvalor()"
              placeholder="00/00/0000" /></label><label class="inputToPrint" id="dibAnteriorPlanilha" />
          <br />
          <label class="camposInputAlcada">RMI Jud.:
            <input type="number" v-model="salarioInicial" placeholder="00/00" /></label><label class="inputToPrint"
            id="rmiJudPlanilha" />
          <br />
        </div>
        <div class="column">
          <label class="camposInputAlcada">%RMI:
            <input type="number" placeholder="000,00" v-model="porcentagemRMI" /></label><label class="inputToPrint"
            id="porCententagemRmiPlanilha" />
          <br />
          <label class="camposInputAlcada">Período (Data de Início):
            <input v-mask="'##/##/####'" v-model="dtInicial" placeholder="XX/XX/XXXX" /></label><label
            class="inputToPrint" id="dataInicialPlanilha" />
          <br />
          <!-- Criar Função -->
          <label class="camposInputAlcada">Período (Data de Fim):
            <input v-mask="'##/##/####'" placeholder="XX/XX/XXXX" v-model="dtFinal" /></label><label class="inputToPrint"
            id="dataFinalPlanilha" />
          <br />
          <label for="13salario" class="labels pb-2" style="margin-left: 18px">13º Salário
          </label>
          <input class="form-check-input" type="checkbox" style="margin-left: 5px" v-model="salario13"
            :value="salario13" />
          <br />
        </div>
      </div>
      <br />
      <br />
      <br />
      <v-data-table dense v-if="calc_total.length > 0" :headers="headersTabelaPrincipal()" :items="calc_total"
        :items-per-page="calc_total.length" item-key="name" class="elevation-1" hide-default-footer>
        <template v-slot:item="{ item }">
          <tr>
            <td>
              <the-mask @input="(item.data = formatarDataTable(item.data)),
                  acrescentarTaxaTablePrincipal(item),
                  (item.correcao = 0)
                  " :mask="['XXAaaaaaa/##/####', '##/##/####']" v-model="item.data" />
            </td>
            <td>
              <input type="number" v-model="item.reajusteAcumulado" />
            </td>
            <td v-if="beneficioInacumulavel[0]">
              <input type="number" v-model="item.devido"
                @input="item = totaisSalarioTablePrincipal(item), totaisSalario()"
                :disabled="disableLinhaTable(item.data)" />
            </td>
            <td v-if="beneficioInacumulavel[0]">
              <input type="number" v-model="item.reajusteRecebido"
                @input="item = totaisSalarioTablePrincipal(item), totaisSalario()"
                :disabled="disableLinhaTable(item.data)" />
            </td>
            <td v-if="beneficioInacumulavel[0]">
              <input type="number" v-model="item.recebido"
                @input="item = totaisSalarioTablePrincipal(item), totaisSalario()"
                :disabled="disableLinhaTable(item.data)" />
            </td>
            <td>
              <input type="number" @input="item = totaisSalarioTablePrincipal(item), totaisSalario()"
                v-model="item.salario" :disabled="disableLinhaTable(item.data)" />
            </td>
            <td>
              <input v-model="item.correcao" :disabled="disableLinhaTable(item.data)" />
            </td>
            <td>
              <input type="number" v-model="item.salarioCorrigido" disabled />
            </td>
            <td>
              <input type="number" v-model="item.juros" :disabled="disableLinhaTable(item.data)" />
            </td>
            <td>
              <input type="number" v-model="item.salarioJuros" disabled />
            </td>
            <td>
              <input type="number" v-model="item.salarioTotal" disabled />
            </td>
            <td>
              <v-icon @click="removerItemTablePrincipal(item), totaisSalario()" color="red">mdi-delete</v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>
      <v-btn color="primary" v-if="mode === 'table'" @click="adicionarLinha()" primary>
        Adicionar Linha</v-btn>

      <div id="tabelaImpostoRenda">
        <h4 class="center">
          RENDIMENTOS RECEBIDOS ACUMULADAMENTE PARA IMPOSTO DE RENDA
        </h4>
        <table id="impostoRenda">
          <tr>
            <th id="impostoRendaDiscriminacao">DISCRIMINAÇÃO</th>
            <th id="impostoRendaValores">VALORES</th>
            <th id="impostoRendaAcordo">ACORDO</th>
            <th id="impostoRendaCompetencias">COMPETÊNCIAS</th>
          </tr>
          <tr>
            <td>ANO-CALENDÁRIO PAGAMENTO ({{ dataAtual.getFullYear() }})</td>
            <td><input type="number" v-model="iPvalorAnoAtual" /></td>
            <td>
              {{
                procntagem_acordo != 0 && procntagem_acordo != null
                ? Math.floor(
                  parseFloat(iPvalorAnoAtual) * parseFloat(procntagem_acordo)
                ) / 100
                : 0
              }}
            </td>
            <td><input type="number" v-model="competenciaAnoAtual" /></td>
          </tr>
          <tr>
            <td>ANOS-CALENDÁRIO ANTERIORES</td>
            <td><input type="number" v-model="iPvalorAnoAnterior" /></td>
            <td>
              {{
                procntagem_acordo != 0 && procntagem_acordo != null
                ? Math.floor(
                  parseFloat(iPvalorAnoAnterior) *
                  parseFloat(procntagem_acordo)
                ) / 100
                : 0
              }}
            </td>
            <td><input type="number" v-model="competenciaAnoAnterior" /></td>
          </tr>
          <tr v-if="alcadaBoolean == true">
            <td>RENÚNCIA R$</td>
            <td>
              {{ Math.floor(pacelasVencidas * 100) / 100 }}
            </td>
            <td>
              {{
                procntagem_acordo != 0 && procntagem_acordo != null
                ? Math.floor(
                  parseFloat(parseFloat(pacelasVencidas)) *
                  parseFloat(procntagem_acordo)
                ) / 100
                : 0
              }}
            </td>
            <td></td>
          </tr>
          <tr>
            <td>TOTAL EM R$</td>
            <td>
              {{
                parseFloat(iPvalorAnoAnterior) +
                parseFloat(iPvalorAnoAtual) -
                parseFloat(pacelasVencidas)
              }}
            </td>
            <td>
              {{
                procntagem_acordo != 0 && procntagem_acordo != null
                ? Math.floor(
                  parseFloat(
                    parseFloat(iPvalorAnoAnterior) +
                    parseFloat(iPvalorAnoAtual) -
                    parseFloat(pacelasVencidas)
                  ) * parseFloat(procntagem_acordo)
                ) / 100
                : 0
              }}
            </td>
            <td>
              {{
                parseInt(competenciaAnoAnterior) + parseInt(competenciaAnoAtual)
              }}
            </td>
          </tr>
        </table>
        <br />
      </div>

      <!-- Gerar pdf -->

      <h1 v-if="add_taxa == false" class="titulo">GERADOR DE PDF</h1>
      
      <v-card v-if="!add_taxa" id="areaToPrint">
        <!-- <Popup v-if="showPopup" :showPopup="showPopup" :popupTitle="popupTitle" :popupMessage="popupMessage" @close="closePopup" /> -->
        <div>
          <h3 class="centerAGU">AGU</h3>
          <h4 class="center">PROCURADORIA GERAL FEDERAL</h4>
          <h4 class="center">
            EQUIPE INTER REGIONAL DE CÁLCULOS PREVIDENCIÁRIOS DA 1ª E 6ª REGIÕES
          </h4>

          <table id="info-inicial">
            <tbody>
              <tr id="info-inicial-linha">
                <td id="info-inicial-coluna">Processo n°</td>
                <td id="info-inicial-coluna">
                  {{ info_calculo.numeroDoProcesso }}
                </td>
              </tr>
              <tr id="info-inicial-linha">
                <td id="info-inicial-coluna">Parte Autora</td>
                <td id="info-inicial-coluna">{{ info_calculo.nome }}</td>
              </tr>
            </tbody>
          </table>

          <h4 class="center">REVISE OS DADOS</h4>
          <div class="rowInputs">
            <div class="column">
              <label class="camposInput">Objeto:</label><label class="inputToPrint" id="objetoForm" />
              {{ objetoDoCalculo }}
              <br />
              <label class="camposInput">Vara:</label><label class="inputToPrint" id="varaForm" />
              {{ varaPrevidenciaria }}
              <br />
              <label class="camposInput">N.B: {{ info_calculo.nb }}</label><label class="inputToPrint" id="jurosForm" />
              <br />
            </div>
            <div class="column">
              <label class="camposInput">Ajuizamento:</label><label class="inputToPrint" id="ajuizamentoForm" />
              {{ info_calculo.dataAjuizamento }}
              <br />
              <label class="camposInput">Início do Juros:</label><label class="inputToPrint" id="inicioJurosForm" />
              {{ inicio_juros }}
              <br />
              <label class="camposInput">Atualizar Até: {{ atulizacao }}</label><label class="inputToPrint"
                id="calculadoEmForm" />
              <!--Função-->
              <br />
              <label class="camposInput">Honorários Sucumbenciais:</label><label class="inputToPrint" id="honorarioForm" />
              {{ textoHonorarios }}
              <br />
            </div>
          </div>
        </div>
        <h4 class="center">RESUMO DO PROCESSO</h4>

        <br />

        <table id="testeTotal">
          <thead>
            <tr>
              <th scope="col" id="thead-limpo-menor"></th>
              <th scope="col" id="thead-limpo">Total no Período de Cálculo</th>
              <th scope="col" id="thead-limpo">Cálculo para Execução</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td id="textosResumo"></td>
              <td id="valoresResumo"></td>
              <td id="valor-percentual-execucao">
                ({{ formatarPorcentagemAcordo() }}%)
              </td>
            </tr>
            <tr>
              <td id="textosResumo">Soma do Principal:</td>
              <td id="valoresResumo">
                R${{ Math.floor(valor_corrigido * 100) / 100 }}
              </td>
              <td id="valoresResumoExecucao">
                R${{
                  Math.floor(valor_corrigido * formatarPorcentagemAcordo()) / 100
                }}
              </td>
            </tr>
            <tr>
              <td id="textosResumo">Juros de mora:</td>
              <td id="valoresResumo">
                R${{ Math.floor(valor_juros * 100) / 100 }}
              </td>
              <td id="valoresResumoExecucao">
                R${{
                  Math.floor(valor_juros * formatarPorcentagemAcordo()) / 100
                }}
              </td>
            </tr>
            <tr v-if="alcadaBoolean == true">
              <td id="textosResumo">12 Parcelas Vincendas:</td>
              <td id="valoresResumo">
                R${{ Math.floor(pacelasVencidas * 100) / 100 }}
              </td>
              <td id="valoresResumoExecucao">
                R${{
                  Math.floor(pacelasVencidas * formatarPorcentagemAcordo()) / 100
                }}
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <table id="testeTotal">
          <tbody>
            <tr>
              <td id="textosResumo">Devido ao(s) Reclamante(s):</td>
              <td id="valoresResumo">
                R${{
                  Math.floor(
                    (parseFloat(valor_corrigido) +
                      parseFloat(valor_juros) -
                      parseFloat(pacelasVencidas)) *
                    100
                  ) / 100
                }}
              </td>
              <td id="valoresResumoExecucao">
                R${{
                  Math.floor(
                    (parseFloat(valor_corrigido) +
                      parseFloat(valor_juros) -
                      parseFloat(pacelasVencidas)) *
                    formatarPorcentagemAcordo()
                  ) / 100
                }}
              </td>
            </tr>
            <tr>
              <td id="textosResumo">Honorários Advocatícios:</td>
              <td id="valoresResumo">R${{ valorHonorarios }}</td>
              <td id="valoresResumoExecucao">
                R${{
                  Math.floor(valorHonorarios * formatarPorcentagemAcordo()) / 100
                }}
              </td>
            </tr>
          </tbody>
        </table>
        <br />

        <table id="testeTotal">
          <tr>
            <td id="textosResumo">Total do Processo:</td>
            <td id="valoresResumo">
              R${{
                Math.floor(
                  (parseFloat(valor_corrigido) +
                    parseFloat(valor_juros) -
                    parseFloat(pacelasVencidas) +
                    parseFloat(valorHonorarios)) *
                  100
                ) / 100
              }}
            </td>
            <td id="valoresResumoExecucao">
              R${{
                Math.floor(
                  (parseFloat(valor_corrigido) +
                    parseFloat(valor_juros) -
                    parseFloat(pacelasVencidas) +
                    parseFloat(valorHonorarios)) *
                  formatarPorcentagemAcordo()
                ) / 100
              }}
            </td>
          </tr>
        </table>

        <v-row v-for="beneficio of beneficioInacumulavel" :key="beneficio">
          <v-col cols="12" sm="6" md="3">
            <p>Beneficio recebido: {{ beneficio.beneficio }}</p>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <p>DIB: {{ beneficio.dib }}</p>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <p>DCB: {{ beneficio.dcb }}</p>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <p>RMI: {{ beneficio.rmi }}</p>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <p>RMI%: {{ beneficio.porcentagemRmi }}</p>
          </v-col>
        </v-row>
        <img src="" alt="" />

        <!-- Adições ao gerador de PDF (09/2022) -->
        <br />
        <div id="observacoes-div-texto">
          Cálculo efetuado pelo vencimento do débito.
          {{
            textoHonorarios == null || textoHonorarios == ""
            ? "Sem honorários"
            : "Com honorários(" + textoHonorarios + ")"
          }}.<br />
          Total para cada competência = Principal + atualização monetária + juros
          de mora (se for o caso).<br />
          <b>Juros de mora:</b>
          <br />
          <p class="describes">
            {{
              tipoJuros != 0
              ? quebraLinhaDescribe(
                optionsJuros
                  .find((element) => element.value == tipoJuros)
                  .text.split("Descrição:")[1]
                  .split("")
              )
              : ""
            }}.
          </p>
          <b>Correção:</b>
          <br />
          <p class="describes">
            {{
              tipoCorrecao != 0
              ? quebraLinhaDescribe(
                optionsCorrecao
                  .find((element) => element.value == tipoCorrecao)
                  .text.split("Descrição:")[1]
                  .split("")
              )
              : ""
            }}.
          </p>

          <b v-if="selic">Observação:</b>
          <br v-if="selic" />
          <p v-if="selic" class="describes">
            CACULO UTILIZA SELIC PREV. EC/113 Até 2025.
          </p>
        </div>
        <table id="tabelaResumo">
          <thead>
            <tr>
              <th scope="col" id="thead-centro">
                <h4>Resumo</h4>
              </th>
              <th scope="col" id="thead-invisivel"></th>
              <th scope="col" id="thead-invisivel"></th>
              <th scope="col" id="thead-invisivel"></th>
            </tr>
          </thead>
        </table>
        <div id="linha-horizontal"></div>
        <table id="tabelaResumo">
          <tbody>
            <tr>
              <td id="colunaVazia"></td>
              <td id="colunaResumoEsquerda">Benefício:</td>
              <td id="colunaResumoDireita">{{ info_calculo.beneficio }}</td>
              <td id="colunaVaziaDireita"></td>
            </tr>
            <tr>
              <td id="colunaVazia"></td>
              <td id="colunaResumoEsquerda">DER:</td>
              <td id="colunaResumoDireita">-</td>
              <td id="colunaVaziaDireita"></td>
            </tr>
            <tr>
              <td id="colunaVazia"></td>
              <td id="colunaResumoEsquerda">DIB:</td>
              <td id="colunaResumoDireita">
                {{
                  this.info_calculo.dib == null || this.info_calculo.dib == ""
                  ? this.dtInicial
                  : this.info_calculo.dib
                }}
              </td>
              <td id="colunaVaziaDireita"></td>
            </tr>
            <tr>
              <td id="colunaVazia"></td>
              <td id="colunaResumoEsquerda">DIP:</td>
              <td id="colunaResumoDireita">{{ dtFinal }}</td>
              <td id="colunaVaziaDireita"></td>
            </tr>
            <tr>
              <td id="colunaVazia"></td>
              <td id="colunaResumoEsquerda">Valor Principal (R$):</td>
              <td id="colunaResumoDireita">
                {{
                  Math.floor(
                    (parseFloat(valor_corrigido) +
                      parseFloat(valor_juros) -
                      parseFloat(pacelasVencidas)) *
                    formatarPorcentagemAcordo()
                  ) / 100
                }}
              </td>
              <td id="colunaVaziaDireita">({{ rpvOuPrecatorio }})</td>
            </tr>
            <tr>
              <td id="colunaVazia"></td>
              <td id="colunaResumoEsquerda">Valor Honorários (R$):</td>
              <td id="colunaResumoDireita">
                {{
                  Math.floor(valorHonorarios * formatarPorcentagemAcordo()) / 100
                }}
              </td>
              <td id="colunaVaziaDireita"></td>
            </tr>
          </tbody>
        </table>


        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <table id="tabelaResumo">
          <thead>
            <tr>
              <th scope="col" id="thead-centro">
                <h4>Análise de Competência do Juizado Especial Federal</h4>
              </th>
              <th scope="col" id="thead-invisivel"></th>
              <th scope="col" id="thead-invisivel"></th>
              <th scope="col" id="thead-invisivel"></th>
              <th scope="col" id="thead-invisivel"></th>
            </tr>
          </thead>
        </table>
        <div id="linha-horizontal"></div>
        <table id="tabelaResumo">
          <tbody>
            <tr>
              <td id="colunaVazia"></td>
              <td id="colunaAnaliseTexto">
                Total de parcelas devidas até a data do ajuizamento
              </td>
              <td id="colunaAnaliseEsquerda">
                ({{ this.info_calculo.dataAjuizamento }})
              </td>
              <td id="colunaAnaliseDireita">
                {{ Math.floor(beforeDateAjuizamento * 100) / 100 }}
              </td>
              <td id="colunaVazia"></td>
            </tr>
            <tr>
              <td id="colunaVazia"></td>
              <td id="colunaAnaliseTexto">12 parcela(s) vincenda(s)</td>
              <td id="colunaAnaliseEsquerda"></td>
              <td id="colunaAnaliseDireita">
                {{ Math.floor(afterDateAjuizamento * 100) / 100 }}
              </td>
              <td id="colunaVazia"></td>
            </tr>
          </tbody>
        </table>
        <div id="linha-soma"></div>
        <table id="tabelaResumo">
          <tbody>
            <tr>
              <td id="colunaVazia"></td>
              <td id="colunaAnaliseTexto">
                Valor da causa na data do ajuizamento da ação
              </td>
              <td id="colunaAnaliseEsquerda"></td>
              <td id="colunaAnaliseDireita">
                {{ Math.floor(alcadaValor * 100) / 100 }}
              </td>
              <td id="colunaVazia"></td>
            </tr>
          </tbody>
        </table>
        <div id="linha-horizontal-separacao"></div>
        <br />
        <table id="tabelaResumo">
          <tbody>
            <tr>
              <td id="colunaVazia"></td>
              <td id="colunaAnaliseTexto">Limite de 60 salários mínimos em:</td>
              <td id="colunaAnaliseEsquerda">
                {{ this.info_calculo.dataAjuizamento }}
              </td>
              <td id="colunaAnaliseDireita">{{ salariominimosAlcada }}</td>
              <td id="colunaVazia"></td>
            </tr>
            <tr>
              <td id="colunaVazia"></td>
              <td id="colunaAnaliseTexto">
                Parcela referente à renúncia pela alçada do JEF no ajuizamento
              </td>
              <td id="colunaAnaliseEsquerda"></td>
              <td id="colunaAnaliseDireita">
                {{ Math.floor(alcadaTotal * 100) / 100 }}
              </td>
              <td id="colunaVazia"></td>
            </tr>
            <tr>
              <td id="colunaVazia"></td>
              <td id="colunaAnaliseTexto">
                (*) Valor atualizado da renúncia pela alçada do JEF
              </td>
              <td id="colunaAnaliseEsquerda"></td>
              <td id="colunaAnaliseDireita">
                {{
                  Math.floor(
                    (Math.floor(alcadaTotal * alcadaCorrecaoPorcetagem * 100) /
                      100 +
                      Math.floor(
                        alcadaTotal *
                        alcadaCorrecaoPorcetagem *
                        alcadaJurosPorcentagem *
                        100
                      ) /
                      100) *
                    100
                  ) / 100
                }}
              </td>
              <td id="colunaVazia"></td>
            </tr>
          </tbody>
        </table>
        <div id="linha-horizontal-separacao"></div>
        <div id="observacoes-div">
          <br />
          Obs: A parcela vincenda ocorre a partir do dia primeiro de cada mês.
          <br />
          Obs.: Incompetência: parcelas devidas superam o teto do JEF na data do
          ajuizamento.
          <br />
          Atenção: os valores desta planilha referem-se a cálculo para fins de
          execução invertida / impugnação.
          <br />
          <br />
        </div>

        <h4 class="center">PLANILHA DE CÁLCULO</h4>
        <div class="rowInputs">
          <div class="column">
            <label class="camposInputAlcada">
              Parte:
              {{ info_calculo.nome }} (CPF {{ info_calculo.cpf }})</label>
            <label class="inputToPrintAlcada" id="partePlanilha" />
            <br />
            <label class="camposInputAlcada">
              Espécie:
              {{ info_calculo.beneficio }}
            </label>
            <label class="inputToPrintAlcada" id="autorPlanilha" />
            <br />
            <label class="camposInputAlcada">DIB Jud:
              {{
                this.info_calculo.dib == null || this.info_calculo.dib == ""
                ? this.dtInicial
                : this.info_calculo.dib
              }} </label><label class="inputToPrintAlcada" id="dibJudPlanilha" />
            <br />
            <label class="camposInputAlcada">DIB Anterior:
              {{
                this.dibAnterior == null || this.dibAnterior == ""
                ? "Não consta"
                : this.dibAnterior
              }} </label><label class="inputToPrintAlcada" id="dibAnteriorPlanilha" />
            <br />
            <label class="camposInputAlcada">RMI Jud.: R${{ salarioInicial }} </label><label class="inputToPrintAlcada"
              id="rmiJudPlanilha" />
            <br />
          </div>
          <div class="column">
            <label class="camposInputAlcada" id="porCententagemRmiPlanilha">%RMI: {{ porcentagemRMI == 0 ? 100 :
              porcentagemRMI }}
            </label>
            <br />
            <label class="camposInputAlcada">Período (Data de Início): {{ dtInicial }} </label><label
              class="inputToPrintAlcada" id="dataInicialPlanilha" />
            <br />
            <!-- Criar Função -->
            <label class="camposInputAlcada">Período (Data de Fim): {{ dtFinal }} </label><label
              class="inputToPrintAlcada" id="dataFinalPlanilha" />
            <br />
            <label for="13salario" class="labels pb-2" style="margin-left: 18px">13º Salário: {{ exibirBoolean(salario13)
            }}
            </label>
            <br />
          </div>
        </div>
        <br />

        <v-data-table id="areaToPrint" dense v-if="calc_total.length > 0" :headers="headersTabelaPrincipal()"
          :items="calc_total" :items-per-page="calc_total.length" item-key="name" class="elevation-1" hide-default-footer>
        </v-data-table>
        <br />
        <br />
        <div id="tabelaImpostoRenda">
          <h4 class="center" id="impostoRendaTitulo">
            RENDIMENTOS RECEBIDOS ACUMULADAMENTE PARA IMPOSTO DE RENDA
          </h4>
          <table id="impostoRenda">
            <tr>
              <th id="impostoRendaDiscriminacao">DISCRIMINAÇÃO</th>
              <th id="impostoRendaValores">VALORES</th>
              <th id="impostoRendaAcordo">ACORDO</th>
              <th id="impostoRendaCompetencias">COMPETÊNCIAS</th>
            </tr>
            <tr>
              <td>ANO-CALENDÁRIO PAGAMENTO ({{ dataAtual.getFullYear() }})</td>
              <td>{{ Math.floor(iPvalorAnoAtual * 100) / 100 }}</td>
              <td>
                {{
                  procntagem_acordo != 0 && procntagem_acordo != null
                  ? Math.floor(
                    parseFloat(iPvalorAnoAtual) *
                    parseFloat(procntagem_acordo)
                  ) / 100
                  : 0
                }}
              </td>
              <td>{{ competenciaAnoAtual }}</td>
            </tr>
            <tr>
              <td>ANOS-CALENDÁRIO ANTERIORES</td>
              <td>{{ Math.floor(iPvalorAnoAnterior * 100) / 100 }}</td>
              <td>
                {{
                  procntagem_acordo != 0 && procntagem_acordo != null
                  ? Math.floor(
                    parseFloat(iPvalorAnoAnterior) *
                    parseFloat(procntagem_acordo)
                  ) / 100
                  : 0
                }}
              </td>
              <td>{{ competenciaAnoAnterior }}</td>
            </tr>
            <tr v-if="alcadaBoolean == true">
              <td>RENÚNCIA R$</td>
              <td>
                {{ Math.floor(pacelasVencidas * 100) / 100 }}
              </td>
              <td>
                {{
                  procntagem_acordo != 0 && procntagem_acordo != null
                  ? Math.floor(
                    parseFloat(parseFloat(pacelasVencidas)) *
                    parseFloat(procntagem_acordo)
                  ) / 100
                  : 0
                }}
              </td>
              <td></td>
            </tr>
            <tr>
              <td>TOTAL EM R$</td>
              <td>
                {{
                  Math.floor(
                    (parseFloat(iPvalorAnoAnterior) +
                      parseFloat(iPvalorAnoAtual) -
                      parseFloat(pacelasVencidas)) *
                    100
                  ) / 100
                }}
              </td>
              <td>
                {{
                  procntagem_acordo != 0 && procntagem_acordo != null
                  ? Math.floor(
                    parseFloat(
                      parseFloat(iPvalorAnoAnterio) +
                      parseFloat(iPvalorAnoAtual) -
                      parseFloat(pacelasVencidas)
                    ) * parseFloat(procntagem_acordo)
                  ) / 100
                  : 0
                }}
              </td>
              <td>
                {{
                  parseInt(competenciaAnoAnterior) + parseInt(competenciaAnoAtual)
                }}
              </td>
            </tr>
          </table>
          <br />
        </div>
      </v-card>

      <v-label v-if="alcadaArray[0]">Tabela de Alcada</v-label>

      <v-data-table id="areaToPrint" dense v-if="alcadaArray[0]" :headers="headersAlcada" :items="alcadaArray"
        :items-per-page="alcadaArray.length" item-key="data" class="elevation-1" hide-default-footer>
      </v-data-table>
      <div v-if="add_taxa == false" v-show="mode === 'table'">
        <b-button variant="primary" @click="printDiv()"><i class="fa fa-file"></i></b-button>
      </div>
    </v-container>

  </v-container>
</template>

<script>
import Axios from "../config/configAxios";
// import TabelaDib from "../features/TabelaDib.vue";
//import { pararJurosTeste } from "../features/pararJuros";
import { baseApiUrl, apiSapiens } from "../global";
import jsPDF from "jspdf";
import axios from "axios";
import PortalADM from "./PortalADM.vue";
import BlocoDeInformacoes from "../components/BlocoDeInformacoes.vue";
import { calculoTabelaPrincipal } from "../Calculo/CalculoTabela";
import { triagemBeneficiosValidos } from "../Calculo/CalculoTabela/BeneficioAcumulado/triagemBeneficiosValidos";
import { updateInformationForCalculoList } from "../api/controle-usuario/informationCalculo/updateInformationForCalculoList"
import { getDataMaisAtualParaCampoAtualizarAte } from "../api/calculadora/getJuros/dataJurosSelic"
//import { deleteInformationForCalculoToID } from "../api/controle-usuario/informationCalculo/deleteInformationForCalculoToID";
import { EventBus } from "../eventBus/eventBus"
//import Popup from '../components/Popup.vue'
import Swal from 'sweetalert2';

export default {
  name: "Home",
  components: {
    PortalADM: PortalADM,
    "bloco-informacoes": BlocoDeInformacoes,
    /* Popup, */
  },
  data: function () {
    return {
      showPopup: false,
      popupTitle: 'AVISO',
      popupMessage: 'Termo inicial do desconto ajustado para a DIV do benefício devido',
      mode: "",
      add_taxa: false,
      beneficio: false,
      pesquisa: {},
      infos: [],
      dtInicial: "",
      dtFinal: "",
      nome: "",
      nb: "",
      nbAnterior: "",
      nmprocesso: "",
      salarioInicial: "",
      objetoDoCalculo: "CÁLCULO DE BENEFÍCIO PREVIDENCIÁRIO",
      varaPrevidenciaria: "Previdenciária",
      headers: [
        { value: "data", text: "Data" },
        { value: "reajusteAcumulado", text: "Reajuste" },
        { value: "salario", text: "Salário R$" },
        { value: "correcao", text: "Correção Salarial" },
        { value: "salarioCorrigido", text: "Salário Corrigido R$" },
        { value: "juros", text: "Juros" },
        { value: "salarioJuros", text: "Salário Juros R$" },
        { value: "salarioTotal", text: "Total" },
      ],
      headersAlcada: [
        { value: "data", text: "Data" },
        { value: "reajusteAcumulado", text: "Reajuste" },
        { value: "salario", text: "Salário R$" },
        { value: "correcao", text: "Correção Salarial" },
        { value: "salarioTotal", text: "Total" },
      ],
      logo: require("../assets/logo.png"),
      todas_taxas: [],
      all_info: [],
      calc_total: [],
      info_calculo: {},
      valor_total: 0,
      valor_juros: 0,
      valor_corrigido: 0,
      pensaoPorMorte: "",
      dataDoJuros: null,
      valorDoJuros: 0,
      array_juros: [],
      inicio_juros: null,
      DataHonorarios: null,
      porcentagemHonorarios: null,
      valorHonorarios: null,
      textoHonorarios: null,
      salario13: true,
      valorSalario13: 0,
      juros13Valor: 0,
      corrigido13Valor: 0,
      arr_Salario13: [],
      total_processos: 0,
      procntagem_acordo: null,
      boolJuros: true,
      
      optionsJuros: [],
      tipoJuros: 0,
      optionsCorrecao: [],
      tipoCorrecao: 0,
      BlocoDeInformacoes_tudo: false,
      BlocoDeInformacoes_processos: true,
      arrayReajusteRencete: [],
      arrayJurosRencete: [],
      arrayCorrecaoRencete: [],
      tipoJurosRecente: null,
      tipoCorrecaoRecente: null,
      // obj_beneficioAcumulado: {
      //   tipo: null,
      //   dataInicio: null,
      //   dataFinal: null,
      //   valor: null,
      //   limiteMinimoMaximo: true,
      //   salarioMinimo: false,
      //   salario13: true,
      // },
      arrayBenficios: [],
      arrayTeste: [],
      beneficiosInacumulveisBanco: [],
      beneficiosInacumulveisBancoName: ["Seguro Desemprego", "Seguro Defesa", "Auxílio Emergencial"],
      beneficioInacumulavel: [],
      pacelasVencidas: 0,
      salarioMinimoOssada: 0,
      alcadaBoolean: false,
      alcadaArray: [],
      alcadaValue: 0,
      dibAnterior: "",
      limiteMinimoMaximo: true,
      salarioMinimo: false,
      atulizacao: "",
      headersCalculoLote: [
        { value: "numeroDoProcesso", text: "Numero Do Processo" },
        { value: "nome", text: "Autor" },
        { value: "tipo", text: "Tipo" },
        { value: "beneficio", text: "Recebeu Benefício" },
        { value: "actions", text: "" },
      ],
      calculoLote: [],
      usuario_id: 1,
      verificadoInformacao: false,
      alertTexto: "",
      alcadaJurosPorcentagem: 0,
      alcadaValor: 0,
      salariominimosAlcada: 0,
      alcadaJuros: 0,
      alcadaCorrecao: 0,
      alcadaTotal: 0,
      textoPeriodoAlcada: "",
      alcadaCorrecaoPorcetagem: 0,
      iPvalorAnoAnterior: 0,
      iPvalorAnoAtual: 0,
      competenciaAnoAnterior: "",
      competenciaAnoAtual: "",
      porcentagemRMI: null,
      dataAtual: new Date(),
      salario13Obrigatorio: false,
      beforeDateAjuizamento: 0,
      afterDateAjuizamento: 0,
      selic: false,
      salarioMinimoAnoAtual: 0,
      exibirCalculoEmLote: true,
      memoriaCalculoHTM: "",
      senhaSapaiens: "",
      username: "",
      cpfSapiens: "",
      loading: false,
      calculoProvissorio: [],

      // item gerados ao calcular:
      arrayBeneficioAcumuladosContaveis: [],
      indentificadorDePersistenciaQuinquenal: "",
      indentificadorDePersistenciaUtrapassagemDeAcordo: "",
    };
  },
  computed: {
    honorariosCalculo() {
      this.honorarios();
      return this.valorHonorarios;
    },
    rpvOuPrecatorio() {
      let valorAnalissar =
        Math.floor(
          (parseFloat(this.valor_corrigido) +
            parseFloat(this.valor_juros) -
            parseFloat(this.pacelasVencidas)) *
          this.formatarPorcentagemAcordo()
        ) / 100;
      if (valorAnalissar < this.salarioMinimoAnoAtual) {
        return "RPV";
      } else {
        if (this.indentificadorDePersistenciaUtrapassagemDeAcordo != this.info_calculo.nb && (this.procntagem_acordo != 0 && this.procntagem_acordo != null)) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.indentificadorDePersistenciaUtrapassagemDeAcordo = this.info_calculo.nb;
          this.$confirm("Acordo ultrapassa os 60 salarios minimos", "Ultrapassagem de limite de ACORDO", "error")
        }
        return "Precatório";
      }
    },
  },
  methods: {
    async atualizarItemParaBanco(){ 
      const novoObjetoParaAtualizar = {...this.info_calculo}
      delete novoObjetoParaAtualizar.aps;
      delete novoObjetoParaAtualizar.idUser;
      const dibParaTratarMaisUm = this.dtFinal
      const dibInfoCalculo = this.info_calculo.dip
      const arrayPropriedadesAlteradas = []
      const valorInputRmi = (String(this.salarioInicial).indexOf(".")) > -1? this.salarioInicial: String(this.salarioInicial)+"0"+"0";
      let novoRmiSemVirgula = (this.info_calculo.rmi).replace(",","")
      let novoRmiSemVirgulaInputSemVirgula = String((valorInputRmi)).replace(",","")

    

      const arrayDib = dibParaTratarMaisUm.split("/")
      let dia = String(Number(arrayDib[0])+1)
      if(dia<=10){
        dia = 0+dia
      }
      //let dia = 0+String(Number(arrayDib[0])+1)
      const mes = arrayDib[1]
      const ano = arrayDib[2]
      const novaDataDib = new Date(`${ano}-${mes}-${dia}`)
     


      
      const arrayDibCalculo = dibInfoCalculo.split("/")
      const diaInfoCalculo = arrayDibCalculo[0]
      const mesInfoCalculo = arrayDibCalculo[1]
      const anoInfoCalculo = arrayDibCalculo[2]
      
      const novaDataDibInfoCalculo = new Date(`${anoInfoCalculo}-${mesInfoCalculo}-${diaInfoCalculo}`)
      //console.log([novaDataDib,dibParaTratarMaisUm],[dibInfoCalculo,novaDataDibInfoCalculo])
      
      


      if(this.nmprocesso!=this.info_calculo.nome){
        arrayPropriedadesAlteradas.push("Nome")
        novoObjetoParaAtualizar.nome = this.nmprocesso
      }

      if(this.dtInicial != this.info_calculo.dibInicial){
        arrayPropriedadesAlteradas.push("Data Inicial")
        novoObjetoParaAtualizar.dibInicial = this.dtInicial
      }
      
      
      if(novaDataDib.getTime() != novaDataDibInfoCalculo.getTime()){
        arrayPropriedadesAlteradas.push("Data Final")
        const data = this.dtFinal.split("/")
        let diaMenosUm = String(Number(data[0])-1)
        const dataParaMandarAoBancoMenosUmDia = `${diaMenosUm}/${String(data[1])}/${String(data[2])}`
        novoObjetoParaAtualizar.dibFinal = dataParaMandarAoBancoMenosUmDia
      }

      //console.log(novoRmiSemVirgula.replace(".","") , novoRmiSemVirgulaInputSemVirgula.replace(".",""))
      if(novoRmiSemVirgula.replace(".","") != novoRmiSemVirgulaInputSemVirgula.replace(".","")){
        arrayPropriedadesAlteradas.push("RMI")
        novoObjetoParaAtualizar.rmi = this.salarioInicial
      }
 
      if(this.inicio_juros != this.info_calculo.citacao){
        arrayPropriedadesAlteradas.push("Citação")
        novoObjetoParaAtualizar.citacao = this.inicio_juros
      }

      /* if(this.DataHonorarios != undefined || this.info_calculo.DataHonorarios != undefined){
        arrayPropriedadesAlteradas.push("Honorários Advocatício")
        novoObjetoParaAtualizar.honorarioAdvocaticioAte = this.DataHonorarios
      } */

      
      if(this.DataHonorarios != this.info_calculo.honorarioAdvocaticioAte){
        arrayPropriedadesAlteradas.push("Honorários Advocatício Até")
        novoObjetoParaAtualizar.honorarioAdvocaticioAte = this.DataHonorarios
      }


      
      /* if(this.porcentagemHonorarios != undefined || this.info_calculo.porcentagemHonorarios != undefined){
        arrayPropriedadesAlteradas.push("Honorários advocatícios Percentual")
        novoObjetoParaAtualizar.honorarioAdvocaticioPercentual = this.porcentagemHonorarios
      } */
     

      console.log(this.porcentagemHonorarios, this.info_calculo.honorarioAdvocaticioPercentual)
      if(this.porcentagemHonorarios != this.info_calculo.honorarioAdvocaticioPercentual){
        arrayPropriedadesAlteradas.push("Honorários advocatícios Percentual")
        novoObjetoParaAtualizar.honorarioAdvocaticioPercentual = this.porcentagemHonorarios
      }
      
      //console.log("A: "+this.procntagem_acordo ,this.info_calculo.acordo == null)
      if(parseFloat(this.procntagem_acordo) != parseFloat(this.info_calculo.acordo)){
        arrayPropriedadesAlteradas.push("Acordo%")
        novoObjetoParaAtualizar.acordo = this.procntagem_acordo
      }
          
        /* novoObjetoParaAtualizar.acordo = this.procntagem_acordo */
        /* novoObjetoParaAtualizar.porcentagemRmi = this.porcentagemRMI */

        if(this.porcentagemRMI != this.info_calculo.porcentagemRmi){
        arrayPropriedadesAlteradas.push("Poercentagem RMI")
        novoObjetoParaAtualizar.honorarioAdvocaticioPercentual = this.porcentagemRMI
      }




      /* await Swal.fire({
      title: `<strong>Você deseja atualizar os dados?\n Os seguinte campos vão ser atualizados:\n<u><i>${arrayPropriedadesAlteradas}</i></u></strong>`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Atualizar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("PASSOU")
        await updateInformationForCalculoList(novoObjetoParaAtualizar)
          Swal.fire('Salvo!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Mudanças não salvas', '', 'info')
      }
    }) */


    Swal.fire({
      title: `<strong>Você deseja atualizar os dados?\n Os seguinte campos vão ser atualizados:\n<u><i>${arrayPropriedadesAlteradas}</i></u></strong>`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Atualizar',
    }).then((result) => {
      if (result.value) {
        updateInformationForCalculoList(novoObjetoParaAtualizar).then((e) => {
          Swal.fire('Salvo!', '', 'success')
          console.log(e)
        }).catch(
          Swal.fire('Mudanças não salvas', '', 'info')
        )
      } else if(result.dismiss == "cancel"){
        Swal.fire('Mudanças não salvas', '', 'info')
      }
    })
      
      
 


      

      
      
    },
    buscarNupDaUrl(url){
      const urlTratada = url.split(/[=&]/)
      return urlTratada[1]
    },
    verificarDataParaBeneficioAcumulado( inicioCalculo, dip ,  dib, dcb ){
      return Date.parse(inicioCalculo.split('/').reverse().join('-')) <= Date.parse(dcb.split('/').reverse().join('-')) && Date.parse(dib.split('/').reverse().join('-')) <= Date.parse(dip.split('/').reverse().join('-'));  
    },
    async deletarBeneficio(beneficio){    
         await Swal.fire({
      title: 'Deseja Continuar?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Deletar Benefício!'
    }).then(async (result) => {
      if (result.value) {
        this.arrayBenficios =  this.arrayBenficios.filter(processos => processos.nb !== beneficio.nb);
        Swal.fire(
          'Deletado!',
          'Seu Processo foi deletado',
          'success'
        )
      }else{
        Swal.fire(
          'Cancelado',
          '',
          'error'
      )
      }
    })


    },
    alertCalculoComObservacoes() {
      this.isPrescricaoQuinquenal()
      if (this.info_calculo.beneficio && this.info_calculo.beneficio.split(" - ")[0] === "21") {
        return "21 - PENSÃO POR MORTE, Revisar os termos"
      }
      return ""

    },
    CalcularDataFinalMenorQueAnterior(dcb, dib){
        const StringForDateDCB = new Date(dcb.split("/").reverse().join("-"));
        const StringForDateDIB = new Date(dib.split("/").reverse().join("-"))
        if(StringForDateDIB > StringForDateDCB){
          /* this.showPopup = true; */
          Swal.fire({
                    icon: 'success',
                    text: 'Termo inicial do desconto ajustado para a DIB do benefício devido!',
                  });
          const valorParaAcicionarAoDia = String((this.ConverterDateToString(StringForDateDIB)).split("/")[0].split("").map(Number)[1] + 1)
          const separarDataParaAcionarNovoDia = dib.split("")
          separarDataParaAcionarNovoDia[1] = valorParaAcicionarAoDia;
          const juntarDataNovamente = separarDataParaAcionarNovoDia.join('')
          return juntarDataNovamente
        }
        return dcb
    },
    ConverterDateToString(date){
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    ConverterToDate(dateString){
      const [day, month, year] = dateString.split('/');
      return new Date(`${year}-${month}-${day}`);
    },
    isPrescricaoQuinquenal() {
      if (this.indentificadorDePersistenciaQuinquenal != this.info_calculo.nb && ((this.dtInicial.length != 0 || this.dtInicial.split('/').length == 3) && (this.info_calculo.dataAjuizamento != 0 || this.info_calculo.dataAjuizamento.split('/').length == 3))) {
        const [dayAjuizamento, monthAjuizamento, yearAjuizamento] = this.info_calculo.dataAjuizamento.split('/');
        const [dayDtInicial, monthDtInicial, yearDtInicial] = this.dtInicial.split('/');
        const diffInYears = yearAjuizamento - yearDtInicial;
        const diffInMonths = monthAjuizamento - monthDtInicial;
        const diffInDays = dayAjuizamento - dayDtInicial;
        if (yearAjuizamento > 1000 && yearDtInicial > 1000) {
          if (diffInYears > 5) {
            this.indentificadorDePersistenciaQuinquenal = this.info_calculo.nb;
            this.$confirm("Conferir o termo inicial do calculo", "Prescrição quinquenal não observada", "error")
          } else if (diffInYears === 5) {
            if (diffInMonths > 0 || (diffInMonths === 0 && diffInDays >= 0)) {
              this.indentificadorDePersistenciaQuinquenal = this.info_calculo.nb;
              this.$confirm("Conferir o termo inicial do calculo", "Prescrição quinquenal não observada", "error")
            }
          }
        }

      }

    },
    acessoPortalADM() {
      this.$prompt("Digite a senha de acesso").then((text) => {
        if (text == "1") {
          this.add_taxa = true;
        } else {
          this.add_taxa = false;
          this.$alert("SENHA ERRADA");
        }
      })
    },
    async novoCalculo() {
      if (this.verificadoInformacoes()) {
        try {
          this.loading = true;
          console.log("TESTEEEEEE AQUI A DIB " + this.info_calculo.dibInicial)
          
          const body = {
            inicioCalculo: this.dtInicial,
            dip: this.dtFinal,
            atulizacao: this.atulizacao,
            incioJuros: this.inicio_juros,
            rmi: this.salarioInicial,
            juros: this.boolJuros,
            tipoJuros: this.tipoJuros,
            tipoCorrecao: this.tipoCorrecao,
            salarioMinimo: this.salarioMinimo,
            limiteMinimoMaximo: this.limiteMinimoMaximo,
            salario13: this.salario13,
            dib:
              this.info_calculo.dibInicial == null ||
                this.info_calculo.dibInicial == ""
                ? this.dtInicial
                : this.info_calculo.dibInicial,
            porcentagemRMI: this.porcentagemRMI,
            salario13Obrigatorio: this.salario13Obrigatorio,
            dibAnterior:
              this.dibAnterior == null || this.dibAnterior == ""
                ? ""
                : this.dibAnterior,
            selic: this.selic,
            beneficio: this.info_calculo.beneficio
          };
          this.arrayBeneficioAcumuladosContaveis = this.beneficio === true ? await triagemBeneficiosValidos(body, this.arrayBenficios, this.beneficiosInacumulveisBanco) : []
          let [tabelaDeCalculo] = await Promise.all([calculoTabelaPrincipal(body, this.arrayBeneficioAcumuladosContaveis)])
          this.calc_total = tabelaDeCalculo;
          this.totaisSalario()
        } catch (error) {
          let message = await error.message;
          this.$alert(message, "Error", "error", {
            confirmButtonText: "Got it!",
          });
        }
        this.loading = false;
      }

    },
    headersTabelaPrincipal() {
      if (this.calc_total.find(linha => linha.recebido >= 0) === undefined) {
        return [
          { value: "data", text: "Data" },
          { value: "reajusteAcumulado", text: "Reajuste" },
          { value: "salario", text: "Salário Reajustado" },
          { value: "correcao", text: "Correção Monetária" },
          { value: "salarioCorrigido", text: "Salário Corrigido R$" },
          { value: "juros", text: "Juros" },
          { value: "salarioJuros", text: "Salário Juros R$" },
          { value: "salarioTotal", text: "Total" },
        ];
      } else {
        return [
          { value: "data", text: "Data" },
          { value: "reajusteAcumulado", text: "Reajuste" },
          { value: "devido", text: "Devido R$" },
          { value: "reajusteRecebido", text: "Reajute" },
          { value: "recebido", text: "Recebido R$" },
          { value: "salario", text: "Salário R$" },
          { value: "correcao", text: "Correção Salarial" },
          { value: "salarioCorrigido", text: "Salário Corrigido R$" },
          { value: "juros", text: "Juros" },
          { value: "salarioJuros", text: "Salário Juros R$" },
          { value: "salarioTotal", text: "Total R$" },
        ];
      }
    },
    quebraLinhaDescribe(describe) {
      let arrayDescribe = describe;

      let newDescribe = "";
      arrayDescribe.forEach((obj, index) => {
        newDescribe += obj;
        if (index % 79 == 0) {
          newDescribe += " \n";
        }
      });
      return newDescribe;
    },

    beneficiosEspecialInfo(obj_beneficioAcumulado) {
      if (
        obj_beneficioAcumulado.beneficio != null &&
        (obj_beneficioAcumulado.beneficio.includes("Seguro Desemprego") ||
          obj_beneficioAcumulado.beneficio.includes("Seguro Defesa") ||
          obj_beneficioAcumulado.beneficio.includes("Auxílio Emergencial"))
      ) {
        obj_beneficioAcumulado.salario13 = true;
        obj_beneficioAcumulado.salario13Obrigatorio = true;
        return obj_beneficioAcumulado;
      } else {
        return obj_beneficioAcumulado;
      }
    },
    disableBeneficiosEspecial(obj_beneficioAcumulado) {
      if (
        obj_beneficioAcumulado.beneficio != null &&
        (obj_beneficioAcumulado.beneficio.includes("Seguro Desemprego") ||
          obj_beneficioAcumulado.beneficio.includes("Seguro Defesa") ||
          obj_beneficioAcumulado.beneficio.includes("Auxílio Emergencial"))
      ) {
        return true;
      } else {
        return false;
      }
    },
    removerItemTablePrincipal(item) {
      this.calc_total = this.calc_total.filter((obj) => {
        return obj != item;
      });
    },
    acrescentarTaxaTablePrincipal(item) {
      item.data = this.formatarDataTable(item.data);
      if (
        !this.disableLinhaTable(item.data) &&
        (item.correcao == 0 || item.correcao == null)
      ) {
        this.calc_total = this.calc_total.filter(async (obj) => {
          if (obj.correcao == null || obj.correcao == 0) {
            let bodytaxaUnica = {
              inicioCalculo: item.data,
              tipoJuros: this.tipoJuros,
              tipoCorrecao: this.tipoCorrecao,
              atulizacao: this.atulizacao,
              selic: this.selic,
              juros: this.boolJuros,
            };
            let taxas = await axios
              .post(`${baseApiUrl}/calculo/taxaUnica`, bodytaxaUnica)
              .then(async (taxaUnica) => {
                let taxaUnicaData = await taxaUnica.data;
                let correcao = await taxaUnicaData.correcao;
                let juros = await taxaUnicaData.juros;
                return {
                  correcao,
                  juros,
                };
              })
              .catch((error) => {
                console.log(error);
                console.log("error taxaUnica");
                return {
                  correcao: 1,
                  juros: 1,
                };
              });
            obj.juros = await taxas.juros;
            obj.correcao = await taxas.correcao;
            return obj;
          } else {
            return obj;
          }
        });
      }
    },
    totaisSalarioTablePrincipal(item) {
      if (item.devido == 0 || item.devido == null) {
        item.salarioCorrigido =
          Math.floor(item.salario * item.correcao * 100) / 100;
        item.salarioJuros = Math.floor(item.salario * item.juros * 100) / 100;
        item.salarioTotal =
          Math.floor(item.salario * item.correcao * (1 + item.juros) * 100) /
          100;
        return item;
      } else {
        item.salario = item.devido - item.recebido;
        item.salarioCorrigido =
          Math.floor(item.salario * item.correcao * 100) / 100;
        item.salarioJuros = Math.floor(item.salario * item.juros * 100) / 100;
        item.salarioTotal =
          Math.floor(item.salario * item.correcao * (1 + item.juros) * 100) /
          100;
        return item;
      }
    },
    formatarDataTable(data) {
      let tamanhoData = data.toString().split("").length;
      let tamanhoDataVerificacao = data.toString().split("/").length;
      if (tamanhoDataVerificacao == 3) {
        return data;
      } else if (tamanhoData == 8 && tamanhoDataVerificacao == 1) {
        let newData = data.toString().split("");
        let dataFormatada =
          newData[0] +
          newData[1] +
          "/" +
          newData[2] +
          newData[3] +
          "/" +
          newData[4] +
          newData[5] +
          newData[6] +
          newData[7];
        return dataFormatada;
      } else {
        return data;
      }
    },
    disableLinhaTable(data) {
      let tamanhoDataVerificacao = data.toString().split("/");
      if (
        tamanhoDataVerificacao.length == 3 &&
        parseInt(tamanhoDataVerificacao[2]) >= 1995
      ) {
        return false;
      } else {
        return true;
      }
    },
    //FUNCAO SEM SENTIDO MAS EVITA BUG DE ATUALIZAO ENTAO NAO MEXA!!!!
    atulizarvalor() {
      let valor = this.valor_total;
      this.valor_total += valor;
      this.valor_total -= valor;
      console.log(this.info_calculo);
      this.infos = this.info_calculo;
      this.info_calculo = this.infos;
      this.valor_juros += 100;
      this.valor_juros -= 100;
    },
    adicionarLinha() {
      this.calc_total.push({
        data: "",
        reajusteAcumulado: 1,
        devido: 0,
        reajusteRecebido: 0,
        recebido: 0,
        salario: 0,
        correcao: 0,
        salarioCorrigido: 0,
        juros: 0,
        salarioJuros: 0,
        salarioTotal: 0,
      });
    },
    exibirBoolean(boolean) {
      if (boolean) {
        return "sim";
      } else {
        return "não";
      }
    },
    parcelasDevida() {
      this.alcadaValor = Math.floor(this.alcadaValor * 100) / 100;
      this.alcadaTotal =
        this.alcadaValor - this.salariominimosAlcada < 0
          ? 0
          : Math.floor((this.alcadaValor - this.salariominimosAlcada) * 100) /
          100;
      this.pacelasVencidas =
        Math.floor(
          (Math.floor(this.alcadaTotal * this.alcadaCorrecaoPorcetagem * 100) /
            100 +
            Math.floor(this.alcadaTotal * this.alcadaJurosPorcentagem * 100) /
            100) *
          100
        ) / 100;
    },
    verificadoInformacoes() {
      if (
        this.dtInicial == "" ||
        this.dtFinal == "" ||
        this.atulizacao == "" ||
        this.inicio_juros == "" ||
        this.inicio_juros == null ||
        this.salarioInicial == "" ||
        this.tipoJuros == "" ||
        this.tipoCorrecao == ""
      ) {
        this.verificadoInformacao = true;
        this.alertTexto =
          "Verifique se os campos com * estão preenchido corretamente.";
        return false;
      } else {
        this.verificadoInformacao = false;
        return true;
      }
    },
    calculo() {
      if (this.verificadoInformacoes()) {
        this.porcentagemRMI =
          this.porcentagemRMI != 0 &&
            this.porcentagemRMI != null &&
            this.porcentagemRMI != ""
            ? this.porcentagemRMI
            : 100;
        const body = {
          inicioCalculo: this.dtInicial,
          dip: this.dtFinal,
          atulizacao: this.atulizacao,
          incioJuros: this.inicio_juros,
          rmi: this.salarioInicial,
          juros: this.boolJuros,
          tipoJuros: this.tipoJuros,
          tipoCorrecao: this.tipoCorrecao,
          salarioMinimo: this.salarioMinimo,
          limiteMinimoMaximo: this.limiteMinimoMaximo,
          salario13: this.salario13,
          dib:
            this.info_calculo.dibInicial == null ||
              this.info_calculo.dibInicial == ""
              ? this.dtInicial
              : this.info_calculo.dibInicial,
          porcentagemRMI: this.porcentagemRMI,
          salario13Obrigatorio: this.salario13Obrigatorio,
          dibAnterior:
            this.dibAnterior == null || this.dibAnterior == ""
              ? ""
              : this.dibAnterior,
          selic: this.selic,
        };
        console.log("Body calc_total" + body.dib);
        let timer = 0;

        axios
          .post(`${baseApiUrl}calculo/calcular`, body)
          .then(async (response) => {
            this.calc_total = await response.data;
            console.log("salario13Obrigatorio: " + this.salario13Obrigatorio);
            console.log(this.calc_total);
          })
          .then(() => {
            this.iniciarCalculo();
          })
          .then(() => {
            if (this.beneficio == true) {
              let beneficioProvisorio;
              this.beneficiosInacumulveisBanco.forEach((value) => {
                if (
                  parseInt(value.name.split("-")[0]) ==
                  parseInt(this.info_calculo.beneficio.split("-")[0])
                ) {
                  console.log("Beneficio provisorio: " + value.name);
                  beneficioProvisorio = value;
                }
              });
              this.arrayBenficios.forEach((value) => {
                beneficioProvisorio.inacumulavel.forEach((dado, index) => {
                  if (
                    parseInt(dado.split("-")[0]) ==
                    parseInt(value.beneficio.split("-")[0])
                  ) {
                    this.beneficioInacumulavel.push(value);
                  } else if (
                    (value.beneficio.includes("Seguro Desemprego") ||
                      value.beneficio.includes("Seguro Defesa")) &&
                    index == beneficioProvisorio.inacumulavel.length - 1
                  ) {
                    this.beneficioInacumulavel.push(value);
                  }
                  timer = 500;
                  console.log(timer);
                });
              });
              this.headers = [
                { value: "data", text: "Data" },
                { value: "reajusteAcumulado", text: "Reajuste" },
                { value: "devido", text: "Devido R$" },
                { value: "reajusteRecebido", text: "Reajute" },
                { value: "recebido", text: "Recebido R$" },
                { value: "salario", text: "Salário R$" },
                { value: "correcao", text: "Correção Salarial" },
                { value: "salarioCorrigido", text: "Salário Corrigido R$" },
                { value: "juros", text: "Juros" },
                { value: "salarioJuros", text: "Salário Juros R$" },
                { value: "salarioTotal", text: "Total R$" },
              ];
            } else {
              this.headers = [
                { value: "data", text: "Data" },
                { value: "reajusteAcumulado", text: "Reajuste" },
                { value: "salario", text: "Salário R$" },
                { value: "correcao", text: "Correção Salarial" },
                { value: "salarioCorrigido", text: "Salário Corrigido R$" },
                { value: "juros", text: "Juros" },
                { value: "salarioJuros", text: "Salário Juros R$" },
                { value: "salarioTotal", text: "Total" },
              ];
            }
          })
          .then(() => {
            this.beneficioAcumuladoCalculo();
          })
          .then(() => {
            if (!this.porcentagemHonorarios && !this.DataHonorarios) {
              this.textoHonorarios = null;
            } else {
              this.honorarios(
                this.DataHonorarios.split("/")[1],
                this.DataHonorarios.split("/")[2]
              );
              this.textoHonorarios =
                this.porcentagemHonorarios +
                "% com parcelas até " +
                this.DataHonorarios;
            }
          })
          // .then(() => {
          //   this.honorarios(
          //     this.DataHonorarios.split("/")[1],
          //     this.DataHonorarios.split("/")[2]
          //   );
          // })
          .then(() => {
            if (this.alcadaBoolean) {
              this.calculoDeOssada();
            }
          })
          .then(() => {
            this.totaisSalario();
          })
          // .then(() => {
          //   const print = () => {
          //     return new Promise((resolve) => {
          //       setTimeout(() => {
          //         resolve("The request is successful. " + this.printDiv());
          //       });
          //     }, timer);
          //   };
          //   const sleep = async () => {
          //     let second_response = await print();
          //     console.log(second_response);
          //   };

          //   sleep();
          // })
          .catch((error) => {
            console.log(error);
            console.log("error Calculo");
          });
      }
    },
    verificarCalculo() {
      if (this.calc_total[0]) {
        return true;
      } else {
        this.verificadoInformacao = true;
        this.alertTexto = "Obrigatório gerar e examinar a tabela de cálculo.";
        return false;
      }
    },
     formatarPorcentagemAcordo() {
      return this.procntagem_acordo != 0 && this.procntagem_acordo != null
        ? this.procntagem_acordo
        : 100;
    },
    async verificarAdicaoNoLote() {
      EventBus.$emit('deletarPeloHome', this.info_calculo.id);
      //this.loading = true;
      //await deleteInformationForCalculoToID(JSON.stringify(this.info_calculo.id))
      this.adicionarLote();
    },
    adicionarLote() {
      this.conteudoHTML();
      //this.loading = false;
      if (this.verificadoInformacoes() && this.verificarCalculo()) {
        let nomeBeneficioBeneficioAcumulado = [];
        let dataDeInicioBeneficioAcumulado = [];
        let dataFinalBeneficioAcumulado = [];
        let rmilBeneficioAcumulado = [];
        let porcentagemRmiBeneficioAcumulado = [];
        let salario13BeneficioAcumulado = [];
        let salarioMinimoBeneficioAcumulado = [];
        let limiteMinimoMaximoBeneficioAcumulado = [];
        let Salario13ObrigatorioBeneficioAcumulado = [];
        this.beneficioInacumulavel.forEach((value) => {
          nomeBeneficioBeneficioAcumulado.push(value.beneficio);
          dataDeInicioBeneficioAcumulado.push(value.dib);
          dataFinalBeneficioAcumulado.push(value.dcb);
          rmilBeneficioAcumulado.push(value.rmi);
          porcentagemRmiBeneficioAcumulado.push(value.porcentagemRMI);
          salario13BeneficioAcumulado.push(value.salario13);
          salarioMinimoBeneficioAcumulado.push(value.salarioMinimo);
          limiteMinimoMaximoBeneficioAcumulado.push(value.limiteMinimoMaximo);
          Salario13ObrigatorioBeneficioAcumulado.push(
            value.salario13Obrigatorio
          );
        });
        const calculoData = [];
        const calculo_reajusteAcumulado = [];
        const calculo_devido = [];
        const calculo_reajusteRecebido = [];
        const calculo_recebido = [];
        const calculo_salario = [];
        const calculo_correcao = [];
        const calculo_salarioCorrigido = [];
        const calculo_juros = [];
        const calculo_salarioJuros = [];
        const calculo_salarioTotal = [];

        this.calc_total.forEach((value) => {
          calculoData.push(value.data);
          calculo_reajusteAcumulado.push(value.reajusteAcumulado);
          calculo_devido.push(value.devido);
          calculo_reajusteRecebido.push(value.reajusteRecebido);
          calculo_recebido.push(value.recebido);
          calculo_salario.push(value.salario);
          calculo_correcao.push(value.correcao);
          calculo_salarioCorrigido.push(value.salarioCorrigido);
          calculo_juros.push(value.juros);
          calculo_salarioJuros.push(value.salarioJuros);
          calculo_salarioTotal.push(value.salarioTotal);
        });
        let body = {
          numeroDoProcesso: this.info_calculo.numeroDoProcesso,
          nome: this.info_calculo.nome,
          dataDeAjuizamento: this.info_calculo.dataAjuizamento,
          inicioJuros:
            this.inicio_juros == "" || this.inicio_juros == null
              ? this.info_calculo.citacao
              : this.inicio_juros,
          numeroDoBeneficio: this.info_calculo.nb,
          rmi: this.salarioInicial,
          recebeuBeneficio: this.beneficio,
          termoInicial: this.dtInicial,
          termoFinal: this.dtFinal,
          beneficio: this.info_calculo.beneficio,
          cpf: this.info_calculo.cpf,
          honorarioAdvocativosData: this.DataHonorarios,
          honorariosAdvocativos: this.porcentagemHonorarios,
          dataDePagamento: this.info_calculo.dip,
          citacao: this.info_calculo.citacao == null ? this.info_calculo.dataAjuizamento : this.info_calculo.citacao,
          nomeBeneficioBeneficioAcumulado,
          dataDeInicioBeneficioAcumulado,
          dataFinalBeneficioAcumulado,
          rmilBeneficioAcumulado,
          limiteMinimoMaximoBeneficioAcumulado,
          salario13BeneficioAcumulado,
          salarioMinimoBeneficioAcumulado,
          porcentagemRmiBeneficioAcumulado,
          Salario13ObrigatorioBeneficioAcumulado,
          acordo: this.procntagem_acordo,
          tipoJuros: this.tipoJuros,
          tipoCorrecao: this.tipoCorrecao,
          dibAnterior: this.dibAnterior,
          atualizacao: this.atulizacao,
          possuiDecimoTerceiro: this.salario13,
          possuiJuros: this.boolJuros,
          alcada: this.alcadaBoolean,
          limiteMinimoMaximo: this.limiteMinimoMaximo,
          salarioMinimo: this.salarioMinimo,
          aps: this.info_calculo.aps,
          usuario: this.usuario_id,
          total_processos: this.total_processos,
          valor_total: this.valor_total,
          valor_juros: this.valor_juros,
          valor_corrigido: this.valor_corrigido,
          valorHonorarios: this.valorHonorarios,
          pacelasVencidas: this.pacelasVencidas,
          data: calculoData,
          reajusteAcumulado: calculo_reajusteAcumulado,
          devido: calculo_devido,
          reajusteRecebido: calculo_reajusteRecebido,
          recebido: calculo_recebido,
          salario: calculo_salario,
          correcao: calculo_correcao,
          salarioCorrigido: calculo_salarioCorrigido,
          juros: calculo_juros,
          salarioJuros: calculo_salarioJuros,
          salarioTotal: calculo_salarioTotal,
          alcadaJurosPorcentagem: this.alcadaJurosPorcentagem,
          alcadaValor: this.alcadaValor,
          salariominimosAlcada: this.salariominimosAlcada,
          alcadaJuros: this.alcadaJuros,
          alcadaCorrecao: this.alcadaCorrecao,
          alcadaTotal: this.alcadaTotal,
          textoPeriodoAlcada: this.textoPeriodoAlcada,
          alcadaCorrecaoPorcetagem: this.alcadaCorrecaoPorcetagem,
          url: this.info_calculo.urlProcesso,
          textoHonorarios: this.textoHonorarios,
          iPvalorAnoAnterior: this.iPvalorAnoAnterior,
          iPvalorAnoAtual: this.iPvalorAnoAtual,
          competenciaAnoAnterior: this.competenciaAnoAnterior,
          competenciaAnoAtual: this.competenciaAnoAtual,
          porcentagemRMI: this.porcentagemRMI == null ? 100 : this.porcentagemRMI,
          tipo: this.info_calculo.tipo,
          dib: this.info_calculo.dib,
          salario13Obrigatorio: this.salario13Obrigatorio,
          conteudoHTML: this.memoriaCalculoHTM,
        };
        console.log("Body")
        console.log(body);
        Axios.AxiosApiControleUsuario.post(`calculoLote`, body)
          .then((response) => {
            console.log(response.data);
            Axios.AxiosApiControleUsuario.get(`calculoLote`)
              .then((response) => {
                this.calculoLote = response.data;
                console.log("Calculo")
                console.log(this.calculoLote);
                this.$alert(
                  "Calculo adicionado ao Lote.",
                  "Success",
                  "success"
                ).then(() => console.log("Closed"));
              })
              .catch((error) => {
                console.log(error);
                console.log("error 2");
              });
          })
          .catch((error) => {
            console.log(error);
            console.log("error 1");
          });
      }

      // this.calculoLote.push({
      //   numeroDoProcesso: this.info_calculo.numeroDoProcesso,
      //   nome: this.info_calculo.nome,
      //   dataDeAjuizamento: this.info_calculo.dataAjuizamento,
      //   inicio_juros: this.info_calculo.citacao,
      //   numeroDoBeneficio: this.info_calculo.nb,
      //   rmi: this.salarioInicial,
      //   recebeuBeneficio: this.beneficio,
      //   termoInicial: this.dtInicial,
      //   termoFinal: this.dtFinal,
      //   beneficio: this.info_calculo.beneficio,
      //   cpf: this.info_calculo.cpf,
      //   honorarioAdvocativosData: this.DataHonorarios,
      //   honorariosAdvocativos: this.porcentagemHonorarios,
      //   dataDePagamento: this.info_calculo.dip,
      //   citacao: this.info_calculo.citacao,
      //   nomeBeneficioBeneficioAcumulado,
      //   dataDeInicioBeneficioAcumulado,
      //   dataFinalBeneficioAcumulado,
      //   rmilBeneficioAcumulado,
      //   acordo: this.procntagem_acordo,
      //   tipoJuros: this.tipoJuros,
      //   tipoCorrecao: this.tipoCorrecao,
      //   dibAnterior: this.dibAnterior,
      //   atualizacao: this.atulizacao,
      //   possuiDecimoTerceiro: this.salario13,
      //   possuiJuros: this.boolJuros,
      //   alcada: this.alcadaBoolean,
      //   limiteMinimoMaximo: this.limiteMinimoMaximo,
      //   salarioMinimo: this.salarioMinimo,
      //   aps: this.info_calculo.aps,
      //   usuario: 1
      // })
      console.log(this.calculoLote[this.calculoLote.length - 1]);
    },
    removerItemLote(dado) {
      console.log(dado)
      console.log(dado.id);
      this.$prompt("Digite seu nome de usuario").then((text) => {
        if (text == this.username) {
          this.loading = true;
          let body = dado;
          //this.calculoLote = this.calculoLote.filter((item) => item !== dado);
          Axios.AxiosApiControleUsuario.delete(`calculoLote/${body.id}`)
            .then(async (res) => {
              console.log(res.data);
              Axios.AxiosApiControleUsuario.get(`calculoLote`)
                .then((response) => {
                  this.loading = false;
                  this.calculoLote = response.data;
                  console.log(this.calculoLote);
                })
                .catch((error) => {
                  this.loading = false;
                  console.log(error.message);
                  console.log("error 2");
                });
            })
            .catch((error) => {
              this.loading = false;
              console.log(error.message);
              console.log("error 1");
            });
        } else {
          this.$alert("Nome errado");
        }
      });
    },
    deletarLote() {
      console.log();
      this.$prompt("Digite seu CPF").then((text) => {
        if (text == this.cpfSapiens) {
          Axios.AxiosApiControleUsuario.delete(`calculoLote`, this.calculoLote)
            .then((dados) => {
              console.log(dados);
              Axios.AxiosApiControleUsuario.get(`calculoLote`)
                .then((response) => {
                  this.calculoLote = response.data;
                  console.log(this.calculoLote);
                })
                .catch((error) => {
                  console.log(error);
                  console.log("error lote");
                });
            })
            .catch((error) => {
              console.log(error);
              console.log("error deletar");
            });
        } else {
          this.$alert("CPF errado");
        }
      });
    },
    atulizarInfosLote(dado) {
      this.zeraDadosDocalculo();
      let beneficioAcumuladoLote = [];
      if (dado.recebeuBeneficio) {
        this.headers = [
          { value: "data", text: "Data" },
          { value: "reajusteAcumulado", text: "Reajuste" },
          { value: "devido", text: "Devido R$" },
          { value: "reajusteRecebido", text: "Reajute" },
          { value: "recebido", text: "Recebido R$" },
          { value: "salario", text: "Salário R$" },
          { value: "correcao", text: "Correção Salarial" },
          { value: "salarioCorrigido", text: "Salário Corrigido R$" },
          { value: "juros", text: "Juros" },
          { value: "salarioJuros", text: "Salário Juros R$" },
          { value: "salarioTotal", text: "Total R$" },
        ];
        dado.nomeBeneficioBeneficioAcumulado.forEach((value, index) => {
          beneficioAcumuladoLote.push({
            beneficio: this.refatoreNameBeneficio(value),
            dib: dado.dataDeInicioBeneficioAcumulado[index],
            dcb: dado.dataFinalBeneficioAcumulado[index],
            rmi: dado.rmilBeneficioAcumulado[index],
/*             nb: dado.rmilBeneficioAcumulado[index], */
            limiteMinimoMaximo:
              dado.limiteMinimoMaximoBeneficioAcumulado[index],
            salario13: dado.salario13BeneficioAcumulado[index],
            salarioMinimo: dado.salarioMinimoBeneficioAcumulado[index],
            salario13Obrigatorio:
              dado.Salario13ObrigatorioBeneficioAcumulado == null
                ? false
                : dado.Salario13ObrigatorioBeneficioAcumulado[index],
            porcentagemRmi: dado.porcentagemRmiBeneficioAcumulado[index],
          });
        });
      } else {
        this.headers = [
          { value: "data", text: "Data" },
          { value: "reajusteAcumulado", text: "Reajuste" },
          { value: "salario", text: "Salário R$" },
          { value: "correcao", text: "Correção Salarial" },
          { value: "salarioCorrigido", text: "Salário Corrigido R$" },
          { value: "juros", text: "Juros" },
          { value: "salarioJuros", text: "Salário Juros R$" },
          { value: "salarioTotal", text: "Total" },
        ];
      }
      let calcul = [];
      dado.data.forEach((value, index) => {
        calcul.push({
          data: value,
          reajusteAcumulado: dado.reajusteAcumulado[index],
          devido: dado.devido[index],
          reajusteRecebido:
            dado.reajusteRecebido[index] == null
              ? 0
              : dado.reajusteRecebido[index],
          recebido: dado.recebido[index] == null ? 0 : dado.recebido[index],
          salario: dado.salario[index],
          correcao: dado.correcao[index],
          salarioCorrigido: dado.salarioCorrigido[index],
          juros: dado.juros[index],
          salarioJuros: dado.salarioJuros[index],
          salarioTotal: dado.salarioTotal[index],
        });
      });
      console.log(dado.url);
      console.log("Nome: ", dado.nome)
      this.info_calculo.urlProcesso = dado.url;
      this.info_calculo.dip = dado.dataDePagamento;
      this.calc_total = calcul;
      this.total_processos = dado.total_processos;
      this.valor_total = dado.valor_total;
      this.valor_juros = dado.valor_juros;
      this.valor_corrigido = dado.valor_corrigido;
      this.valorHonorarios = dado.valorHonorarios;
      this.pacelasVencidas = dado.pacelasVencidas;
      this.dtInicial = dado.termoInicial;
      this.dtFinal = dado.termoFinal;
      this.salarioInicial = dado.rmi;
      console.log("salarioInicial")
      console.log(dado.rmi)
      this.inicio_juros = dado.inicioJuros;
      this.DataHonorarios = dado.honorarioAdvocativosData;
      this.porcentagemHonorarios = dado.honorariosAdvocativos;
      this.procntagem_acordo = dado.acordo;
      this.salario13 = dado.possuiDecimoTerceiro;
      this.boolJuros = dado.possuiJuros;
      this.alcadaBoolean = dado.alcada;
      this.tipoJuros = dado.tipoJuros;
      this.tipoCorrecao = dado.tipoCorrecao;
      this.atulizacao = dado.atualizacao;
      this.dibAnterior = dado.dibAnterior;
      this.salarioMinimo = dado.salarioMinimo;
      this.limiteMinimoMaximo = dado.limiteMinimoMaximo;
      this.beneficio = dado.recebeuBeneficio;
      this.arrayBenficios = beneficioAcumuladoLote;
      this.info_calculo.numeroDoProcesso = dado.numeroDoProcesso;
      this.info_calculo.nome = dado.nome;
      this.info_calculo.dataAjuizamento = dado.dataDeAjuizamento;
      this.info_calculo.nb = dado.numeroDoBeneficio;
      this.info_calculo.beneficio = this.refatoreNameBeneficio(dado.beneficio);
      console.log(
        "this.info_calculo.beneficio: " + this.info_calculo.beneficio
      );
      this.beneficioInacumulavel = beneficioAcumuladoLote;
      this.procntagem_acordo = dado.acordo;
      this.dibAnterior = dado.dibAnterior;
      this.textoHonorarios = dado.textoHonorarios;
      this.info_calculo.cpf = dado.cpf;
      this.alcadaJurosPorcentagem = dado.alcadaJurosPorcentagem;
      this.alcadaValor = dado.alcadaValor;
      this.salariominimosAlcada = dado.salariominimosAlcada;
      this.alcadaJuros = dado.alcadaJuros;
      this.alcadaCorrecao = dado.alcadaCorrecao;
      this.alcadaTotal = dado.alcadaTotal;
      this.textoPeriodoAlcada = dado.textoPeriodoAlcada;
      this.alcadaCorrecaoPorcetagem = dado.alcadaCorrecaoPorcetagem;
      this.iPvalorAnoAnterio = dado.iPvalorAnoAnterio;
      this.iPvalorAnoAtual = dado.iPvalorAnoAtual;
      this.competenciaAnoAnterior = dado.competenciaAnoAnterior;
      this.competenciaAnoAtual = dado.competenciaAnoAtual;
      this.porcentagemRMI = dado.porcentagemRMI;
      this.info_calculo.dib =
        dado.dib == null || dado.dib == "" ? dado.termoInicial : dado.dib;
    },
    refatoreNameBeneficio(beneficio) {
      let benficioVerdadeiro = beneficio;
      this.beneficiosInacumulveisBanco.forEach((value) => {
        if (
          parseInt(value.name.split("-")[0]) ==
          parseInt(beneficio.split("-")[0]) ||
          beneficio.includes("Seguro Desemprego") ||
          beneficio.includes("Auxílio Emergencial") ||
          beneficio.includes("Seguro Defesa")
        ) {
          console.log("benefio e " + value.name);
          benficioVerdadeiro = value.name;
        }
      });
      return benficioVerdadeiro;
    },
    calcularLote() {
      const body = {
        inicioCalculo: this.dtInicial,
        dip: this.dtFinal,
        atulizacao: this.atulizacao,
        incioJuros: this.inicio_juros,
        rmi: this.salarioInicial,
        juros: this.boolJuros,
        tipoJuros: this.tipoJuros,
        tipoCorrecao: this.tipoCorrecao,
        salarioMinimo: this.salarioMinimo,
        limiteMinimoMaximo: this.limiteMinimoMaximo,
        salario13: this.salario13,
        dibAnterior: this.dibAnterior == "" ? null : this.dibAnterior,
        credencialCPF: "",
        credencialSenha: "",
      };
      let timer = 0;
      axios
        .post(`${baseApiUrl}/calculo/calcular`, body)
        .then(async (response) => {
          this.calc_total = await response.data;
        })
        .then(() => {
          this.iniciarCalculo();
        })
        .then(() => {
          if (this.beneficio == true) {
            let beneficioProvisorio;
            this.beneficiosInacumulveisBanco.forEach((value) => {
              if (
                parseInt(value.name.split("-")[0]) ==
                parseInt(this.info_calculo.beneficio.split("-")[0])
              ) {
                console.log("Beneficio provisorio: " + value.name);
                beneficioProvisorio = value;
              }
            });
            this.arrayBenficios.forEach((value) => {
              beneficioProvisorio.inacumulavel.forEach((dado) => {
                if (
                  parseInt(dado.split("-")[0]) ==
                  parseInt(value.beneficio.split("-")[0])
                ) {
                  this.beneficioInacumulavel.push(value);
                }
                timer = 500;
              });
            });
            console.log("size: " + this.beneficioInacumulavel.length);
            this.headers = [
              { value: "data", text: "Data" },
              { value: "reajusteAcumulado", text: "Reajuste" },
              { value: "devido", text: "Devido R$" },
              { value: "reajusteRecebido", text: "Reajute" },
              { value: "recebido", text: "Recebido R$" },
              { value: "salario", text: "Salário R$" },
              { value: "correcao", text: "Correção Salarial" },
              { value: "salarioCorrigido", text: "Salário Corrigido R$" },
              { value: "juros", text: "Juros" },
              { value: "salarioJuros", text: "Salário Juros R$" },
              { value: "salarioTotal", text: "Total R$" },
            ];
            //this.beneficioAcumuladoCalculo();
          } else {
            this.headers = [
              { value: "data", text: "Data" },
              { value: "reajusteAcumulado", text: "Reajuste" },
              { value: "salario", text: "Salário R$" },
              { value: "correcao", text: "Correção Salarial" },
              { value: "salarioCorrigido", text: "Salário Corrigido R$" },
              { value: "juros", text: "Juros" },
              { value: "salarioJuros", text: "Salário Juros R$" },
              { value: "salarioTotal", text: "Total" },
            ];
          }
        })
        .then(() => {
          this.beneficioAcumuladoCalculo();
        })
        .then(() => {
          if (!this.porcentagemHonorarios && !this.DataHonorarios) {
            this.textoHonorarios = null;
          } else {
            this.textoHonorarios =
              this.porcentagemHonorarios +
              "% com parcelas até " +
              this.DataHonorarios;
            this.honorarios(
              this.DataHonorarios.split("/")[1],
              this.DataHonorarios.split("/")[2]
            );
          }
        })
        .then(() => {
          if (this.alcadaBoolean) {
            this.calculoDeOssada();
          }
        })
        .then(() => {
          this.totaisSalario();
        })
        .then(() => {
          const print = () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve("The request is successful. " + this.printDiv());
              });
            }, timer);
          };
          const sleep = async () => {
            let second_response = await print();
            console.log(second_response);
          };

          sleep();
        })
        .catch((error) => {
          console.log(error);
          console.log("error");
        });
    },
    async calcularEmLote() {
      this.calculoLote.forEach(async (dado /*index*/) => {
        const print = () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(
                "The request is successful. " + this.atulizarInfosLote(dado)
              );
            });
          });
        };
        const executar = async () => {
          await print();
          //await this.imprimirPdf(dado);
          this.printDiv();
        };
        console.log(executar());
        // const promiseAtulizar =  new Promise(() => this.atulizarInfosLote(dado));
        // promiseAtulizar.then(() => this.imprimirPdf());
        // this.atulizarInfosLote(dado);
        // this.imprimirPdf();
        console.log("dado: " + dado);
        console.log(dado);
        //this.printDiv()
        //await this.calcularLote();
      });
    },
    imprimirPdf(dado) {
      // eslint-disable-next-line no-undef
      var doc = new jsPDF("portrait", "pt", "a4"),
        data = new Date();
      let margins = {
        top: 40,
        bottom: 60,
        left: 40,
        width: 1000,
      };
      var divToPrint = document.getElementById("areaToPrint");
      doc.fromHTML(
        divToPrint,
        margins.left, // x coord
        margins.top,
        { pagesplit: true },
        function () {
          doc.save(
            "Relatorio - " +
            dado.nome +
            " " +
            data.getDate() +
            "/" +
            data.getMonth() +
            "/" +
            data.getFullYear() +
            ".pdf"
          );
        }
      );
    },
    calculoDeOssada() {
      this.pacelasVencidas = 0;
      let ossada = 0;
      let date = this.info_calculo.dataAjuizamento.split("/");
      let correcao = 1;
      let juros = 0;
      let valueMes = 12;
      let mesOssada = parseInt(date[1]) + valueMes;
      let anoOssada;
      if (mesOssada > 12) {
        if (mesOssada > 24) {
          mesOssada -= 24;
          anoOssada = parseInt(date[2]) + 2;
        } else {
          mesOssada -= 12;
          anoOssada = parseInt(date[2]) + 1;
        }
      }
      const body = {
        inicioCalculo: this.dtInicial,
        dip: `01/${mesOssada}/${anoOssada}`,
        salario13: this.salario13,
        tipoCorrecao: this.tipoCorrecao,
        atulizacao: `${date[1]}/${date[2]}`,
        selic: this.selic,
      };
      const ossadaUrl = `${baseApiUrl}/salarioMinimo/procuraPorAno/${this.info_calculo.dataAjuizamento.split("/")[2]}`;
      axios(ossadaUrl).then(async (res) => {
        const obj = await res.data;
        const ajuizamento = this.info_calculo.dataAjuizamento.split("/");
        let bodytaxaUnica = {
          inicioCalculo: this.info_calculo.dataAjuizamento,
          tipoJuros: this.tipoJuros,
          tipoCorrecao: this.tipoCorrecao,
          atulizacao: this.atulizacao,
          selic: this.selic,
        };
        axios
          .post(`${baseApiUrl}/calculo/taxaUnica`, bodytaxaUnica)
          .then((taxaUnica) => {
            console.log(taxaUnica.data);
            let taxaUnicaData = taxaUnica.data;
            console.log("taxa unica: " + taxaUnicaData);
            correcao = taxaUnicaData.correcao;
            juros = taxaUnicaData.juros;
          })
          .catch((error) => {
            console.log(error);
            console.log("error taxaUnica");
          });
        await obj.forEach((value) => {
          console.log("valor: " + value.data.split("T")[0].split("-")[1]);
          if (value.data.split("T")[0].split("-")[1] <= ajuizamento[1]) {
            this.textoPeriodoAlcada = `SITUAÇÃO NO AJUIZAMENTO (${this.info_calculo.dataAjuizamento}) - Valor do salário mínimo: R$ ${value.valor}`;
            this.salarioMinimoOssada = 60 * value.valor;
            this.salariominimosAlcada = 60 * value.valor;
            console.log("Salario minimo: " + this.salarioMinimoOssada);
          }
        });

        axios
          .post(`${baseApiUrl}/calculo/alcada`, body)
          .then((response) => {
            console.log(response.data);
            let alcada = response.data;
            let arrayDateAjuizamento =
              this.info_calculo.dataAjuizamento.split("/");
            let dateAjuzamento = new Date(
              `${arrayDateAjuizamento[1]}-${arrayDateAjuizamento[0]}-${arrayDateAjuizamento[2]}`
            );
            console.log(dateAjuzamento);
            console.log("dateAjuzamento");
            console.log(alcada);
            this.beforeDateAjuizamento = 0;
            this.afterDateAjuizamento = 0;
            this.calc_total.forEach((value) => {
              alcada.forEach((dado) => {
                if (
                  value.data.split("/")[2] == dado.data.split("/")[2] &&
                  value.data.split("/")[1] == dado.data.split("/")[1]
                ) {
                  this.alcadaArray.push({
                    data: value.data,
                    reajusteAcumulado: value.reajusteAcumulado,
                    salario: value.salario,
                    correcao: dado.correcao,
                    salarioTotal:
                      Math.floor(dado.correcao * value.salario * 100) / 100,
                  });
                  let arrayDataCalculoAlcada = value.data.split("/");
                  let dataCalculoAlcada = new Date(
                    `${arrayDataCalculoAlcada[1]}-${arrayDataCalculoAlcada[0]}-${arrayDataCalculoAlcada[2]}`
                  );
                  if (dataCalculoAlcada > dateAjuzamento) {
                    this.afterDateAjuizamento +=
                      Math.floor(dado.correcao * value.salario * 100) / 100;
                  } else {
                    this.beforeDateAjuizamento +=
                      Math.floor(dado.correcao * value.salario * 100) / 100;
                  }
                  this.pacelasVencidas +=
                    Math.floor(dado.correcao * value.salario * 100) / 100;
                }
              });
            });
            console.log("Parcelas vencidas: " + this.pacelasVencidas);
            this.alcadaValor = Math.floor(this.pacelasVencidas * 100) / 100;
            this.salariominimosAlcada = this.salarioMinimoOssada;
            ossada =
              Math.floor(
                (this.pacelasVencidas - this.salarioMinimoOssada) * 100
              ) / 100;
            console.log("Parcelas vencidas: " + ossada);
            this.alcadaValue = Math.floor(this.pacelasVencidas * 100) / 100;
            if (ossada < 0) {
              ossada = 0;
              this.pacelasVencidas = ossada;
            } else {
              this.pacelasVencidas =
                Math.floor(ossada * correcao * (juros + 1) * 100) / 100;
            }
            this.alcadaJurosPorcentagem = Math.floor(juros * 1000000) / 1000000;
            this.alcadaCorrecaoPorcetagem =
              Math.floor(correcao * 1000000) / 1000000;
            this.alcadaJuros =
              Math.floor(ossada * juros * correcao * 100) / 100;
            this.alcadaCorrecao = Math.floor(ossada * correcao * 100) / 100;
            this.alcadaTotal = Math.floor(ossada * 100) / 100;
          })
          .catch((erro) => {
            console.log(erro);
            console.log("erro Alcada");
          });
      });
      //})
    },
    ajusteData(data) {
      let array1 = data.split("T");
      let arry2 = array1[0].split("-").reverse().join("/");
      return arry2;
    },
    zeraDadosDocalculo() {
      this.competenciaAnoAnterior = 0;
      this.competenciaAnoAtual = 0;
      this.total_processos = 0;
      this.iPvalorAnoAnterior = 0;
      this.iPvalorAnoAtual = 0;
      this.valor_total = 0;
      this.valor_juros = 0;
      this.valor_corrigido = 0;
      this.valorSalario13 = 0;
      this.arr_Salario13 = 0;
      this.juros13Valor = 0;
      this.corrigido13Valor = 0;
      //this.pacelasVencidas = 0;
      this.salarioMinimoOssada = 0;
      this.alcadaValue = 0;
      this.alcadaArray = [];
      return this.alcadaArray;
    },
    iniciarCalculo() {
      this.beneficioInacumulavel = [];
      if (this.total_processos > 0) {
        this.zeraDadosDocalculo();
      }
      const dtInicial = this.dtInicial.split("-").reverse().join("/");
      var dtFinal = this.dtFinal.split("-").reverse().join("/");
      let dinicial = parseInt(dtInicial.split("/")[0]);
      var dfinal =
        dtFinal.split("/")[0] >= 30 ||
          (dtFinal.split("/")[1] == 2 && dtFinal.split("/")[0] >= 28)
          ? 30
          : parseInt(dtFinal.split("/")[0]);
      let inical_calculo;
      this.inical_calculo = 1;
      if (dinicial >= 30 || (dtInicial.split("/")[1] == 2 && dinicial >= 28)) {
        inical_calculo = 1;
        this.formatçao_do_inicio(inical_calculo, dtInicial);
      } else {
        inical_calculo = 30 - dinicial + 1;
        this.formatçao_do_inicio(inical_calculo, dtInicial);
      }

      let x = this.calc_total.length - 1;

      if (this.calc_total[x].data.split("/")[0] == "13Salario") {
        x--;
      }

      if (dfinal == 31) {
        dfinal = 30;
        this.calc_total[x].salario =
          Math.floor((this.calc_total[x].salario / 30) * dfinal * 100) / 100;
        this.calc_total[x].salarioCorrigido =
          Math.floor(
            (this.calc_total[x].salarioCorrigido / 30) * dfinal * 100
          ) / 100;
        this.calc_total[x].salarioJuros =
          Math.floor((this.calc_total[x].salarioJuros / 30) * dfinal * 100) /
          100;
        this.calc_total[x].salarioTotal =
          Math.floor((this.calc_total[x].salarioTotal / 30) * dfinal * 100) /
          100;
        this.calc_total[x].data = dtFinal;
      } else {
        this.calc_total[x].salario =
          Math.floor((this.calc_total[x].salario / 30) * dfinal * 100) / 100;
        this.calc_total[x].salarioCorrigido =
          Math.floor(
            (this.calc_total[x].salarioCorrigido / 30) * dfinal * 100
          ) / 100;
        this.calc_total[x].salarioJuros =
          Math.floor((this.calc_total[x].salarioJuros / 30) * dfinal * 100) /
          100;
        this.calc_total[x].salarioTotal =
          Math.floor((this.calc_total[x].salarioTotal / 30) * dfinal * 100) /
          100;
        this.calc_total[x].data = dtFinal;
      }
    },
    beneficioAcumuladoCalculo() {
      let beneficioAcumulado13 = 0;
      let beneficioAcumulado13Especial = 0;
      function decontar(
        value,
        dado,
        dtInicial,
        dtFinal,
        index,
        size,
        dib,
        dcb,
        salrio13
      ) {
        console.log("Index: " + index);
        let dinicial = dtInicial.split("/");
        let recebido = value.salario;

        if (!value.data.split("/")[0].includes("13Salario")) {
          if (
            value.data.split("/")[1] == dinicial[1] &&
            value.data.split("/")[2] == dinicial[2]
          ) {
            beneficioAcumulado13 =
              dinicial[0] >= 15 ? beneficioAcumulado13++ : beneficioAcumulado13;
          } else {
            beneficioAcumulado13++;
          }
        } else {
          if (salrio13) {
            recebido = (recebido / 12) * beneficioAcumulado13;
            beneficioAcumulado13 = 0;
          } else {
            recebido = 0;
            beneficioAcumulado13 = 0;
          }
        }
        console.log(dtFinal);
        if (
          value.data.split("/")[1] == dinicial[1] &&
          value.data.split("/")[2] == dinicial[2]
        ) {
          console.log("AQUI");
          if (index == 0) {
            let dias =
              dib.split("/")[0] >= dinicial[0]
                ? dib.split("/")[0] >= 30 ||
                  (dib.split("/")[0] >= 28 && dib.split("/")[1] == 2)
                  ? 1
                  : 30 - dib.split("/")[0] + 1
                : dinicial[0] >= 30 || (dinicial[0] >= 28 && dinicial[0] == 2)
                  ? 1
                  : 30 - dinicial[0] + 1;
            recebido = (recebido / 30) * dias;
          } else {
            let dias =
              dinicial[0] >= 30 || (dinicial[0] >= 28 && dinicial[1] == 2)
                ? 1
                : 30 - dinicial[0] + 1;
            recebido = (recebido / 30) * dias;
          }
        } else if (
          value.data.split("/")[1] == dtFinal.split("/")[1] &&
          value.data.split("/")[2] == dtFinal.split("/")[2]
        ) {
          if (index == size) {
            let dias =
              dcb.split("/")[0] >= dtFinal.split("/")[0]
                ? dtFinal.split("/")[0] >= 30 ||
                  (dtFinal.split("/")[0] >= 28 && dtFinal.split("/")[2] == 2)
                  ? 30
                  : dtFinal.split("/")[0]
                    ? 30
                    : dtFinal.split("/")[0]
                : dcb.split("/")[0] >= 30 ||
                  (dcb.split("/")[0] >= 28 && dcb.split("/")[2] == 2)
                  ? 30
                  : dcb.split("/")[0];
            recebido = (recebido / 30) * dias;
          } else {
            let dias =
              dtFinal.split("/")[0] >= 30 ||
                (dtFinal.split("/")[0] >= 28 && dtFinal.split("/")[2] == 2)
                ? 30
                : dtFinal.split("/")[0];
            recebido = (recebido / 30) * dias;
          }
        } else if (index == size) {
          let dias =
            dcb.split("/")[0] >= 30 ||
              (dcb.split("/")[0] >= 28 && dcb.split("/")[2] == 2)
              ? 30
              : dcb.split("/")[0];
          recebido = (recebido / 30) * dias;
        } else if (index == 0) {
          let dias =
            parseInt(dib.split("/")[0]) >= 30 ||
              (parseInt(dib.split("/")[0]) >= 28 &&
                parseInt(dib.split("/")[1]) == 2)
              ? 1
              : 30 - dib.split("/")[0] + 1;
          recebido = (recebido / 30) * dias;
          console.log("recebido: " + recebido + " dias: " + dias);
        }
        console.log(recebido);
        console.log(value.salario);
        return {
          data: dado.data,
          reajusteAcumulado: dado.reajusteAcumulado,
          devido: dado.devido > 0 ? dado.devido : dado.salario,
          reajusteRecebido: dado.reajusteAcumulado,
          recebido:
            dado.recebido > 0
              ? Math.floor((dado.recebido + recebido) * 100) / 100
              : Math.floor(recebido * 100) / 100,
          salario: Math.floor((dado.salario - recebido) * 100) / 100,

          correcao: dado.correcao,
          salarioCorrigido:
            Math.floor((dado.salario - recebido) * dado.correcao * 100) / 100,
          juros: dado.juros,
          salarioJuros:
            Math.floor(
              (dado.salario - recebido) * dado.juros * dado.correcao * 100
            ) / 100,
          salarioTotal:
            Math.floor(
              (dado.salario - recebido) * (dado.juros + 1) * dado.correcao * 100
            ) / 100,
        };
        // }
      }
      function manter(dado, dtInicial) {
        let dinicial = dtInicial.split("/");
        if (!dado.data.split("/")[0].includes("13Salario")) {
          if (
            dado.data.split("/")[1] == dinicial[1] &&
            dado.data.split("/")[2] == dinicial[2]
          ) {
            beneficioAcumulado13Especial =
              dinicial[0] >= 15
                ? beneficioAcumulado13Especial++
                : beneficioAcumulado13Especial;
          } else {
            beneficioAcumulado13Especial++;
          }
        } else {
          beneficioAcumulado13Especial = 0;
        }
        // console.log("slario juros: " + dado.salarioJuros);
        return {
          data: dado.data,
          reajusteAcumulado: dado.reajusteAcumulado,
          devido: dado.devido > 0 ? dado.devido : dado.salario,
          reajusteRecebido:
            dado.reajusteRecebido > 0 ? dado.reajusteRecebido : 0,
          recebido: dado.recebido > 0 ? dado.recebido : 0,
          salario: dado.salario,
          correcao: dado.correcao,
          salarioCorrigido: dado.salarioCorrigido,
          juros: dado.juros,
          salarioJuros: dado.salarioJuros,
          salarioTotal: dado.salarioTotal,
        };
      }

      function decontarExpecial(value, dado, dtInicial, dtFinal, index) {
        console.log("Index: " + index);
        let devido = dado.devido > 0 ? dado.devido : dado.salario;

        if (!value.data.split("/")[0].includes("13Salario")) {
          let dinicial = dtInicial.split("/");
          if (
            value.data.split("/")[1] == dinicial[1] &&
            value.data.split("/")[2] == dinicial[2]
          ) {
            beneficioAcumulado13 =
              dinicial[0] >= 15 ? beneficioAcumulado13++ : beneficioAcumulado13;
            beneficioAcumulado13 =
              dinicial[0] >= 15 ? beneficioAcumulado13++ : beneficioAcumulado13;
          } else {
            beneficioAcumulado13++;
            beneficioAcumulado13Especial++;
          }
        } else {
          //dado.salario = Math.floor((dado.salario - ((devido / beneficioAcumulado13Especial) * (beneficioAcumulado13))) * 100) / 100;
          devido =
            Math.floor(
              (devido / beneficioAcumulado13Especial) *
              beneficioAcumulado13 *
              100
            ) / 100;
          beneficioAcumulado13 = 0;
          beneficioAcumulado13Especial = 0;
        }
        return {
          data: dado.data,
          reajusteAcumulado: dado.reajusteAcumulado,
          devido:
            dado.devido > 0
              ? Math.floor((dado.devido - devido) * 100) / 100
              : Math.floor((dado.salario - devido) * 100) / 100,
          reajusteRecebido: dado.reajusteAcumulado,
          recebido:
            dado.recebido > 0 ? Math.floor(dado.recebido * 100) / 100 : 0,
          salario: Math.floor((dado.salario - devido) * 100) / 100,

          correcao: dado.correcao,
          salarioCorrigido:
            Math.floor((dado.salario - devido) * dado.correcao * 100) / 100,
          juros: dado.juros,
          salarioJuros:
            Math.floor(
              (dado.salario - devido) * dado.juros * dado.correcao * 100
            ) / 100,
          salarioTotal:
            Math.floor(
              (dado.salario - devido) * (dado.juros + 1) * dado.correcao * 100
            ) / 100,
        };
        // }
      }

      this.beneficioInacumulavel.forEach((info, index) => {
        let dataDib = info.dib.split("/");
        let datadcb = info.dcb.split("/");
        let dataincial = this.dtInicial.split("/");
        let dataFinal = this.dtFinal.split("/");
        //fazerb um confirmado de periodo;
        if (
          this.beneficiosInacumulveilVerificadorPeriodo(
            dataDib,
            datadcb,
            dataincial,
            dataFinal
          )
        ) {
          //console.log("Benefico inacumulado");
          if (index == 0) {
            this.headers = [
              { value: "data", text: "Data" },
              { value: "reajusteAcumulado", text: "Reajuste" },
              { value: "devido", text: "Devido R$" },
              { value: "reajusteRecebido", text: "Reajute" },
              { value: "recebido", text: "Recebido R$" },
              { value: "salario", text: "Salário R$" },
              { value: "correcao", text: "Correção Salarial" },
              { value: "salarioCorrigido", text: "Salário Corrigido R$" },
              { value: "juros", text: "Juros" },
              { value: "salarioJuros", text: "Salário Juros R$" },
              { value: "salarioTotal", text: "Total R$" },
            ];
          }

          const body = {
            inicioCalculo: info.dib,
            dip: info.dcb,
            rmi: info.rmi,
            salario13: info.salario13,
            limiteMinimoMaximo: info.limiteMinimoMaximo,
            salarioMinimo: info.salarioMinimo,
            porcentagemRMI: parseFloat(info.porcentagemRmi),
            salario13Obrigatorio: info.salario13Obrigatorio,
            selic: this.selic,
          };

          axios
            .post(`${baseApiUrl}/calculo/beneficioAcumulado`, body)
            .then((response) => {
              let newArrayCalculo = [];
              let alteracaoConfimada = false;
              // console.log(response.data);
              let beneficioAcumulado = response.data;
              console.log(response.data[0])
              console.log("response.data[0]")
              this.calc_total.forEach((dado, indexTableCal) => {
                let dataCalculo = dado.data.split("/");
                alteracaoConfimada = false;
                let size = beneficioAcumulado.length - 1;
                beneficioAcumulado.forEach((value, index) => {
                  let dataBeneficioAcumulado = value.data.split("/");
                  console.log(
                    "sizeCalTotal : " +
                    dataFinal[0] +
                    " index: " +
                    dataCalculo[0] +
                    " comparacao: " +
                    (dataFinal[0] == dataCalculo[0])
                  );
                  if (
                    (dataBeneficioAcumulado[0] == dataCalculo[0] &&
                      dataBeneficioAcumulado[1] == dataCalculo[1] &&
                      dataBeneficioAcumulado[2] == dataCalculo[2]) ||
                    (dataincial[0] == dataCalculo[0] &&
                      indexTableCal == 0 &&
                      dataincial[1] == dataBeneficioAcumulado[1] &&
                      dataincial[2] == dataBeneficioAcumulado[2]) ||
                    (dataFinal[0] == dataCalculo[0] &&
                      indexTableCal == this.calc_total.length - 1 &&
                      dataFinal[1] == dataBeneficioAcumulado[1] &&
                      dataFinal[2] == dataBeneficioAcumulado[2])
                  ) {
                    //console.log(decontar(value, dado));
                    if (
                      info.beneficio.includes("Seguro Desemprego") ||
                      info.beneficio.includes("Auxílio Emergencial") ||
                      info.beneficio.includes("Seguro Defesa")
                    ) {
                      newArrayCalculo.push(
                        decontarExpecial(
                          value,
                          dado,
                          this.dtInicial,
                          this.dtFinal,
                          index,
                          size,
                          info.dib,
                          info.dcb,
                          info.salario13
                        )
                      );
                    } else {
                      newArrayCalculo.push(
                        decontar(
                          value,
                          dado,
                          this.dtInicial,
                          this.dtFinal,
                          index,
                          size,
                          info.dib,
                          info.dcb,
                          info.salario13
                        )
                      );
                    }
                    alteracaoConfimada = true;
                  }
                });
                if (!alteracaoConfimada) {
                  // console.log(manter(dado));
                  newArrayCalculo.push(manter(dado, this.dtInicial));
                }
              });
              this.calc_total = newArrayCalculo;
              newArrayCalculo = [];
              if (!this.porcentagemHonorarios && !this.DataHonorarios) {
                this.textoHonorarios = null;
              } else {
                this.textoHonorarios =
                  this.porcentagemHonorarios +
                  "% com parcelas até " +
                  this.DataHonorarios;
                this.honorarios(
                  this.DataHonorarios.split("/")[1],
                  this.DataHonorarios.split("/")[2]
                );
              }
              this.totaisSalario();
            })
            .catch((erro) => {
              console.log(erro);
              console.log("erro beneficioa Acumulado");
            });
        }
        if (!this.beneficioInacumulavel[0].rmi) {
          this.beneficio = false;
          this.headers = [
            { value: "data", text: "Data" },
            { value: "reajusteAcumulado", text: "Reajuste" },
            { value: "salario", text: "Salário R$" },
            { value: "correcao", text: "Correção Salarial" },
            { value: "salarioCorrigido", text: "Salário Corrigido R$" },
            { value: "juros", text: "Juros" },
            { value: "salarioJuros", text: "Salário Juros R$" },
            { value: "salarioTotal", text: "Total" },
          ];
        }
      });
    },
    beneficiosInacumulveilVerificadorPeriodo(
      dataDib,
      datadcb,
      dataincial,
      dataFinal
    ) {
      if (dataDib[2] <= dataFinal[2] && datadcb[2] >= dataincial[2]) {
        if (datadcb[2] == dataincial[2]) {
          if (datadcb[1] == dataincial[1]) {
            if (datadcb[0] >= dataincial[0]) {
              return true;
            } else {
              return false;
            }
          } else if (datadcb[1] > dataincial[1]) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    formatçao_do_inicio(inical_calculo, dtInicial) {
      this.calc_total[0].salario =
        Math.floor((this.calc_total[0].salario / 30) * inical_calculo * 100) /
        100;
      this.calc_total[0].salarioCorrigido =
        Math.floor(
          (this.calc_total[0].salarioCorrigido / 30) * inical_calculo * 100
        ) / 100;
      this.calc_total[0].salarioJuros =
        Math.floor(
          (this.calc_total[0].salarioJuros / 30) * inical_calculo * 100
        ) / 100;
      this.calc_total[0].salarioTotal =
        Math.floor(
          (this.calc_total[0].salarioTotal / 30) * inical_calculo * 100
        ) / 100;
      this.calc_total[0].data = dtInicial;
    },
    formatacao() {
      this.valor_total = Math.floor(this.valor_total * 100) / 100;
      this.valor_juros = Math.floor(this.valor_juros * 100) / 100;
      this.valor_corrigido = Math.floor(this.valor_corrigido * 100) / 100;
      this.total_processos = Math.floor(this.total_processos * 100) / 100;
      this.valorHonorarios = Math.floor(this.valorHonorarios * 100) / 100;
      let index = 0;
      for (const value of this.calc_total) {
        this.calc_total[index].salarioCorrigido =
          Math.floor(value.salarioCorrigido * 100) / 100;
        this.calc_total[index].salarioTotal =
          Math.floor(value.salarioTotal * 100) / 100;
        this.calc_total[index].salario = Math.floor(value.salario * 100) / 100;
        this.calc_total[index].salarioJuros =
          Math.floor(value.salarioJuros * 100) / 100;
        this.calc_total[index].juros = Math.floor(value.juros * 10000) / 10000;
        this.calc_total[index].correcao =
          Math.floor(value.correcao * 10000) / 10000;
        index++;
      }
    },
    totalCalculo() {
      this.formatacao();
      this.total_processos = 0;
      this.valor_total = 0;
      this.valor_juros = 0;
      this.valor_corrigido = 0;
      this.iPvalorAnoAtual = 0;
      this.competenciaAnoAnterior = 0;
      this.competenciaAnoAtual = 0;
      this.iPvalorAnoAtual = 0;
      let dataAtual = new Date();
      let anoAtual = dataAtual.getFullYear();

      for (const value of this.calc_total) {
        this.valor_total += Math.floor(value.salarioTotal * 100) / 100;
        //console.log(this.valor_total);
        this.valor_juros += Math.floor(value.salarioJuros * 100) / 100;
        this.valor_corrigido += Math.floor(value.salarioCorrigido * 100) / 100;
        if (value.data.split("/")[2] == anoAtual) {
          this.competenciaAnoAtual++;
          this.iPvalorAnoAtual =
            Math.floor((this.iPvalorAnoAtual + value.salarioTotal) * 100) / 100;
        } else {
          this.competenciaAnoAnterior++;
          this.iPvalorAnoAnterior =
            Math.floor((this.iPvalorAnoAnterior + value.salarioTotal) * 100) /
            100;
        }
        //corta as cassais decimais
      }
      this.valor_total = Math.floor(this.valor_total * 100) / 100;
      this.valor_juros = Math.floor(this.valor_juros * 100) / 100;
      this.valor_corrigido =
        Math.floor((this.valor_total - this.valor_juros) * 100) / 100;
      this.total_processos =
        Math.floor(
          (this.valor_corrigido +
            this.valor_juros +
            this.valorHonorarios -
            this.pacelasVencidas) *
          100
        ) / 100;
      this.formatacao();
    },
    totaisSalario() {
      if (!this.porcentagemHonorarios && !this.DataHonorarios) {
        this.textoHonorarios = null;
      } else {
        this.honorarios(
          this.DataHonorarios.split("/")[1],
          this.DataHonorarios.split("/")[2]
        );
        this.textoHonorarios =
          this.porcentagemHonorarios +
          "% com parcelas até " +
          this.DataHonorarios;
      }
      this.zeraDadosDocalculo();
      this.formatacao();
      this.total_processos = 0;
      this.valor_total = 0;
      this.valor_juros = 0;
      this.valor_corrigido = 0;
      this.iPvalorAnoAtual = 0;
      this.competenciaAnoAnterior = 0;
      this.competenciaAnoAtual = 0;
      this.iPvalorAnoAtual = 0;
      let dataAtual = new Date();
      let anoAtual = dataAtual.getFullYear();

      for (const value of this.calc_total) {
        this.valor_total += Math.floor(value.salarioTotal * 100) / 100;
        //console.log(this.valor_total);
        this.valor_juros += Math.floor(value.salarioJuros * 100) / 100;
        this.valor_corrigido += Math.floor(value.salarioCorrigido * 100) / 100;
        if (value.data.split("/")[2] == anoAtual) {
          this.competenciaAnoAtual++;
          this.iPvalorAnoAtual =
            Math.floor((this.iPvalorAnoAtual + value.salarioTotal) * 100) / 100;
        } else {
          this.competenciaAnoAnterior++;
          this.iPvalorAnoAnterior =
            Math.floor((this.iPvalorAnoAnterior + value.salarioTotal) * 100) /
            100;
        }
        //corta as cassais decimais
      }
      this.valor_total = Math.floor(this.valor_total * 100) / 100;
      this.valor_juros = Math.floor(this.valor_juros * 100) / 100;
      this.valor_corrigido =
        Math.floor((this.valor_total - this.valor_juros) * 100) / 100;
        console.log("Valor corrigido1: " + this.valor_corrigido)
      this.total_processos =
        Math.floor(
          (this.valor_corrigido +
            this.valor_juros +
            this.valorHonorarios -
            this.pacelasVencidas) *
          100
        ) / 100;
        /* this.valor_corrigido = 35 */
      this.formatacao();
      if (this.alcadaBoolean) {
        this.calculoDeOssada();
      }
    },
    honorarios(mesHonorarios, anoHonorarios) {
      let i = 0;
      this.valorHonorarios = 0;
      console.log(this.calc_total[0]);
      console.log("this.calc_total[0]");
      for (const value of this.calc_total) {
        var dateTable = value.data;
        var mesDoTable = dateTable.split("/")[1];
        var anoDoTable = dateTable.split("/")[2];
        if (anoDoTable == anoHonorarios) {
          if (mesDoTable <= mesHonorarios) {
            this.valorHonorarios += this.calc_total[i].salarioTotal;
          }
        } else if (anoDoTable < anoHonorarios) {
          this.valorHonorarios += this.calc_total[i].salarioTotal;
        }
        i++;
      }
      this.valorHonorarios =
        (this.valorHonorarios * this.porcentagemHonorarios) / 100;
    },
    async atualizarTodosDados(info) {
      this.alcadaArray = [];
      this.info_calculo = info;
      this.info_calculo.beneficio = this.refatoreNameBeneficio(
        this.info_calculo.beneficio
      );
      this.headers = [
        { value: "data", text: "Data" },
        { value: "reajusteAcumulado", text: "Reajuste" },
        { value: "salario", text: "Salário R$" },
        { value: "correcao", text: "Correção Salarial" },
        { value: "salarioCorrigido", text: "Salário Corrigido R$" },
        { value: "juros", text: "Juros" },
        { value: "salarioJuros", text: "Salário Juros R$" },
        { value: "salarioTotal", text: "Total" },
      ];
      /* this.porcentagemHonorarios = this.info_calculo.honorarioAdvocaticioPercentual
      this.procntagem_acordo = this.info_calculo.acordo
      this.porcentagemRMI = this.info_calculoinfo_calculo.porcentagemRMI */
      this.salarioInicial = this.info_calculo.rmi.replace(".", "");
      this.salarioInicial = this.salarioInicial.replace(",", ".");
      this.salarioInicial = parseFloat(this.salarioInicial);
      this.dtInicial = this.info_calculo.dibInicial;
      this.nmprocesso = this.info_calculo.nome;
      this.procntagem_acordo = this.info_calculo.acordo
      this.DataHonorarios = this.info_calculo.honorarioAdvocaticioAte
      this.porcentagemHonorarios =  this.info_calculo.honorarioAdvocaticioPercentual
      this.porcentagemRMI = this.info_calculo.porcentagemRmi
      let datafinal = this.info_calculo.dip.split("/");
      if (datafinal[0] == 1) {
        if (datafinal[1] == 1) {
          this.dtFinal = "31/12/" + (datafinal[2] - 1);
        } else {
          if (datafinal[1] <= 10) {
            this.dtFinal =
              datafinal[1] == 3
                ? "28/0" + (datafinal[1] - 1) + "/" + datafinal[2]
                : "30/0" + (datafinal[1] - 1) + "/" + datafinal[2];
          } else {
            this.dtFinal = "30/" + (datafinal[1] - 1) + "/" + datafinal[2];
          }
        }
      } else {
        if (datafinal[0] <= 10) {
          this.dtFinal =
            "0" + (datafinal[0] - 1) + "/" + datafinal[1] + "/" + datafinal[2];
        } else {
          this.dtFinal =
            datafinal[0] - 1 + "/" + datafinal[1] + "/" + datafinal[2];

        }
      }
      

      const datasSelic = await getDataMaisAtualParaCampoAtualizarAte();
      let maiorData = new Date('01'-'01'-1990)
      let menorData;
      for await (let objeto of datasSelic){
        const dataString = (objeto.data).split("-").reverse()
        const newDate = new Date(dataString)
        menorData = newDate
        if(menorData > maiorData){
          maiorData = menorData
        }  
      }
      const data = new Date(String(maiorData))
      const dataMaiorTratada = (`${(data.getMonth() + 1).toString().padStart(2, '0')}-${data.getDate().toString().padStart(2, '0')}-${data.getFullYear()}`).split("-")
      this.atulizacao = `${dataMaiorTratada[1]}/${dataMaiorTratada[2]}`


      this.pacelasVencidas = 0;
      this.pensaoPorMorte = "";
      this.calc_total = [];
      this.valor_total = 0;
      this.valor_juros = 0;
      this.valor_corrigido = 0;
      this.info_calculo.numeroDoProcesso;
      this.dataDoJuros = "";
      this.valorDoJuros = 0;
      this.beneficioInacumulavel = [];
      this.arrayBenficios = [];
      if (
        this.info_calculo.beneficio == "21 - PENSAO POR MORTE PREVIDENCIARIA"
      ) {
        this.pensaoPorMorte = "PENSÃO POR MORTE - REVISAR TERMO INICIAL";
      }
      if (this.info_calculo.beneficiosAcumulados.length != 0) {
        this.beneficio = true;
        this.arrayBenficios = this.info_calculo.beneficiosAcumulados;
        console.log("Acumulados: ",this.info_calculo.beneficiosAcumulados)
        this.arrayBenficios.forEach((value, index) => {
          if (value.rmi.includes(",")) {
            this.arrayBenficios[index].rmi = value.rmi.replace(".", "");
            this.arrayBenficios[index].rmi = value.rmi.replace(",", ".");
          }
        });
      } else {
        this.beneficio = false;
        this.arrayBenficios = [];
        this.pushBeneficiosAcumulados();
      }

      let beneficioProvisorio;
      this.beneficiosInacumulveisBanco.forEach((value) => {
        if (
          parseInt(value.name.split("-")[0]) ==
          parseInt(this.info_calculo.beneficio.split("-")[0])
        ) {
          console.log("Beneficio provisorio: " + value.name);
          beneficioProvisorio = value;
          this.salario13 = beneficioProvisorio.salario13;
          if (beneficioProvisorio.dcb) {
            this.pensaoPorMorte = "Beneficio com dcb";
          }
        }
      });
      console.log(this.arrayBenficios)
      console.log(beneficioProvisorio)
      this.arrayBenficios.forEach((value) => {
        beneficioProvisorio.inacumulavel.forEach((dado) => {
          if (value.beneficio && dado) {
            if (
              parseInt(dado.split("-")[0]) ==
              parseInt(value.beneficio.split("-")[0])
             && this.verificarDataParaBeneficioAcumulado(this.dtInicial, this.dtFinal, value.dib, this.CalcularDataFinalMenorQueAnterior(value.dcb, value.dib))) {
              let push_beneficioAcumulado = { 
                beneficio: this.refatoreNameBeneficio(value.beneficio),
                dib: value.dib,
                dcb: this.CalcularDataFinalMenorQueAnterior(value.dcb, value.dib),
                rmi: value.rmi,
                nb: value.nb,
                limiteMinimoMaximo: true,
                salarioMinimo: false,
                salario13: true,
                porcentagemRmi: 100,
                salario13Obrigatorio: false,
              };
              this.beneficioInacumulavel.push(push_beneficioAcumulado);
            }
          }
        });
      });
      this.arrayBenficios = this.beneficioInacumulavel;
      console.log("size: " + this.beneficioInacumulavel.length);
      this.inicio_juros = null;
      this.inicio_juros = this.info_calculo.citacao;
      //this.DataHonorarios = null;
      //this.porcentagemHonorarios = null;
      this.valorHonorarios = 0;
      this.textoHonorarios = null;
      this.valorSalario13 = 0;
      this.arr_Salario13 = 0;
      this.dibAnterior = this.info_calculo.dibAnterior == "-" ? "" : this.info_calculo.dibAnterior;
      this.total_processos = 0;
      //this.procntagem_acordo = null;
      this.alcadaValue = 0;
      this.competenciaAnoAtual = null;
      this.competenciaAnoAtual = null;
      this.iPvalorAnoAtual = 0;
      this.iPvalorAnoAnterior = 0;
      this.alcadaCorrecaoPorcetagem = 0;
      this.textoPeriodoAlcada = "";
      this.alcadaTotal = 0;
      this.alcadaCorrecao = 0;
      this.alcadaJuros = 0;
      this.salariominimosAlcada = 0;
      this.alcadaValor = 0;
      this.alcadaJurosPorcentagem = 0;
      this.pacelasVencidas = 0;
    },
    pushBeneficiosAcumulados() {
      let obj_beneficioAcumulado = {
        beneficio: null,
        dib: null,
        dcb: null,
        rmi: null,
        nb: null,
        nbAnterior: null,
        obrigatorio: false,
        salario13: true,
        limiteMinimoMaximo: true,
        salarioMinimo: false,
        porcentagemRmi: 100,
      };
      this.arrayBenficios.push(obj_beneficioAcumulado);
    },
    atualizarCalculadora() { },
    printDiv() {
      var divToPrint = document.getElementById("areaToPrint");

      var style = "<style>";
      style =
        style +
        ` 
        
        * {box-sizing: border-box; margin: 0; padding: 0}
        div {margin-bottom: 3px;} label {font-weight: bold;}
        .titulo, h1, h2 {text-align: center;}
        
        

        body {height: auto; width: 100vw;padding: 15px; font-size: 1.3rem;}
        .content{ padding: 15px;}
        .center {
          margin: auto;
          width: 60%;
          padding: 10px;
          text-align: center

          background-image: url(../assets/logo.png);
          background-position: top left;
          background-repeat: no-repeat;
          /* background-size: cover; */
          position: relative;
        }

        table th{
          border: 20px solid #FFFFFF;
          text-align: center;
          border: 1px solid #000000;
          border-collapse: collapse;
        }
        table tr > td {
          border: 4px solid #FFFFFF;
          border: 1px solid #000000;
          border-collapse: collapse;
        }

        table tr < td {
          border-up: 5px solid #FFFFFF;
          border: 1px solid #000000;
          border-collapse: collapse;
        }
       
        table td{
          text-align: center;
        }

        .agu {text-align: center; font-size: 1.3rem; font-weight: bold;}
        h1, h2, h3 {font-size: 1.2rem; font-weight: bold;}

         .titulo {
          text-align: center;
        }

        .camposInput {
          text-align: left;
          margin-left: -1%;
          font-size: 1.0em;
          font-weight: normal;
        }

        .center {
          text-align: center;
        }

        .centerAGU {
          text-align: center;
          padding-top: 10px;
        }

        .column {
          float: left;
          width: 48%;
        }

        .columnRight {
          float: left;
          text-align: right;
          width: 52%;
        }

        .rowInputs:after {
          content: "";
          display: table;
          clear: both;
        }

        .resumoProcesso:after {
          content: "";
          display: table;
          clear: both;
        }

        .columnResumoProcesso {
          float: left;
          width: 14%;
          margin-left: 1%;
        }

        .columnResumoProcessoParte {
          float: left;
          width: 39%;
          margin-left: 1%;
        }

        .centerMargin {
          text-align: center;
          padding-left: 15px;
          padding-right: 15px;
        }

        .inputToPrint {
          margin-left: 10px;
        }

        .inputToPrintResumo {
          margin-left: 0px;
        }

        .inputToPrintResumoParte {
          float: left;
          width: 500px;
        }

        .inputCalculo {
          text-align: left;
          margin-left: 1%;
        }

        .rowCalculo:after {
          content: "";
          display: table;
          clear: both;
        }

        .page {
          padding-top: 3px;
        }

        
        .columnResumoPagamentosAdministrativos {
          float: left;
          width: 11%;
          margin-left: 1%;
        }

        .columnRightAlcada {
          float: left;
          margin-left: 0%;
          text-align: left;
          width: 50%;
        }

        .columnAlcadaPrint {
          float: center;
          text-align: left;
          width: 60%;
          margin-left: 20%;
          margin-right: 20%;
        }

        .inputPagamentosAdministrativos {
          max-width: 100%;
        }

        .inputTetoAlcada {
          max-width: 15%;
          font-size: 12px;
        }

        .camposInputAlcada {
          text-align: left;
          margin-left: 3%;
          font-size: 16px;
          width: 30%;
        }
        

        .inputToPrintAlcada {
          text-align: left;
          margin-left: 3%;
          font-size: 16px;
          width: 30%;
        }

        table,
        th,
        td {
          text-align: left;
          margin-left: 0px;
          padding-left: 5px;
          width: 120%;
        }

        #impostoRendaTitulo {
          font-size: 18px;
          width: 120%;
        }

        #testeTotal {
          width: 100%;
          text-align: center;
        }

        #textosResumo {
          width: 42%;
          text-align: right;
          border: 1px solid white;
        }
        
        #thead-limpo {
          border: 1px solid white;
          width: 29%;
          font-size: 14px;
        }

        #thead-limpo-menor {
          border: 1px solid white;
          width: 42%;
        }

        #thead-centro {
          border: 1px solid white;
          width: 100%;
          text-align: center;
        }

        #thead-invisivel {
          border: 1px solid white;
          width: 1%;
        }


        #valoresResumo {
          width: 29%;
          text-align: left;
          border: 1px solid white;
        }

        #valoresResumo2 {
          width: 29%;
          text-align: left;
          border: 1px solid white;
        }

        #valoresResumoExecucao {
          width: 29%;
          text-align: left;
          border: 1px solid white;
        }

        #valor-percentual-execucao {
          width: 25%;
          text-align: center;
          border: 1px solid white;
        }

        #tabelaResumo {
          width: 100%;
          text-align: center;
        }

        #colunaVazia {
          width: 15%;
          text-align: right;
          border: 1px solid white;
        }

        #colunaVaziaDireita {
          width: 45%;
          text-align: left;
          border: 1px solid white;
        }

        #colunaResumoEsquerda {
          width: 25%;
          text-align: right;
          border: 1px solid white;
        }

        #colunaResumoDireita {
          width: 15%;
          text-align: right;
          border: 1px solid white;
        }

        #linha-horizontal {
          width: 57%;
          border: 1px solid #000;
          margin-left: 20%;
          margin-top: 0%;
        }

        #colunaAnaliseTexto {
          width: 35%;
          text-align: left;
          border: 1px solid white;
        }

        #colunaAnaliseEsquerda {
          width: 2%;
          text-align: right;
          border: 1px solid white;
        }

        #colunaAnaliseDireita {
          width: 2%;
          text-align: right;
          border: 1px solid white;
        }

        #linha-soma {
          width: 13%;
          border: 1px solid #000;
          margin-left: 69%;
          margin-top: -4px;
        }

        #linha-horizontal-separacao {
          width: 60%;
          border: 1px solid black;
          margin-left: 21%;
          margin-top: -1px;
          margin-bottom: -10px;
        }

        #observacoes-div {
          width: 50%;
          margin-left: 25%;
          font-size: small;
        }
        
        .describes{
          text-overflow: clip ellipsis;
          margin-right: 10px;
        }

        #observacoes-div-texto {
          width:100%;
          margin-left: 10%;
          font-size: small;
          height: auto;
          text-overflow: clip ellipsis;
        }
        
        #info-inicial {
          width: 50%;
          margin-left: 5%;
          text-align: left;
          border: 2px solid white;
        }

        #info-inicial-coluna {
          width: 15%;
          text-align: left;
          border: 2px solid white;
        }


        #info-inicial-linha {
          width: 100%;
          text-align: left;
          border: 2px solid green;
        }


        `;
      style = style + "</style>";

      var id = new Date().getTime();
      console.log("foi aqui")
      var newWin = window.open(
        window.location.href + "?printerFriendly=true",
        id,
        "toolbar=1,scrollbars=1,location=0,statusbar=0,menubar=1,resizable=1,width=800,height=600,left = 240,top = 212"
      );

      newWin.document.write("<html><head>");
      newWin.document.write(
        `<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">`
      ); // <title> CABEÇALHO DO PDF.
      newWin.document.write(style); // INCLUI UM ESTILO NA TAB HEAD
      newWin.document.write("</head>");
      newWin.document.write("<body>");
      // newWin.document.write(`<img class="logo" src="${this.logo}">`);
      newWin.document.write(`
      <div class="center">
      </div>`);

      newWin.document.write(divToPrint.outerHTML);
      newWin.document.write("</body></html>");

      newWin.print();

      newWin.close();
    },

    conteudoHTML() {
      var divToPrint = document.getElementById("areaToPrint");

      var style = "<style>";
      style =
        style +
        ` 
        
        * {box-sizing: border-box; margin: 0; padding: 0}
        div {margin-bottom: 3px;} label {font-weight: bold;}
        .titulo, h1, h2 {text-align: center;}
        
        

        body {height: auto; width: 100vw;padding: 15px; font-size: 1.3rem;}
        .content{ padding: 15px;}
        .center {
          margin: auto;
          width: 60%;
          padding: 10px;
          text-align: center

          background-image: url(../assets/logo.png);
          background-position: top left;
          background-repeat: no-repeat;
          /* background-size: cover; */
          position: relative;
        }

        table th{
          border: 20px solid #FFFFFF;
          text-align: center;
          border: 1px solid #000000;
          border-collapse: collapse;
        }
        table tr > td {
          border: 4px solid #FFFFFF;
          border: 1px solid #000000;
          border-collapse: collapse;
        }

        table tr < td {
          border-up: 5px solid #FFFFFF;
          border: 1px solid #000000;
          border-collapse: collapse;
        }
       
        table td{
          text-align: center;
        }

        .agu {text-align: center; font-size: 1.3rem; font-weight: bold;}
        h1, h2, h3 {font-size: 1.2rem; font-weight: bold;}

         .titulo {
          text-align: center;
        }

        .camposInput {
          text-align: left;
          margin-left: -1%;
          font-size: 1.0em;
          font-weight: normal;
        }

        .center {
          text-align: center;
        }

        .centerAGU {
          text-align: center;
          padding-top: 10px;
        }

        .column {
          float: left;
          width: 48%;
        }

        .columnRight {
          float: left;
          text-align: right;
          width: 52%;
        }

        .rowInputs:after {
          content: "";
          display: table;
          clear: both;
        }

        .resumoProcesso:after {
          content: "";
          display: table;
          clear: both;
        }

        .columnResumoProcesso {
          float: left;
          width: 14%;
          margin-left: 1%;
        }

        .columnResumoProcessoParte {
          float: left;
          width: 39%;
          margin-left: 1%;
        }

        .centerMargin {
          text-align: center;
          padding-left: 15px;
          padding-right: 15px;
        }

        .inputToPrint {
          margin-left: 10px;
        }

        .inputToPrintResumo {
          margin-left: 0px;
        }

        .inputToPrintResumoParte {
          float: left;
          width: 500px;
        }

        .inputCalculo {
          text-align: left;
          margin-left: 1%;
        }

        .rowCalculo:after {
          content: "";
          display: table;
          clear: both;
        }

        .page {
          padding-top: 3px;
        }

        
        .columnResumoPagamentosAdministrativos {
          float: left;
          width: 11%;
          margin-left: 1%;
        }

        .columnRightAlcada {
          float: left;
          margin-left: 0%;
          text-align: left;
          width: 50%;
        }

        .columnAlcadaPrint {
          float: center;
          text-align: left;
          width: 60%;
          margin-left: 20%;
          margin-right: 20%;
        }

        .inputPagamentosAdministrativos {
          max-width: 100%;
        }

        .inputTetoAlcada {
          max-width: 15%;
          font-size: 12px;
        }

        .camposInputAlcada {
          text-align: left;
          margin-left: 3%;
          font-size: 16px;
          width: 30%;
        }
        

        .inputToPrintAlcada {
          text-align: left;
          margin-left: 3%;
          font-size: 16px;
          width: 30%;
        }

        table,
        th,
        td {
          text-align: left;
          margin-left: 0px;
          padding-left: 5px;
          width: 120%;
        }

        #impostoRendaTitulo {
          font-size: 18px;
          width: 120%;
        }

        #testeTotal {
          width: 100%;
          text-align: center;
        }

        #textosResumo {
          width: 42%;
          text-align: right;
          border: 1px solid white;
        }
        
        #thead-limpo {
          border: 1px solid white;
          width: 29%;
          font-size: 14px;
        }

        #thead-limpo-menor {
          border: 1px solid white;
          width: 42%;
        }

        #thead-centro {
          border: 1px solid white;
          width: 100%;
          text-align: center;
        }

        #thead-invisivel {
          border: 1px solid white;
          width: 1%;
        }


        #valoresResumo {
          width: 29%;
          text-align: left;
          border: 1px solid white;
        }

        #valoresResumo2 {
          width: 29%;
          text-align: left;
          border: 1px solid white;
        }

        #valoresResumoExecucao {
          width: 29%;
          text-align: left;
          border: 1px solid white;
        }

        #valor-percentual-execucao {
          width: 25%;
          text-align: center;
          border: 1px solid white;
        }

        #tabelaResumo {
          width: 100%;
          text-align: center;
        }

        #colunaVazia {
          width: 15%;
          text-align: right;
          border: 1px solid white;
        }

        #colunaVaziaDireita {
          width: 45%;
          text-align: left;
          border: 1px solid white;
        }

        #colunaResumoEsquerda {
          width: 25%;
          text-align: right;
          border: 1px solid white;
        }

        #colunaResumoDireita {
          width: 15%;
          text-align: right;
          border: 1px solid white;
        }

        #linha-horizontal {
          width: 57%;
          border: 1px solid #000;
          margin-left: 20%;
          margin-top: 0%;
        }

        #colunaAnaliseTexto {
          width: 35%;
          text-align: left;
          border: 1px solid white;
        }

        #colunaAnaliseEsquerda {
          width: 2%;
          text-align: right;
          border: 1px solid white;
        }

        #colunaAnaliseDireita {
          width: 2%;
          text-align: right;
          border: 1px solid white;
        }

        #linha-soma {
          width: 13%;
          border: 1px solid #000;
          margin-left: 69%;
          margin-top: -4px;
        }

        #linha-horizontal-separacao {
          width: 60%;
          border: 1px solid black;
          margin-left: 21%;
          margin-top: -1px;
          margin-bottom: -10px;
        }

        #observacoes-div {
          width: 50%;
          margin-left: 25%;
          font-size: small;
        }
        
        .describes{
          text-overflow: clip ellipsis;
          margin-right: 10px;
        }

        #observacoes-div-texto {
          width:100%;
          margin-left: 10%;
          font-size: small;
          height: auto;
          text-overflow: clip ellipsis;
        }
        
        #info-inicial {
          width: 50%;
          margin-left: 5%;
          text-align: left;
          border: 2px solid white;
        }

        #info-inicial-coluna {
          width: 15%;
          text-align: left;
          border: 2px solid white;
        }


        #info-inicial-linha {
          width: 100%;
          text-align: left;
          border: 2px solid green;
        }


        `;
      style = style + "</style>";

      // var id = new Date().getTime();
      // var newWin = window.open(
      //   window.location.href + "?printerFriendly=true",
      //   id,
      //   "toolbar=1,scrollbars=1,location=0,statusbar=0,menubar=1,resizable=1,width=800,height=600,left = 240,top = 212"
      // );

      let memoriaDeCalculo = `<html><head> <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">`;
      memoriaDeCalculo += style;
      memoriaDeCalculo += "</head>";
      memoriaDeCalculo += "<body>";
      memoriaDeCalculo += '<div class="center"></div>';
      memoriaDeCalculo += "<body>";
      memoriaDeCalculo += divToPrint.outerHTML;
      memoriaDeCalculo += "</body></html>";

      this.memoriaCalculoHTM = memoriaDeCalculo;
      //console.log(memoriaDeCalculo);

      // const body = {
      //   login: {
      //     cpf: "02127337298",
      //     senha: "Senhasenh4",
      //   },
      //   etiqueta: "LIDO BOOT",
      //   minutas: [
      //     {
      //       numeroprocesso: "10033030920204013502",
      //       conteudo: memoriaDeCalculo,
      //     }
      //   ]
      // };

      // axios
      // .post(`http://localhost:3000/teste`, body)
      // .then((response) => {
      //   console.log(response);
      // })
      // .catch((error) => {
      //   console.log(error);
      // });

      // newWin.document.write("<html><head>");
      // newWin.document.write(
      //   `<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">`
      // ); // <title> CABEÇALHO DO PDF.
      // newWin.document.write(style); // INCLUI UM ESTILO NA TAB HEAD
      // newWin.document.write("</head>");
      // newWin.document.write("<body>");
      // // newWin.document.write(`<img class="logo" src="${this.logo}">`);
      // newWin.document.write(`
      // <div class="center">
      // </div>`);

      // newWin.document.write(divToPrint.outerHTML);
      // newWin.document.write("</body></html>");

      // newWin.print();

      // newWin.close();
    },
    AnexarMinutas() {
     /*  this.$prompt("Qual é o nome das etiquetas?", "LIDO BOOT").then(
        (etiqueta) => {
          if (etiqueta) { */
            Swal.fire({
      title: `Deseja Anexar Minutas ao Sapiens?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Anexar',
    }).then((result) => {
      if (result.value) {
        this.loading = true;
            let minutas = [];
            this.calculoLote.forEach((minuta) => {
              minutas.push({
                numeroprocesso: minuta.nome,
                conteudo: minuta.conteudoHTML,
                nup: this.buscarNupDaUrl(minuta.url)
              });
            });
            const body = {
              login: {
                cpf: this.cpfSapiens,
                senha: this.senhaSapaiens,
              },
              minutas,
            };
            console.log(body);
            axios
              .post(`${apiSapiens}/insertMinutas`, body)
              .then((response) => {
                this.loading = false;
                console.log(response);
                this.$alert(
                  response.data.length -1,
                  "Minutas anexadas: ",
                  "success"
                );
              })
              .catch((error) => {
                this.loading = false;
                this.$confirm("Falha ao anexar as minutas", "Error", "error")
                  .then((r) => {
                    console.log(r);
                  })
                  .catch(() => {
                    console.log("OK not selected.");
                  });
                console.log(error.message);
                console.log("error.message");
              });
      } else if(result.dismiss == "cancel"){
        Swal.fire('Minutas Não Anexadas', '', 'info')
      }
    })
       
            
/*           }
        }
      ); */
    },

    taxasPorAno(response = []) {
      const taxas = {};

      response.forEach((dado) => {
        const anoVigente = dado.data.split("/")[2];

        if (taxas[anoVigente.toString()]) {
          taxas[anoVigente.toString()].push(dado.reajuste);
        } else {
          taxas[anoVigente.toString()] = [];
          taxas[anoVigente.toString()].push(dado.reajuste);
        }
      });

      return taxas;
    },
    redirectToCalculo() {
      this.$router.push({ name: "processos" }).catch(() => { });
    },
  },

  mounted() {
    this.cpfSapiens = localStorage.getItem("sapiensCPF");
    this.username = localStorage.getItem("Username");
    this.senhaSapaiens = localStorage.getItem("sapiensSenha");
    Axios.AxiosApiControleUsuario.get(`/calculoLote`)
      .then((response) => {
        this.calculoLote = response.data;
        console.log("Lote: "+ this.calculoLote)
      })
      .catch((error) => {
        console.log("CatchHomeMounted(): " + error);
      });
    axios.get(baseApiUrl + "/describeJuros").then((response) => {
      response.data.forEach((value) => {
        if (value.type!=0){
          this.optionsJuros.push({
          text: `Tipo: ${value.type}. Descrição: ${value.describe}`,
          value: value.type,
          });
        }
      });
    });

    axios.get(baseApiUrl + "/describeCorrecao").then((response2) => {
      this.optionsCorrecao = [];
      // console.log(response2.body);
      response2.data.forEach((value) => {
        this.optionsCorrecao.push({
          text: `Tipo: ${value.type}. Descrição: ${value.describe}`,
          value: value.type,
        });
      });
    });
    axios.get(baseApiUrl + "/beneficio/listar").then((res) => {
      res.data.forEach((item) => {
        this.beneficiosInacumulveisBancoName.push(item.name);
      });
      // console.log(this.beneficiosInacumulveisBancoName);
      this.beneficiosInacumulveisBanco = res.data;
      /* console.log(this.res.data); */
      //localStorage.setItem("listBeneficiosInacumulaveis", this.res.data);
    });
    let anoAtual = new Date().getFullYear();
    axios
      .get(baseApiUrl + "/salarioMinimo/procuraPorAno/" + anoAtual)
      .then((res) => {
        console.log("Salrio minimo ano atual",res.data[res.data.length - 1]);
        this.salarioMinimoAnoAtual = res.data[res.data.length - 1].valor * 60;
      });
  },
};
</script>
<style >
#app {
  z-index: 1;
}

v-card {
  z-index: 1;
}

#alerta {
  position: fixed;
  right: 0;
  top: 15%;
  width: 100%;
  margin-top: -2.5em;
  z-index: 2;
}

.item-obrigatorio {
  margin: 0;

  color: red;
}

.home {
  height: auto;
  min-height: 100vh;
  padding: 20px;
  background-color: rgb(194, 216, 235);

  background-image: url(../assets/logo.png);
  /* background-color: #cccccc; */
  /* height: 100%; */
  width: 100%;

  background-position: right;
  background-repeat: no-repeat;
  /* background-size: cover; */
  position: absolute;
}

.alertCalculoComObservacoes {
  background: firebrick;
  color: white;
  font-size: 25px;
  padding: 5px 5px;
  border-radius: 5px;
}

.logo {
  display: flex;
  justify-content: flex-end;
}

.title h1 {
  font-family: "Lato", sans-serif;
  font-weight: lighter;
  font-size: 40px;
  letter-spacing: -2px;
}

.labels {
  font-weight: 500;
}

/* .row-buttons {
  justify-content: flex-end;
} */

.titulo {
  text-align: center;
}

.camposInput {
  text-align: left;
  margin-left: 3%;
}

.center {
  text-align: center;
}

.centerAGU {
  text-align: center;
  padding-top: 10px;
}

.column {
  float: left;
  width: 50%;
}

.columnRight {
  float: left;
  text-align: right;
  width: 50%;
}

.rowInputs:after {
  content: "";
  display: table;
  clear: both;
}

.resumoProcesso:after {
  content: "";
  display: table;
  clear: both;
}

.columnResumoProcesso {
  float: left;
  width: 14%;
  margin-left: 1%;
}

.columnResumoProcessoParte {
  float: left;
  width: 39%;
  margin-left: 1%;
}

.centerMargin {
  text-align: center;
  padding-left: 15px;
  padding-right: 15px;
}

.inputToPrint {
  margin-left: 10px;
}

.inputToPrintResumo {
  margin-left: 0px;
}

.inputToPrintResumoParte {
  float: left;
  width: 500px;
}

.inputCalculo {
  text-align: left;
  margin-left: 1%;
}

.rowCalculo:after {
  content: "";
  display: table;
  clear: both;
}

.page {
  padding-top: 3px;
}

.columnResumoPagamentosAdministrativos {
  float: left;
  width: 11%;
  margin-left: 1%;
}

.columnRightAlcada {
  float: left;
  margin-left: 8%;
  text-align: left;
  width: 42%;
}

.columnAlcadaPrint {
  float: center;
  text-align: left;
  width: 60%;
  margin-left: 25%;
  margin-right: 15%;
}

.inputPagamentosAdministrativos {
  max-width: 100%;
}

.inputTetoAlcada {
  max-width: 10%;
}

table,
th {
  border: 1px solid white;
}

td {
  border: 1px solid;
  text-align: left;
  margin-left: 0px;
}

th,
td {
  padding: 5px;
}

#impostoRenda {
  justify-items: center;
}

#impostoRendaDiscriminacao {
  width: 40%;
}

#impostoRendaValores {
  width: 30%;
}

#impostoRendaAcordo {
  width: 30%;
}

#impostoRendaCompetencias {
  width: 20%;
}

#testeTotal {
  width: 100%;
  text-align: center;
}

#textosResumo {
  width: 50%;
  text-align: right;
  border: 1px solid white;
}

#valoresResumo {
  width: 25%;
  text-align: center;
  border: 1px solid white;
}

#valoresResumoExecucao {
  width: 25%;
  text-align: center;
  border: 1px solid white;
}

#valor-percentual-execucao {
  width: 25%;
  text-align: center;
  border: 1px solid white;
}

#tabelaResumo {
  width: 100%;
  text-align: center;
}

#colunaVazia {
  width: 15%;
  text-align: right;
  border: 1px solid white;
}

#colunaVaziaDireita {
  width: 45%;
  text-align: left;
  border: 1px solid white;
}

#colunaResumoEsquerda {
  width: 25%;
  text-align: right;
  border: 1px solid white;
}

#colunaResumoDireita {
  width: 15%;
  text-align: right;
  border: 1px solid white;
}

#linha-horizontal {
  width: 50%;
  border: 2px solid #000;
  margin-left: 25%;
  margin-top: -1%;
}

#colunaAnaliseTexto {
  width: 20%;
  text-align: left;
  border: 1px solid white;
}

#colunaAnaliseEsquerda {
  width: 2%;
  text-align: right;
  border: 1px solid white;
}

#colunaAnaliseDireita {
  width: 2%;
  text-align: right;
  border: 1px solid white;
}

#linha-soma {
  width: 7%;
  border: 1px solid #000;
  margin-left: 68%;
  margin-top: -7px;
}

#linha-horizontal-separacao {
  width: 40%;
  border: 1px solid #000;
  margin-left: 30%;
  margin-top: -2px;
  margin-bottom: -20px;
}

#observacoes-div {
  width: 50%;
  margin-left: 25%;
  font-size: small;
}

#observacoes-div-texto {
  width: 70%;
  margin-left: 10%;
  font-size: small;
}

#info-inicial {
  width: 30%;
  margin-left: 5%;
  text-align: left;
  border: 1px solid white;
}

#info-inicial-coluna {
  width: 15%;
  text-align: left;
  border: 2px solid white;
}

#info-inicial-linha {
  width: 100%;
  text-align: left;
  border: 2px solid white;
}
</style>
