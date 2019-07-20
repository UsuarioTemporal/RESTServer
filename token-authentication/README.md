# **Introducción**

Un token puede ser físico o virtual, una serie de caracteres para la realizacion de una
tarea .

Un usuario desea ingresar a nuestra aplicación entonces para poder realizar
esta acción necesita logearse para esto mediante el método POST
envia "codigos" a nuestra API REST que será la encargada de verificar 
si este usuario esta nuestra base de datos mediante un token es decir que API REST recibirá el token y lo que hara es desifrar para luego enviarselo al BACKEND y ver si este exite o no .

## **¿Por qué usar tokens?**

- Variables de sesión : Muchas aplicaciones de hoy en dia utilizan variables de sesión para<br> manejar la autenticación de los usuarios
- JWT(JSON Web Token) : Está divido en tres partes :
  - Header: Tiene la información sobre el algoritmo utilizado para la encriptación junto con el tipo de token
  - Payload:Contiene la información que estará en el token
  - Firma:Es algo que le permite al JWT o a los verificadores del JWT si el token es válido

## **Cookies , Session y el Local Storage**

### **Cookies**

Pequeños documentos que almacenan las preferencias del usuario independiente de cada servidor. Su capacidad es de 4KB.

> Las especificaciones de cookies sugieren que los navegadores deben soportar un número <br>
> mínimo de cookies o una cantidad mínima de memoria para almacenarlas. En concreto, se <br>
> espera que un navegador sea capaz de almacenar al menos 300 cookies de 4 kilobytes <br>
> cada una y al menos 20 cookies por servidor o dominio.

> El servidor que establece la cookie puede especificar una fecha de borrado, en cuyo caso la<br> 
> cookie será borrada en esa fecha. Un sitio de compras podría querer ayudar a clientes<br> 
> potenciales recordando las cosas que había en su cesta de la compra, incluso si cierran el<br> 
> navegador sin realizar la compra y vuelven más tarde, para evitar que tengan que buscar los <br>
> productos de nuevo. En ese caso, el servidor crearía una cookie con fecha de borrado según <br>
> el deseo del diseñador del sitio web. Si no se define una fecha de borrado, la cookie es<br> 
> borrada cuando el usuario cierra su navegador. Por lo tanto, definir una fecha de borrado<br> 
> es una manera de hacer que la cookie sobreviva entre sesiones. Por esta razón, las cookies<br> 
> con fecha de borrado se llaman persistentes.<br>

> Fuente : [***WIKIPEDIA***](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica))

Las cookies son prácticamente una forma conveniente de 
llevar información de una sesión en un sitio web a otra, o 
entre sesiones en sitios web relacionados, sin tener que 
cargar una máquina de servidor con grandes cantidades de 
almacenamiento de datos. Si tuviéramos que almacenar datos 
en el servidor sin utilizar cookies, sería difícil 
recuperar la información de un usuario en particular sin 
requerir un inicio de sesión en cada visita al sitio web. 
Por lo tanto, una cookie se puede usar simplemente si hay 
una gran cantidad de información para almacenar. Además, se 
puede hacer que una cookie persista durante un período de 
tiempo arbitrario.

## **Diferencias con el  Local Storage**

Las cookies son principalmente par lectura del lado del servidor
mientras que el local Storage solo puede ser leido del lado del cliente . Ademas de guardas datos , una gran difrencia es el tamaño de datos que se puede alamcenar que es 5MB esto varia dependenciendo del navegador y tambien puede ser personalizado por el usuario

Existe una variante de Local Storage , que permite almacenar datos con
la garantía de que, cuando el usuario cierre el navegador o cambie de dominio,
la informacion será borrada automaticamente. Esto es una solucion ideal para los casos en los que solo necesitamos la imformación temporal.


````javascript

    //Session Storage
    const grabarClaveSesion = clave=>{
        let valor = document.getElementByID('input-temporal').value
        window.sessionStorage.setItem(clave,value)
    }
    const leerClaveSesion = clave=>{
        let valor = window.sessionStorage.getItem(clave)
        document.getElementById('valor-temporal').value = valor
    }

    //Local Storage
    const grabarClaveLocal = clave=>{
        let valor = document.getElementById('input-permanente').value
        window.localStorage.clave=valor
    }
    const leerClaveLocal= clave=>{
        let valor =window.localStorage.clave
        document.getElementById('valor-permanente').value = valor
    }
````

El local storage alamacena datos sin fecha de caducidad a diferencia de los cookies y se borra solo atraves de javascript, o borra la memoria caché del navegador / datos almacenados localmente

## ***Referencias***

- [***JWT.io***](https://jwt.io/)
- [***Node.js***](https://github.com/MaurickThom/Node.js)
- [***Diferencias de almacenamiento***](https://codepen.io/beaucarnes/pen/KmeRMx)
- [***Ver alamacenamiento I***](http://js.dokry.com/cul-es-el-tamao-mximo-de-los-valores-de-almacenamiento-local.html)
- [***Ver alamacenamiento II***](https://www.bit.es/knowledge-center/cookies-vs-localstorage-cual-es-la-mejor-opcion/)
- [***Ver almacenamiento III***](https://scotch.io/@PratyushB/local-storage-vs-session-storage-vs-cookie)
- [***Ver almacenamienti IV***](https://ed.team/blog/que-es-y-como-utilizar-localstorage-y-sessionstorage)
