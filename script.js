function showAlert(message) {
    alert(message);
}

//Not hoisted
const newVariable = function notHoistedFunction() {

}

/**
 * @type {import('./Application').default}
 */
let primeGenerator;

const btnPrimes = document.getElementById('btnPrimes');
btnPrimes.addEventListener('click', function (evt){
    // Now you can create an instance of PrimeGenerator and use its methods
    if(primeGenerator){
        primeGenerator.destroy();
    }
    
    import('./PrimeGenerator.js').then(function(module){
        primeGenerator = new module.default({ target: 'app-target', statusBar: 'statusBar' });
    });    
});