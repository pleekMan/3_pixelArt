// No modifiques estas funciones a menos que sepas MUY BIEN lo que estas haciendo!


// Abre una ventana para guardar nuestro arte en un archivo pixel-art.png
function guardarPixelArt() {
   $grillaDePixeles.css("background-color", "white");
   html2canvas($grillaDePixeles, {
      onrendered: function(canvas) {
         theCanvas = canvas;
         canvas.toBlob(function(blob) {
            saveAs(blob, "pixel-art.png");
         });
      }
   });
}

// Carga a un superheroe predefinido
function cargarSuperheroe(superheroe) {
   console.log("Cargando: " + superheroe);
   var $losPixeDivs = $grillaDePixeles.children("div");
   $losPixeDivs.each(function(index,element){
      $(element).animate({"background-color":superheroe[index]},1000);
      //console.log(superheroe[index]);
   });

   /*
  var $pixeles = $("#grilla-pixeles div");
  for (var i = 0; i < superheroe.length; i++) {
    //$pixeles[i].style.backgroundColor = superheroe[i];
  }
  */
}
