export function quantosDiasFaltaParaAcabarOMes(data) {
    const [dia, mes, ano] = data.split('/');
    const date = new Date(ano, mes - 1, dia);
    /* var ultimoDiaMes = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); */
    var ultimoDiaMes = 30;
    //console.log("inacumuladios", data)
    //Segundo a kelen, será 30 dias independente do mês. ana está de prova'-'
    console.log("Data para verificar: ",data)
    const diasTrabalhados = ultimoDiaMes - date.getDate() + 1;
    //console.log("trabalho",diasTrabalhados )
    //dias trabalhados tem que ser no maximo 30 dias 
    if(diasTrabalhados >= 30){
        return 30;
    }
    //verificar se é mes de fervereiro fervereiro, se for dias trabalhados for igual ou maior que 28 ele retorna 30
    else if(parseInt(mes) === 2 && diasTrabalhados >= 28){
        return 30;
    }else{
        console.log("RETORNO GRAHALHO "+diasTrabalhados)
        return diasTrabalhados;
    }

}