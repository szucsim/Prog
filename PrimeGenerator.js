// Import the Application class
import Application from "./Application.js";

// Define a new class that inherits from Application
class PrimeGenerator extends Application {
    constructor(options) {
        super(options); // Call the constructor of the parent class
        // Additional initialization for the PrimeGenerator class if needed
    }

    generatePrimeNumbers(limit) {

        if (typeof limit !== 'number') {
            throw new Error("generatePrimeNumbers parameter should be a number!");
        }
    
        let primes = [];
        let num = 1;
    
        // Loop until we reach the desired number of primes
        while (primes.length < limit) {
            if (this.#isPrime(num)) {
                primes.push(num);
            }
            num++;
        }
    
        // Join the primes array into a string separated by commas
        return primes.join(',');
    }
    
    #isPrime(number) {
        if (number <= 1) {
            return false;
        }
        if (number <= 3) {
            return true;
        }
        if (number % 2 === 0 || number % 3 === 0) {
            return false;
        }
    
        let i = 5;
        while (i * i <= number) {
            if (number % i === 0 || number % (i + 2) === 0) {
                return false;
            }
            i += 6;
        }
    
        return true;
    }
}

// Export the PrimeGenerator class
export default PrimeGenerator;