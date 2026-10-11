import "./ServiciosApp.css";

export default function ServiciosApp(){

return(

<div className="serviciosApp">

  <div className="serviciosHeader">
    <h1>Servicios / Producción</h1>
    <p>
      Área dedicada a los proyectos, servicios tecnológicos y
      producción desarrollada por la institución.
    </p>
  </div>


  <div className="serviciosGrid">

    <div className="servicioCard">
      <h3>Desarrollo de Software</h3>
      <p>
        Creación de aplicaciones web, sistemas empresariales
        y soluciones digitales desarrolladas por estudiantes
        y docentes de la institución.
      </p>
    </div>

    <div className="servicioCard">
      <h3>Producción Multimedia</h3>
      <p>
        Diseño gráfico, animación, contenido audiovisual
        y producción de material educativo digital.
      </p>
    </div>

    <div className="servicioCard">
      <h3>Investigación Tecnológica</h3>
      <p>
        Proyectos de investigación orientados a la innovación,
        inteligencia artificial, energías renovables y tecnología.
      </p>
    </div>

    <div className="servicioCard">
      <h3>Proyectos Académicos</h3>
      <p>
        Desarrollo de soluciones tecnológicas como parte
        de proyectos académicos y vinculación con la sociedad.
      </p>
    </div>

  </div>


  <div className="serviciosFooter">

    <h3>Producción Institucional</h3>

    <div className="serviciosGallery">

      <img src="/servicios/1.jpg"/>
      <img src="/servicios/2.jpg"/>
      <img src="/servicios/3.jpg"/>
      <img src="/servicios/4.jpg"/>

    </div>

  </div>

</div>

)

}