var g = ""
var SVG = []
var SVG2 = []
var SVG3 = ""
var dots = []
var image = ({name:"hex.svg"})
var xmin
var xmax
var ymin
var ymax
var sf2 = 1
var target_width = 101.6
var tool_diameter
var retract_angle = 20
var message
var SVG_saw = []
var saw = []
var svg_units
var job_info 

function sawtooth(){

var a 
var ia
var b
var ib 
var d  

for(i=0;i<dots.length;i++){

	a = (parseFloat((Math.atan2(dots[i][1].x-dots[i][0].x,dots[i][1].y-dots[i][0].y)*(180/Math.PI))))
	dots[i][0].a = a
   dots[i][0].r = true
	dots[i][dots[i].length-1].r = true

   for(j=1;j<dots[i].length-1;j++){
			b = a
			a = (parseFloat((Math.atan2(dots[i][j+1].x-dots[i][j].x,dots[i][j+1].y-dots[i][j].y)*(180/Math.PI))))
			

			if(a<=0){
				ia = (a + 360)
			}
			else{
				ia = (a - 360)
			}
			
			if( Math.abs(ia-b)<=(Math.abs(a-b)) ){
				a = ia
				
			}
			
			if (Math.abs(360-b)+a<Math.abs(b-a)){
				d = Math.abs(360-b)+a
			}			
			else{
				d = Math.abs(b - a)
			}

			if(d>(retract_angle) ){

				dots[i][j].r = true				
			
			}
			else{
				dots[i][j].r = false
				}

        		 dots[i][j].a = a

   	}

}

SVG_saw = []


var paths = []
var index = 0
var start = 0

for(i=0;i<dots.length;i++){

start = index

	for(j=0;j<dots[i].length-1;j++){
	
	if((dots[i][j].r==true)&&(j==0)){
	
		SVG_saw.push("M"+(dots[i][j].x).toFixed(3)+" "+(dots[i][j].y).toFixed(3))
		index++
		SVG_saw[SVG_saw.length-1]+=(" L "+(dots[i][j+1].x).toFixed(3)+" "+(dots[i][j+1].y).toFixed(3))
	}
	
	else if((dots[i][j].r==true)&&(j!=0)){
	
		SVG_saw[SVG_saw.length-1]+=(" L "+(dots[i][j].x).toFixed(3)+" "+(dots[i][j].y).toFixed(3))
		SVG_saw.push("M"+(dots[i][j].x).toFixed(3)+" "+(dots[i][j].y).toFixed(3))
		index++	
		SVG_saw[SVG_saw.length-1]+=(" L "+(dots[i][j+1].x).toFixed(3)+" "+(dots[i][j+1].y).toFixed(3))
	}
	
	else{
		SVG_saw[SVG_saw.length-1]+=(" L "+(dots[i][j].x).toFixed(3)+" "+(dots[i][j].y).toFixed(3))
	}	
	
	}

	SVG_saw[SVG_saw.length-1]+=(" L "+(dots[i][dots[i].length-1].x).toFixed(3)+" "+(dots[i][dots[i].length-1].y).toFixed(3))
	
	//console.log(start + " " + index)
	paths.push([])
	for(start=start;start<index;start++)
	{
	paths[paths.length-1].push(SVG_saw[start])	
	}

}	


saw = []

var cutlength=96*document.getElementById("cutlength").value

for(i=0;i<paths.length;i++){

saw.push([])

saw[i].push(dots[i][0])	

	for(j=0;j<paths[i].length;j++){

	l=parseFloat(((Raphael.getTotalLength(paths[i][j]))/(Math.ceil(Raphael.getTotalLength(paths[i][j])/cutlength))).toFixed(3))

		for(j2=l;j2<(Raphael.getTotalLength(paths[i][j]));j2=j2+l){

			saw[i].push({x:parseFloat((Raphael.getPointAtLength(paths[i][j], j2).x).toFixed(6)),y:parseFloat((Raphael.getPointAtLength(paths[i][j], j2).y).toFixed(6))})

		}

	saw[i].push({x:parseFloat((Raphael.getPointAtLength(paths[i][j], (Raphael.getTotalLength(paths[i][j]))).x).toFixed(6)),y:parseFloat((Raphael.getPointAtLength(paths[i][j], (Raphael.getTotalLength(paths[i][j]))).y).toFixed(6))})
		
	}

}

//rm short segments

for(i=0;i<saw.length;i++){

	for(j=0;j<=saw[i].length-2;j++){

		var d = (Math.sqrt (Math.pow((saw[i][j+1].x) - (saw[i][j].x),2) + Math.pow((saw[i][j+1].y) - (saw[i][j].y),2) ))
		if(d<1){
		//saw[i].splice(j+1,1)
		//j--
		
		}

	}
}

//join lines

for(i=0;i<saw.length;i++){

}

//order lines with click
//

var c = 0

var angle_offset = 0

for(i=0;i<saw.length;i++){

	angle_offset = 0
	a = 0-(parseFloat((Math.atan2((saw[i][0].x-saw[i][1].x),(saw[i][0].y-saw[i][1].y))*(180/Math.PI))))
	//console.log(a)

   for(j=0;j<saw[i].length-1;j++){
		b = a
		c = a+angle_offset
		a = 0-(parseFloat((Math.atan2((saw[i][j].x-saw[i][j+1].x),(saw[i][j].y-saw[i][j+1].y))*(180/Math.PI))))

		if(Math.abs(b-a)>retract_angle){
			
			var near = (Math.min(Math.abs(b-a),Math.abs(b-(a+360)),Math.abs(b-(a-360))))
			
			//console.log(near)

			if(near==(Math.abs(b-(a-360)))){

				angle_offset+=-360
			
			}
			if(near==(Math.abs(b-(a+360)))){

				angle_offset+=360
			
			}
			
		}	

		saw[i][j].a = ((a+angle_offset).toFixed(2))

		if( (Math.abs(a-b) )>retract_angle){			
				if( Math.abs((Math.abs(c)) - (Math.abs(a+angle_offset)))>retract_angle){		
					saw[i][j].r=true
				}	
		}

		else{
			saw[i][j].r=false
		}
	}

	saw[i][saw[i].length-1].a = ((a+angle_offset).toFixed(2))
	saw[i][saw[i].length-1].r=false

}

//console.log(saw)

var z=0  

for(i=0;i<saw.length;i++){
	
	z=0

   for(j=0;j<saw[i].length;j++){
		if(z!=0){
			z=0
		}
		else{
			z=1
		}

		saw[i][j].z = z

   	}
	}


if(document.getElementById("offset").checked==true){
	offset()
}

for(i=0;i<saw.length;i++){
	saw[i][0].cut='cut'
}

draw()

}


