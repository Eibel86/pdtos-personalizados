import React, { useEffect, useRef, useState } from "react";
import "./editorPage.css";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MyImages } from "../components/MyImages";

export const EditorPage = () => {

    const divRef = useRef();

    const [patronSeleccionado, setPatronSeleccionado] = useState("");

    // Estados para estilos de iamgenes
    const [grosor, setGrosor] = useState(4)
    const [estilo, setEstilo] = useState('double')
    const [color, setColor] = useState('blue')
    const [tamanio, setTamanio] = useState()
    const [forma, setForma] = useState('circle')



    const cajaImagen1 = useRef();
    const cajaImagen2 = useRef();
    const cajaImagen3 = useRef();

    const cajaTexto1 = useRef();

    const handleChange = ({ target }) => {
        console.log(target.value)
        console.log(target.name)

        if (target.name == "borderStyle") {
            setEstilo(target.value)
        }
        if (target.name == "borderWidth") {
            setGrosor(target.value)
        }
        if (target.name == "borderColor") {
            setColor(target.value)
        }

        if (target.name === "shape") {
            setForma(target.value)
        }
        if (target.name === "size") {
            setTamanio(target.value)
        }
    }



    const generarPDF = async () => {
        // cambiar medidas
        const canvas = await html2canvas(divRef.current, {
            scale: 2
        });


        const imgData = canvas.toDataURL('image/jpeg');

        // Tamaño del PDF: 756px x 340.2px → en mm: 200 x 90
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: [200, 90],
        });

        pdf.addImage(imgData, 'JPEG', 0, 0, 200, 90);
        pdf.save('patron.pdf');
        //restablecer medidas
    };


    return (
        <>
            <div>
                <h1>Editor plantilla</h1>
            </div>
            <div>
                <input type="text" name="texto1" id="texto1" placeholder="Se busca x tipo de plantilla" />
                <button>Buscar</button>
            </div>
            <div>
                <div style={{ marginBottom: "1rem" }}>
                    <button onClick={() => setPatronSeleccionado("/assets/plantilla1.png")}>
                        Patrón Huesos
                    </button>
                    <button onClick={() => setPatronSeleccionado("/assets/plantilla2.png")}>
                        Patrón Corazón
                    </button>
                    <button onClick={() => setPatronSeleccionado("/assets/banderacubana1.png")}>
                        Sin Patrón
                    </button>
                </div>
                <div>
                    <label htmlFor="texto1" className="form-label">Imagen</label>
                    <input type="text" name="texto1" id="texto1" />
                </div>
                <div>
                    <label htmlFor="texto1" className="form-label">Texto</label>
                    <input type="text" name="texto1" id="texto1" />
                </div>

                <div
                    className="plantilla-editor"
                    ref={divRef}
                    style={{
                        position: "relative", //importante si mueves elementos dentro
                        backgroundImage: patronSeleccionado ? `url(${patronSeleccionado})` : "none",
                        // backgroundRepeat: "repeat", //  corregido
                        width: "756px",             // puedes ajustar
                        height: "341px",            // puedes ajustar
                        border: "1px solid gray",
                    }}
                >
                    {/* Aquí irán imágenes/textos */}


                    <MyImages grosor={grosor} estilo={estilo} color={color} tamanio={tamanio} forma={forma} />
                    <MyImages grosor={grosor} estilo={estilo} color={color} tamanio={tamanio} forma={forma} />


                </div>

                <hr />

                <form action="">
                    <div>
                        <label for='borderWidth'>Borde grosor:&emsp;</label>
                        <input onChange={handleChange} type="range" min='0' max='10' step='1' value={grosor} name='borderWidth' id='borderWidth' />
                    </div>
                    <div>
                        <label for='borderStyle' >Borde tipo:&emsp;</label>
                        <select onChange={handleChange} name="borderStyle" id="borderStyle">
                            <option value="dotted">Punteado</option>
                            <option value="solid">Solido</option>
                            <option value="dashed">Guiones</option>
                            <option value="double">Dobles</option>
                            <option value="none">Sin borde</option>
                        </select>
                    </div>
                    <div>
                        <label for='borderColor' >Borde color:&emsp;</label>
                        <select onChange={handleChange} name="borderColor" id="borderColor">
                            <option value="white">Blanco</option>
                            <option value="black">Negro</option>
                            <option value="blue">Azul</option>
                            <option value="red">Rojo</option>
                        </select>
                    </div>
                    <div>
                        <label for='shape' >Forma:&emsp;</label>
                        <select onChange={handleChange} name="shape" id="shape">
                            <option value="square">Cuadrado</option>
                            <option value="circle">Círculo</option>
                            <option value="diamond">Rombo</option>
                            <option value="star">Estrella</option>
                        </select>
                    </div>
                    <div>
                        <label for='size' >Tamaño:&emsp;</label>
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


                <hr />

                <button onClick={generarPDF} style={{ marginTop: '20px' }}>
                    Descargar PDF
                </button>

            </div >
        </>
    );

}
