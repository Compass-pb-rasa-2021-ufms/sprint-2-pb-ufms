/*
 * Esse arquivo possui o script que valida se os campos "preço" e "acessibilidade", do formulário
 * existente arquivo activityform, são corretos
*/


/*
 * Duas variáveis controlam os erros. Sempre que há uma tentativa de envio do formulário
 * com dados inválidos, um erro é contabilizado. As mensagens exibidas e ação tomada dependerá
 * do número total de erros.
 */
var precoErrorCount = 0;
var acessErrorCount = 0;

function validadeForm() {
    // buscandos os campos a serem validados no DOM
    var precoMin = document.getElementById("precoMin");
    var precoMax = document.getElementById("precoMax");
    var acessMin = document.getElementById("acessMin");
    var acessMax = document.getElementById("acessMax");

    // uma variavel para cada conjunto min max a ser validado
    var precoIsValid = true
    var acessIsValid = true

    if (precoMin.value && precoMax.value) {
        if (precoMin.value >= precoMax.value) {
        switch(precoErrorCount){
            case 0:
            alert("Atenção, o preço mínimo não pode ser maior (ou igual) ao preço máximo" );
            precoIsValid = false
            precoMin.focus();
            precoErrorCount++
            break
            case 1:
            alert("Atenção, o preço mínimo não pode ser maior (ou igual) ao preço máximo." +
                    " Caso os valores não forem corrigidos, serão desconsiderados")
            precoIsValid = false
            precoMin.focus();
            precoErrorCount++
            break
            case 2:
            alert("Os camos de preço mínimo e máximo não foram ajustados, por isso foram desconsiderados.")
            precoMin.value = '' 
            precoMax.value = '';
            precoIsValid = true
            precoErrorCount = 0
            break
            default:
            break;    
            }
        }
    }

    // verifica se a acessibilidade mínima é realmente menor que a acessibilidade máxima
    if (acessMin.value && acessMax.value) {
        if (acessMin.value >= acessMax.value) {
        switch(acessErrorCount){
            case 0:
            alert("Atenção, a acessibilidade mínima não pode ser maior (ou igual) que acessibilidade máxima" );
            acessIsValid = false
            acessMin.focus();
            acessErrorCount++
            break
            case 1:
            alert("Atenção, a acessibilidade mínima não pode ser maior (ou igual) que acessibilidade máxima." +
                    " Caso os valores não forem corrigidos, serão desconsiderados")
            acessIsValid = false
            acessMin.focus();
            acessErrorCount++
            break
            case 2:
            alert("Os camos de acessibilidade mínima e máxima não foram ajustados, por isso foram desconsiderados.")
            acessMin.value = '' 
            acessMax.value = '';
            acessIsValid = true
            acessErrorCount = 0
            break
            default:
            break;    
            }
        }
    }
    // se ambos os cambos forem validos, logo o formulário é valido
    return acessIsValid && precoIsValid
}
