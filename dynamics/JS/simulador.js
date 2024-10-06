window.addEventListener("load", async () => {

    const VARIACION_PLANETA = 10;
    const COLORES_PLANETA = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "grey", "black"];
    const NUMERO_PLANETAS = COLORES_PLANETA.length;

    const ayuda = document.querySelector('.ayuda');
    const tooltip = document.querySelector('.tooltip');

    let exoplanetasData;
    let exoplanetasDestino = new Set();
    async function fetchData() {
        const response = await fetch("../data.json");
        const data = await response.json();
        exoplanetasData = data;
        while (exoplanetasDestino.size < NUMERO_PLANETAS) {
            exoplanetasDestino.add(exoplanetasData[Math.floor(Math.random() * exoplanetasData.length)]);
        }
    }
    await fetchData();

    ayuda.addEventListener('mouseenter', () => {
        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = '1';
    });
    ayuda.addEventListener('mouseleave', () => {
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
    });


    class Cabina {
        constructor(piloto, x, y) {
            this.piloto = piloto;
            this.x = x;
            this.y = y;
        }

        moverArriba() {
            this.y -= 1;
            document.querySelectorAll(".planeta").forEach((planeta) => {
                let yAnterior = parseInt(planeta.style.top, 10);
                planeta.style.top = `${yAnterior+VARIACION_PLANETA}px`;
            });
        }

        moverAbajo() {
            this.y += 1;
            document.querySelectorAll(".planeta").forEach((planeta) => {
                let yAnterior = parseInt(planeta.style.top, 10);
                planeta.style.top = `${yAnterior-VARIACION_PLANETA}px`;
            });
        }

        moverIzquierda() {
            this.x -= 1;
            document.querySelectorAll(".planeta").forEach((planeta) => {
                let xAnterior = parseInt(planeta.style.right, 10);
                planeta.style.right = `${xAnterior-VARIACION_PLANETA}px`;
            });
        }

        moverDerecha() {
            this.x += 1;
            document.querySelectorAll(".planeta").forEach((planeta) => {
                let xAnterior = parseInt(planeta.style.right, 10);
                planeta.style.right = `${xAnterior+VARIACION_PLANETA}px`;
            });
        }
    }

    class Planeta {
        constructor(nombre, x,y) {
            this.nombre = nombre;
            this.x = x;
            this.y = y;
        }
    }

    const escabina = new Cabina("yo",0,0);
    const campoEspacio = document.querySelector(".campoEspacio");
    

    let i=0;
    for (let [key, value] of exoplanetasDestino.entries()) {
        const planeta = document.createElement("div");

        planeta.style.top = Math.floor(Math.random() * 2001) - 2000 + "px";
        planeta.style.right = Math.floor(Math.random() * 2001) - 2000 + "px";
        // random color
        color = COLORES_PLANETA[Math.floor(Math.random() * COLORES_PLANETA.length)];
        planeta.style.background = `linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, ${color} 100%)`
        // id
        planeta.id = `planeta${i+1}`
        planeta.classList.add("planeta");
        planeta.addEventListener("click", despliegarInfoPlaneta);

        // info
        const info = document.createElement("div");
        info.classList.add("infoPlaneta");
        info.classList.add("oculto");
        info.id = `infoPlaneta${i+1}`


        const descripcion = document.createElement("div");

        if (value.pl_name != null) {
            const titulo = document.createElement("h1");
            titulo.textContent = value.pl_name;
            info.appendChild(titulo);
        }

        if (value.disc_year != null) {
            const descubrimiento = document.createElement("p");
            descubrimiento.textContent = `Descubrimiento: ${value.disc_year}`;
            info.appendChild(descubrimiento);
        }

        if (value.pl_rade != null) {
            const radio = document.createElement("p");
            radio.textContent = `Radio: ${value.pl_rade}`;
            info.appendChild(radio);
        }

        if (value.pl_masse != null) {
            const masa = document.createElement("p");
            masa.textContent = `Masa: ${value.pl_masse}`;
            info.appendChild(masa);
        }

        if (value.sy_dist != null) {
            const distanciaSistemaSolar = document.createElement("p");
            distanciaSistemaSolar.textContent = `Distancia del sistema solar: ${value.sy_dist}`;
            info.appendChild(distanciaSistemaSolar);
        }

        const tache = document.createElement("div");
        tache.textContent = "X";
        tache.classList.add("tache");
        tache.id = `tache${i+1}`
        tache.addEventListener("click", ocultarInfoPlaneta);
        info.appendChild(tache);

        campoEspacio.appendChild(planeta);
        campoEspacio.appendChild(info);
        i++;
    }

    const planetas = document.querySelectorAll(".planeta");

    function despliegarInfoPlaneta(e) {
        let id = e.target.id;
        let numero = id.slice(7);
        let infoPlaneta = document.querySelector(`#infoPlaneta${numero}`);
        infoPlaneta.classList.toggle("oculto");
    }

    function ocultarInfoPlaneta(e) {
        let id = e.target.id;
        let numero = id.slice(5);
        let infoPlaneta = document.querySelector(`#infoPlaneta${numero}`);
        infoPlaneta.classList.toggle("oculto");
        
    }

    document.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowUp":
                escabina.moverArriba();
                break;
            case "ArrowDown":
                escabina.moverAbajo();
                break;
            case "ArrowLeft":
                escabina.moverIzquierda();
                break;
            case "ArrowRight":
                escabina.moverDerecha();
                break;
            default:
                break;
        }
    });

});