<template>
    <body class="container">
        <div class="VerificadorDeProcessoDuplicado">
            <v-btn :loading="loading" @click="atualizarTaxaSelic()"
                class="button-VerificadorDeProcessoDuplicado" color="primary">
                Atualização de taxa selic
            </v-btn>
        </div>
    </body>
</template>
    
<script>
import Swal from 'sweetalert2';
import { AtualizarTaxaSelic } from "../api/visao/triagem/AtualizadorTaxaSelic"


export default {
    name: "AtualizadorTaxaSelic",
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
       async  atualizarTaxaSelic() {
            const { value: formValues } = await Swal.fire({
            title: 'Atualizar Taxa Selic',
            html:
                '<input id="swal-input1" class="swal2-input" type="date">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Taxa">',
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                if(document.getElementById('swal-input1').value == ""|| document.getElementById('swal-input1').value == null ||
                document.getElementById('swal-input1').value == undefined || document.getElementById('swal-input2').value == "" ||
                document.getElementById('swal-input2').value == null || document.getElementById('swal-input2').value == undefined){
                    return  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Informe Um Valor Válido',
                    })
                }
                const body = {
                    data: `${document.getElementById('swal-input1').value}`,
                    juros: Number((document.getElementById('swal-input2').value).replace(",",".")),
                    type: 2
                }
                console.log("BODY " + JSON.stringify(body))
                AtualizarTaxaSelic(body).then(() => {
                    return Swal.fire('Saved!', '', 'success')
                }).catch(e => {
                    console.log("ERRO AO ATUALIZAR A TAXA "+ e)
                    return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                    })
                })
                
            }
            })

if (formValues) {
  Swal.fire(JSON.stringify(formValues))
}
        },
    },
};
</script>
    
<style>
.VerificadorDeProcessoDuplicado {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.button-VerificadorDeProcessoDuplicado {
    margin: 0;
}
</style>
    