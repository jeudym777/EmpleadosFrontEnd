


// los decoradores son funciones que modifican clases o metodos
// se usan mucho en angular para modificar componentes, servicios, directivas, etc , ademas de que son una forma de aplicar metaprogramacion en typescript
// un decorador de clase recibe como argumento el constructor de la clase que va a modificar,
// por ejemplo  
function classDecorator<T extends { new (...args:any[]): {} }>(
    constructor: T
) {
    return class extends constructor {
        newProperty = 'New Property';
        hello = 'override';
    }
}


// los decoradores usan la arroba @ antes del nombre del decorador
@classDecorator 
export class SuperClass {


    public myProperty: string = 'Abc123';

    print() {
        console.log('Hola Mundo')
    }
}


console.log( SuperClass );

const myClass = new SuperClass();
console.log( myClass );