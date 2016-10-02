var mapa;
var ubicacion;
var marcador;

$(document).ready(function(){
	$('#xUbicame').on('click',function(){
		geolocalizacion();
	})
});

function geolocalizacion() {
    navigator.geolocation.getCurrentPosition(ubicar, error)
}
function ubicar(position) {
    position.coords.latitude;
    position.coords.longitude;
    crearMapa(position);
}
function error() {
    switch (error.code)
    {
        case error.PERMISSION_DENIED:
            console.log("El usuario no ha dado los permisos de ubicacion");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Ubicacion actual no detectada");
            break;
        case error.TIMEOUT:
            console.log("Tiempo de espera agotado");
            break;
        default:
            console.log("Error no encontrado");
            break;
    }
}
function crearMapa(pos) {
    ubicacion = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
    var opciones = {
        center: ubicacion,
        zoom: 16,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU

        }
    };
    mapa = new google.maps.Map(document.getElementById('areaMapa'), opciones);

    //Resize
    google.maps.event.addDomListener(window, "resize", function () {
        var center = mapa.getCenter();
        google.maps.event.trigger(mapa, "resize");
        mapa.setCenter(center);
    });
    //-----
    mostrarMarcador();
    mostrarRadio();

}

function mostrarMarcador() {
    marcador = new google.maps.Marker({
        position: ubicacion,
        map: mapa,
        title: 'Mi ubicación',
        draggable: false,
        animation: google.maps.Animation.DROP
    });
    marcador.addListener('click', marcadorAnimacion);
}
function marcadorAnimacion() {
    if (marcador.getAnimation() != null) {
        marcador.setAnimation(null);
    } else {
        marcador.setAnimation(google.maps.Animation.BOUNCE);
    }
}
function mostrarRadio() {
    var radio = new google.maps.Circle({
        center: ubicacion, map: mapa, radius: 500,
        strokeColor: '#94C766',
        strokeOpacity: 0.2,
        strokeWeight: 2,
        fillColor: '#94C766',
        fillOpacity: 0.35
    });

}