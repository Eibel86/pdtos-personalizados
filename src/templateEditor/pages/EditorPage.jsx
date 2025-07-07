import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const EditorPage = () => {

    const divRef = useRef();

    const [patronSeleccionado, setPatronSeleccionado] = useState("");

    const [position1, setPosition1] = useState({ x: 0, y: 0 });
    const [position2, setPosition2] = useState({ x: 100, y: 0 });
    const [position3, setPosition3] = useState({ x: 200, y: 0 });

    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const [draggingBox, setDraggingBox] = useState(null); // puede ser "box1", "box2", etc.

    const cajaImagen1 = useRef();
    const cajaImagen2 = useRef();
    const cajaImagen3 = useRef();
    const startPosRef = useRef({ x: 0, y: 0 });
    const cajaTexto1 = useRef();

    const handleMouseDown = (boxName, e) => {
        setDragging(true);
        setDraggingBox(boxName);
        startPosRef.current = {
            x: e.clientX,
            y: e.clientY,
        };
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;

        const deltaX = e.clientX - startPosRef.current.x;
        const deltaY = e.clientY - startPosRef.current.y;

        if (draggingBox === "box1") {
            setPosition1(prev => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
        } else if (draggingBox === "box2") {
            setPosition2(prev => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
        } else if (draggingBox === "box3") {
            setPosition3(prev => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
        }

        // Actualiza la posición de inicio para el próximo movimiento
        startPosRef.current = {
            x: e.clientX,
            y: e.clientY,
        };
    };

    const handleMouseUp = () => {
        setDragging(false);
        setDraggingBox(null);
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    });

    const handleChange = ({ target }) => {
        console.log(target.value)
        console.log(target.name)

        if (target.name == "borderStyle") {
            cajaImagen1.current.style.borderStyle = target.value
        }
        if (target.name == "borderWidth") {
            cajaImagen1.current.style.borderWidth = `${target.value}px`
        }

        if (target.name === "shape") {
            cajaImagen1.current.classList.remove("square", "circle", "diamond", "star");
            cajaImagen1.current.classList.add(target.value);
        }
        if (target.name === "size") {
            cajaImagen1.current.style.width = `${target.value}px`;
            cajaImagen1.current.style.height = `${target.value}px`;
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
                    <label htmlFor="texto1" className="form-label">Texto</label>
                    <input type="text" name="texto1" id="texto1" />
                </div>

                <div
                    className="plantilla-editor"
                    ref={divRef}
                    style={{
                        position: "relative", //importante si mueves elementos dentro
                        backgroundImage: patronSeleccionado ? `url(${patronSeleccionado})` : "none",
                        backgroundRepeat: "repeat", //  corregido
                        width: "756px",             // puedes ajustar
                        height: "341px",            // puedes ajustar
                        border: "1px solid gray",
                    }}
                >
                    {/* Aquí irán imágenes/textos */}

                    <div
                        ref={cajaImagen1}
                        onMouseDown={(e) => handleMouseDown("box1", e)}
                        style={{
                            width: '300px',
                            objectFit: 'cover',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderColor: 'black',
                            position: 'absolute',
                            top: `${position1.y}px`,
                            left: `${position1.x}px`,
                            cursor: dragging ? 'grabbing' : 'grab',
                        }}
                    >
                        <img className="img1" src="/assets/sargento.png" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div
                        ref={cajaImagen2}
                        onMouseDown={(e) => handleMouseDown("box2", e)}
                        style={{
                            width: '200px',
                            height: '200px',
                            objectFit: 'cover',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderColor: 'black',
                            position: 'absolute',
                            top: `${position2.y}px`,
                            left: `${position2.x}px`,
                            cursor: dragging ? 'grabbing' : 'grab',
                        }}
                    >
                        <img className="img2" src="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div
                        ref={cajaImagen3}
                        onMouseDown={(e) => handleMouseDown("box3", e)}
                        style={{
                            width: '200px',
                            height: '200px',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderColor: 'black',
                            position: 'absolute',
                            top: `${position3.y}px`,
                            left: `${position3.x}px`,
                            cursor: dragging ? 'grabbing' : 'grab',
                        }}
                    >
                        <img className="img3" src="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                </div>

                <hr />

                <form action="">
                    <h2>Borde grosor</h2>
                    <input onChange={handleChange} type="range" min='0' max='10' step='1' value='4' name='borderWidth' />
                    <h2>Borde tipo</h2>
                    <select onChange={handleChange} name="borderStyle" id="">
                        <option value="dotted">Punteado</option>
                        <option value="solid">Solido</option>
                        <option value="dashed">Guiones</option>
                        <option value="double">Dobles</option>
                        <option value="none">Sin borde</option>
                    </select>
                    <br />
                    <h2>Borde color</h2>
                    <select onChange={handleChange} name="borderColor" id="">
                        <option value="white">Blanco</option>
                        <option value="black">Negro</option>
                        <option value="blue">Azul</option>
                        <option value="red">Rojo</option>
                    </select>
                    <h2>Forma de imagen</h2>
                    <select onChange={handleChange} name="shape">
                        <option value="square">Cuadrado</option>
                        <option value="circle">Círculo</option>
                        <option value="diamond">Rombo</option>
                        <option value="star">Estrella</option>
                    </select>
                    <h2>Tamaño Imagen (px)</h2>
                    <input
                        onChange={handleChange}
                        type="range"
                        name="size"
                        min="50"
                        max="400"
                        step="10"
                        defaultValue="200"
                    />

                </form>


                <hr />

                <button onClick={generarPDF} style={{ marginTop: '20px' }}>
                    Descargar PDF
                </button>

            </div >
        </>
    );

}
