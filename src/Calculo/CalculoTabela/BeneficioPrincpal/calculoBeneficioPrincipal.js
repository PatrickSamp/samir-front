import { getcalculoBeneficioPrincipal } from "../../../api/calculadora/calculo/getcalculoBeneficioPrincipal";
import { quantosDiasFaltaParaAcabarOMes } from "../../Helps/quantosDiasFaltaParaAcabarOMes";
import { validarValorDoDiaSerConsideradoNaTabelaDeCalculo } from "../../Helps/validarValorDoDiaSerConsideradoNaTabelaDeCalculo";

export async function calculoBeneficioPrincipal(informationBeneficioPrincpal) {
    const tabelaPrincipal = await getcalculoBeneficioPrincipal(informationBeneficioPrincpal);
    console.log("RETROTRNOU " + tabelaPrincipal)
    return await ajusteDevidoNaDataDibEDipNatabelaPrincipal(informationBeneficioPrincpal, tabelaPrincipal);
}

async function ajusteDevidoNaDataDibEDipNatabelaPrincipal(informationBeneficioPrincpal, tabelaPrincipal) {
    const { inicioCalculo, dip } = informationBeneficioPrincpal;
    const mesInicioCalculo = inicioCalculo.split('/')[1];
    let [diasTrabalhadoNoMesDIP, mesDip] = dip.split('/');

    let diasTrabalhadosNoInicioCalculo = quantosDiasFaltaParaAcabarOMes(inicioCalculo);
    

    diasTrabalhadosNoInicioCalculo = validarValorDoDiaSerConsideradoNaTabelaDeCalculo(diasTrabalhadosNoInicioCalculo, mesInicioCalculo);
    diasTrabalhadoNoMesDIP = validarValorDoDiaSerConsideradoNaTabelaDeCalculo(diasTrabalhadoNoMesDIP, mesDip);

    const indexDaDIP = tabelaPrincipal[tabelaPrincipal.length - 1].data.split('/')[0] != '13Salario' ? tabelaPrincipal.length - 1 : tabelaPrincipal.length - 2;
    
    tabelaPrincipal[0] = await retornarLinhaDaTabelaPrincipalComSalarioProporcionalAosDiasTrabalhados(tabelaPrincipal[0], diasTrabalhadosNoInicioCalculo, inicioCalculo)
    tabelaPrincipal[indexDaDIP] = await retornarLinhaDaTabelaPrincipalComSalarioProporcionalAosDiasTrabalhados(tabelaPrincipal[indexDaDIP], diasTrabalhadoNoMesDIP, dip)
    
    // await tabelaPrincipal.forEach((item, index) => {
    //     if (index == 0 || index == indexDaDIP) {
    //         const diasSerConsiderado = index == 0 ? diasTrabalhadosNoInicioCalculo : diasTrabalhadoNoMesDIP;
    //         item.data = index == 0 ? inicioCalculo : dip;
    //         item.salario = calcularValoresDosDiasConsiderados(diasSerConsiderado, item.salario);
    //         item.salarioCorrigido = calcularValoresDosDiasConsiderados(diasSerConsiderado, item.salarioCorrigido);
    //         item.salarioJuros = calcularValoresDosDiasConsiderados(diasSerConsiderado, item.salarioJuros);
    //         item.salarioTotal = calcularValoresDosDiasConsiderados(diasSerConsiderado, item.salarioTotal);
    //     }
    // });

    return Promise.resolve(tabelaPrincipal);
}

function calcularValoresDosDiasConsiderados(diasConsiderado, valor) {
    return Math.floor((valor * diasConsiderado / 30) * 100) / 100;
}

function retornarLinhaDaTabelaPrincipalComSalarioProporcionalAosDiasTrabalhados(item, diasSerConsiderado, data) {
    item.data = data;
    item.salario = calcularValoresDosDiasConsiderados(diasSerConsiderado, item.salario);
    item.salarioCorrigido = calcularValoresDosDiasConsiderados(diasSerConsiderado, item.salarioCorrigido);
    item.salarioJuros = calcularValoresDosDiasConsiderados(diasSerConsiderado, item.salarioJuros);
    item.salarioTotal = calcularValoresDosDiasConsiderados(diasSerConsiderado, item.salarioTotal);
    return item;
}
