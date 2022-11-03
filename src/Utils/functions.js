export const getVoucherCode = (voucher) => {
    return `${createWordInitials(voucher.empresa)}${createWordInitials(voucher.cidade)}${getStateInitials(voucher.estado)}${formatDate(new Date()).replaceAll("/", '')}#${voucher.quantidade}@${formatUnity(voucher)}`
}

export const formatUnity = (voucher, setError) => {
    if(String(voucher.empresa).toLowerCase() === 'bradesco') {
        let curUnity = String(voucher.unidade)
        if(curUnity.indexOf("(") !== -1) {
            curUnity = curUnity.substring(curUnity.indexOf("("), curUnity.indexOf(")")).toUpperCase().replace("SUB-", '').replace("(", '').replace(")", '')
        }
        if(isNaN(Number(curUnity))) {
            setError('NaN')
            return 'NaN'
        }
        return curUnity.padStart(4, '0')
    }
    return voucher.unidade
}

export const formatDate = (date) => {
    let placeholder = "dd/MM/yyyy"
    return placeholder.replace("dd", String(date.getUTCDate()).padStart(2, '0'))
    .replace("MM", String(date.getUTCMonth() + 1).padStart(2, '0'))
    .replace("yyyy", String(date.getUTCFullYear()).padStart(4, '0'))
}

export const getStateInitials = (state) => {
    let formatedState = state.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    formatedState = formatedState.toLowerCase()
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
            return discoverCurState(formatedState)
    }
}

const discoverCurState = (stateInitials) => {
    let curState = stateInitials.toUpperCase()
    switch(curState) {
        case "AC": 
            return curState
        case "AL": 
            return curState
        case "AP": 
            return curState
        case "AM": 
            return curState
        case "BA": 
            return curState
        case "CE": 
            return curState
        case "DF": 
            return curState
        case "ES": 
            return curState
        case "GO": 
            return curState
        case "MA":
            return curState
        case "MT":
            return curState
        case "MS": 
            return curState
        case "MG": 
            return curState
        case "PA": 
            return curState
        case "PB": 
            return curState
        case "PE": 
            return curState
        case "PI": 
            return curState
        case "RJ": 
            return curState
        case "RN": 
            return curState
        case "RS": 
            return curState
        case "RO": 
            return curState
        case "RR": 
            return curState
        case "SC": 
            return curState
        case "SP": 
            return curState
        case "SE": 
            return curState
        case "TO":
            return curState
        default:
            throw new Error(`Estado "${curState}" inválido.`)
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