import { ref } from 'vue'
import { defineStore } from 'pinia'

export const sicodeStore = defineStore('sicodes', () => {
  const act_sep = ref(false)
  const act_mult = ref(false)
  const pantalla = ref(0)  //0=No hay pedidos, 
  //1=pedidos asignados *no va ya 
  //2-selecccion items pedidos asignados, 
  //3=pedidos multiples. *no va ya
  //4=selecccion items pedidos multiples
  const lst_mensajes = ref("No hay pedidos")
  const procesando = ref(false)

  const parametros = ref(null)
  const lst_pedidos = ref([])
  const id_pedido = ref(0)
  const ped_actual = ref(null)
  const lst_item = ref([])
  const item_actual = ref(null)
  const rutas = ref([])
  const lst_otra = ref([])
  //modal
  const agrupacion = ref(0)
  const parcial = ref(false)
  const modal_otra_ub = ref(false)
  const modal_limite = ref(false)
  //contedores
  const conitems = ref(true)
  const id_contenedor = ref(0)
  const id_canastilla = ref(0)
  //control
  const codbar_ok = ref(false)
  //Pedidos Multiples
  const mult_idpedido = ref(0)
  const mult_pedidos = ref([])
  const mult_items = ref([])
  const mult_actvarCant = ref(false)
  const mult_item = ref({})
  const mul_lineasPend = ref(0)

  async function FunGet(url) {
    procesando.value = true
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
        procesando.value = false
      }
      data = await response.json()
      if (data) {
        lst_mensajes.value = data.mensaje ?? null
        registros = data.registros ?? []
        error = data.error ?? null
        procesando.value = false
        // console.log('---------------')
        // console.log(error)
        // console.log(mensaje)
        // console.log(registros)
        // console.log('---------------')
      }
    } catch (err) {
      procesando.value = false
      error = err.message || 'Ha ocurrido un error al obtener los datos.';
    }
    return { error, mensaje, registros };
  }
  async function FunPost(url, body = {}) {
    procesando.value = true
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
        procesando.value = false
      }

      data = await response.json();
      if (data) {
        lst_mensajes.value = data.mensaje ?? null;
        registros = data.registros ?? [];
        error = data.error ?? null;
        procesando.value = false
      }
    } catch (err) {
      error = err.message || 'Ha ocurrido un error al enviar los datos.';
      procesando.value = false
    }

    return { error, mensaje, registros };
  }

  async function CarguePedidos() {
    const { error, mensaje, registros } = await FunGet(`api_separar/BuscarPedidos`)
    if (error) { alert(error) }
    if (mensaje) { alert(mensaje) }
    if (registros.length == 0) {
      lst_pedidos.value = []
      rutas.value = []
      act_sep.value = false
    } else {
      lst_pedidos.value = registros.pedidos
      rutas.value = registros.rutas
      act_sep.value = true

    }
  }
  async function CargarItems(idpedido) {
    const { error, mensaje, registros } = await FunGet(`api_separar/BuscarItems/${idpedido}`)
    if (error) {
      alert(error)
      return
    }

    // console.log('CargarItems -> reg=')
    if (registros) {
      act_sep.value = false
      act_mult.value = false
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
  async function BuscarParametros() {
    let { error, mensaje, registros } = await FunGet(`api_separar/BuscarParametros`)
    if (error) {
      alert(error)
      return
    }
    console.log("----BuscarParametros------")
    console.log(registros)
    console.log(parametros.value)
    parametros.value = registros
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
    let ruta = ""
    if (parametros.value.ref_item) {
      if (codbar == item_actual.value.codigo) {
        codbar_ok.value = true
        return
      }
      ruta = `api_separar/BuscarCodbar/${codbar}/${item_actual.value.codigo}/${item_actual.value.um}`
    } else {
      if (codbar == item_actual.value.ref) {
        codbar_ok.value = true
        return
      }
      ruta = `api_separar/BuscarCodbar/${codbar}/${item_actual.value.ref}/${item_actual.value.um}`
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
    gg
  }

  async function OtrasUbicaciones() {
    console.log(item_actual)
    const datos = `?ref=${item_actual.value.ref}&ubi=${item_actual.value.ubicacion}`
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
    lst_otra.value = registros
  }

  //Pedidos Multiples

  async function Mult_CarguePedidos() {
    const { error, mensaje, registros } = await FunGet(`api_mult_separar/BuscarPedidos`)
    if (error) { alert(error) }
    if (mensaje) { alert(mensaje) }
    if (registros.length == 0) {
      mult_pedidos.value = []
      act_mult.value = false
    } else {
      mult_pedidos.value = registros
      act_mult.value = true

    }
  }



  async function Mult_SelPedido(idpedido) {
    mult_idpedido.value = idpedido
    pantalla.value = 4
    act_mult.value = false
    act_sep.value = false

    const { error, mensaje, registros } = await FunPost(`api_mult_separar/BuscarItems`, { id: idpedido })
    mult_items.value = registros
    mul_lineasPend.value = registros.length
  }

  async function Mult_itemSeparado(referencia) {
    console.log("mult_itemsep")
    mult_item.value = mult_items.value.find(item => item.referencia === referencia);
    console.log(mult_item.value)
    if (typeof mult_item.value === 'undefined') {
      alert('Referencia no encontrada');
      return;
    }
    if ((mult_item.value.cantped - (mult_item.value.cansep1 + mult_item.value.cant_add + 1)) < 0) {
      modal_limite.value = true
      return
    }


    ////Activa el campo de cantidad
    //if (modal_limite.value.maximo) {
    //  mult_actvarCant.value = true
    //  return
    //}

    const datos = { id: mult_item.value.id, cantidad: 1 };
    mult_Guardar(datos)
  }

  async function Mult_ItemCantSep(cantidad) {
    const datos = { id: mult_item.value.id, cantidad: cantidad }
    await mult_Guardar(datos)
    LimpiarMult()
  }

  async function mult_Guardar(datos) {
    const { error, mensaje, registros } = await FunPost('api_mult_separar/SepararItems', datos);

    if (error) {
      alert(error);
      return;
    }

    if (registros) {
      // Actualiza el valor del ítem
      mult_item.value.cansep1 = registros.cant;

      // Mueve el ítem al principio de la lista
      const index = mult_items.value.indexOf(mult_item.value);
      if (index !== -1) {
        mult_items.value.splice(index, 1);
        mult_items.value.unshift(mult_item.value);
      }

      // Activa el efecto de resaltado
      mult_item.value.resaltado = true;
      // ya fue separado
      mult_item.value.separada = registros.estado
      mul_lineasPend.value = mult_items.value.filter(item => item.cantped > item.cansep1).length

    }
  }

  function LimpiarMult() {
    mult_item.value = {}
    mult_actvarCant.value = false
  }


  async function mult_GuardarAdcional(cantidad) {
    const datos = { cantidad: cantidad, id: mult_item.value.id }
    const { error } = await FunPost('api_mult_separar/GuardarAdcional', datos);
    if (error) {
      alert(error)
      return
    }

    mult_item.value = mult_items.value.find(item => item.referencia === referencia);
    mult_item.value.cant_add = cantidad

  }

  async function mult_FinalizarItem(id_item, index) {
    const datos = { id: id_item }
    const { error } = await FunPost('api_mult_separar/FinalizarItem', datos);
    if (error) {
      alert(error)
      return
    }
    mult_items.value[index].separada = true

  }

  // Función para reorganizar la lista y dejar de ultimos lo que estan en verde
  function Mult_OrdenarLista() {
    mult_items.value = [
      ...mult_items.value.filter((item) => !item.separada), // Los que tienen fin=false
      ...mult_items.value.filter((item) => item.separada),  // Los que tienen fin=true
    ]
    return !mult_items.value.some((item) => !item.separada);

  }


  function Inicio() {
    pantalla.value = 0
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
    act_sep.value = false
    act_mult.value = false
    modal_limite.value = false
    mult_idpedido.value = 0
    BuscarParametros()
    CarguePedidos()
    Mult_CarguePedidos()
  }

  return {
    parametros, lst_pedidos, id_pedido, agrupacion, conitems,
    id_contenedor, id_canastilla, ped_actual, lst_item, item_actual,
    codbar_ok, parcial, Guardar, Inicio, rutas, lst_otra, modal_otra_ub,
    //control
    pantalla, lst_mensajes, act_sep, act_mult, procesando,

    //funciones
    CarguePedidos, SelPedido, AsignarCasilla, AsignarContendor, Siguiente,
    ValidaCodigo, NuevoContenedor, OtrasUbicaciones, BuscarParametros,
    //Multiples
    mult_pedidos, mult_items, mult_idpedido, mult_actvarCant,
    mult_item, mul_lineasPend, modal_limite,
    //fun Multiples
    Mult_CarguePedidos, Mult_SelPedido, Mult_itemSeparado, LimpiarMult,
    Mult_ItemCantSep, mult_GuardarAdcional, Mult_OrdenarLista,
    mult_FinalizarItem
  }
})
