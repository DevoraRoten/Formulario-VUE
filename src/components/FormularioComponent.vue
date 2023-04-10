<template>
  <h2>Ingrese sus datos</h2>
  <label for=""><b>Ingrese su Nombre</b></label>
  <div><input type="text" v-model="nombre"></div>
  <div>
    <h5 v-if="errormsj">{{ errormsj }}</h5>
  </div>
  
  <label for=""><b> Ingrese su Rut</b></label>
  <div><input type="text" v-model="rut"></div>
  <div>
    <h5 v-if="!rutValid && rut">{{errorRutMsj}}</h5>
  </div>
  <label for=""><b>Seleccione su Edad</b></label>
  <div><select name="" id="edad" v-model="edad"><option v-for=" i of edadArray " :key="i">{{ i }}</option></select></div>
  <label for=""><b>Ingrese su Email</b></label>
  <div><input type="email" v-model="email"></div>
  <div>
    <h5 v-if="errorGmailMsj">{{ errorGmailMsj }}</h5>
  </div>
  <button @click="guardarDatos" disabled  id="btn" ><b>Guardar datos</b></button>

  <h3>Datos guardados</h3>
  <div class="listFormulario">
    <ListForm 
        v-for="datos in datosArray"
        :key="datos.id"
        :datos="datos"
      @actualizarDato="actualizarUsuario"
    />

  </div>

   

   
    <div > 
        <button  disabled id="btnActualizar" @click="actualizar">Actualizar</button>
        <button  disabled id="btnBorrar" @click="borrar">Borrar</button>
     </div>
  
</template>

<script>
import { defineAsyncComponent } from 'vue'
import {validarRut, validarGmail} from '../helpers/Validaciones'

//const edadArray= new Array()



