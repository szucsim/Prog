function showAlert(message) {
    alert(message);
}

//Not hoisted
const newVariable = function notHoistedFunction() {

}

document.addEventListener('DOMContentLoaded', function(){
    /**
    * @type {import('./app/Application.js').default}
    */
    let app;
    
    const navButtons = document.querySelectorAll('body .app-container nav button')

    navButtons.forEach(element => {
        const modulName = element.getAttribute('data-module');
        const htmlTemplateName = element.getAttribute('data-template');
        element.addEventListener('click', function(){
            // Now you can create an instance of PrimeGenerator and use its methods
            if(app){
                app.destroy();
            }

            import(`./app/${modulName}.js`).then(function(module){
                app = new module.default({ target: 'app-target', statusBar: 'statusBar', htmlTemplate: htmlTemplateName ? `./app/${htmlTemplateName}.html` : undefined });
            });
        });
    });
});

