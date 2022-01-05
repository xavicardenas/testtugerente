import React,{useState,useEffect, useRef} from 'react';
import test from '../test.json';
import "./buscador.css";
export default function Buscador({
    filtro,
    cantidad
}){
    const [objects,setObjects]=useState({...test});
    const [limiteTop,setTop]=useState(134);
    const [pagina,setPagina]=useState(0);
    const [value,setValue]=useState("Elegir un valor");
    const [open,setOpen]=useState(false);
    const [busca,setBusca]=useState("");
    const ref=useRef(null);
    useEffect(()=>{
        const consultaAPI=async(pagina,cantidad)=>{
            const APIKEY=process.env.REACT_APP_API_KEY;
            const url="https://back.implementaconbubo.com/v1/sales/customer/?simple=true";
            // var myHeaders = new Headers();
            //     myHeaders.append("APIKEY", APIKEY);
            //     myHeaders.append("Data-Operations", "{\"filter\":{\"filters\":[{\"field\":\"reference_name\",\"operator\":\"contains\",\"ignoreCase\":true,\"value\":\"\"},{\"field\":\"nit\",\"operator\":\"contains\",\"ignoreCase\":true,\"value\":\"\"},{\"field\":\"name\",\"operator\":\"contains\",\"ignoreCase\":true,\"value\":\"\"},{\"field\":\"reference_name\",\"operator\":\"contains\",\"ignoreCase\":true,\"value\":\"\"}],\"logic\":\"or\"},\"skip\":0,\"take\":5}");
            const myHeaders=new Headers({
                "apikey": APIKEY,
                "Data-Operations": {"filter":{"filters":{"field":filtro,"operator":"contains","ignoreCase":true,"value":busca},"logic":"or"},"skip":pagina*cantidad,"take":cantidad}
            });
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
              };
            await fetch(url,requestOptions).then(response=>console.log(response)).catch(error=>console.log(error));
            objects={... await (await fetch(url,requestOptions)).json()};
        }
        consultaAPI(pagina,cantidad);
    },[busca]);
    useEffect(()=>{
        const consultaAPI=async(pagina,cantidad)=>{
            console.log(pagina+" "+cantidad)
            if(objects.next && pagina>0){
                const APIKEY=process.env.REACT_APP_API_KEY;
                const url="https://back.implementaconbubo.com/v1/sales/customer/?simple=true";
                // var myHeaders = new Headers();
                //     myHeaders.append("APIKEY", APIKEY);
                //     myHeaders.append("Data-Operations", "{\"filter\":{\"filters\":[{\"field\":\"reference_name\",\"operator\":\"contains\",\"ignoreCase\":true,\"value\":\"\"},{\"field\":\"nit\",\"operator\":\"contains\",\"ignoreCase\":true,\"value\":\"\"},{\"field\":\"name\",\"operator\":\"contains\",\"ignoreCase\":true,\"value\":\"\"},{\"field\":\"reference_name\",\"operator\":\"contains\",\"ignoreCase\":true,\"value\":\"\"}],\"logic\":\"or\"},\"skip\":0,\"take\":5}");
                const myHeaders=new Headers({
                    "apikey": APIKEY,
                    "Data-Operations": {"filter":{"filters":{"field":filtro,"operator":"contains","ignoreCase":true,"value":busca},"logic":"or"},"skip":pagina*cantidad,"take":cantidad}
                });
                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                  };
                await fetch(url,requestOptions).then(response=>console.log(response)).catch(error=>console.log(error));
                const aux=await (await fetch(url,requestOptions)).json();
                objects.next=aux.next;
                objects.results=[...objects.results,aux.results];
            }
        }
        consultaAPI(pagina,cantidad);
    },[pagina]);
    return (
        <div className='dropdown'>
            <div className='control' onClick={()=>setOpen(prev=>!prev)}>
                <div className='selected-value'>
                    <input type="text" ref={ref} value={busca || value} onChange={e=>{
                        setBusca(e.target.value);
                        setPagina(0);
                        // onChange(null);
                    }}/>
                </div>
                <div className={`arrow ${open ? "open" : null}`} />
            </div>
            <div className={`options ${open ? "open" : null}`} onScroll={(e)=>{
                if(e.target.scrollTop>limiteTop){
                    setPagina(pagina+1);
                    setTop(limiteTop+134);
                }
            }} >
                {
                objects.results.map((object)=>
                    <div className={`option ${value ===object.contact_name ? "selected" : null}`}
                    onClick={()=>{
                        setValue(object.contact_name);
                        // onChange(value=>setValue());
                        setOpen(false);
                    }}
                    key={object.id}>{object.contact_name}</div>
                )
                }
            </div>
        </div>
    );
}    