//let datosArray= []
export default {
    components: {
        ListForm: defineAsyncComponent(()=> import('./ListForm.vue'))
    },
    data() {
        return {
            datosActualizar:{
                id: null,
                nombre: null,
                rut: null,
                edad: null,
                email: null
            },
            idSelect: null,
            idActualizar: null,
            activar: false,
            rutRepetido:false,
            errorRutMsj:null,
            rutDev: '18788083-1',
            errormsj: null,
            errorGmailMsj: null,
            errorEdad: null,
            isValid: false,
            rutValid:false,
            id: null,
            nombre: null,
            rut: null,
            edad: null,
            email: null,
            edadArray: [],
            datosArray: [{
                id: '19',
                nombre: 'Devora',
                rut: '1-9',
                edad: 26,
                email: 'd@gmail.com'
            },
            {
                id: '27',
                nombre: 'Eva',
                rut: '2-7',
                edad: 25,
                email: 'e@gmail.com'
            }]
            
        }
    },
    props: {
        
      /* datosArray: {
            type: Array,
            required: false
        }*/

    },
    methods: {
        actualizarUsuario(id){
           // console.log(id)
            this.idSelect=id
            document.getElementById('btnActualizar').disabled=false
            document.getElementById('btnBorrar').disabled=false 
        },
        actualizar(){
           // console.log(this.idActualizar)
           this.idActualizar= this.idSelect
            this.datosActualizar = this.datosArray.filter(d => d.id === this.idSelect)
            this.id=this.datosActualizar[0].id
            this.nombre=this.datosActualizar[0].nombre
            this.rut=this.datosActualizar[0].rut
            this.edad=this.datosActualizar[0].edad
            this.email=this.datosActualizar[0].email
            document.getElementById('btnActualizar').disabled=true
            document.getElementById('btnBorrar').disabled=true
        },
        borrar(){
           // console.log(this.idActualizar)
           let datosBorrar = this.datosArray.filter(d => d.id === this.idActualizar)
           this.datosArray = this.datosArray.filter(d => d.id != this.idActualizar)
           this.id=''
            this.nombre=''
            this.rut=''
            this.edad=''
            this.email=''
           console.log(datosBorrar)
            document.getElementById('btnBorrar').disabled=true
            document.getElementById('btnActualizar').disabled=true
        },
        llenarMatriz(){
            for(let i=1;i<100; i++){
             this.edadArray[i-1]=i
           // console.log(this.edadArray[i-1])
            }
        },
        guardarDatos(){
            console.log('holi en guardar datos')
            if(this.rut.length>1){
                
                if(this.rut.substring(this.rut.length-2,this.rut.length-1)==='-'){
                        this.id=this.rut.substring(0, this.rut.length-2)+this.rut.substring(this.rut.length -1, this.rut.length)
                }else if(!this.rut.includes('-')) {
                    const rutAux= this.rut.substring(0,this.rut.length -1)+'-'+this.rut.substring(this.rut.length -1, this.rut.length)

                    this.id= this.rut
                    //console.log(rutAux)
                    this.rut=rutAux
                }
                
                if(null==this.idActualizar || this.idActualizar==''){
                    this.datosArray.push({
                id: this.id,
                nombre: this.nombre,
                rut: this.rut,  
                edad: this.edad,
                email: this.email
                 })

                }else{
                    for(let i=0; i<this.datosArray.length; i++){
                        if(this.datosArray[i].id==this.idActualizar){
                            console.log('holi en guardar datos', this.datosArray[i])
                            this.datosArray[i].id=this.id
                            this.datosArray[i].nombre=this.nombre
                            this.datosArray[i].rut=this.rut
                            this.datosArray[i].edad=this.edad
                            this.datosArray[i].email=this.email
                            
                        }
                    }
                    console.log('id a actualizar', this.datosArray)
                }
          
            
            this.reset()
            }
            
            //console.log(this.nombre)
            
        },
        reset(){
            
            this.idActualizar=''
            this.datosActualizar=[]
            this.nombre=''
            this.rut=''
            this.edad=''
            this.email=''
        },
        
        validarEdad(edad){
            if(edad>0 && edad<100){
                return true
            }

        },
        activarBottonGuardar(isValid, rut, email){
           // console.log('activado?')
 
            //console.log(isValid && this.validarRut(rut) && this.validarGmail(email))
            if(null!=rut && null!=this.nombre, null!=email){
              // console.log(`is valid: ${isValid}, validar rut: ${validarRut(rut)}, validar email: ${validarGmail(email)}`)
                if(isValid && validarRut(rut) && validarGmail(email)===true){
                    //console.log('botton disabled en truew')
                    this.activar=true
                //document.getElementById('btn').disabled=false 
            }else{
                this.activar= false
            }
            }
            
        },
        rutRepeat(rut){
            if(null!=rut){
                let newRut=null
            //console.log( 'el rut que llega a reapeat',rut)
            if(rut.includes('-')){
                newRut=rut.replace('-','')
            }else{
                newRut=rut
            }
            
           // console.log(newRut)
           if(null!=newRut){
            return this.datosArray.filter(r=>r.id===newRut)
           }
            }else{
                return null
            }
            
           
           // console.log('rut esta repetido', ruts)
        }
    },
    created() {
        this.llenarMatriz()
        //console.log(this.rutRepeat('18788083-1'))
        //this.validarGmail('d.rohten01@gmail.com')
        //this.validarRut('14919875-k')
    },
    watch: {
        nombre(newValue){
            const parametros = /^[a-zA-Z\s]*$/
            if(!newValue.search(parametros)){
                this.errormsj=null
                if(newValue.length>20){
                this.errormsj='el nombre esta muy largo'
                } else if(newValue.length<3 && newValue.length>0){
                this.errormsj='el nombre esta muy corto'
                 }else {
                this.errormsj=null
                
                }
            }else{
            //console.log('parametro ingresado inválido')
            this.errormsj='parametro ingresado inválido'
            }

            //console.log(this.errormsj==null && newValue.length>2 && newValue.length<21)
            if(this.errormsj==null && newValue.length>2 && newValue.length<21){
                this.isValid=false
                //console.log('boton activado')
               // document.getElementById('btn').disabled=true
            }else{
                this.isValid=true
                //console.log('boron desactivado')
               // document.getElementById('btn').disabled=false
            }
          //  console.log(`is valid: ${this.isValid}`)
            
            this.activarBottonGuardar(!this.isValid, this.rut, this.email)
        },
        rut(newValue){
            this.activarBottonGuardar(!this.isValid, newValue, this.email)
            if( this.rutRepeat(newValue).length==0){
                this.rutValid = validarRut(newValue)
                if(!this.rutValid){
                    this.errorRutMsj='Rut ingresado inválido'
                }else{
                    this.errorRutMsj=null
                }
                
            }else if(null!=this.idActualizar){
                
                this.errorRutMsj=null
            }else {
                this.errorRutMsj='Rut ya se encuentra ingresado'
            }
            console.log('error aqui??')
        },
        email(newValue){
            if(validarGmail(newValue) != true){
                this.errorGmailMsj =validarGmail(newValue) 
            }
            if(validarGmail(newValue) === true){
                this.errorGmailMsj=null
            }
           // console.log(this.errorGmailMsj)
            //console.log(validarGmail(newValue) )
            this.activarBottonGuardar(!this.isValid, this.rut, newValue)
            //console.log(newValue)
        },
        activar(newValue){
           // console.log(`activar: ${newValue}`)

            if(newValue===true){
                document.getElementById('btn').disabled=false 
            }else{
                document.getElementById('btn').disabled=true 
            }
            
        },
        datosArray(newValue){
            console.log('en el watch')
            console.log(newValue)
        }
    }

}
</script>

<style scoped>
button{
    margin: 5px
}
h5 {
    color: red;
}
.listFormulario {
    display: inline-block;
}
</style>