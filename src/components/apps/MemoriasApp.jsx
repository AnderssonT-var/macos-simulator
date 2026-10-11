import "./MemoriasApp.css";

export default function MemoriasApp(){

return(

<div className="memoriasApp">

  <div className="memoriasSidebar">

    <h3>Memorias</h3>

    <ul>
      <li className="active">Historia</li>
      <li>Fundación</li>
      <li>Crecimiento</li>
      <li>Actualidad</li>
    </ul>

  </div>


  <div className="memoriasContent">

    <h2>Memorias Institucionales</h2>

    <p className="memoriasText">

      La universidad nace con el propósito de formar profesionales
      comprometidos con el desarrollo tecnológico y social del país.
      Desde sus inicios, la institución ha buscado impulsar el conocimiento,
      la investigación y la innovación en diferentes áreas académicas.

      Con el paso del tiempo, la universidad ha crecido en infraestructura,
      programas académicos y comunidad estudiantil, convirtiéndose en
      un referente de educación superior.

    </p>


    <div className="memoriasGrid">

      <img src="/memorias/img1.jpg" />
      <img src="/memorias/img2.jpg" />
      <img src="/memorias/img3.jpg" />
      <img src="/memorias/img4.jpg" />

    </div>

  </div>

</div>

)

}