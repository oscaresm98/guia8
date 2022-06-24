let cargardatos = () =>{
    //alert("Hola mundo")
    fetch("https://dataserverdaw.herokuapp.com/escritores/xml")
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "application/xml");
        let escritores = xml.getElementsByTagName('escritor');
        for (let escritor of escritores) {
            let id = escritor.querySelector('id').textContent;
            let nombre = escritor.querySelector('nombre').textContent;
            let plantilla = `<option value="${id}">${nombre}</option>`;
            document.querySelector('select').innerHTML +=plantilla; 
        }
        
    })
    .catch(console.error);


    fetch("https://dataserverdaw.herokuapp.com/escritores/frases")
    .then(response => response.json())
    .then(data => {
        const selectElement = document.querySelector('select');
        selectElement.addEventListener('change', (event) => {
        const result = document.querySelector('#frases');
        //result.textContent = `You like ${event.target.value}`;
        result.innerHTML = "";

        let fra = data['frases'];
        for (const key in fra){
            
            let id = fra[key].id_autor;
            if(id == event.target.value){
                let nombre = document.querySelector(`option[value="${event.target.value}"]`).textContent;
                let frase= fra[key].texto;
                let plantilla = `<div class="col-lg-3">
                    <div class="test-inner ">
                        <div class="test-author-thumb d-flex">
                            <div class="test-author-info">
                                <h4>"${nombre}"</h4>                                            
                            </div>
                        </div>
                        <span>${frase}</span>
                        <i class="fa fa-quote-right"></i>
                    </div>
                </div>`
                result.innerHTML += plantilla;
            }
            
        }
        });
    })
    .catch(console.error);
    

}
window.addEventListener('DOMContentLoaded', (event) => {
    cargardatos()
});

/*let btn = document.querySelector('#btn');

btn.addEventListener('click',function() {
    alert('It was clicked!');
});
//para prevenir
let link = document.querySelector('a');

link.addEventListener('click',function(event) {
    console.log('clicked');
    event.preventDefault();
});
//Para saber como funciona el stop
let btn = document.querySelector('#btn');

btn.addEventListener('click', function(event) {
    console.log('The button was clicked!');
    event.stopPropagation();
});

document.body.addEventListener('click',function(event) {
    console.log('The body was clicked!');
});
//El DOMContentLoadedevento se activa cuando se carga el contenido DOM, sin esperar a que las imágenes y las hojas de estilo terminen de cargarse
document.addEventListener('DOMContentLoaded', () => {
            let btn = document.getElementById('btn');
            btn.addEventListener('click', () => {
                // handle the click event
                console.log('clicked');
            });
        });
*/