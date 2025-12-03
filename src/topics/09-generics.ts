
// La t representa un tipo generico que se define al momento de llamar la funcion, es muy importante para reutilizar codigo si
//  no se sabe que tipo de dato se va a recibir
export function whatsMyType<T>( argument: T ): T {

    return argument;
}

const amIString = whatsMyType<string>('Hola Mundo');
const amINumber = whatsMyType<number>(100);
const amIArray  = whatsMyType<number[]>([1,2,3,4,5]);

console.log( amIString.split(' ') );
console.log( amINumber.toFixed() );
console.log( amIArray.join('-') );