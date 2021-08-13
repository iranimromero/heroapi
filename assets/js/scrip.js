$(document).ready(function(){//carga todos los elementos antes de cargar jQuery

    $('#btn').on("click",function(event){   //tomo el evento, al hacer click
        
        event.preventDefault();//evitamos que el FORM nos lleve a la pagina princial o la que se le haya configurado
        let heroeIngresado = $("#heroe").val(); //guardo el valor ingresado por el usuario
    
        $.ajax({
            type:"GET",
            url: "https://www.superheroapi.com/api.php/10158782865674205/" +heroeIngresado,
            dataType:'json', //importante


            /*  var variable = $(data) */
               //FIcha de super heroe 
            success: function(dataApi){
                console.log(dataApi)
                    let imagen=dataApi.image.url;
                    let nombre = dataApi.name;
                    let  conexiones= dataApi.connections['group-affiliation'];
                    let  publicadoPor= dataApi.biography.publisher;
                    let  ocupacion= dataApi.work.occupation;
                    let  pAparicion= dataApi.biography['first-appearance'];
                    let  altura= dataApi.appearance.height;
                    let  peso= dataApi.appearance.weight;
                    let  alianza= dataApi.biography.aliases;
                    

            $("#superInfo").html(`
                <div>
                <h2>Super Hero Encontrado</h2>
                    <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                        <img src="${imagen}"  class="img-fluid rounded-start" alt="Hero">
                        </div>
                        <div class="col-md-8">
                        <div class="card-body">
                            <p class="card-text">Nombre: ${nombre}</p>
                            <p class="card-text">Conexiones: ${conexiones}</p>
                            <p class="card-text">Publicado por: ${publicadoPor}</p>
                            <hr>
                            <p class="card-text">Ocupacion: ${ocupacion}</p>
                            <hr>
                            <p class="card-text">Primera aparicion: ${pAparicion}</p>
                            <hr>
                            <p class="card-text">Altura: ${altura}</p>
                            <hr>
                            <p class="card-text">Peso: ${peso}</p>
                            <hr>
                            <p class="card-text">Alianzas: ${alianza}</p>
                            
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            `); 


            //Grafica
            

            //Inicio Canva
           
                var arregloPws=[];     //recogo la informacion de del PowerStats que corresponde  al dataPoint de Canvas
            for (const key in dataApi.powerstats) {
                arregloPws.push({label:key, y:parseInt(dataApi.powerstats[key])});
             } 
             console.log(arregloPws)
             //comienzo arreglo de canva
                var chart = new CanvasJS.Chart("chartContainer", {
                    theme: "light2",
                    animationEnabled: true,
                    title: {
                        text: `Estadisticas de poder para ${nombre}`
                    },
                    data: [{
                        type: "pie",
                        showInLegend: true,
                        legendText: "{label}",
                        indexLabelFontSize: 18,
                        radius: 80,
                        indexLabel: "{label} ({y})",
                        yValueFormatString: "##0",
                        click: explodePie, 
                        dataPoints: arregloPws
                       
                    }]
                });
                chart.render();
                
               // animacion
               function explodePie(e) {
                for(var i = 0; i < e.dataSeries.dataPoints.length; i++) {
                    if(i !== e.dataPointIndex)
                        e.dataSeries.dataPoints[i].exploded = false;
                }
            }
                  
                
            //Fin Canva
  
            }
        })

    })
  })
  





