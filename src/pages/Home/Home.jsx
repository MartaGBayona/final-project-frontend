/* eslint-disable react/no-unescaped-entities */
import './Home.css'

export const Home = () => {
    return (
        <div className="homeDesign">
            <div className='titleHomeDesign'>
                <div className='textTitleHomeDesign'>GORGONEYE CINEMA ACADEMY</div>
            </div>
            <div className='subtitleHomeDesign'>
                Si te gusta el cine, estás en el lugar indicado.
            </div>
            <div className="section">
                        <div className="descriptionDesign">
                            Adéntrate en los órigenes del séptimo arte. Haremos un recorrido desde los inicios de la cinematográfia de la mano de Georges Méliès, hasta los millonarios films contemporáneos.
                            <img src="../../../img/le_voyage_dans_la_lune-371999813-large.jpg" alt="Viaje a la luna" className="descriptionImage" />
                        </div>
                        <div className="descriptionDesign">
                            ¿Sábias que 'The Birth of a Nation' (1915) está considerado el primer largometraje de la historia del cine?. Si quieres conocer más datos sobre esta película y muchas más no dudes en inscribirte en nuestros cursos.
                            <img src="../../../img/Birth of nation.jpg" alt="Birth of nation" className="descriptionImage" />
                        </div>
                        <div className="descriptionDesign">
                            El arte cinematográfico fue un fenómeno que se extendió por todo el mundo ya desde inicios del siglo XX. En nuestra plataforma podrás conocer este arte más allá de las fronteras estadounidenses. Pásate por nuestras clases para saber más.
                            <img src="../../../img/acorazado potenkin.jpg" alt="acorazado potenkin" className="descriptionImage" />
                        </div>
                    </div>
        </div>
    )
}