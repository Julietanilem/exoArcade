window.addEventListener("load", async () => {
    let exoplanetasDestino = []
    async function fetchData() {
        const response = await fetch("../data.json");
        const data = await response.json();
        while (exoplanetasDestino.length < 16) {
            let exoPlaneta = data[Math.floor(Math.random() * data.length)];
            if (!exoplanetasDestino.includes(exoPlaneta)) {
                exoplanetasDestino.push(exoPlaneta);
                exoplanetasDestino.push(exoPlaneta);
            }
        }
    }
    await fetchData();

    let primeraCarta = null;
    let segundaCarta = null;
    let candado = false;

    function voltearCarta() {
        if (candado) return;
        if (this === primeraCarta) return;
        if (this.classList.contains("marcada")) return;
        this.classList.add("volteada");
        this.textContent = this.dataset.value;

        if (!primeraCarta) {
            primeraCarta = this;
            return;
        } 
        
        segundaCarta = this;
        candado = true;
        compararCartas();
    }

    function compararCartas() {
        if (primeraCarta.dataset.value === segundaCarta.dataset.value) {
            marcaCartas();
        } else {
            desmarcaCartas();
        }
    }

    function marcaCartas() {
        primeraCarta.classList.add("marcada");
        segundaCarta.classList.add("marcada");
        reiniciarCartas();
    }

    function desmarcaCartas() {
        setTimeout(() => {
            primeraCarta.classList.remove("volteada");
            segundaCarta.classList.remove("volteada");
            primeraCarta.textContent = "";
            segundaCarta.textContent = "";
            reiniciarCartas();
        }, 1000);
    }

    function reiniciarCartas() {
        primeraCarta = null;
        segundaCarta = null;
        candado = false;
    }

    class Tablero {
        constructor(array) {
            this.array = this.revuelve(array);
        }

        revuelve(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array
        }

        crearTablero() {
            const tablero = document.getElementById("tablero");
            for (let i = 0; i < this.array.length; i++) {
                const div = document.createElement("div");
                div.classList.add("carta");
                div.dataset.value = this.array[i].pl_name;
                div.addEventListener("click", voltearCarta);
                tablero.appendChild(div);
            }
        }
    }

    const tablero = new Tablero(exoplanetasDestino);
    tablero.crearTablero();

    
    
});