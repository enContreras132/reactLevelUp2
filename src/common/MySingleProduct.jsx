import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
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
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    const cargarProducto = async () => {
      console.log('=== INICIO cargarProducto ===');
      console.log('- URL completa:', location.pathname);
      console.log('- ID desde useParams:', id);
      
      try {
        setLoading(true);
        const API_BASE = '/api';
        
        // Extraer la categoría de la URL (ej: /mouse/1 -> "mouse")
        const pathParts = location.pathname.split('/');
        let categoria = pathParts[1];
        
        // Normalizar plural a singular para endpoints
        if (categoria === 'audifonos') {
          categoria = 'audifono';
        }
        
        console.log('- Categoría extraída:', pathParts[1]);
        console.log('- Categoría normalizada:', categoria);
        console.log('- URL a llamar:', `${API_BASE}/${categoria}/${id}`);
        
        // Buscar el producto en el endpoint de su categoría
        const response = await axios.get(`${API_BASE}/${categoria}/${id}`);
        console.log('- Respuesta recibida:', response.data);
        
        if (response.data) {
          setProduct(response.data);
          setLoading(false);
          console.log('- Producto cargado exitosamente');
          return;
        }
        
        console.log('- No se recibió data en la respuesta');
        
        // Si no se encontró en ningún endpoint
        setError('Producto no encontrado');
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar producto:', err);
        setError('Error al cargar el producto');
        setLoading(false);
      }
    };

    cargarProducto();
  }, [id, location.pathname]);

  if (loading) {
    return (
      <div className="container py-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
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
              src={product.imagen || product.urlImagen || 'https://via.placeholder.com/400x300?text=Sin+imagen'}
              alt={product.nombre}
              className="card-img-top img-fluid"
              style={{ objectFit: "contain", maxHeight: 360 }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/400x300?text=Sin+imagen';
              }}
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
              <p className="text-white mb-3" dangerouslySetInnerHTML={{ __html: product.descripcion }}></p>
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
              <button type="button" className="btn btn-primary" onClick={() => addItem(product, 1)}>
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
