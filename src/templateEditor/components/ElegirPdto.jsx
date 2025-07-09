import { useState } from "react";


export const ElegirPdto = () => {

    const [producto, setProducto] = useState("");
    const [texto, setTexto] = useState("");

    const manejarBusqueda = (e) => {
        e.preventDefault();
        console.log("Producto:", producto);
        console.log("Texto:", texto);
        // Aquí en el futuro harás la búsqueda real
    };

    return (

        <form onSubmit={manejarBusqueda}>
            <label htmlFor="producto">Producto:</label>
            <select
                id="producto"
                value={producto}
                onChange={(e) => setProducto(e.target.value)}
            >
                <option value="">-- Selecciona un producto --</option>
                <option value="taza-blanca">Taza blanca</option>
                <option value="taza-negra">Taza negra</option>
                <option value="botella">Botella</option>
            </select>
            <br />

            <label htmlFor="texto">Buscar categoria de plantilla:</label>
            <input
                id="texto"
                type="text"
                placeholder="Si escribes perro saldran las plantillas relacionas con esa palabra"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
            />
            <button type="submit">Buscar</button>
        </form>

    )
}
