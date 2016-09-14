


function load(){
   svg2pg()
}


function startRead() {
    image = document.getElementById("file").files[0];
    if (image) {
        if (image.type.match("/svg/*")) {
            getAsImage(image);
        }
        else {
//              alert(image.name + " IS NOT A SVG FILE");
        }
    }
}

function getAsImage(readFile) {
    var reader = new FileReader();
    reader.readAsDataURL(readFile);
    reader.onload = addImg;
}

function addImg(imgsrc) {

   SVG2 = imgsrc.target.result
   SVG2 = SVG2.slice(SVG2.indexOf(",")+1)
   SVG2 = window.atob(SVG2)

   SVG2 = SVG2.slice((SVG2.indexOf('<svg')),(SVG2.indexOf('</svg'))+6)

   SVG2 = SVG2.replace('<svg','<svg id="svg"')

	var defs = new RegExp("<defs[\\d\\D]*?\/defs>", "g")

	SVG2 = SVG2.replace(defs, "")

	//console.log(SVG2)

	svg_units = SVG2.match(/width=\"(.*?)\"/);

if(svg_units==null){
	svg_units = ".px"

}
else{
	svg_units = svg_units[1]
	svg_units = svg_units.replace(/[0-9]/g, '')
}

   $( "#svg" ).replaceWith(SVG2);
   svg2pg()
}


function svg2pg(){

   svg_paths=[]
   SVG = []
   SVG2 = []
   dots = []
   SVG3 = ''
   flatten(document.getElementById('svg'));

   for(i=0;i<svg_paths.length;i++){
   SVG.push([])
      for(j=0;j<svg_paths[i].length;j++){

      SVG[i]+=(svg_paths[i][j])

      }
   }

   svg_paths=[]
   for(i=0;i<SVG.length;i++){
      svg_paths[i]=Raphael._pathToAbsolute(SVG[i]);    
   }

   SVG=[]

   var curve
   var shape_no = 0

   for(i=0;i<svg_paths.length;i++){
   	for(j=0;j<svg_paths[i].length;j++){
            if((svg_paths[i][j][0].startsWith('M')==true) || (svg_paths[i][j][0].startsWith('m')==true)){
               dots.push([])
               shape_no=dots.length-1
               dots[shape_no].push({x:svg_paths[i][j][1],y:svg_paths[i][j][2]})
            }

            else if((svg_paths[i][j][0].startsWith('L')==true) || (svg_paths[i][j][0].startsWith('l')==true)){
               dots[shape_no].push({x:svg_paths[i][j][1],y:svg_paths[i][j][2]})
            }
            else if((svg_paths[i][j][0].startsWith('Z')==false) && (svg_paths[i][j][0].startsWith('z')==false)){
               curve = ""
               for(j2=0;j2<svg_paths[i][j].length;j2++){
                  curve +=(svg_paths[i][j][j2]+',')
               }
                  curve = "M," + (svg_paths[i][j-1][(svg_paths[i][j-1].length)-2]) + ',' + (svg_paths[i][j-1][(svg_paths[i][j-1].length)-1]) + ',' + curve
        			//if units !=in          
					if((svg_units==".in")){
						l=0
						var length = Raphael.getTotalLength(curve)
						while(l<Raphael.getTotalLength(curve)){
							l=l+0.01									
							dots[shape_no].push({x:Raphael.getPointAtLength(curve, l).x,y:Raphael.getPointAtLength(curve, l).y})
						}
					}
					else{
               	for(l=1;l<(parseInt(Raphael.getTotalLength(curve)));l++){
                  	dots[shape_no].push({x:Raphael.getPointAtLength(curve, l).x,y:Raphael.getPointAtLength(curve, l).y})   
               	}
					}
           
            }
   		}

   }

	

   xmin = []
   xmax = []
   ymin = []
   ymax = []

   for(i=0;i<dots.length;i++){
      for(j=0;j<dots[i].length;j++){
      xmax.push(dots[i][j].x)
      xmin.push(dots[i][j].x)
      ymax.push(dots[i][j].y)
      ymin.push(dots[i][j].y)
      }
		
   }
   xmax = Math.max.apply(Math, xmax)
   xmin = Math.min.apply(Math, xmin)
   ymax = Math.max.apply(Math, ymax)
   ymin = Math.min.apply(Math, ymin)


	scale()

	sf2 = 1

	//draw()

}

function scale(){

//close

for(i=0;i<dots.length;i++){

	var d = (Math.sqrt((Math.pow((dots[i][0].x-dots[i][dots[i].length-1].x),2))+(Math.pow((dots[i][0].y-dots[i][dots[i].length-1].y),2))))

	if((Math.abs(d))<6){
   	dots[i].push(dots[i][0])
	}

}


//
	if((svg_units==".in") && (svg_units!=undefined)){

	for(i=0;i<dots.length;i++){
		for(j=0;j<dots[i].length;j++){

			dots[i][j] = ({x:dots[i][j].x*96,y:dots[i][j].y*96})
	
		}
	
	}
	
	xmin *= 96
	xmax *= 96
	ymin *= 96
	ymax *= 96

}


for(i=0;i<dots.length;i++){
	  dots[i]=simplify(dots[i], 0.1, true)
}



sawtooth()

}




