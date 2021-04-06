window.addEventListener('load', function() {
    let productoFavoritoActivo = document.querySelectorAll(".producto-favorito");
        for(let i = 0; i < productoFavoritoActivo.length; i++) {
            productoFavoritoActivo[i].addEventListener("click", function() {
            this.classList.toggle("producto-favorito-activo");
     });
    };
});