function offset(){

	var exacto = []

	var o

	//console.log(o)

for(i=0;i<saw.length;i++){

	exacto.push([])

	for(j=0;j<saw[i].length-1;j++){

		o = 3

		if(saw[i].length<4){

			o=0
			exacto[i].push({x:(o*saw[i][j+1].x+(1-o)*saw[i][j].x),y:(o*saw[i][j+1].y+(1-o)*saw[i][j].y),a:parseFloat(saw[i][j].a),r:false})

			o=1
			exacto[i].push({x:(o*saw[i][j+1].x+(1-o)*saw[i][j].x),y:(o*saw[i][j+1].y+(1-o)*saw[i][j].y),a:parseFloat(saw[i][j].a),r:false})

			o=2
exacto[i].push({x:(o*saw[i][j+1].x+(1-o)*saw[i][j].x),y:(o*saw[i][j+1].y+(1-o)*saw[i][j].y),a:parseFloat(saw[i][j].a),r:false})
			o=3

			exacto[i].push({x:(o*saw[i][j+1].x+(1-o)*saw[i][j].x),y:(o*saw[i][j+1].y+(1-o)*saw[i][j].y),a:parseFloat(saw[i][j].a),r:false})
			o=4
			exacto[i].push({x:(o*saw[i][j+1].x+(1-o)*saw[i][j].x),y:(o*saw[i][j+1].y+(1-o)*saw[i][j].y),a:parseFloat(saw[i][j].a),r:true})


		}		
		else if(saw[i][j+1].r==true){

			exacto[i].push({x:(o*saw[i][j+1].x+(1-o)*saw[i][j].x),y:(o*saw[i][j+1].y+(1-o)*saw[i][j].y),a:parseFloat(saw[i][j].a),r:false})
			o=4
			exacto[i].push({x:(o*saw[i][j+1].x+(1-o)*saw[i][j].x),y:(o*saw[i][j+1].y+(1-o)*saw[i][j].y),a:parseFloat(saw[i][j].a),r:true})
			
			}
		else if((saw[i][j].r==true)||(j==0)){

			//console.log(saw[i][j+2])

			if(j==0){
				o=0
				exacto[i].push({x:(o*saw[i][j+2].x+(1-o)*saw[i][j+1].x),y:(o*saw[i][j+2].y+(1-o)*saw[i][j+1].y),a:parseFloat(saw[i][j].a),r:false})
				o=1
				exacto[i].push({x:(o*saw[i][j+2].x+(1-o)*saw[i][j+1].x),y:(o*saw[i][j+2].y+(1-o)*saw[i][j+1].y),a:parseFloat(saw[i][j].a),r:false})
			}
			else{
				o=1
				exacto[i].push({x:(o*saw[i][j+2].x+(1-o)*saw[i][j+1].x),y:(o*saw[i][j+2].y+(1-o)*saw[i][j+1].y),a:parseFloat(saw[i][j].a),r:true})
			}

			o=2
			exacto[i].push({x:(o*saw[i][j+2].x+(1-o)*saw[i][j+1].x),y:(o*saw[i][j+2].y+(1-o)*saw[i][j+1].y),a:parseFloat(saw[i][j].a),r:false})	
			}
		

		else if(j==saw[i].length-2){

			exacto[i].push({x:(o*saw[i][j+1].x+(1-o)*saw[i][j].x),y:(o*saw[i][j+1].y+(1-o)*saw[i][j].y),a:parseFloat(saw[i][j].a),r:false})

			o=4

			exacto[i].push({x:(o*saw[i][j+1].x+(1-o)*saw[i][j].x),y:(o*saw[i][j+1].y+(1-o)*saw[i][j].y),a:parseFloat(saw[i][j].a),r:true})

		}

		else{
			
			exacto[i].push({x:(o*saw[i][j+1].x+(1-o)*saw[i][j].x),y:(o*saw[i][j+1].y+(1-o)*saw[i][j].y),a:parseFloat(saw[i][j].a),r:(saw[i][j].r)})
		}

	}

}

//console.log(exacto)

saw = exacto

}

