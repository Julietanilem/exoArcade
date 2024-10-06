// mapa de espacio 1:10

window.addEventListener("load", () => {

    const VARIACION_PLANETA = 10;

    const ayuda = document.querySelector('.ayuda');
    const tooltip = document.querySelector('.tooltip');

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
    // Crea planetas
    const numeroPlanetas = 1;
    for (let i = 0; i < numeroPlanetas; i++) {
        const planeta = document.createElement("div");
        planeta.style.top = -100 + "px";
        planeta.style.right = 500 + "px";
        planeta.style.background = "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, blue 100%)"
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
        descripcion.textContent = "Planeta";
        descripcion.classList.add("descripcion");
        info.appendChild(descripcion);

        const tache = document.createElement("div");
        tache.textContent = "X";
        tache.classList.add("tache");
        tache.id = `tache${i+1}`
        tache.addEventListener("click", ocultarInfoPlaneta);
        info.appendChild(tache);

        campoEspacio.appendChild(planeta);
        campoEspacio.appendChild(info);
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