import React, { useEffect, useRef, useState } from "react";
import "./EditorPage.css";

export const EditorPage = () => {
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
                            width: '200px',
                            height: '200px',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderColor: 'black',
                            position: 'absolute',
                            top: `${position1.y}px`,
                            left: `${position1.x}px`,
                            cursor: dragging ? 'grabbing' : 'grab',
                        }}
                    >
                        <img className="img1" src="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div
                        ref={cajaImagen2}
                        onMouseDown={(e) => handleMouseDown("box2", e)}
                        style={{
                            width: '200px',
                            height: '200px',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderColor: 'black',
                            position: 'absolute',
                            top: `${position2.y}px`,
                            left: `${position2.x}px`,
                            cursor: dragging ? 'grabbing' : 'grab',
                        }}
                    >
                        <img className="img2" src="/assets/SARGENTO MAIDEL.png" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
                        <img className="img3" src="/assets/sargento.png" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                </div>
            </div>
        </>
    );

}
