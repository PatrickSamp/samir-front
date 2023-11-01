import { ConverterToDate } from '../Helps/stringToDate'

export  function verificarDiasDeIntersecao(inicioCalculo, dip, dib, dcb){
    
        const dataDcb = ConverterToDate(dcb) 
        const dataInicioCalculo =ConverterToDate(inicioCalculo)
        if(inicioCalculo.split("/")[1] == dcb.split("/")[1]){
            return dataInicioCalculo - dataDcb == 0 ? 1 : dataInicioCalculo - dataDcb
        }
        
        if(Number(inicioCalculo.split("/")[1]) < Number(dcb.split("/")[1])){
            return (30 - Number(inicioCalculo.split("/")[0])) + 1
        }
        

    console.log(inicioCalculo, dip, dib, dcb)
}