export default function LogIn() {
    return (
        <>
            <div id="login">
                <h2>Iniciar Sesión</h2>
                <form>
                    <div className="row mb-3">
                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                            Correo Electrónico
                        </label>
                        <div className="col-sm-10">
                            <input
                                type="email"
                                className="form-control"
                                id="inputEmail3"
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                            Contraseña
                        </label>
                        <div className="col-sm-10">
                            <input
                                type="password"
                                className="form-control"
                                id="inputPassword3"
                                required
                            />
                        </div>
                    </div>
                    <button className="UserButton btn" type="submit">
                        Iniciar Sesión
                    </button>
                </form>
            </div >
            <div className="image">
                <div className="overlay" id="ovl2">
                    <p className="title2">Bienvenido a</p>
                    <p className="title">$YUPI</p>
                    <p className="text">Inicia Sesión para acceder a tu cuenta.</p>
                </div>
                <img src="imagenes/FondoLI.png" alt="Iniciar Sesión" width="100%" height="630px" className="d-inline-block align-text-top" />
            </div>
        </>
    );
};