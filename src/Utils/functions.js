export const getStateInitials = (state) => {
    let formatedState = state.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    formatedState = formatedState.toLowerCase()
    console.log(formatedState)
    if(formatedState.length === 2) return formatedState.toUpperCase()
    switch(formatedState) {
        case "acre":
            return "AC"
        case "alagoas":
            return "AL"
        case "amapa":
            return "AP"
        case "amazonas":
            return "AM"
        case "bahia":
            return "BA"
        case "ceara":
            return "CE"
        case "distrito federal":
            return "DF"
        case "espirito santo":
            return "ES"
        case "goias":
            return "GO"
        case "maranhao":
            return "MA"
        case "mato grosso":
            return "MT"
        case "mato grosso do sul":
            return "MS"
        case "minas gerais":
            return "MG"
        case "para":
            return "PA"
        case "paraiba":
            return "PB"
        case "parana":
            return "PR"
        case "pernambuco":
            return "PE"
        case "piaui":
            return "PI"
        case "rio de janeiro":
            return "RJ"
        case "rio grande do norte":
            return "RN"
        case "rio grande do sul":
            return "RS"
        case "rondonia":
            return "RO"
        case "roraima":
            return "RR"
        case "santa catarina":
            return "SC"
        case "sao paulo":
            return "SP"
        case "sergipe":
            return "SE"
        case "tocantins":
            return "TO"
        default:
            throw new Error(`Estado inválido! ${state}`)
    }
}

export const createWordInitials = (word) => {
    if(word.indexOf(' ') === -1) {
        return word.slice(0, 2).toUpperCase()
    }else {
        let wordNameParts = word.split(" ")
        let initials = ""
        wordNameParts.forEach((part) => {
            initials = `${initials}${String(part.slice(0, 1))}`
        })
        return initials.toUpperCase()
    }
}