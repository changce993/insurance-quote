export function obtenerDiferenciaYear(year){
    return new Date().getFullYear() - year;
}

export function calcularMarca(marca){
    let incremento;

    switch(marca){
        case 'asiatico':
            incremento = 1.05
            break
        case 'americano':
            incremento = 1.3
            break
        case 'europeo':
            incremento = 1.5
            break
        default:
            break
    }

    return incremento
}

export function obtenerPlan(plan){
    return ( plan === 'basico' ) ? 1.2 : 1.5
}