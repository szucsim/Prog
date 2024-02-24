function showAlert(message) {
    alert(message);
}

//Not hoisted
const newVariable = function notHoistedFunction() {

}

import PrimeGenerator from "./PrimeGenerator.js";

// Now you can create an instance of PrimeGenerator and use its methods
const primeGenerator = new PrimeGenerator({ target: 'app-container', statusBar: 'statusBar' });

const btnPrimes = document.getElementById('btnPrimes');
btnPrimes.addEventListener('click', function (evt){
    showAlert(primeGenerator.generatePrimeNumbers(2000));
});