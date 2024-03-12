// Import the Application class
import Application from './Application.js';
import Card from  '../memory-game/Card.js';

// Define a new class that inherits from Application
export default class MemoryGame extends Application {
    /**
     * Id of the setTimeout delegate
     */
    #timeoutKey;

    /**
     * @type {string[]}
     */
    #availablePieces = [
        "https://svgshare.com/i/141x.svg",
        "https://svgshare.com/i/1404.svg",
        "https://svgshare.com/i/140h.svg",
        "https://svgshare.com/i/140r.svg",
        "https://svgshare.com/i/13zs.svg",
        "https://svgshare.com/i/140i.svg",
        "https://svgshare.com/i/13zt.svg",
        "https://svgshare.com/i/1428.svg"
    ];

    /**
     * @type {Card|null}
     */
    #flippedCard1 = null;

    /**
     * @type {Card|null}
     */
    #flippedCard2 = null;

    /**
     * @type {number}
     */
    #matchedPairsCount = 0;

    /**
     * @param {import('./Application.js').ApplicationOptions} options Options
     */
    constructor(options = {}) {
        super(options);
    }

    initialize(){
        super.initialize();

        if(this.htmlTemplateString){
            const domParser = new DOMParser();
            const domElement = domParser.parseFromString(this.htmlTemplateString, 'text/html');
            for (let child of domElement.body.children){
                document.adoptNode(child);
                this.target.appendChild(child);
            }            
        }

        const cards = this.target.querySelectorAll('.memory-game-card');
        
        // Double the original array
        let urls = [...this.#availablePieces, ...this.#availablePieces];

        for(let cardElem of cards){
            const randomIndex = Math.floor(Math.random() * urls.length);
            const randomElement = urls[randomIndex];
            urls.splice(randomIndex, 1);

            const card = new Card(cardElem, randomElement);

            cardElem.addEventListener('click', () => {                
                this.#flipCard(card);
            });
        }
    }

    /**
     * @param {Card} card
     */
    #flipCard(card){
        if (card.matched || this.#flippedCard1 === card) {
            // If the card is already matched or is already flipped, do nothing
            return;
        }

        if (!this.#flippedCard1) {
            // First card flip
            this.#flippedCard1 = card;
        } else if (!this.#flippedCard2) {
            // Second card flip
            this.#flippedCard2 = card;
        } else {
            // Already flipped two cards, do nothing
            return;
        }

        card.flip();

        if (this.#flippedCard1 && this.#flippedCard2) {
            // Check for match
            if (this.#flippedCard1.url === this.#flippedCard2.url) {
                this.#matchedPairsCount++;
                this.#flippedCard1.matched = true;
                this.#flippedCard2.matched = true;
                // Match found
                this.#flippedCard1 = null;
                this.#flippedCard2 = null;                

                // Check if all pairs are matched
                if (this.#matchedPairsCount === this.#availablePieces.length) {
                    alert("Congratulations! You've won the game!");
                }
            } else {
                // No match, flip both cards back after a short delay
                setTimeout(() => {
                    this.#flippedCard1.flip();
                    this.#flippedCard2.flip();
                    this.#flippedCard1 = null;
                    this.#flippedCard2 = null;
                }, 1000);
            }
        }
    }

    run() {
        super.run();
    
        // Set a timer for one minute
        this.#timeoutKey = setTimeout(() => {
            if (this.#matchedPairsCount !== this.#availablePieces.length) {
                // If not all pairs are matched, alert the user that they lost
                alert("Time's up! You've lost the game!");
                // Reset card states
                this.#resetGame();
            }
        }, 60000); // One minute in milliseconds
    }
    
    /**
     * Reset the game by removing the MemoryGame application
     */
    #resetGame() {
        super.destroy();
    }

    destroy(){
        super.destroy();

        if (!this.#timeoutKey){
            clearTimeout(this.#timeoutKey);
            this.#timeoutKey = undefined;
        }
    }
}
