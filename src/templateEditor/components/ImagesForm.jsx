

export const ImagesForm = ({ handleChange, grosor }) => {

    return (
        <div className="form-container">
            <h5>Controlador de imagen</h5>
            <form action="" className="form-image">
                <div className="space-between">
                    <label for='borderWidth'>Borde:</label>
                    <input onChange={handleChange} type="range" min='0' max='10'
                        step='1' value={grosor} name='grosor' id='borderWidth' />
                </div>
                <div className="space-between">
                    <label for='borderStyle' >Linea:</label>
                    <select onChange={handleChange} name="estilo" id="borderStyle">
                        <option value="dotted">Punteado</option>
                        <option value="solid">Solido</option>
                        <option value="dashed">Guiones</option>
                        <option value="double">Dobles</option>
                        <option value="none">Sin borde</option>
                    </select>
                </div>
                <div className="space-between">
                    <label for='borderColor' >Color:</label>
                    <select onChange={handleChange} name="color" id="borderColor">
                        <option value="white">Blanco</option>
                        <option value="black">Negro</option>
                        <option value="blue">Azul</option>
                        <option value="red">Rojo</option>
                    </select>
                </div>
                <div className="space-between">
                    <label for='shape' >Forma:</label>
                    <select onChange={handleChange} name="forma" id="shape">
                        <option value="square">Cuadrado</option>
                        <option value="circle">Círculo</option>
                        <option value="diamond">Rombo</option>
                    </select>
                </div>
                <div className="space-between">
                    <label for='size' >Tamaño:</label>
                    <input
                        onChange={handleChange}
                        type="range"
                        name="size"
                        id="size"
                        min="50"
                        max="400"
                        step="10"
                        defaultValue="200" />
                </div>



            </form>

        </div>
    )
}
