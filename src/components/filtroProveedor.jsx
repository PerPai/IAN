import { red } from '@mui/material/colors';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const baseURL = "http://localhost:3000/api";
export let resultadoFiltro = null;


const buscar = () => {
  axios.get(`${baseURL}/facturas/4`)
    .then((response) => {
      resultadoFiltro=response.data
    })
    .catch((error) => {
      console.error("Error al buscar:", error);

    });
};



const filtrar = (pago=1, idProveedor=1) => {
  axios.get(`${baseURL}/facturas/3?pago=${pago}&idProveedor=${idProveedor}`)
  
    .then((response) => {
      resultadoFiltro = response.data;
     console.log("SOOOOOOOOOOY EL FILTRO",resultadoFiltro);

    })
    .catch((error) => {
      console.error("Error al buscar:", error);
    });
};


export const Suppliers = () => {
  const [buscarResultados, setbuscarResultados] = useState([]);
  
    useEffect(() => {
        
    }, [buscarResultados]);
  
    const [proveedor, setProveedor] = useState([]);
  
    const buscar = () => {
      axios.get(`${baseURL}/proveedores/1`)
        .then((response) => {
          setProveedor(response.data);
          console.log(response.data);
        })
        .catch((error) => {
         console.error("Error al buscar:", error);
  
        });
    };
    
    useEffect(() => {
      buscar();
    },[proveedor]);

  
    return( 
    <>
        <select className="p-1 text-sm  relative right-3 ml-3"  style={{color:"black"}} name="" id="proveedor" onChange={(e) => {
            const proveedor =  e.target.value;
           filtrar(document.getElementById("pago"), proveedor);
        }}>
        {proveedor.map((resultado) => (
        <option id="valor" value={resultado.idProveedor}>{resultado.nombre}</option>
    ))}
    </select>
    </>
  
  )};
  

export function FiltrarProveedor() {
  return (
    <>  
    
        <div className="flex justify-start text-start">
          <div className="mr-5">

            <h5>Estado de factura</h5>
            <select className="block w-full p-1 mb-6 text-sm mr-4 right-3" style={{color:"black"}} name="" id="pago" onChange={(e) => {
                const pago = e.target.value;
                alert(pago)
                //setbuscarResultados()
                filtrar(pago, document.getElementById('proveedor').value);
            }}>
              <option value="1">Pagado</option>
              <option value="0">Pendiente</option>
            </select>
          </div>
          <div className="text-start">
            <h5>Proveedor</h5>
            <Suppliers></Suppliers>
          </div>
<button onClick={buscar} style={{backgroundColor:"green",width:50,height:30,position:'relative'}}>Todos</button>
        </div>
    </>
  );
}