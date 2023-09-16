import { DataUser } from "./reducer";

interface list {
    [key: string]: number
}


// funcion para calcular las cuantas de deudores
export const reducerFunctions = (totalAmount: DataUser[]) => {

    const suma = totalAmount.reduce((total, element) => total + parseFloat(element.amount), 0);
    const sumaIndividual = suma / (Object.keys(totalAmount).length)
    let debtor: list = {}
    let creditor: list = {}
    totalAmount.forEach(person => {
        if (parseInt(person.amount) > sumaIndividual) {
            creditor[person.user] = parseInt(person.amount) - sumaIndividual
        } else {
            debtor[person.user] = sumaIndividual - parseInt(person.amount)
        }
    });


    /*   payments = [ [ger,facu,200],[ger,facu,100]] 
    */
    const payments: any [][] = []; // Objeto para almacenar los pagos

    for (const pers1 in creditor) {
        if ((creditor[pers1]) > 0) {
            for (const pers2 in debtor) {
                if (debtor[pers2] < (creditor[pers1])) {
                    const paymentAmount = debtor[pers2];
                    if (paymentAmount > 0) {
                        payments.push([ `${pers2.toUpperCase()}`, `${pers1.toUpperCase()}`,paymentAmount ])
                    }
                    creditor[pers1] = creditor[pers1] - debtor[pers2]
                    debtor[pers2] = 0
                } else {
                    const paymentAmount = creditor[pers1];
                    if (paymentAmount > 0) {
                        payments.push([ `${pers2.toUpperCase()}`, `${pers1.toUpperCase()}`,paymentAmount ])
                    }
                    debtor[pers2] = debtor[pers2] - creditor[pers1]
                    creditor[pers1] = 0
                }

            }
        }

    }
    return payments
}