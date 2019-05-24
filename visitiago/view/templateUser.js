import {templateAdmin} from './templateAdmin.js'
import {verifyFullName , verifyRUT} from '../tests/validations.js'

export const templateUser = () => {
    //creamos div que contendrá la plantilla
    const containerCreate = document.createElement('div');
    const contentCreate = `
                <img id="logo" src="../visitiago/assets/logo.png">
            <div class="cfield">
                <i class="fas fa-user-alt"></i>
                <p class="fullname">Nombre y Apellido</p>
                <input type="text" id="fullname" name="">
            </div>

            <div>
                <i class="fas fa-key"></i>
                <p class="rut">RUT</p>
               <input type="text" id="rut" name="">
            </div>

            <div class="photo">
            <p class="uploadPhoto">Ingrese una foto</p>
            <input type="file" accept="image/*" value="upload" id="fileButton" capture="camera">
            </div>

            <div>
            <p class="selectCoworker">¿A quién viene a visitar?</p>
            <select id="myList" onchange="myFunction()">
            </select>
            </div>
            

            <div>
                <button id="register" class="sign-in-style">Registrar</button>
            </div>
            <br>
            <br>

            <a id="adminText" href="#/admin">Ingresar como administrador</a>
            `;

    //pasar cel contenido al div
    containerCreate.innerHTML = contentCreate;
    //le pido que busque el id del botón dentro del div cerrado
    const btn = containerCreate.querySelector('#register');
    

    const coworkersList = containerCreate.querySelector('#myList');
    function renderList(doc) {
        let option = document.createElement('option');
        let fullname = document.createElement('span');
       /*  let rut = document.createElement('span'); */

        option.setAttribute('data-id', doc.id)
        fullname.textContent = doc.data().fullname;
        /* rut.textContent = doc.data().rut; */
        
        option.appendChild(fullname);
        /* option.appendChild(rut); */

        coworkersList.appendChild(option)
    }

    db.collection('coworkers').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            renderList(doc);
        })
      })



        /* let uploader = document.querySelector('#uploader');
        let fileButton = document.querySelector('#fileButton');
// Vigilar selección archivo
fileButton.addEventListener('change', function(e) {
  //Obtener archivo
  let file = e.target.files[0];
  // Crear un storage ref
  let storageRef = firebase.storage().ref('mis_fotos/' + file.name);
  // Subir archivo
  let task = storageRef.put(file);
  // Actualizar barra progreso
  task.on('state_changed',
    function progress(snapshot) {
      let percentage = (snapshot.bytesTransferred /
        snapshot.totalBytes) * 100;
    },
    
    function error(err) {
    },
    function complete() {
    }
    );
}); */

btn.addEventListener('click', () => {

    let fullname = containerCreate.querySelector('#fullname').value;
    let rut = containerCreate.querySelector('#rut').value;
    let resultfullname = verifyFullName(fullname);
    let resultRUT = verifyRUT(rut)

        
        if (resultfullname === false) {
            alert('Por favor coloca tu nombre y apellido')
        } else if (resultRUT === false) {
            alert('Por favor coloca tu rut')
        } else {
            newVisitor(rut, fullname)
        }
    })
    return containerCreate;
}
