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
    const [estilos, setEstilos] = useState({
        grosor: 4,
        estilo: "double",
        color: "blue",
        size: 100,
        forma: "square"
    })

    const [arrayImagenes, setArrayImagenes] = useState([
        {
            id: 1,
            url: '/assets/sargento.png'
        },
        {
            id: 2,
            url: '/assets/pikaxu.jpg'
        },
        {
            id: 3,
            url: '/assets/mario1.jpg'
        }

    ])

    const handleChange = ({ target }) => {
        console.log(target.value)
        console.log(target.name)

        // buscar imagen del array
        setEstilos({ ...estilos, [target.name]: target.value })

    }
    const cambiarImagen = () => {
        //subir imagen con multer 
        //setear arrayImagenes
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
                <div className="botones-imagenes">
                    <label htmlFor="imagen" className="boton-cargarImagen"
                        onChange={cambiarImagen}>Cargar imagen 1</label>
                    <input
                        type="file"
                        name="image"
                        id="imagen"
                        className="input-oculto"
                    />
                    <label htmlFor="imagen" className="boton-cargarImagen">Cargar imagen 2</label>
                    <input
                        type="file"
                        name="image"
                        id="imagen"
                        className="input-oculto"
                    />
                    <label htmlFor="imagen" className="boton-cargarImagen">Cargar imagen 3</label>
                    <input
                        type="file"
                        name="image"
                        id="imagen"
                        className="input-oculto"
                    />
                </div>

                <div className="texto-imagen">

                    <input type="text" name="texto1" id="texto1" placeholder="Escriba texto1" />

                    <input type="text" name="texto1" id="texto1" placeholder="Escriba texto2" />

                    <input type="text" name="texto1" id="texto1" placeholder="Escriba texto3" />
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

                    {
                        arrayImagenes.map((imagen) => {
                            return <MyImages
                                grosor={estilos.grosor} estilo={estilos.estilo}
                                color={estilos.color} tamanio={estilos.size}
                                forma={estilos.forma} url={imagen.url} />
                        })
                    }
                </div>

                <hr />

                <div className="table-controllers">

                    {
                        arrayImagenes.map((control) => {
                            return (
                                <ImagesForm handleChange={handleChange} />
                            )
                        })
                    }
                </div>

                <hr />

                <button onClick={generarPDF} style={{ marginTop: '20px' }}>
                    Enviar
                </button>

            </div >
        </>
    );

}
