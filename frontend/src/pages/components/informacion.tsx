import React from 'react';

export default function informacion() {
    return (
        <div className="background-image">
            <div className="overlay2">
                <div>
                    <h2 id="sobre-nosotros">Sobre Nosotros</h2>
                    <p className="text info">Dado a que las PYMES en Honduras tienen dificultades para obtener crédito, les
                        proveemos una alternativa de financiación. $Yupi, es una plataforma crowdfunding,
                        donde las PYMES pueden conectar con inversores interesados en apoyar proyectos locales
                        y productivos. Así como los inversores, pueden ayudar a las mismas con sus inversiones
                        y recibir parte de las ganancias al ser ejecutado el proyecto una vez recauda el monto
                        meta del proyecto de la PYME.</p>
                    <p className="text info">Con apoyo de la inteligencia artificial, el sistema podrá analizar datos comerciales
                        de las PYMES, como transacciones y el historial de ventas, para evaluar el riesgo
                        crediticio de forma más precisa.</p>
                </div>
                <div>
                    <h2 className="seccion" id="como-funciona">¿Cómo funciona?</h2>
                    <div className="info">
                        <h4>PYMES</h4>
                        <p className="text">En este sitio las PYMES pueden crear proyectos de modo que estos
                            serán publicados para que los inversionistas puedan decidir invertir en ellos.
                            También se pueden comunicar con ellos para resolver dudas y generar confianza en sus
                            proyectos con sus inversionistas y asi estos puedan ser apoyados.</p>
                        <h4>Inversionistas</h4>
                        <p className="text">Los inversionistas van a tener acceso a los diferentes datos
                            estadísticos sobre los proyectos de las PYMES y poder inclusive contactarse con
                            ellos por medio de mensajeria. Esto con el fin de que tenga la información necesaria
                            para evaluar su inversión en las mismas y poder ganar al tener éxito sus proyectos.</p>
                    </div>
                </div>
            </div>
        </div >
    )
}