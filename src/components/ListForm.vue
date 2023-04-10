<template>
    <!--<thead >
        <tr>
            <th> </th>
            <th>Nombre</th>
            <th>Rut</th>
            <th>Edad</th>
            <th>Correo</th>
        </tr>
    </thead>-->
    <tbody>
        <tr>
            <!--<td ><input type="checkbox" ></td>-->
            <td><input type="radio" name="datosUs" @click="$emit('actualizarDato', datos.id)"> </td>
            <!--<td ><input type="checkbox"  @click="$emit('actualizarDato', datos.id)"></td>-->
          <!--  <td>{{ datos.id }}</td>-->
            <td >{{ datos.nombre }}</td>
            <td >{{ datos.rut }}</td>
            <td >{{ datos.edad }}</td>
            <td >{{ datos.email }}</td>
        </tr>
    </tbody>
  
</template>

<script>
export default {
    data() {
        return {
        }
    },
    props: {
        datos: {
            type: Object,
            required: true
        }
    },
    methods: {

    },
}
</script>

<style scoped>
 th, td {
    padding: 5px;
}
 tbody {
    text-align: left;
 }


</style>