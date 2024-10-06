// URL base de tu backend Flask en Render
const baseURL = 'https://backend-s9z5.onrender.com/';

// Función para obtener una pregunta del backend
function getQuestion() {
    fetch(`${baseURL}generate_question`)
        .then(response => response.json())
        .then(data => {
            const conversation = document.getElementById('conversation');

            // Crear el mensaje del bot con la pregunta
            const botMessageElement = document.createElement('div');
            botMessageElement.className = 'message bot';

            console.log(data);
            if(data.answers != undefined){
                if (data.answers[0] == data.correct_answer){
                    data.correct_answer = "a) "+data.correct_answer;
                }else if (data.answers[1] == data.correct_answer){
                    data.correct_answer = "b) "+data.correct_answer;
                }else if (data.answers[2] == data.correct_answer){
                    data.correct_answer = "c) "+data.correct_answer;
                }
                data.answers[0] = "a) "+data.answers[0];
                data.answers[1] = "b) "+data.answers[1];
                data.answers[2] = "c) "+data.answers[2];

                botMessageElement.innerHTML = "<p>" + data.question+"</p>";
                botMessageElement.innerHTML += "<p>"+ data.answers[0]+ "</p>";
                botMessageElement.innerHTML += "<p>" + data.answers[1]+ "</p>";
                botMessageElement.innerHTML +=  "<p>" + data.answers[2]+"</p>";
                
            }
           
            
            conversation.appendChild(botMessageElement);
            console.log(data.question);
            // Guardar la respuesta correcta para compararla después
            conversation.dataset.correctAnswer = data.correct_answer;

            conversation.dataset.question = data.question;
            conversation.dataset.answers = data.answers;


            // Hacer scroll hacia abajo automáticamente
            conversation.scrollTop = conversation.scrollHeight;
        });
}

// Función para enviar la respuesta del usuario
function sendMessage() {
    const inputField = document.getElementById('userInput');
    const conversation = document.getElementById('conversation');

    
    const userMessage = inputField.value;
    if (userMessage === "") return; // No enviar si está vacío

    // Crear el mensaje del usuario en el chat
    const userMessageElement = document.createElement('p');
    userMessageElement.className = 'message user';
    userMessageElement.textContent = userMessage;
    conversation.appendChild(userMessageElement);

    // Obtener la respuesta correcta del dataset
    const correctAnswer = conversation.dataset.correctAnswer;

    // Enviar la respuesta del usuario al backend para verificarla
    fetch(`${baseURL}check-answer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            answer: userMessage,
            correct_answer: correctAnswer,
        })
    })
    .then(response => response.json())
    .then(data => {
        const botMessageElement = document.createElement('p');
        botMessageElement.className = 'message bot';

        // Mostrar si la respuesta fue correcta o incorrecta
        if (data.result.toLowerCase() === "correcto" ) {
            botMessageElement.textContent = "¡Correcto!";
        } else if  (data.result.toLowerCase() === "incorrecto") {
            botMessageElement.textContent = "Incorrecto. La respuesta correcta es: " + correctAnswer;
        }else{
            botMessageElement.textContent = data.result;
        }

        conversation.appendChild(botMessageElement);

        // Hacer scroll hacia abajo automáticamente
        conversation.scrollTop = conversation.scrollHeight;

        // Limpiar el campo de entrada
        inputField.value = "";

        // Obtener una nueva pregunta
        getQuestion();

        //limpiar el campo de entrada
        inputField.value = "";
    });

}

// Iniciar el chat con la primera pregunta
getQuestion();
