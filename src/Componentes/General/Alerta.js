import React from 'react';
//jQuery
import $ from 'jquery';
//Redux
import { useSelector } from 'react-redux';

const Alerta = () => {
    //---------------Atributos---------------
    const alerta = useSelector((state)=>state.generalStore.alerta);

    //---------------Funciones---------------
    
    $(document).ready(function(){
        if(alerta.length !== 0){
            switch (alerta.color) {
                case 'rojo':
                    $("#Alerta").removeClass("borde3A borde3V")
                    $("#Alerta").addClass("borde3R")
                    $("#iconoAlerta").removeClass("fas fa-exclamation fas fa-check colorA colorV")
                    $("#iconoAlerta").addClass("fas fa-exclamation-circle colorR")
                    break;
                case 'verde':
                    $("#Alerta").removeClass("borde3R borde3A")
                    $("#Alerta").addClass("borde3V")
                    $("#iconoAlerta").removeClass("fas fa-exclamation fas fa-exclamation-circle colorR colorA")
                    $("#iconoAlerta").addClass("fas fa-check colorV")
                    break;
                default:
                    $("#Alerta").removeClass("borde3R borde3V")
                    $("#Alerta").addClass("borde3A")
                    $("#iconoAlerta").removeClass("fas fa-check fas fa-exclamation-circle colorR colorV")
                    $("#iconoAlerta").addClass("fas fa-exclamation colorA")
                    break;
            }
        }
    });

    // $('#Alerta').finish.fadeOut();

    $('#Alerta').show();

    setTimeout(function(){
        $('#Alerta').fadeOut("slow");
    }, 2000);

    //---------------Retorno---------------
    return (
        <div>
            {alerta.length !== 0 &&
                <div id = "Alerta" className = "Alerta w3-margin w3-padding-16 w3-center w3-animate-bottom w3-round Arial colorA w3-row">
                    <div className = "w3-col s2 m2 l2">
                        <i id = "iconoAlerta" className="fa-lg"></i>
                    </div>
                    <div className = "w3-col s10 m10 l10">
                        <div>{" "+alerta.mensaje}</div>
                    </div>
                </div>
            }  
        </div>
    );
}
 
export default Alerta;