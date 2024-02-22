/**
 * Validates the HTML element by it's ID
 * @param {string} {id} Id of the element.
 */
export function validateHTMLElementId(id){
    if(typeof(id) === 'string'){
        return document.getElementById(id) || null; // || truly => not return a false but right side of the ||
    }

    return null;
}