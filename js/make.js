

function make(){

var score_depth = parseFloat((document.getElementById("depth").value)/2)
var score_amplitude = parseFloat((document.getElementById("amplitude").value)/2)

for(i=0;i<saw.length;i++){
	
	if(saw[i][0].cut=='score'){
		document.getElementById("depth").value=score_depth
		document.getElementById("amplitude").value=score_amplitude
	}
	else if(saw[i][0].cut=='cut'){
   	document.getElementById("depth").value=(score_depth*2)
		document.getElementById("amplitude").value=(score_amplitude*2)
	}	


	z=(parseFloat(document.getElementById("depth").value))

   for(j=0;j<saw[i].length;j++){
		if(z!=(parseFloat(document.getElementById("depth").value))){
			z=(parseFloat(document.getElementById("depth").value))
		}
		else{
			z=((parseFloat(document.getElementById("depth").value))+(parseFloat(document.getElementById("amplitude").value))).toFixed(3)
		}

		saw[i][j].z = z

   	}
}


var cut_depth = (document.getElementById("depth").value)

if((document.getElementById("code").value)=="gcode"){

	var feed = document.getElementById("feedrate").value*60 //inch/min
	var scale = 1

   g=""

	if(document.getElementById("units").value=="mm"){
   	g+="g21\n"
		scale = 25.4
		g+="g0z" + (0.25*scale).toFixed(3) + "\n"
   	g+="g4p2\n"
   	g+="g1f" + (feed*scale) + "\n"
	}
	else{
   	g+="g20\n"
   	g+="g0z0.25\n"
   	g+="g4p2\n"
   	g+="g1f" + feed + "\n"
	}


for(i=0;i<saw.length;i++){

	g+="g0x"+((((saw[i][0].x-xmin)/sf2)/96)*scale).toFixed(3)+"y"+(((((ymax-ymin)/sf2)+((ymin-(saw[i][0].y))/sf2))/96)*scale).toFixed(3) +  "a" + saw[i][0].a + "\n"
	g+="g0z" + (saw[i][0].z*scale).toFixed(3) + "\n"

   for(j=1;j<saw[i].length-1;j++){

		if(saw[i][j].r==true){
//
			if((document.getElementById("saw").value=="sawtooth") && (saw[i][j].z==(parseFloat(document.getElementById("depth").value)))){

				g+="g1x"+((((saw[i][j].x-xmin)/sf2)/96)*scale).toFixed(3)+"y"+(((((ymax-ymin)/sf2)+((ymin-(saw[i][j].y))/sf2))/96)*scale).toFixed(3) + "z" + (saw[i][j].z*scale).toFixed(3) + "\n"

				g+="g0z" + ((parseFloat(document.getElementById("depth").value)*scale)+(parseFloat(document.getElementById("amplitude").value))*scale).toFixed(3) + "\n"
			}

			else if((document.getElementById("saw").value=="sawtooth") && (saw[i][j].z!=(parseFloat(document.getElementById("depth").value)))){

				g+="g1x"+((((saw[i][j].x-xmin)/sf2)/96)*scale).toFixed(3)+"y"+(((((ymax-ymin)/sf2)+((ymin-(saw[i][j].y))/sf2))/96)*scale).toFixed(3) + "z" + ((document.getElementById("depth").value)*scale).toFixed(3) + "\n"

				g+="g0z" + ((parseFloat(document.getElementById("depth").value)*scale)+(parseFloat(document.getElementById("amplitude").value))*scale).toFixed(3) + "\n"
			}

//			
			g+="g0z" + (0.125*scale).toFixed(3) + "\n"
			g+="g0a" + (saw[i][j].a) + "\n"

			g+="g0z" + ((parseFloat(document.getElementById("depth").value)*scale)+(parseFloat(document.getElementById("amplitude").value))*scale).toFixed(3) + "\n"
	
		}
		else{

			if((document.getElementById("saw").value=="sawtooth") && (saw[i][j].z==(parseFloat(document.getElementById("depth").value)))){

				g+="g1x"+((((saw[i][j].x-xmin)/sf2)/96)*scale).toFixed(3)+"y"+(((((ymax-ymin)/sf2)+((ymin-(saw[i][j].y))/sf2))/96)*scale).toFixed(3) + "z" + (saw[i][j].z*scale).toFixed(3) + "a" + saw[i][j].a +"\n"

				g+="g0z" + ((parseFloat(document.getElementById("depth").value)*scale)+(parseFloat(document.getElementById("amplitude").value))*scale).toFixed(3) + "\n"
			}
			else if((document.getElementById("saw").value=="sawtooth") && (saw[i][j].z!=(parseFloat(document.getElementById("depth").value)))){
				g+="g1x"+((((saw[i][j].x-xmin)/sf2)/96)*scale).toFixed(3)+"y"+(((((ymax-ymin)/sf2)+((ymin-(saw[i][j].y))/sf2))/96)*scale).toFixed(3) + "z" + ((document.getElementById("depth").value)*scale).toFixed(3) + "a" + saw[i][j].a +"\n"

				g+="g0z" + ((parseFloat(document.getElementById("depth").value)*scale)+(parseFloat(document.getElementById("amplitude").value))*scale).toFixed(3) + "\n"
			}

			else if(document.getElementById("saw").value!="sawtooth"){

			g+="g1x"+((((saw[i][j].x-xmin)/sf2)/96)*scale).toFixed(3)+"y"+(((((ymax-ymin)/sf2)+((ymin-(saw[i][j].y))/sf2))/96)*scale).toFixed(3) + "z" + (saw[i][j].z*scale) + "a" + saw[i][j-1].a +"\n"
			}

		}

   	}

			if((document.getElementById("saw").value=="sawtooth") && (saw[i][saw[i].length-1].z==(parseFloat(document.getElementById("depth").value)))){

				g+="g1x"+((((saw[i][saw[i].length-1].x-xmin)/sf2)/96)*scale).toFixed(3)+"y"+(((((ymax-ymin)/sf2)+((ymin-(saw[i][saw[i].length-1].y))/sf2))/96)*scale).toFixed(3) + "z" + (saw[i][saw[i].length-1].z*scale).toFixed(3) + "a" + saw[i][saw[i].length-1].a +"\n"

				g+="g0z" + ((parseFloat(document.getElementById("depth").value)*scale)+(parseFloat(document.getElementById("amplitude").value))*scale).toFixed(3) + "\n"
			}

			else if((document.getElementById("saw").value=="sawtooth") && (saw[i][saw[i].length-1].z!=(parseFloat(document.getElementById("depth").value)))){
				g+="g1x"+((((saw[i][j].x-xmin)/sf2)/96)*scale).toFixed(3)+"y"+(((((ymax-ymin)/sf2)+((ymin-(saw[i][saw[i].length-1].y))/sf2))/96)*scale).toFixed(3) + "z" + ((document.getElementById("depth").value)*scale).toFixed(3) + "a" + saw[i][saw[i].length-1].a +"\n"

				g+="g0z" + ((parseFloat(document.getElementById("depth").value)*scale)+(parseFloat(document.getElementById("amplitude").value))*scale).toFixed(3) + "\n"
			}
			else{
				g+="g1x"+((((saw[i][saw[i].length-1].x-xmin)/sf2)/96)*scale).toFixed(3)+"y"+(((((ymax-ymin)/sf2)+((ymin-(saw[i][saw[i].length-1].y))/sf2))/96)*scale).toFixed(3) + "z" + (saw[i][saw[i].length-2].z*scale).toFixed(3) + "a" + saw[i][saw[i].length-1].a +"\n"
			}

	g+="g0z" + (0.25*scale).toFixed(3) + "\n"

}

	g+="g0z" + (0.25*scale).toFixed(3) + "\n"
	g+="g0x0y0a0\n"
   g+="m30\n"


   fabmo.submitJob({
      file : g,
      filename : image.name + '.g',
      name : image.name,
      description : ((((xmax-xmin)/sf2)/96).toFixed(2))+" x "+((((ymax-ymin)/sf2)/96).toFixed(2))+"\""
   });

}

else if((document.getElementById("code").value)=="sbp"){

	var a = 0 
	var b = 0	 

   g=""

	if(document.getElementById("units").value=="mm"){
		g+="VD,4,1,1\n"
	}

   g+="JZ,0.25\n"
	g+="MB,0\n"
   g+="J2,0,0\n"

   g+="PAUSE 3\n"
   g+="MS," + document.getElementById("feedrate").value + "," + document.getElementById("feedrate").value/2 + "\n"  //set feed,plunge

for(i=0;i<dots.length;i++){

   for(j=0;j<dots[i].length;j++){
           if(j==0){

           g+="J2,"+(((dots[i][j].x-xmin)/sf2)/96).toFixed(3)+","+((((ymax-ymin)/sf2)+((ymin-(dots[i][j].y))/sf2))/96).toFixed(3) + "\n" 

			  g+="MB,"+ (Math.atan2(dots[i][j+1].x-dots[i][j].x,dots[i][j+1].y-dots[i][j].y)*(180/Math.PI)).toFixed(3) +"\n"
           g+="MZ" + (document.getElementById("depth").value)+ "\n"
   		  g+="MI,Z,1,0,5,0.05\n"
			  
			  a = parseFloat((Math.atan2(dots[i][j+1].x-dots[i][j].x,dots[i][j+1].y-dots[i][j].y)*(180/Math.PI)).toFixed(3))

           }
           else{
			  	if(j<dots[i].length-1){

					b = a

					a = parseFloat((Math.atan2(dots[i][j+1].x-dots[i][j].x,dots[i][j+1].y-dots[i][j].y)*(180/Math.PI)).toFixed(3))					

					if((Math.abs(a-b))>(retract_angle)){

						g+="MI,0\n"
						g+="JZ,0.25\n"				
						g+="MB,"+ a +"\n"
           			g+="MZ" + (document.getElementById("depth").value)+ "\n"
   		 			g+="MI,Z,1,0,5,0.05\n"
						g+="M2,"+(((dots[i][j].x-xmin)/sf2)/96).toFixed(3)+","+((((ymax-ymin)/sf2)+((ymin-(dots[i][j].y))/sf2))/96).toFixed(3) + "\n"
					}

					else{
			  			g+="MB,"+ a +"\n"
						g+="M2,"+(((dots[i][j].x-xmin)/sf2)/96).toFixed(3)+","+((((ymax-ymin)/sf2)+((ymin-(dots[i][j].y))/sf2))/96).toFixed(3) + "\n"
					}
					
			  	}
			  	else{
					g+="M2,"+(((dots[i][j].x-xmin)/sf2)/96).toFixed(3)+","+((((ymax-ymin)/sf2)+((ymin-(dots[i][j].y))/sf2))/96).toFixed(3) + "\n"
					           
					}
           }
   }

g+="MI,0\n"
g+="JZ,0.25\n"

}

g+="JB,0\n"
g+="J3,0,0,0.25\n"

   fabmo.submitJob({
      file : g,
      filename : image.name + '.sbp',
      name : image.name,
      description : ((((xmax-xmin)/sf2)/96).toFixed(2))+" x "+((((ymax-ymin)/sf2)/96).toFixed(2))+" \""
   });

	}

else if((document.getElementById("code").value)=="sbp2"){

	var feed = document.getElementById("feedrate").value //inches/sec
	var scale = 1

   g=""

	if(document.getElementById("units").value=="mm"){
		scale = 25.4
		g+="VD,4,1,1,2\n"
	}

   g+="JZ," + (0.25*scale).toFixed(3) + "\n"
   g+="PAUSE 3\n"
   g+="MS," + (document.getElementById("feedrate").value*scale) + "," + ((document.getElementById("feedrate").value)*scale) + "\n"

for(i=0;i<saw.length;i++){

	if(saw[i][0].cut!='off'){

	if(saw[i][0].cut=='score'){
		document.getElementById("depth").value=score_depth
		document.getElementById("amplitude").value=score_amplitude
	}
	else if(saw[i][0].cut=='cut'){
   	document.getElementById("depth").value=(score_depth*2)
		document.getElementById("amplitude").value=(score_amplitude*2)
	}			

	g+="J5,"+((((saw[i][0].x-xmin)/sf2)/96)*scale).toFixed(3)+","+(((((ymax-ymin)/sf2)+((ymin-(saw[i][0].y))/sf2))/96)*scale).toFixed(3) +  ",,," + saw[i][0].a + "\n"

	g+="JZ," + (saw[i][0].z*scale).toFixed(3) + "\n"

   for(j=1;j<saw[i].length-1;j++){

		if(saw[i][j].r==true){
//
			if((document.getElementById("saw").value=="sawtooth") && (saw[i][j].z==(parseFloat(document.getElementById("depth").value)))){

				g+="M3,"+((((saw[i][j].x-xmin)/sf2)/96)*scale).toFixed(3)+","+(((((ymax-ymin)/sf2)+((ymin-(saw[i][j].y))/sf2))/96)*scale).toFixed(3) + "," + (saw[i][j].z*scale).toFixed(3) + "\n"

				g+="JZ," + ((parseFloat(document.getElementById("depth").value)*scale)+(parseFloat(document.getElementById("amplitude").value))*scale).toFixed(3) + "\n"
			}

			else if((document.getElementById("saw").value=="sawtooth") && (saw[i][j].z!=(parseFloat(document.getElementById("depth").value)))){

				g+="M3,"+((((saw[i][j].x-xmin)/sf2)/96)*scale).toFixed(3)+","+(((((ymax-ymin)/sf2)+((ymin-(saw[i][j].y))/sf2))/96)*scale).toFixed(3) + "," + ((document.getElementById("depth").value)*scale).toFixed(3) + "\n"

				g+="JZ," + ((parseFloat(document.getElementById("depth").value)*scale)+(parseFloat(document.getElementById("amplitude").value))*scale).toFixed(3) + "\n"
			}

			if((document.getElementById("offset").checked==true)&&(saw[i][j+1].r==true)){
				g+="JZ," + (0.125*scale).toFixed(3) + "\n"
				g+="JB," + (saw[i][j+1].a) + "\n"	
				g+="J2," + ((((saw[i][j+1].x-xmin)/sf2)/96)*scale).toFixed(3)+","+(((((ymax-ymin)/sf2)+((ymin-(saw[i][j+1].y))/sf2))/96)*scale).toFixed(3) + "\n" 
							
			}
			else if((document.getElementById("offset").checked==true)&&(saw[i][j+1].r==false)){

			}

			else{
				g+="JZ," + (0.125*scale).toFixed(3) + "\n"
				g+="JB," + (saw[i][j].a) + "\n"
			}


			g+="JZ," + ((parseFloat(document.getElementById("depth").value)*scale)+(parseFloat(document.getElementById("amplitude").value))*scale).toFixed(3) + "\n"
	
		}
		else{		

			if((document.getElementById("saw").value=="sawtooth") && (saw[i][j].z==(parseFloat(document.getElementById("depth").value)))){
				//rotate first TH
				g+="M5,,,,," + saw[i][j].a +"\n"
				g+="M5,"+((((saw[i][j].x-xmin)/sf2)/96)*scale).toFixed(3)+","+(((((ymax-ymin)/sf2)+((ymin-(saw[i][j].y))/sf2))/96)*scale).toFixed(3) + "," + (saw[i][j].z*scale).toFixed(3) + ",," + saw[i][j].a +"\n"

				g+="JZ," + ((parseFloat(document.getElementById("depth").value)*scale)+(parseFloat(document.getElementById("amplitude").value))*scale).toFixed(3) + "\n"
			}
			else if((document.getElementById("saw").value=="sawtooth") && (saw[i][j].z!=(parseFloat(document.getElementById("depth").value)))){
				//rotate first TH
				g+="M5,,,,," + saw[i][j].a +"\n"
				g+="M5,"+((((saw[i][j].x-xmin)/sf2)/96)*scale).toFixed(3)+","+(((((ymax-ymin)/sf2)+((ymin-(saw[i][j].y))/sf2))/96)*scale).toFixed(3) + "," + ((document.getElementById("depth").value)*scale).toFixed(3) + ",," + saw[i][j].a +"\n"

				g+="JZ," + ((parseFloat(document.getElementById("depth").value)*scale)+(parseFloat(document.getElementById("amplitude").value))*scale).toFixed(3) + "\n"
			}

			else if(document.getElementById("saw").value!="sawtooth"){

			g+="M5,"+((((saw[i][j].x-xmin)/sf2)/96)*scale).toFixed(3)+","+(((((ymax-ymin)/sf2)+((ymin-(saw[i][j].y))/sf2))/96)*scale).toFixed(3) + "," + (saw[i][j].z*scale) + ",," + saw[i][j-1].a +"\n"
			}

		}

   	}

			if((document.getElementById("saw").value=="sawtooth") && (saw[i][saw[i].length-1].z==(parseFloat(document.getElementById("depth").value)))){
				//rotate first TH
				g+="M5,,,,," + saw[i][saw[i].length-1].a +"\n"
				g+="M5,"+((((saw[i][saw[i].length-1].x-xmin)/sf2)/96)*scale).toFixed(3)+","+(((((ymax-ymin)/sf2)+((ymin-(saw[i][saw[i].length-1].y))/sf2))/96)*scale).toFixed(3) + "," + (saw[i][saw[i].length-1].z*scale).toFixed(3) + ",," + saw[i][saw[i].length-1].a +"\n"

				g+="JZ," + ((parseFloat(document.getElementById("depth").value)*scale)+(parseFloat(document.getElementById("amplitude").value))*scale).toFixed(3) + "\n"
			}

			else if((document.getElementById("saw").value=="sawtooth") && (saw[i][saw[i].length-1].z!=(parseFloat(document.getElementById("depth").value)))){
				//rotate first TH
				g+="M5,,,,," + saw[i][saw[i].length-1].a +"\n"
				g+="M5,"+((((saw[i][j].x-xmin)/sf2)/96)*scale).toFixed(3)+","+(((((ymax-ymin)/sf2)+((ymin-(saw[i][saw[i].length-1].y))/sf2))/96)*scale).toFixed(3) + "," + ((document.getElementById("depth").value)*scale).toFixed(3) + ",," + saw[i][saw[i].length-1].a +"\n"

				g+="JZ," + ((parseFloat(document.getElementById("depth").value)*scale)+(parseFloat(document.getElementById("amplitude").value))*scale).toFixed(3) + "\n"
			}
			else{
				//rotate first TH
				g+="M5,,,,," + saw[i][saw[i].length-1].a +"\n"
				g+="M5,"+((((saw[i][saw[i].length-1].x-xmin)/sf2)/96)*scale).toFixed(3)+","+(((((ymax-ymin)/sf2)+((ymin-(saw[i][saw[i].length-1].y))/sf2))/96)*scale).toFixed(3) + "," + (saw[i][saw[i].length-2].z*scale).toFixed(3) + ",," + saw[i][saw[i].length-1].a +"\n"
			}

   g+="JZ," + (0.25*scale).toFixed(3) + "\n"

	}

}
	
g+="JB,0\n"
g+="J2,0,0\n"	


   fabmo.submitJob({
      file : g,
      filename : image.name + '.sbp',
      name : image.name,
      description : ((((xmax-xmin)/sf2)/96).toFixed(2))+" x "+((((ymax-ymin)/sf2)/96).toFixed(2))+" \""
   });

}

}

