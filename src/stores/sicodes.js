import { ref } from 'vue'
import { defineStore } from 'pinia'

export const sicodeStore = defineStore('sicodes', () => {

  const parametros = ref(null)
  const lst_pedidos = ref(null)
  const id_pedido = ref(0)
  const ped_actual = ref(null)
  const lst_item = ref([])
  const item_actual = ref(null)
  const rutas = ref([])
  const lst_otra=ref([])
  //modal
  const agrupacion = ref(0)
  const parcial = ref(false)
  const modal_otra_ub = ref(false)
  //contedores
  const conitems = ref(true)
  const id_contenedor = ref(0)
  const id_canastilla = ref(0)
  //control
  const codbar_ok = ref(false)
  const actdev = ref(false)
  //Pedidos Multiples
  const mult_idpedido=ref(0)
  const mult_pedidos=ref([])
  const mult_items=ref([])
  const mult_Activo=ref(false)
  const mult_actvarCant=ref(false)
  const mult_item=ref({})
  const mul_lineasPend=ref(0)

  async function FunGet(url) {
    let error = ''
    let mensaje = ''
    let registros = []
    let data = {}
    const ruta = `${RUTA_WEB2PY}/${url}`;
    console.log(ruta)
    try {
      const response = await fetch(ruta);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      data = await response.json()
      if (data) {
        // console.log('DATA',data)
        mensaje = data.mensaje ?? null
        registros = data.registros ?? []
        error = data.error ?? null
        // console.log('---------------')
        // console.log(error)
        // console.log(mensaje)
        // console.log(registros)
        // console.log('---------------')
      }
    } catch (err) {
      error = err.message || 'Ha ocurrido un error al obtener los datos.';
    }
    return { error, mensaje, registros };
  }
  async function FunPost(url, body = {}) {
    let error = '';
    let mensaje = '';
    let registros = [];
    let data = {};
    const ruta = `${RUTA_WEB2PY}/${url}`;
    console.log(ruta);
    try {
        const response = await fetch(ruta, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Define que el cuerpo es JSON
            },
            body: JSON.stringify(body), // Convierte el objeto body a una cadena JSON
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        data = await response.json();
        if (data) {
            mensaje = data.mensaje ?? null;
            registros = data.registros ?? [];
            error = data.error ?? null;
        }
    } catch (err) {
        error = err.message || 'Ha ocurrido un error al enviar los datos.';
    }

    return { error, mensaje, registros };
}
  async function CarguePedidos() {
    const { error, mensaje, registros } = await FunGet(`api_separar/BuscarPedidos`)
    if (error) { alert(error) }
    if (mensaje) { alert(mensaje) }
    // console.log(registros)
    if (registros.length == 0) {
      lst_pedidos.value = []
      rutas.value = []
    } else {
      lst_pedidos.value = registros.pedidos
      rutas.value = registros.rutas
      parametros.value = registros.params
      actdev.value = registros.params.actDev
    }
  }
  async function CargarItems(idpedido) {
    const { error, mensaje, registros } = await FunGet(`api_separar/BuscarItems/${idpedido}`)
    if (error) {
      alert(error)
      return
    }
    if (mensaje) { alert(mensaje) }

    // console.log('CargarItems -> reg=')
    if (registros) {
      // console.log(registros.primero)    
      if (registros.primero) {
        // console.log('registros.primero')
        item_actual.value = registros.primero
        // console.log ('CargarItems:')
        // console.log (item_actual.value)
      }
      if (registros.lista) {
        lst_item.value = registros.lista
      }
    }
  }
  function MuestreContenedor() {
    if (parametros.value.actCanastillas) { agrupacion.value = 1 }    //muestre SepGrupoTotal canstilla 
    else { agrupacion.value = 2 }                                    //muestre SepGrupoTotal sin canstilla
  }
  async function VerificarContendor(idPedido) {
    let { error, mensaje, registros } = await FunGet(`api_separar/VerificarContenedor/${idPedido}`)
    if (error) { alert(error) }
    if (mensaje) { alert(mensaje) }
    console.log(registros)
    if (registros) {
      ped_actual.value = lst_pedidos.value.find(pedido => pedido.idpedido === idPedido)
      id_pedido.value = idPedido
      conitems.value = registros.lleno  //El contenedor tiene por lo menos un item
      id_contenedor.value = parseInt(registros.id_contenedor)
      console.log('VerificarContendor -> id_contenedor=' + id_contenedor.value)

      id_canastilla.value = registros.id_canastilla

      if (registros.id_contenedor == 0) {    //debe crear un nuevo contendor/canastilla
        if (conitems.value == false) { MuestreContenedor() }
      }
      return true
    } else {
      alert('error grave no se puede verificar los contendores...!!')
      return false 
    }
  }
  async function BuscarParametros(){
    let { error, mensaje, registros } = await FunGet(`api_separar/BuscarParametros`)
    if (error) { alert(error) }
    if (mensaje) { alert(mensaje) }
    console.log("----BuscarParametros------")
    console.log(registros)
    console.log ( parametros.value)
    parametros.value=registros

  }

  async function SelPedido(idpedido) {
    id_pedido.value = idpedido
    const resultado = await VerificarContendor(idpedido)
    if (resultado) {
      console.log('SelPedido -> id_contenedor=' + id_contenedor.value)

      await CargarItems(idpedido)
      await BuscarParametros()
    } else {
      //falta volver al principio
    }
  }
  async function AsignarCasilla() {
    const { error, mensaje, registros } = await FunGet(`api_separar/AsignarCanastilla/${id_canastilla.value}/${id_pedido.value}`)
    // console.log('---------------')
    // console.log(error)
    // console.log(mensaje)
    // console.log(registros)
    // console.log('---------------')      
    if (error) { alert(error) }
    if (mensaje) { alert(mensaje) }
    if (parseInt(registros) > 0) {
      id_contenedor.value = parseInt(registros)
      agrupacion.value = 0
    }
  }
  async function AsignarContendor() {

    const { error, mensaje, registros } = await FunGet(`api_separar/AsignarContendor/${id_pedido.value}`)
    // console.log('---------------')
    // console.log(error)
    // console.log(mensaje)
    // console.log(registros)
    // console.log('---------------')
    if (error) { alert(error) }
    if (mensaje) { alert(mensaje) }
    if (registros > 0) {
      id_contenedor.value = parseInt(registros)
      id_canastilla.value = 0
      agrupacion.value = 0
    }
  }
  async function ValidaCodigo(codbar) {
    let ruta=""
    if (parametros.value.ref_item){
      if ( codbar==item_actual.value.codigo ){
        codbar_ok.value = true
        return
      }
      ruta=`api_separar/BuscarCodbar/${codbar}/${item_actual.value.codigo}/${item_actual.value.um}`
    }else{
      if (codbar==item_actual.value.ref){
        codbar_ok.value = true
        return
      }
      ruta=`api_separar/BuscarCodbar/${codbar}/${item_actual.value.ref}/${item_actual.value.um}`
    }
    const { error, mensaje, registros } = await FunGet(ruta)

    if (error) {
      alert(error)
      codbar_ok.false
      return
    }

    if (registros) { codbar_ok.value = true }
    else { alert('El codigo no se encuentra registrado') }
  }

  function Siguiente(anexar = true) {   //anexar al final de la lista de pendientes
    item_actual.value.separada = 0
    if (lst_item.value.length > 0) {
      if (anexar) {
        lst_item.value.push(item_actual.value)
      }
      item_actual.value = lst_item.value[0]
      lst_item.value.shift()
    }
    codbar_ok.value = false
  }

  async function Guardar(parcial = false, parcial_no = 0) {
    console.log('------- guardar --------')
    // parcial_no = 1 es que seleccion parcial y luego NO 
    const ruta = `api_separar/Guardar/${item_actual.value.id}/${item_actual.value.separada}/${id_contenedor.value}/${parcial_no}`
    const { error, mensaje, registros } = await FunGet(ruta)
    if (error) {
      alert(error)
      return
    }
    if (mensaje) {
      alert(mensaje)
    }
    console.log(registros)
    console.log('---------------')
    //evaluar si se ingreso una cantidad = 0 
    item_actual.value.separada = parseInt(item_actual.value.separada)
    console.log('item_actual')
    console.log(item_actual)
    console.log(item_actual.value.separada == 0)
    // alert('aqui comienza')

    if (item_actual.value.separada == 0) {
      // alert('aqui estoy')
      console.log(`lst_item.value.length=${lst_item.value.length}`)
      if (lst_item.value.length === 0) {  //si no hay mas pendientes 
        await CierreContenedor()
        Inicio()
        return
      }
      Siguiente(false)
      return
    }
    //alert('parcial')
    //parcial si
    if (parcial) {
      if (registros.id) {
        item_actual.value.cantidad = registros.cantidad
        item_actual.value.id = registros.id
        item_actual.value.separada = 0
        MuestreContenedor()
        conitems.value = false
        return
      }
    }
    //parcial no
    if (parcial_no) {
      item_actual.value.cantidad = registros.cantidad
      item_actual.value.id = registros.id
      item_actual.value.separada = registros.cantidad
      conitems.value = true
      return
    }
    //separacion total
    codbar_ok.value = false

    if (lst_item.value.length == 0) {  //si no hay mas pendientes 
      await CierreContenedor()
      Inicio()
    } else {
      conitems.value = true
      Siguiente(false)
    }

  }

  async function CierreContenedor() {
    const ruta = `api_separar/NuevoContenedor/${id_contenedor.value}`
    const { error, mensaje, registros } = await FunGet(ruta)
    console.log('------- guardar --------')
    console.log(mensaje)
    console.log(registros)
    console.log('---------------')
    if (error) {
      alert.log(error)
      return
    }

  }

  async function NuevoContenedor() {
    const ruta = `api_separar/NuevoContenedor/${id_contenedor.value}`
    // console.log(ruta)
    const { error, mensaje, registros } = await FunGet(ruta)
    console.log('------- guardar --------')
    console.log(mensaje)
    console.log(registros)
    console.log('---------------')
    if (error) {
      alert.log(error)
      return
    }
    if (registros) {
      conitems.value = false
      MuestreContenedor()
    }
gg  }

 async function OtrasUbicaciones() {
    console.log(item_actual)
    const datos=`?ref=${item_actual.value.ref}&ubi=${item_actual.value.ubicacion}`
    const ruta = `api_separar/BuscarOtrasUbicaciones/${datos}`
    // console.log(ruta)
    const { error, mensaje, registros } = await FunGet(ruta)
    console.log('------- guardar --------')
    console.log(mensaje)
    console.log(registros)
    console.log('---------------')
    if (error) {
      alert(error)
      return
    }
    lst_otra.value=registros
  }

  //Pedidos Multiples

  async function Mult_CarguePedidos() {
    const { error, mensaje, registros } = await FunGet(`api_mult_separar/BuscarPedidos`)
    if (error) { alert(error) }
    if (mensaje) { alert(mensaje) }
    console.log(registros)
    if (registros.length == 0) {
      mult_pedidos.value = []
    } else {
      mult_pedidos.value = registros
    }
  }

  async function Mult_CargueItems(idpedido) {

    const { error, mensaje, registros } = await FunPost(`api_mult_separar/BuscarItems`,{id:idpedido})
    mult_items.value =registros
  }

  async function Mult_SelPedido(idpedido) {
    mult_idpedido.value = idpedido
    mult_Activo.value=true

    const { error, mensaje, registros } = await FunPost(`api_mult_separar/BuscarItems`,{id:idpedido})
    mult_items.value =registros
    mul_lineasPend.value = registros.length


  }

async function Mult_itemSeparado(referencia) {
  const itemEncontrado = mult_items.value.find(item => item.referencia === referencia);
  if (!itemEncontrado) {
    alert('Referencia no encontrada');
    return;
  }
  //Activa el campo de cantidad
  if (itemEncontrado.maximo){
      mult_actvarCant.value=true
      mult_item.value=itemEncontrado
      return
  }
  const datos = { id: itemEncontrado.id, cantidad: 1 };
  mult_Guardar(datos, itemEncontrado)
}

async function Mult_ItemCantSep(cantidad){
    const datos  = { id: mult_item.id, cantidad: cantidad }
    await mult_Guardar(datos, mult_item)
    LimpiarMult()
  }

async function mult_Guardar(datos, itemEncontrado) {
  const { error, mensaje, registros } = await FunPost('api_mult_separar/SepararItems', datos);

  if (error) {
    alert(error);
    return;
  }

  if (registros) {
    // Actualiza el valor del ítem
    itemEncontrado.cansep1 = registros.cant;

    // Mueve el ítem al principio de la lista
    const index = mult_items.value.indexOf(itemEncontrado);
    if (index !== -1) {
      mult_items.value.splice(index, 1);
      mult_items.value.unshift(itemEncontrado);
    }

    // Activa el efecto de resaltado
    itemEncontrado.resaltado = true;
    // ya fue separado
    itemEncontrado.separada = registros.estado
    mul_lineasPend.value  = mult_items.value.filter(item => item.cantped > item.cansep1).length

  }
}

function LimpiarMult(){
    mult_item.value={}
    mult_actvarCant.value=false
}

  function Inicio() {
    codbar_ok.value = false
    agrupacion.value = 0
    id_contenedor.value = 0
    id_canastilla.value = 0
    conitems.value = false
    id_pedido.value = 0
    ped_actual.value = null
    lst_pedidos.value = []
    lst_item.value = []
    item_actual.value = null
    CarguePedidos()
    Mult_CarguePedidos()
  }

  

  return {
    parametros, lst_pedidos, id_pedido, agrupacion, conitems, actdev,
    id_contenedor, id_canastilla, ped_actual, lst_item, item_actual,
    codbar_ok, parcial, Guardar, Inicio, rutas,lst_otra,modal_otra_ub,

    //funciones
    CarguePedidos, SelPedido, AsignarCasilla, AsignarContendor, Siguiente,
    ValidaCodigo, NuevoContenedor,OtrasUbicaciones,
     //Multiples
    mult_pedidos, mult_items, mult_idpedido, mult_Activo, mult_actvarCant,
    mult_item, mul_lineasPend,
    //fun Multiples
    Mult_CarguePedidos, Mult_SelPedido, Mult_itemSeparado, LimpiarMult,
    Mult_ItemCantSep,
  }
})
