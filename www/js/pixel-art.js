var nombreColores = ['White', 'LightYellow',
  'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan',
  'Khaki', 'Yellow', 'Gold', 'Orange', 'DarkOrange', 'OrangeRed', 'Tomato', 'Coral', 'DarkSalmon', 'LightSalmon', 'LightCoral', 'Salmon', 'PaleVioletRed',
  'Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'Crimson', 'Red', 'FireBrick', 'DarkRed', 'Maroon',
  'Brown', 'Sienna', 'SaddleBrown', 'IndianRed', 'RosyBrown',
  'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru',
  'Chocolate', 'DarkKhaki', 'DarkSeaGreen', 'MediumAquaMarine',
  'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'YellowGreen', 'LawnGreen',
  'Chartreuse', 'GreenYellow', 'Lime', 'SpringGreen', 'LimeGreen',
  'LightGreen', 'PaleGreen', 'PaleTurquoise',
  'AquaMarine', 'Cyan', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'DeepSkyBlue',
  'LightSeaGreen', 'CadetBlue', 'DarkCyan', 'Teal', 'Steelblue', 'LightSteelBlue', 'Honeydew', 'LightCyan',
  'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue',
  'DodgerBlue', 'CornflowerBlue', 'RoyalBlue', 'SlateBlue',
  'MediumSlateBlue', 'DarkSlateBlue', 'Indigo', 'Purple', 'DarkMagenta', 'Blue',
  'MediumBlue', 'DarkBlue', 'Navy', 'Thistle',
  'Plum', 'Violet', 'Orchid', 'DarkOrchid', 'Fuchsia', 'Magenta', 'MediumOrchid',
  'BlueViolet', 'DarkViolet', 'DarkOrchid',
  'MediumPurple', 'Lavender', 'Gainsboro', 'LightGray', 'Silver', 'DarkGray', 'Gray',
  'DimGray', 'LightSlateGray', 'DarkSlateGray', 'Black'
];

// Variable jQuery para guardar el elemento 'color-personalizado'
// Es decir, el que se elige con la rueda de color.
var $colorPersonalizado = $('#color-personalizado');
var mouseApretado = false;
var modoLinea = false;
var linePixels = [-1,-1]

$colorPersonalizado.change(function() {
  // Se guarda el color de la rueda en colorActual
  colorActual = $colorPersonalizado.val();
  // Completar para que cambie el indicador-de-color al colorActual
  cambiarIndicadorDeColor(colorActual);

});

var $paleta = $("#paleta");
var $grillaDePixeles = $("#grilla-pixeles");
console.log("=> ON THE SUNDAY OF LIFE");

generarPaleta();
generarGrilla();
cambiarIndicadorDeColor("Black");

/*
$(".caja .cerrar").click(function(){
	$(this).parent().fadeOut();
});
*/


function generarPaleta(){
   for (var i = 0; i < nombreColores.length; i++) {
     var $nuevoSwatch = $("<div>",{"class":"color-paleta"});
     $nuevoSwatch.css("background-color",nombreColores[i]);
     //$nuevoSwatch.click(cambiarIndicadorDeColor(nombreColores[i]));
     $paleta.append($nuevoSwatch);
   }
}

function generarGrilla(){

  for (var i = 0; i < 1750; i++) {
    var $nuevoPixel = $("<div>");
    //$nuevoPixel.text(i);
    //$nuevoPixel.css("font-size","6px");
    $grillaDePixeles.append($nuevoPixel);
  }
}

// SELECCIONAR COLOR E MOSTRARLO EN EL INDICADOR DE COLOR
$("#paleta div").click(function(){
   var colorSwatch = $(this).css("background-color");
   cambiarIndicadorDeColor(colorSwatch);

});


// CAMBIAR LOS COLORES DE A GRILLA - BEGIN

// MANERA OPTIMIZADA -> DETECTAR EL EVENT EN EL PADRE, QUE ES SOLO 1, Y APLICAR LA FUNCIONALIDAD AL event.target (CADA DIV DONDE ESPECIFICAMENTE SE CLICKEO)

$grillaDePixeles.mousedown(function(){
   mouseApretado = true;
   console.log("MOUSE DOWN");
});

$grillaDePixeles.mouseup(function(){
	mouseApretado = false;
   console.log("MOUSE UP");
});

$grillaDePixeles.mouseover(function(event){
   //console.log("MOUSE HOVERING");
   if (mouseApretado) {
	   var colorSwatch = $("#indicador-de-color").css("background-color");
      $(event.target).css("background-color", colorSwatch);
      //console.log(event.target);
   }
});


$grillaDePixeles.click(function(event){
   var colorSwatch = $("#indicador-de-color").css("background-color");
   $(event.target).css("background-color", colorSwatch);

   updateLinePixels(getPixelIndex(event.target));
   if (lineaMode && linePixels[0] > 0 && linePixels[1] > 0) {
      dibujarLinea(linePixels[0],linePixels[1]);
   }

});

