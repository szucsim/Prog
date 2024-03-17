import Application from "./Application.js";

export default class Hangman extends Application{
    /**
     * @type {CanvasRenderingContext2D}
     */
    #ctx;

    /**
     * The word to guess
     * @type {string}
     */
    #word;

    /**
     * @type {number}
     */
    #mistakes = 0;

    /**
     * Words to choose from
     */
    static #words = [
        'example',
        'second',
        'third'
    ];

    onKeyPress = function(evt){
        /**
         * @type {string}
         */
        const key = evt.key;
        const charCode = key.charCodeAt();

        if((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)){
            // Find all occurrences of the character in the word
            const positions = [];
            for(let i = 0; i < this.#word.length; i++){
                if(this.#word[i] === key){
                    positions.push(i);
                }
            }
    
            // Calculate the position to draw each character above the corresponding underline
            const width = this.target.querySelector('canvas').width;
            const height = this.target.querySelector('canvas').height;
    
            const placeholderWidth = width / (this.#word.length + 1);
            const placeholderGap = placeholderWidth * 0.1; // Adjust this value as needed
    
            positions.forEach(index => {
                const cursor = ((index) * placeholderWidth) + (placeholderWidth - placeholderGap);
                const char = this.#word[index];
    
                // Draw the character above the underline
                this.#ctx.font = "20px Arial";
                this.#ctx.fillStyle = "black";
                this.#ctx.fillText(char, cursor, height * 0.95 - 20); // Draw text above placeholder
            });
    
            // If at least one occurrence is found, exit the function
            if (positions.length > 0) {
                return;
            }
            
            // If the character is not found, increment mistakes and draw hangman
            ++this.#mistakes;
            this.#drawHangman();
        }
    }.bind(this);

    /**
     * @param {import('./Application.js').ApplicationOptions} options Options
     */
    constructor(options = {}) {
        super(options);
    }

    initialize(){
        super.initialize();

        const canvasElem = document.createElement('canvas');
        this.target.appendChild(canvasElem);

        this.#ctx = canvasElem.getContext('2d');
        canvasElem.width = canvasElem.clientWidth;
        canvasElem.height = canvasElem.clientHeight;
        this.#word = Hangman.#words[Math.floor(Math.random()*Hangman.#words.length)];
    }
    
    run(){
        const width = this.target.querySelector('canvas').width;
        const height = this.target.querySelector('canvas').height;

        this.#ctx.lineWidth = 1;

        // Calculate the width of each placeholder and the gap between them
        const placeholderWidth = width / (this.#word.length + 1);
        const placeholderGap = placeholderWidth * 0.1; // Adjust this value as needed

        // Calculate the starting position for drawing the underlines
        let cursor = (placeholderWidth - placeholderGap) / 2;

        for(let char of this.#word){
            // Draw the underline (placeholder)
            this.#ctx.moveTo(cursor, height * 0.95);
            this.#ctx.lineTo(cursor + placeholderWidth - placeholderGap, height * 0.95);
            this.#ctx.stroke();

            cursor += placeholderWidth; // Move to the next position
        }

        window.addEventListener('keypress', this.onKeyPress);
    }

    destroy(){
        super.destroy();
        window.removeEventListener('keypress', this.onKeyPress);

    }

    #drawHangman(){
        const width = this.target.querySelector('canvas').width;
        const height = this.target.querySelector('canvas').height;

        if(this.#mistakes == 1){
            this.#ctx.moveTo(width*0.1, height*0.85);
            this.#ctx.lineTo(width*0.5, height*0.85);
            this.#ctx.stroke();
        }else if(this.#mistakes == 2){
            this.#ctx.moveTo(width*0.3, height*0.85);
            this.#ctx.lineTo(width*0.3, height*0.1);
            this.#ctx.stroke();
        }else if(this.#mistakes == 3){
            this.#ctx.moveTo(width*0.3, height*0.2);            
            this.#ctx.lineTo(width*0.35, height*0.1);
            this.#ctx.stroke();
        }
        else if(this.#mistakes == 4){
            this.#ctx.moveTo(width*0.3, height*0.1);
            this.#ctx.lineTo(width*0.6, height*0.1);            
            this.#ctx.stroke();
        }else if (this.#mistakes == 5){
            this.#ctx.lineTo(width*0.6, height*0.2);
            this.#ctx.stroke();
        }
        else if(this.#mistakes == 6){
            this.#ctx.arc(width*0.6, height*0.2 + height*0.05, height*0.05, Math.PI/2 * -1, Math.PI * 4);
            this.#ctx.stroke();
        }
        else if(this.#mistakes == 7){
            this.#ctx.moveTo(width*0.6, height*0.3);
            this.#ctx.lineTo(width*0.6, height*0.35);
            this.#ctx.stroke();
        }
        else if(this.#mistakes == 8){
            this.#ctx.moveTo(width*0.6, height*0.3);
            this.#ctx.lineTo(width*0.65, height*0.425);
            this.#ctx.stroke();
        }
        else if(this.#mistakes == 9){
            this.#ctx.moveTo(width*0.6, height*0.3);
            this.#ctx.lineTo(width*0.55, height*0.425);
            this.#ctx.stroke();
        }
        else if(this.#mistakes == 10){
            this.#ctx.moveTo(width*0.6, height*0.3);
            this.#ctx.lineTo(width*0.6, height*0.5);
            this.#ctx.stroke();
        }
        else if(this.#mistakes == 11){
            this.#ctx.moveTo(width*0.6, height*0.5);
            this.#ctx.lineTo(width*0.55, height*0.625);
            this.#ctx.stroke();
        }
        else if(this.#mistakes == 12){
            this.#ctx.moveTo(width*0.6, height*0.5);
            this.#ctx.lineTo(width*0.65, height*0.625);
            this.#ctx.stroke();
        }
    }
}