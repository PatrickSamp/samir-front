export function validarValorDoDiaSerConsideradoNaTabelaDeCalculo(diasConsiderado, mes) {
    console.log("ana, ",diasConsiderado, mes)
    diasConsiderado = parseInt(diasConsiderado);
    mes = parseInt(mes);
    if (diasConsiderado > 30) {
        return 30;
    } else if (diasConsiderado == 28 && mes == 2) {
        return 30;
    } else {
        return diasConsiderado;
    }
}