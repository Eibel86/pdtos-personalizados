

export const MyImages = ({ grosor, estilo, color, tamanio, forma, url, id }) => {
    return (
        <div
            className={`wrapper ${forma}`}    // [circle, square, diamons] 
            // ref={cajaImagen1}
            style={{
                width: `${tamanio}px`,
                height: `${tamanio}px`,
                borderWidth: `${grosor}px`,
                borderStyle: estilo,
                borderColor: color,
                backgroundColor: 'white'
            }}
        >
            <img
                className="img1" id={id}
                src={url}
            />
        </div>



    )
}
