window.addEventListener("load", () => {

    // Animación de estrellas
    const campoEstrellas = document.createElement("div");
    const numeroEstrellas = 100;
    for (let i = 0; i < numeroEstrellas; i++) {
        const estrella = document.createElement("div");
        estrella.style.left = `${Math.random() * 100}vw`;
        estrella.style.animationDuration = `${Math.random() * 5 + 2}s`; 
        estrella.style.animationDelay = `${Math.random() * 5}s`;
        estrella.classList.add("estrella");
        campoEstrellas.appendChild(estrella);
    } 
    document.body.appendChild(campoEstrellas);
});