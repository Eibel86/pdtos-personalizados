

export const MyImages = ({ grosor, estilo, color, tamanio, forma }) => {
    return (
        <div
            className={forma}       //falta aplicar el borde de la imagen.
            // ref={cajaImagen1}
            style={{
                // width: `${tamanio}px`,
                // height: `${tamanio}px`,
                objectFit: 'cover',
                overflow: 'hidden',
                borderWidth: `${grosor}px`,
                borderStyle: estilo,
                borderColor: color,


            }}
        >
            <img
                className="img1"
                src="/assets/sargento.png"
                style={{
                    width: `${tamanio}px`,
                    height: "auto",
                    objectFit: "cover",
                    display: "flex",
                    justifyContent: "center",/* centra horizontalmente */
                    alignItems: "center",
                }} />
        </div>



    )
}