function getPixelIndex(pixelDiv){
   //console.log($grillaDePixeles.index(pixelDiv));
   //console.log($("div").index(pixelDiv));
   //console.log($("div").index(pixelDiv) - 121);

   return $("div").index(pixelDiv) - 121;
   // pixelDivs DEBERIA SERA EL CONTEXT DE LOS "divs" A CONTAR.
   // PERO AQUI ESTA CONTANDO DE TODA LA PAGINA, ASI QUE DEBE HABER 121 DIVS ANTES DE
   // COMENZAR LOS DIVS DE grillaDePixeles;
}

// MANERA NO TAN OPTIMIZADA -> REGISTRAR EL EVENTO EN CADA ELEMENTO. IGUALMENTE, ESTA BIEN USARLO SI NO ES UNA GRAN CANTIDAD DE OBJETOS/ELEMENTO
/*
$grillaDePixeles.children("div").mousedown(function(){
	mouseApretado = true;
});

$grillaDePixeles.children("div").mouseup(function(){
	mouseApretado = false;
});

$grillaDePixeles.children("div").hover(function(){
   if (mouseApretado) {
	   var colorSwatch = $("#indicador-de-color").css("background-color");
      $(this).css("background-color", colorSwatch);
   }
});

CUANDO SE APRETA Y SUELTA SOLO SOBRE 1 MISMO PIXEL
$grillaDePixeles.children("div").click(function(){
   var colorSwatch = $("#indicador-de-color").css("background-color");
   $(this).css("background-color", colorSwatch);
});

*/

// CAMBIAR LOS COLORES DE A GRILLA - END



function cambiarIndicadorDeColor(color){
   //console.log("|| CAMBIANDO INDICADOR DE COLOR");
   $("#indicador-de-color").css("background-color", color);
}

// BORRAR LA LA GRILLA DE PIXELES
$("#borrar").click(function(){
   var $losPixeDivs = $grillaDePixeles.children("div");
   $losPixeDivs.each(function(index,element){
      $(element).animate({"background-color":"rgb(255,255,255)"},1000);
   });
});

// CARGAR SUPERHEROES
$(".imgs li img").click(function(){
   //var nombreArchivo = "js/" + $(this).attr("id") + ".js";
   //console.log(nombreArchivo);
   cargarSuperheroe(window[$(this).attr("id")]);
   // window[varNameAsString] LOOKS AND CONVERTS TO A VAR NAMED varNAmeAsString IN WINDOW SCOPE
});

// DESCARGAR DIBUJO
$("#guardar").click(function(){
   guardarPixelArt();
});

// LINEAS
$switchLineas = $("#switchLinea");

function updateLinePixels(lastPixelClicked){
   linePixels[0] = linePixels[1];
   linePixels[1] = lastPixelClicked;
   console.log(linePixels);
}

$switchLineas.change(function() {
  lineaMode = $(this).prop("checked");
  console.log(lineaMode);
});

$("#lineaMode").click(function(){
   modoLinea = !lineaMode;
   console.log("ModoLinea => " + modoLinea);

   dibujarLinea(linePixel[0],linePixel[1]);

});

function dibujarLinea(pixel_1_index, pixel_2_index){
   var width = 53;  // pixels en una row

   var pixel_1_x = pixel_1_index % width;
   var pixel_2_x = pixel_2_index % width;
   var pixel_1_y = Math.floor(pixel_1_index / width);
   var pixel_2_y = Math.floor(pixel_2_index / width);

   var xSteps = Math.abs(pixel_2_x - pixel_1_x);
   var ySteps = Math.abs(pixel_2_y - pixel_1_y);

   var largerResolution = xSteps > ySteps ? xSteps : ySteps;

   for (var i = 0; i < largerResolution; i++) {
      var lineX = mapToRange(i,0,largerResolution, pixel_1_x, pixel_2_x);
      var lineY = mapToRange(i,0,largerResolution, pixel_1_y, pixel_2_y);

      lineX = Math.floor(lineX);
      lineY = Math.floor(lineY);

      var finalPixelIndexOnLine = lineX + (lineY * width);

      var colorSwatch = $("#indicador-de-color").css("background-color");

      $grillaDePixeles.children("div").eq(finalPixelIndexOnLine).css("background-color", colorSwatch);
   }

   console.log("Linea: End");
}

function mapToRange(value, sourceMin, sourceMax, targetMin, targetMax){
    // SPAN OF EACH RANGE
    var sourceSpan = sourceMax - sourceMin
    var targetSpan = targetMax - targetMin

    // VALUE
    var valueScaled = (value - sourceMin) / sourceSpan

    // TRANSPOLATE TO TARGETSPAN
    return targetMin + (valueScaled * targetSpan)
}
