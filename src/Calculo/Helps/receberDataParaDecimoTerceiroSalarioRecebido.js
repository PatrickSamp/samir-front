export async function receberRecebidoParaDecimoTerceiroSalario(dataInicial){
    let mesData = 12 - Number(dataInicial.split("/")[1]);
    console.log(mesData)
    let diaData = 30 - Number(dataInicial.split("/")[0]) >= 15 ? 1 : 0;
    return mesData + diaData;
}