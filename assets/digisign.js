var unixTimestamp;

window.onload = function() {

    stepForward(1)
    var dropzone = document.getElementById("img-upload")
    dropzone.addEventListener('change',function(){
        readFile(this)
    })

};

function readFile(input){

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    if(input.files && input.files[0]){

        var reader = new FileReader()
        reader.onload = function (e){
            var img = new Image()
            img.onload = function (){
                if(img.width){
                    canvas.height = canvas.width * (img.height/img.width)
                    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)
                    stepForward(2)
                }
            }
            img.onerror = function(){
                alert('invalid image')
                stepForward(1)
            }
            img.src = e.target.result
        }
        reader.readAsDataURL(input.files[0])
    }

}

function hashKeywords(){
    var input = document.getElementById("keywords")

    if(input.value.trim() == ""){
        alert("please fill keywords")
    }else{

        //hash keywords
        unixTimestamp = Math.round(new Date().getTime() / 1000).toString()
        var salt = input.value.trim()
        var hashids = new Hashids(salt);
        var hashed = hashids.encode(unixTimestamp)
        console.log(unixTimestamp)

        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        ctx.font = "30px Arial"
        var yaxis = 80

        //write hashed to image
        ctx.fillText(hashed, 10, yaxis)

        //write unix to image
        ctx.fillText(unixTimestamp, 10, yaxis-30)

        stepForward(3)
    }

}

function stepForward(step){
    var divUpload = document.getElementById("row-upload")
    var divKeywords = document.getElementById("row-keywords")
    var divPreview = document.getElementById("row-preview")

    if(step == 2){ //#2
        divUpload.style.display = "none"
        divKeywords.style.display = "flex"
        divPreview.style.display = "none"
    }else if (step == 3){ //#3
        divUpload.style.display = "none"
        divKeywords.style.display = "none"
        divPreview.style.display = "flex"
    }else{ //back to #1
        divUpload.style.display = "flex"
        divKeywords.style.display = "none"
        divPreview.style.display = "none"
    }
}

function download(){

    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'digisign-'+unixTimestamp+'.png');
    let canvas = document.getElementById('myCanvas');
    canvas.toBlob(function(blob) {
        let url = URL.createObjectURL(blob);
        downloadLink.setAttribute('href', url);
        downloadLink.click();
    });

}

function reset(){
    if ( confirm("Are you sure you want to reset?") ){
        document.getElementById("keywords").value = ""
        document.getElementById("img-upload").value = ""
        stepForward(1)    
    }
}