window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    let isDespegado = false;

    const planetas = [
        {alt: "Venus en tránsito de nuestro sol", img: "../assets/media/img/venus.jpg", link: "./simulador.html"},
        {alt: "BD-08 2823 b", img: "../assets/media/img/BD_08_2823_b.png", link: "./diana.html"},
    ]

    const contenedorPlanetas = document.querySelector(".mundos");

    for (let i = 0; i < planetas.length; i++) {
        // img
        const img = document.createElement("img");
        img.classList.add("planeta");
        img.src = planetas[i].img;
        img.alt = planetas[i].alt;
        img.addEventListener("click", () => {
            // animacion cohete y luego cambia de ventana
            isDespegado = true;
            cohete.sy = 72 * Math.floor(Math.random() * 4);
            cohete.despega(planetas[i].link);
        });
        contenedorPlanetas.appendChild(img);
    }


    class SpritesCohete {
        constructor(sx, sy) {
            const imagen = new Image();
            imagen.src = "../assets/media/img/spritesNaves.png";
            this.sx = sx;
            this.sy = sy;
            this.numsprite = 0;
            this.sw = 46;
            this.sh = 71;
            this.dw = canvas.width / 5 * 2;
            this.dh = canvas.height / 4;
            this.dx = canvas.width / 2 - this.dw / 2;
            this.dy = canvas.height - this.dh;
            this.img = imagen;
        }

        dibujar() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (this.numsprite < 3) {
                this.sx += this.sw;
                this.numsprite++;
            } else {
                this.sx = 0;
                this.numsprite = 0;
            }
            
            this.img.addEventListener("load", ()=>{
                ctx.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh); 
            });
            ctx.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh);
        }

        async despega(link) {
            while (this.dy > 0) {
                this.dy -= 5;
                // espera 
	            await new Promise (resolve => setTimeout(resolve, 0.5)); 
            }

            window.location.href = link;
        }
    }

    const cohete = new SpritesCohete(0, 0);
    
    function dibujar() {
        if (!isDespegado) {
            cohete.sy = 72 * Math.floor(Math.random() * 4);
        }
        cohete.dibujar();
        window.requestAnimationFrame(dibujar);
    }
    
    window.requestAnimationFrame(dibujar);
});