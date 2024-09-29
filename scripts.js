
/* el queryselctorAll crea una lista de nodos con los elementos data numero 
o data operador que se vayan contando  del html
*/

const botonNumero = document.querySelectorAll('[data-numero]')
const botonOperador = document.querySelectorAll('[data-operador]')
const botonIgual = document.querySelector('[data-igual]')
const botonBorrarTodo = document.querySelector('[data-borrar-todo]')
const botonBorrar = document.querySelector('[data-borrar]')
const textoValorSuperior = document.querySelector('[data-valor-superior]')
const textoValorInferior = document.querySelector('[data-valor-inferior]')


/* esta es la clase donde se colocan las funciones que tendra la calculadora
para ingresar los números */
class Calculadora {
    constructor(textoValorInferior,textoValorSuperior){
        this.textoValorInferior = textoValorInferior
        this.textoValorSuperior = textoValorSuperior
        this.valorInferior = ''
        this.valorSuperior = ''
        this.operador = undefined
    }
    /* el metodo agregar numero sirve para que se agregue un numero al Valor inferior */
    agregarNumero(numero){
        if (numero=='.'&& this.valorInferior.includes('.'))return;
        this.valorInferior = this.valorInferior + numero;
    }
    /* el metodo imprimirdisplay muestra por pantalla los numeros seleccionados */
    imprimirDisplay() {
        this.textoValorInferior.innerText = this.valorInferior
        this.textoValorSuperior.innerText = this.valorSuperior
    }
    /* El metodo borrar sirve para borrar los numeros de la calculadora */
    borrar(){
        this.valorInferior = this.valorInferior.slice(0,-1);
    }
    /* Aqui se estan abilitando los botones de operadores en 
    un metodo dentro de la clase calculadora. */
    ElegirOperacion(operador){
        /* si se presiona cualquier boton de operador y no hay
        algun numero no se retorne nada */
         if(this.valorInferior =='')return
         /* aqui estoy especificando si el valor superior ya contiene
         un un numero entonces */
         if(this.valorSuperior != ''){
             /* el metodo raelizarCalculo hara las sumas,restas,multiplicaciones
         y divisiones */
            this.realizarCalculo();
         }
        this.operador = operador;
        this.valorSuperior = this.valorInferior;
        this.valorInferior = '';
    }

    realizarCalculo (){
        let resultado
        /* Aquui se estan convierten los valores de strings (Cadena de caracteres)
        a numeros con el metodo parseFloat(Float es un tipo de dato para numeros con punto
        o sin punto decimal) */
        let conversionValorSuperior = parseFloat(this.valorSuperior);
        let conversionValorInferior = parseFloat(this.valorInferior);
         if (isNaN(conversionValorSuperior) || isNaN(conversionValorInferior))return;
        switch (this.operador){
            /* Aquui se haran las operaciones de los numeros ingresados en 
            la calculadora */
            case '+':
            resultado = conversionValorSuperior + conversionValorInferior;
            break;
            case '-':
            resultado = conversionValorSuperior - conversionValorInferior;
            break;
            case '*':
            resultado = conversionValorSuperior * conversionValorInferior;
            break;
            case '/':
            resultado = conversionValorSuperior / conversionValorInferior;
            break;
            default: return;
        }

        this.valorInferior = resultado;
        this.operador = undefined;
        this.valorSuperior = '';
    }
    /* El metedo limpiar pantalla sirve para borrar todo el contenido o los numeros y
    operaciones realizados en el display */
    limpiarPantalla(){
        this.valorSuperior='';
        this.valorInferior='';
        this.operador=undefined;
    }
}

const calculadora = new Calculadora(textoValorInferior,textoValorSuperior);



/* Esto representa lo que va estar pasando en la cacluladora del documento */
botonNumero.forEach(boton => {
    boton.addEventListener('click', () =>{
        calculadora.agregarNumero(boton.innerText);
        calculadora.imprimirDisplay();
        console.log(boton.innerText);
        console.log(boton.innerText);
    }) 
})

botonBorrar.addEventListener('click',() =>{
    calculadora.borrar();
    calculadora.imprimirDisplay();
}) 

botonOperador.forEach(boton => {
    boton.addEventListener('click', () =>{
        calculadora.ElegirOperacion(boton.innerText);
        calculadora.imprimirDisplay();
        console.log(boton.innerText)
    }) 
}) 

botonIgual.addEventListener('click',() =>{
    calculadora.realizarCalculo();
    calculadora.imprimirDisplay();
})

botonBorrarTodo.addEventListener('click',() =>{
    calculadora.limpiarPantalla();
    calculadora.imprimirDisplay();
}) 