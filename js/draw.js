var sf = 1

function draw(){

c = document.getElementById("myCanvas")
ctx = c.getContext("2d")
	
ctx.canvas.height = $(window).height()-180
ctx.canvas.width = $(window).width()-30

ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
ctx.fillStyle = 'rgba(255,255,255,0)'
ctx.lineWidth = 1

sf=((ctx.canvas.height-5)/(ymax-ymin))

ctx.translate((-xmin*sf)+5,(-ymin*sf)+2)

ctx.strokeStyle="#ccc"
ctx.beginPath()
ctx.rect((xmin*sf)-2,(ymin*sf)-2,((xmax-xmin)*sf)+4,((ymax-ymin)*sf)+4)
ctx.fill()
ctx.stroke()

ctx.fillStyle="#fff000"
ctx.beginPath()
	//ctx.arc(1,ymax*sf-1,3,0,2*Math.PI)
ctx.fill()
ctx.stroke()

ctx.lineWidth = 2.5

   for(i=0;i<saw.length;i++){

		if(saw[i][0].cut=='cut'){
			ctx.strokeStyle = "#aaa"
		}
		else if(saw[i][0].cut=='score'){
			ctx.strokeStyle = "#00ff00"
		}
		else if(saw[i][0].cut=='off'){
			ctx.strokeStyle = "#ccc"
		}

   	ctx.beginPath()
      	for(j=0;j<saw[i].length;j++){
              ctx.lineTo(saw[i][j].x*sf,saw[i][j].y*sf)
      	}
   	ctx.stroke()

   }


ctx.strokeStyle = "#333"

   for(i=0;i<saw.length;i++){

		if(saw[i][0].cut=='cut'){
			ctx.strokeStyle = "#0000aa"
		}
		else if(saw[i][0].cut=='score'){
			ctx.strokeStyle = "#00aa00"
		}
		else if(saw[i][0].cut=='off'){
			ctx.strokeStyle = "#aaa"
		}


   
      for(j=0;j<saw[i].length;j++){

						/*
						if(saw[i][j].r==true){
							ctx.strokeStyle = "#fff"
						}
						else if(j==0){
							ctx.strokeStyle = "#000"
						}
						else if(j==(saw[i].length-1)){
							ctx.strokeStyle = "#ff0000"
						}
						else{
							ctx.strokeStyle = "#333"
						}
						*/

					ctx.beginPath()

				   	ctx.moveTo(saw[i][j].x*sf,saw[i][j].y*sf)

							if(j==0){
								ctx.arc(saw[i][j].x*sf,saw[i][j].y*sf,(2),0,2*Math.PI)
							}
							else{
								ctx.arc(saw[i][j].x*sf,saw[i][j].y*sf,(0.7),0,2*Math.PI)
							}
		    			
   				ctx.stroke()
					
      }

	}

	ctx.beginPath()
	ctx.fillStyle = "#000"
	ctx.font = "14px Arial"
	if(document.getElementById("units").value=="mm"){
		ctx.fillText( ((((xmax-xmin)/sf2)/96)*25.4).toFixed(2) + " x " + ((((ymax-ymin)/sf2)/96)*25.4).toFixed(2) + " mm",(xmax*sf)+5,ymax*sf)
	}
	else{
		ctx.fillText( (((xmax-xmin)/sf2)/96).toFixed(2) + " x " + (((ymax-ymin)/sf2)/96).toFixed(2) + "\"",(xmax*sf)+5,ymax*sf)
	}

}


function info(){

message = (image.name + "\noriginal size = \nwidth: " + ((xmax-xmin)).toFixed(2) + " px" + "\nheight: " + ((ymax-ymin)).toFixed(2)+ " px") 

fabmo.notify('info',message)

}


