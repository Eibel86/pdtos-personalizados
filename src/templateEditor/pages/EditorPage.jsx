import React, { useEffect, useRef, useState } from "react";
import "./EditorPage.css";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MyImages } from "../components/MyImages";
import { ElegirPdto } from "../components/ElegirPdto";
import { ImagesForm } from "../components/ImagesForm";

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
            <ElegirPdto />
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
                    <label htmlFor="imagen" className="boton-cargarImagen">Cargar imagen</label>
                    <input
                        type="file"
                        name="image"
                        id="imagen"
                        className="input-oculto"
                    />
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
                <div className="table-controllers">
                    <ImagesForm handleChange={handleChange} />
                    <ImagesForm handleChange={handleChange} />

                </div>


                <hr />

                <button onClick={generarPDF} style={{ marginTop: '20px' }}>
                    Descargar PDF
                </button>

            </div >
        </>
    );

}
