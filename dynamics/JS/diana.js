window.addEventListener('load', async () => {

    let exoplanetasData;
    let exoPlaneta = null;
    async function fetchData() {
        const response = await fetch("../data.json");
        const data = await response.json();
        exoplanetasData = data;
        while (!exoPlaneta) {
            exoPlaneta = exoplanetasData[Math.floor(Math.random() * exoplanetasData.length)];
            if (!exoPlaneta.pl_rade) {
                exoPlaneta = null;
            }
        }
    }
    await fetchData();

    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const titulo = document.querySelector('h1');
    titulo.innerHTML = `Adivina el radio del exoplaneta ${exoPlaneta.pl_name}`;

    // diana
    const diana = new Image();
    diana.src = "../assets/media/img/diana.png";
    let dianaWidth = Math.min(canvas.width, canvas.height) / 2;
    let dianaHeight = dianaWidth;
    let dianaX = canvas.width / 2 - dianaWidth / 2;
    let dianaY = 60;
    let centroYDiana = dianaY + dianaHeight / 2; // centro y diana
    let variacionFranja = (dianaHeight - centroYDiana)/5;


    // flecha
    const flecha = new Image();
    flecha.src = "../assets/media/img/flecha.png";
    let flechaWidth = Math.min(canvas.width, canvas.height) / 10;
    let maximaAltura = flechaWidth + 150;
    let minimaAltura = flechaWidth + 50;
    let flechaHeight = flechaWidth + 50;
    let flechaX = canvas.width / 2 - flechaWidth / 2;
    let flechaY = canvas.height - maximaAltura - 20;
    let estaAumentando = false;
    let entro = false;

    function dibuja() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        diana.addEventListener('load', () => {
            ctx.drawImage(diana, dianaX, dianaY, dianaWidth, dianaHeight);
        });
        ctx.drawImage(diana, dianaX, dianaY, dianaWidth, dianaHeight);



        flecha.addEventListener('load', () => {
            ctx.drawImage(flecha, flechaX, flechaY, flechaWidth, flechaHeight);
        });
        ctx.drawImage(flecha, flechaX, flechaY, flechaWidth, flechaHeight);

        
        ctx.fillStyle = 'white';
        ctx.font = 'bold 30px Helvetica';
        ctx.fillText(parseFloat(exoPlaneta.pl_rade).toFixed(2), canvas.width / 2 - 30, centroYDiana - variacionFranja);

        ctx.fillText(parseFloat(exoPlaneta.pl_rade - 10).toFixed(2), canvas.width / 2 - 30, centroYDiana - 4 * variacionFranja);

        ctx.fillText(parseFloat(exoPlaneta.pl_rade + 10).toFixed(2), canvas.width / 2 - 30, centroYDiana - 7 * variacionFranja);

    }

    dibuja();

    async function disparaFlecha() {
        let promedio = minimaAltura + (maximaAltura - minimaAltura) / 2;

        let destino = centroYDiana;
        if (flechaHeight > promedio) {
            destino += 3* variacionFranja;
        } else if (flechaHeight < promedio) {
            destino -= 6 * variacionFranja;
        } else {
            destino = centroYDiana;
        }
        while (flechaY > destino) {
            flechaY -= 5;
            dibuja();
            await new Promise (resolve => setTimeout(resolve, 0.5)); 
        }
        const ganaste = document.getElementById("ganaste");
        if (flechaHeight == promedio) {
            ganaste.innerHTML = "Felicidades, has acertado!";
        } else {
            ganaste.innerHTML = "Vuelve a intentarlo";
        }
        ganaste.style.display = "grid";
    }
    
    // coordenadas del mause
    document.addEventListener('mousemove', async(event) => {
        // revisa si esta encima de la flecha
        if (event.clientX > flechaX && event.clientX < flechaX + flechaWidth && event.clientY > flechaY && event.clientY < flechaY + flechaHeight) {
            entro = true;
            if (estaAumentando) {
                flechaHeight += 5;
                if (flechaHeight >= maximaAltura) {
                    estaAumentando = false;
                }
            } else {
                flechaHeight -= 5;
                if (flechaHeight <= minimaAltura) {
                    estaAumentando = true;
                }
            }

            dibuja();
            await new Promise (resolve => setTimeout(resolve, 0.5)); 
        } else {
            if (entro == true) {
                disparaFlecha();
            } else {
                flechaHeight = minimaAltura;
            }
        }
    });

});