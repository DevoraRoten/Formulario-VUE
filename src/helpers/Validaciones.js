export const validarRut = (rut)=>{
    if(rut.length>1){
        let verificador2=0
        let numRut;
        if(rut.substring(rut.length-2,rut.length-1)==='-'){
            //console.log('viene con guion')
              numRut=rut.substring(0,rut.length-2)
        }else{
            rut=rut.substring(0,rut.length-1)+'-'+rut.substring(rut.length-1, rut.length)
             //numRut=rut.substring(0,rut.length-1)
             numRut=rut.substring(0,rut.length-2)
        }

        const verificador= rut.substring(rut.length-1,rut.length)
        let multiplo=2
        let sumatoria=0
        for(let i=numRut.length;i>0;i--){
            sumatoria += numRut.substring(i-1,i)*multiplo
            multiplo++
            if(multiplo===8){
                multiplo=2
            }
        }
        verificador2 = 11-(sumatoria%11)
        if(verificador2===11){
            verificador2=0
        }else if(verificador2===10){
            verificador2='k'
        }

        if(verificador.toLowerCase()===verificador2.toString().toLowerCase()){
         //   console.log('verdadero')
            return true
        }else{
            return false
        }
    }else {
        return false
    }
}

export const validarGmail = (gmail)=>{
    //console.log(gmail.length)
    if(gmail.length>4){
        
        var patron16 = /^[0-9a-z_\-.,]+@[0-9a-z\-.]+\.[a-z]{2,4}$/i;
    if(gmail.includes('..') || gmail.includes(',,') || gmail.includes('--') || gmail.includes('__')){
        //console.log('tiene 2 caracteres seguidos')
        
        return 'No se admiten 2 caracteres especiales seguidos'
    }else if(parseInt(gmail.search(patron16))===0){
        return true
    }else{

        return 'Gmail inválido'
    } 
    }else if(gmail.length>0){
        
        return 'Gmail inválido'
    }
                
}