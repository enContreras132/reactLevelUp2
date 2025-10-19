import React from 'react';
import { Link } from 'react-router-dom';

export default function SeccionProductos() {
  return (
    <section className="food_section layout_padding-bottom">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>Productos Disponibles</h2>
        </div>

        <ul className="filters_menu">
          <li className="active" data-filter="*">Todo</li>
          <li className="active" data-filter="*">pizza</li>
          <li className="active" data-filter="*">Mouse</li>
          <li data-filter="active">Teclado</li>
          <li data-filter="active">Computadores</li>
        </ul>

        <div className="filters-content">
          <div className="row grid">
            <div className="col-sm-6 col-lg-4 all pizza">
              <div className="box">
                <div>
                  <div className="img-box">
                    <img src="https://i.bolder.run/r/czozMjIxLGc6NjkweA/477efa0d/711248-Mouse_B1.png" alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>Mouse Gamer</h5>
                    <p>
                      Mouse Gamer Monster<br />
                      DPI:800/1600/2400/3200/4000/8000<br />
                      RGB<br />
                      Cable trenzado<br />
                      Largo del cable 1.5m<br />
                      6 Botones<br />
                      Botón para modificar luces
                    </p>
                    <div className="options">
                      <h6>$7.590</h6>
                      <Link to="mousegamerMonster.html">Ver producto</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-4 all burger">
              <div className="box">
                <div>
                  <div className="img-box">
                    <img src="https://i.bolder.run/r/czozMjIxLGc6NjkweA/424c2d92/710300-1_%283%29.png" alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>Audifonos Gamer</h5>
                    <p>
                      Características generales:<br /><br />
                      Marca: Monster<br />
                      Línea: Loud<br />
                      Modelo: 550BK<br />
                      Modelo alfanumérico: 29MTG550BK<br />
                      Micrófono: Con micrófono / Sí<br /><br />

                      Especificaciones<br /><br />

                      Formato del audífono: Headset<br />
                      Es monoaural: No<br />
                      Es gamer: Sí<br />
                      Con luz LED: No<br />
                      Conectividad: Es inalámbrico / No<br />
                      Con Bluetooth: No<br />
                      Ps4 / Nswitch / X-one 550bk
                    </p>
                    <div className="options">
                      <h6>$5.990</h6>
                      <Link to="audifonosgamerMonster.html">Ver producto</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-4 all pizza">
              <div className="box">
                <div>
                  <div className="img-box">
                    <img src="https://www.winpy.cl/files/w38389_razer_cobra_pro_hyperspeed_00.jpg" alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>Mouse Razer Cobra Pro HyperSpeed</h5>
                    <p>
                      Hasta 100 horas con Razer HyperSpeed Wireless (movimiento constante a 1000 Hz)<br /><br />
                      Hasta 22 horas con el Razer HyperPolling Wireless Dongle y la Mouse Dock Pro* (movimiento constante a 8000 Hz).<br />
                      *Se venden por separado.<br /><br />
                      Hasta 170 horas en modo Bluetooth
                    </p>
                    <div className="options">
                      <h6>$124.640</h6>
                      <Link to="mousegamerRazer.html">Ver producto</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-4 all pasta">
              <div className="box">
                <div>
                  <div className="img-box">
                    <img src="https://i.bolder.run/r/czozMjIxLGc6NjkweA/2d37a7fc/736207-Kumara1.png" alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>Teclado Gamer Redragon Kumara</h5>
                    <p>
                      La iluminación del Kumara K-552 RGB consta de teclas retroiluminadas configurables mediante software
                      independiente para el gusto y comodidad del usuario, con posibilidades de guardar perfiles dentro de la memoria interna del teclado, logrando un resultado óptimo basado en sus necesidades.
                    </p>
                    <div className="options">
                      <h6>$49.990</h6>
                      <Link to="tecladogamerReddragon.html">Ver producto</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-4 all fries">
              <div className="box">
                <div>
                  <div className="img-box">
                    <img src="https://www.acerstore.cl/cdn/shop/files/1_ANV15-51-53W1-1.png?v=1753392522&width=533" alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>Gamer Nitro V15 RTX 2050</h5>
                    <p>
                      Windows 11 <br />
                      512GB<br />
                      16GB<br />
                      Intel Core i5 Octa Core<br />
                      15,6 Pulgadas FHD 1920 x 1080<br />
                      NVIDIA RTX 2050
                    </p>
                    <div className="options">
                      <h6>$699.990</h6>
                      <Link to="notebookgamernitro.html">Ver producto</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-4 all pizza">
              <div className="box">
                <div>
                  <div className="img-box">
                    <img src="https://p4-ofp.static.pub//fes/cms/2025/05/22/bbh4okj51q0s8dnrsp89vypi3l1nmz317151.png" alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>Mouse Gamer inalámbrico Lenovo Legion M600</h5>
                    <p>
                      Conexión inalámbrica inferior a 1 ms mediante 2,4 GHz, o conexión mediante BT de baja latencia o USB-C con cable<br /><br />
                      Hasta 200 horas de duración de la batería (luces apagadas) con 2,5 horas de carga única
                    </p>
                    <div className="options">
                      <h6>$59.990</h6>
                      <Link to="mousegamerLenovoLegion.html">Ver producto</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-4 all burger">
              <div className="box">
                <div>
                  <div className="img-box">
                    <img src="https://www.hites.com/dw/image/v2/BDPN_PRD/on/demandware.static/-/Sites-mastercatalog_HITES/default/dw64a8ce06/images/original/mkp/1017300180100/10173001801001_1.jpg?sw=1000&sh=1000" alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>Audífonos Gamer Rgb Altec Lansing Gh9602 - Ps</h5>
                    <p>
                      Audífonos Gamer Rgb Altec Lansing Gh9602 - PS Los audífonos Gamers de Altec Lansing ALGH9602 con USB 7.1 son flexibles y está diseñado para durar, capaz de resistir el uso diario y sin preocupaciones Los materiales de alta calidad y el rendimiento en un diseño ultra cómodo son las características clave de los auriculares Altec Lansing Evolution.
                    </p>
                    <div className="options">
                      <h6>$30.990</h6>
                      <Link to="audifonosgamerAltecLansing.html">Ver producto</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-4 all burger">
              <div className="box">
                <div>
                  <div className="img-box">
                    <img src="https://http2.mlstatic.com/D_NQ_NP_658376-MLA82145082160_022025-O.webp" alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>Audifonos Gamer Kraken V4 X negro</h5>
                    <p>
                      Frecuencia de respuesta de 20 Hz a 20 kHz para un audio claro y detallado.<br />
                      Audio envolvente 7.1 para inmersión total en juegos.<br />
                      Cancelación de ruido para experiencias de juego más nítidas.<br />
                      Longitud de cable de 2 m para mayor movilidad.<br />
                      Almohadillas ovaladas de piel sintética para comodidad y aislamiento.<br />
                      Micrófono con patrón de captación mejorado para voz clara.
                    </p>
                    <div className="options">
                      <h6>$89.990</h6>
                      <Link to="audifonosRazerKracken.html">Ver producto</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-4 all pasta">
              <div className="box">
                <div>
                  <div className="img-box">
                    <img src="https://www.chilegatillos.cl/cdn/shop/files/TecladoRKRoyalKludgeR65chilegatillos.cl.jpg?v=1717042966&width=2048" alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>Teclado Mecanico Gamer RK Royal Kludge R65</h5>
                    <p>
                      Diseñado para gamers y creadores que buscan control total y rendimiento insuperable.<br />
                      Ideal para aficionados, semiprofesionales y profesionales.
                    </p>
                    <div className="options">
                      <h6>$69.990</h6>
                      <Link to="tacladoRoyalKludge.html">Ver producto</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}