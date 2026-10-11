import "./MapasApp.css";

export default function MapasApp(){

return(

<div className="mapasApp">

<div className="mapasHeader">

<h1>Contacto / Ubicación</h1>

<p>
Puedes comunicarte con la institución mediante los siguientes medios
o visitarnos en nuestras instalaciones.
</p>

</div>


<div className="mapasGrid">

{/* INFORMACION */}

<div className="mapasInfo">

<h2>Información de Contacto</h2>

<div className="contactItem">
<strong>Dirección</strong>
<p>Av. Tecnológica 123, Quito, Ecuador</p>
</div>

<div className="contactItem">
<strong>Email</strong>
<p>info@universidad.edu</p>
</div>

<div className="contactItem">
<strong>Teléfono</strong>
<p>+593 02 000 0000</p>
</div>

<div className="contactItem">
<strong>Horario</strong>
<p>Lunes a Viernes — 08:00 a 18:00</p>
</div>

</div>


{/* MAPA */}

<div className="mapContainer">

<iframe
title="mapa"
src="https://www.google.com/maps?q=quito+ecuador&output=embed"
loading="lazy"
/>

</div>

</div>


{/* FORMULARIO */}

<div className="contactForm">

<h2>Enviar mensaje</h2>

<form>

<div className="formRow">

<input type="text" placeholder="Nombre completo" />

<input type="email" placeholder="Correo electrónico" />

</div>

<input type="text" placeholder="Asunto" />

<textarea placeholder="Escribe tu mensaje aquí..." />

<button type="submit">
Enviar mensaje
</button>

</form>

</div>

</div>

)

}