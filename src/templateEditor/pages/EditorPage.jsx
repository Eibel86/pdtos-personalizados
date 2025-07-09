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
            url: '/assets/sargento.png',
            estilos: {
                grosor: 4,
                estilo: "double",
                color: "blue",
                size: 100,
                forma: "square"
            }
        },
        {
            id: 2,
            url: '/assets/pikaxu.jpg',
            estilos: {
                grosor: 4,
                estilo: "double",
                color: "blue",
                size: 100,
                forma: "square"
            }
        },
        {
            id: 3,
            url: '/assets/mario1.jpg',
            estilos: {
                grosor: 4,
                estilo: "double",
                color: "blue",
                size: 100,
                forma: "square"
            }
        }

    ])

    const [arrayTextos, setArrayTextos] = useState([
        { id: 1, texto: "", tamaño: "16px", fuente: "Arial" },
        // { id: 2, texto: "", tamaño: "16px", fuente: "Arial" },
        // { id: 3, texto: "", tamaño: "16px", fuente: "Arial" }
    ])


    const handleChange = (e, id) => {
        const { name, value } = e.target;

        setArrayImagenes(prev =>
            prev.map(img =>
                img.id === id
                    ? {
                        ...img,
                        estilos: {
                            ...img.estilos,
                            [name]: value
                        }
                    }
                    : img
            )
        );
    };

    const cambiarImagen = (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        const nuevaURL = URL.createObjectURL(file);

        setArrayImagenes(prev => {
            const nuevoArray = [...prev];

            // Si ya hay una imagen en esa posición, la reemplazas
            if (nuevoArray[index - 1]) {
                nuevoArray[index - 1] = {
                    ...nuevoArray[index - 1],
                    url: nuevaURL
                };
            } else {
                nuevoArray.push({
                    id: Date.now(), // genera id único
                    url: nuevaURL,
                    estilos: {
                        grosor: 4,
                        estilo: "double",
                        color: "blue",
                        size: 100,
                        forma: "square"
                    }
                });
            }

            return nuevoArray;
        });
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
                    >Cargar imagen 1</label>
                    <input type="file" id="imagen1"
                        className="input-oculto" />

                    <label htmlFor="imagen" className="boton-cargarImagen"
                    >Cargar imagen 2</label>
                    <input type="file" id="imagen2"
                        className="input-oculto" />

                    <label htmlFor="imagen" className="boton-cargarImagen"
                    >Cargar imagen 3</label>
                    <input type="file" id="imagen3"
                        className="input-oculto" />
                </div>



                <div
                    className="plantilla-editor"
                    ref={divRef}
                    style={{
                        backgroundImage: patronSeleccionado ? `url(${patronSeleccionado})` : "none",
                        // backgroundRepeat: "repeat", //  corregido
                        width: "756px",             // puedes ajustar
                        height: "341px",            // puedes ajustar
                        border: "1px solid gray",
                    }}
                >


                    <div className="img-container">
                        {
                            arrayImagenes.map(({ id, url, estilos }) => {
                                return <MyImages
                                    grosor={estilos.grosor} estilo={estilos.estilo}
                                    color={estilos.color} tamanio={estilos.size}
                                    forma={estilos.forma} url={url} id={`img${id}`} />
                            })
                        }
                    </div>


                    <div>
                        {
                            arrayTextos.map((item) => {
                                return <p>{item.texto}</p>
                            })
                        }
                    </div>

                </div>

                <hr />

                <div className="table-controllers">

                    {
                        arrayImagenes.map(({ id, estilos }) => {
                            return (
                                <ImagesForm handleChange={handleChange}
                                    grosor={estilos.grosor} id={`controller${id}`} />
                            )
                        })
                    }
                </div>

                <hr />
                <div>
                    {arrayTextos.map((item, index) => (
                        <div key={item.id} style={{ marginBottom: '1rem' }}>
                            <label>Texto {item.id}:</label>
                            <input
                                type="text"
                                value={item.texto}
                                onChange={(e) => {
                                    const nuevoTexto = e.target.value;
                                    setArrayTextos(arrayTextos.map(obj =>
                                        obj.id === item.id ? { ...obj, texto: nuevoTexto } : obj
                                    ));
                                }}
                                placeholder="Escribe el texto"
                            />

                            <label>Tamaño (px):</label>
                            <input
                                type="number"
                                value={parseInt(item.tamaño)}
                                onChange={(e) => {
                                    const nuevoTamaño = e.target.value + "px"; // lo convertimos a string con "px"
                                    setArrayTextos(arrayTextos.map(obj =>
                                        obj.id === item.id ? { ...obj, tamaño: nuevoTamaño } : obj
                                    ));
                                }}

                            />

                            <label>Fuente:</label>
                            <select
                                value={item.fuente}
                                onChange={(e) => {
                                    const nuevaFuente = e.target.value;
                                    setArrayTextos(arrayTextos.map(obj =>
                                        obj.id === item.id ? { ...obj, fuente: nuevaFuente } : obj
                                    ));
                                }}

                            >
                                <option value="Arial">Arial</option>
                                <option value="Times New Roman">Times New Roman</option>
                                <option value="Courier New">Courier New</option>
                                <option value="Verdana">Verdana</option>
                            </select>
                        </div>
                    ))}
                </div>

                <button onClick={generarPDF} style={{ marginTop: '20px' }}>
                    Enviar
                </button>

            </div >
        </>
    );

}
