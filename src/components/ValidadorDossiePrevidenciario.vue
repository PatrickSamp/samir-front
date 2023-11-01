<template>
    <body class="container">
        <div class="ValidadorDossiePrevidenciario">
            <v-btn :loading="loading" @click="validadorDossiePrevidenciario()" class="button-ValidadorDossiePrevidenciario" color="primary">
                Validador de Dossiê Previdenciário
            </v-btn>
        </div>
    </body>
</template>
    
<script>
import{ValidadorDeDossiePrividenciaria} from "../api/visao/triagem/ValidadorDeDossiePrividenciaria"
export default {
    name: "ValidadorDossiePrevidenciario",
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
        validadorDossiePrevidenciario() {
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

                    ValidadorDeDossiePrividenciaria(body)
                        .then(async (response) => {
                            this.$alert(
                                response.length,
                                "Processos verificados: ",
                                "success"
                            );
                            this.loading = false;
                        })
                        .catch((error) => {
                            this.loading = false;
                            this.$confirm(
                                "Falha ao  Verifacar as validades dos processos ",
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
.ValidadorDossiePrevidenciario {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.button-ValidadorDossiePrevidenciario {
    margin: 0;
}
</style>
    