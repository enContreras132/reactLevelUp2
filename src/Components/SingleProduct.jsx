import { Link, useParams } from "react-router-dom";
import { productos } from "../data/data.js";
import { useCart } from "../context/CartContext";

function formatCurrency(value) {
  try {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(value);
  } catch (e) {
    return `$${value}`;
  }
}

function SingleProduct() {
  const { id } = useParams();
  const product = productos.find((p) => p.id === Number(id));
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="container py-4">
        <div className="alert alert-warning" role="alert">
          Producto no encontrado
        </div>
        <Link to="/productos" className="btn btn-secondary">
          Volver a Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4 mb-5">
      <div className="row g-4">
        

        <div className="col-12 col-md-5">
          <div className="card shadow-sm h-100">
            <img
              src={product.imagen}
              alt={product.nombre}
              className="card-img-top img-fluid"
              style={{ objectFit: "contain", maxHeight: 360 }}
            />
          </div>
        </div>

        <div className="col-12 col-md-7">
          <div className="h-100 d-flex flex-column">
            <h1 className="h3 mb-2">{product.nombre}</h1>
            {product.precio != null && (
              <div className="mb-3">
                <span className="badge text-bg-primary fs-6">
                  {formatCurrency(product.precio)}
                </span>
              </div>
            )}
            {product.descripcion && (
              <p className="text-white mb-3">{product.descripcion}</p>
            )}

            {Array.isArray(product.caracteristicas) && product.caracteristicas.length > 0 && (
              <div className="mb-3">
                <h2 className="h6">Características</h2>
                <ul className="list-unstyled mb-0">
                  {product.caracteristicas.map((c, idx) => (
                    <li key={idx} className="d-flex align-items-start gap-2">
                      <i className="fa fa-check text-success mt-1" aria-hidden="true"></i>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-auto d-flex gap-2 pt-2">
              <Link to="/productos" className="btn btn-outline-secondary">
                Volver
              </Link>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => addItem(product, 1)}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
