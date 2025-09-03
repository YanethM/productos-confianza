# **Landing Page Web Services - Financiera Confianza**

## **Descripción General del Proyecto**

Este proyecto es una aplicación web desarrollada con Vue.js 3 que sirve como landing page para los productos financieros de Financiera Confianza. La aplicación permite a los usuarios solicitar productos pasivos (AHORROS, CTS, DPF) y productos activos (créditos), completando formularios que envían la información a los servicios web de la entidad financiera.

## **Estructura del Proyecto**

```
├── public/            # Archivos públicos estáticos
├── src/               # Código fuente
│   ├── assets/        # Recursos (imágenes, estilos)
│   ├── components/    # Componentes Vue reutilizables
│   ├── layouts/       # Layouts de la aplicación
│   ├── router/        # Configuración de rutas
│   ├── store/         # Estado global con Vuex
│   ├── utils/         # Utilidades y funciones auxiliares
│   ├── views/         # Vistas principales
│   │   ├── Active/    # Vista para productos activos
│   │   ├── Amount/    # Vista para montos
│   │   ├── Home/      # Vista principal
│   │   ├── Message/   # Vista de mensajes 
│   │   └── Selection/ # Vista de selección de oficina
│   ├── App.vue        # Componente raíz
│   ├── axios.js       # Configuración de Axios para peticiones
│   └── main.js        # Punto de entrada de la aplicación
├── .env               # Variables de entorno (desarrollo local)
├── .env.dev           # Variables de entorno (desarrollo)
├── .env.qa            # Variables de entorno (pruebas)
├── .env.production    # Variables de entorno (producción)
├── index.html         # Plantilla HTML principal
├── package.json       # Dependencias y scripts
└── vite.config.js     # Configuración de Vite
```

## **Tecnologías Utilizadas**

- **Vue.js 3.2.33**: Framework principal para la interfaz de usuario
- **Vuex 4.0.2**: Gestión del estado global
- **Vue Router 4.0.14**: Enrutamiento de la aplicación
- **Vite 2.9.5**: Herramienta de compilación y desarrollo
- **Axios 0.27.2**: Cliente HTTP para realizar peticiones
- **Crypto-JS 4.1.1**: Encriptación de datos sensibles
- **Vee-Validate 4.5.11** con **Yup 0.32.11**: Validación de formularios
- **Vue-Recaptcha 2.0.2**: Implementación de reCAPTCHA
- **Vue-GTM y Vue-GTag**: Seguimiento de analíticas
- **SASS**: Preprocesador CSS

## **Flujos de Usuario**

### **Para Productos Pasivos (Ahorros, CTS, DPF):**

1. El usuario ingresa a la landing page y selecciona un producto pasivo
2. Completa el formulario con datos personales (documento, teléfono, email)
3. El sistema valida los datos y genera tokens de seguridad
4. El usuario selecciona su ubicación (departamento, provincia, distrito)
5. El sistema muestra las agencias disponibles en esa ubicación
6. El usuario selecciona la agencia y completa el registro
7. El sistema confirma la solicitud exitosa

### **Para Productos Activos (Créditos):**

1. El usuario ingresa a la landing page y solicita un crédito
2. Completa el formulario con datos personales (documento, teléfono, email)
3. El sistema valida si el usuario tiene ofertas pre-aprobadas
4. El usuario ingresa el monto solicitado
5. Selecciona su ubicación (departamento, provincia, distrito)
6. El sistema muestra las agencias disponibles en esa ubicación
7. El usuario selecciona la agencia y completa la solicitud
8. El sistema confirma la solicitud y muestra mensaje de seguimiento

## **URL**

https://bancamovil-des.confianza.net.pe

## **Productos Pasivos**

### Secuencia de flujo:

* POST /landing-registration:
    * Ingresar datos.
    * Validaciones.
* GET /landing-agency:
    * Seleccionar codigos departamento, provincia y distrito
    * Listar agencia.
* PUT /landing-registration:
    * Seleccionar agencia.
    * Completar registro.

## **Productos Activos**

### Secuencia de flujo:

* POST /landing-credit-apply:
    * Ingresar datos.
    * Validaciones.
* GET /landing-agency:
    * Seleccionar codigos departamento, provincia y distrito
    * Listar agencia.
* PUT /landing-credit-apply:
    * Seleccionar agencia.
    * Completar registro.

## **SEGURIDAD**

* DATOS ENCRYPTADOS:
    * documentNumber
    * phone
    * email
    * names
    * lastNames

## **PATHS**

## 1. /landing-registration:

* **POST**

    * **Request:**
        * documentType:
            * type: string
            * required: true
            * description: Tipo de documento.
            * values:
                * carné extranjería: 2
                * pasaporte: 5
                * DNI: 21
                * PTP/CPP: 25
                * carné de identidad: 26
                * cédula de identidad: 27
                * carné de refugiado: 28
                * documento CEPR: 29
        * documentNumber:
            * type: string
            * required: true
            * encrypted: true
            * description: Número de documento.
            * size:
                * carné extranjería: 9
                * pasaporte: 9
                * DNI: 8
                * PTP/CPP: 9
                * carné de identidad: 8
                * cédula de identidad: 8, 12
                * carné de refugiado: 9
                * documento CEPR: 9
        * productType:
            * type: string
            * required: true
            * description: Tipo de producto.
            * values: AHORROS, CTS, DPF.
        * phone:
            * type: string
            * required: true
            * encrypted: true
            * description: Número de celular.
        * email:
            * type: string
            * required: true
            * encrypted: true
            * description: Correo electrónico.
        * mode:
            * type: string
            * required: true
            * value: 1

    * **Response:**
        * code:
            * type: string
            * description: Codigo de respuesta
        * message:
            * type: string
            * description: Mensaje de respuesta.
        * token:
            * type: string
            * description: Token de seguridad.
        * tokenBT:
            * type: string
            * description: Token de seguridad.
        * existeBT:
            * type: string
            * description: Token de seguridad.
            * value: N - no cliente, S - cliente registrado.

    * **Examples:**

    * Path:
    ```
    https://bancamovil-des.confianza.net.pe/landing-registration
    ```

      * **Nota: - Examples of Document Numbers:** 
        * carné extranjería: 001112311
        * pasaporte: 003615985
        * DNI: 72285863
        * PTP/CPP: 002113762
        * carné de identidad: 565741256
        * cédula de identidad: 56254125
        * carné de refugiado: 021222541
        * documento CEPR: 021222500

    * Request
    ```
    {
        "documentType": "21",
        "documentNumber": "YKhlDRbxDutTxGXZuYhz4A",
        "productType": "AHORROS",
        "phone": "+dyCxG+uPreOiXiwvnmVLQ==",
        "email": "FxSB8Qcbt/lHdL10lUOFXwjHRl75RwrM+faZeh0wH/8=",
        "mode": "1"
    }
    ```
    * Response
    ```
    {
        "code": "0",
        "message": "CONSULTA EXITOSA ",
        "token": "vEi9OvDLRuSJ5Uc/HAAUXw==",
        "tokenBT": "Hn0JopBpBk4EThAcqXvVsvX5Zl+8SI2azgXmTJziM/U=",
        "existeBT": "S",
        "nombre": "YONALTAN ELIAS"
    }
    ```

* **PUT**

    * **Request:**
        * token:
            * type: string
            * description: Token de seguridad.
        * tokenBT:
            * type: string
            * description: Token de seguridad.
        * names:
            * type: string
            * required: true
            * description: Nombres del cliente.
        * lastNames:
            * type: string
            * required: true
            * description: Apellidos del cliente.
        * ubigeoDepartment:
            * type: string
            * required: false
            * description: Ubigeo de departamento.
        * ubigeoProvince:
            * type: string
            * required: false
            * description: Ubigeo de provincia.
        * ubigeoDistrict:
            * type: string
            * required: true
            * description: Ubigeo de distrito
        * agency:
            * type: string
            * required: true
            * description: Ubigeo de agencia
        * mode:
            * type: string
            * required: true
            * value: 2

    * **Response:**
        * code:
            * type: string
            * description: Codigo de respuesta
        * message:
            * type: string
            * description: Mensaje de respuesta.

    * **Examples:**
        * Path:
      ```
      https://bancamovil-des.confianza.net.pe/landing-registration
      ```
        * Request
      ```
      {
          "token": "Yf2hZQOFdXf4+2OlYn+Ovg==",
          "tokenBT": "KZZm3N3fCPdxulXUxf6gYK4SlHwdZpeIjcznaCQvJsw=",
          "names": "kTJ/x71dJ6s3j5pnyfqC7w==",
          "lastNames": "B56wR0246uYOB30+whrqbA==",
          "ubigeoDepartment": "19",
          "ubigeoProvince": "1901",
          "ubigeoDistrict": "190108",
          "agency": "350",
          "mode": "2"
      }
      ```
        * Response
      ```
      {
          "code": "0",
          "message": "CONSULTA EXITOSA"
      }
      ```

## 2. /landing-agency

* **GET**

    * **Headers:**
        * token:
            * type: string
            * required: true
            * description: Token de seguridad.
        * token-bt:
            * type: string
            * required: true
            * description: Token de seguridad.

    * **Params:**
        * country:
            * type: string
            * required: true
            * description: Codigo de pais.
        * department:
            * type: string
            * required: true
            * description: Codigo del departamento.
        * province:
            * type: string
            * required: true
            * description: Codigo de provincia.
        * district:
            * type: string
            * required: true
            * description: Codigo de distrito.

    * **Response:**
        * code:
            * type: string
            * description: Codigo de respuesta
        * mesage:
            * type: string
            * description: mensaje de respuesta.
        * agencies:
            * type: array of objects.
            * description: Lista de agencias.
            * object:
                * code:
                    * type: string
                    * description: Código de agencia
                * name:
                    * type: string
                    * description: Nombre de agencia.
                * address:
                    * type: string
                    * description: Dirección de agencia.

    * **Examples:**
        * Path:
      ```
      https://bancamovil-des.confianza.net.pe/landing-agency?country=604&department=19&province=1901&district=190108
      ```
        * Headers:
      ```
      token: Yf2hZQOFdXf4+2OlYn+Ovg==
      token-bt: KZZm3N3fCPdxulXUxf6gYK4SlHwdZpeIjcznaCQvJsw=
      ```
        * Response
      ```
      {
          "code": "0",
          "message": "CONSULTA EXITOSA",
          "agencies": [
              {
                  "code": "223",
                  "name": "EOBP PAUCARTAMBO",
                  "address": "Paucartambo Mz F lote 26"
              },
              {
                  "code": "311",
                  "name": "AG CERRO DE PASCO",
                  "address": "JR. LEONCIO PRADO N° 116"
              },
              {
                  "code": "350",
                  "name": "OF CORRESPONSAL BN PAUCARTAMBO",
                  "address": "JR. 28 DE JULIO  S/N"
              }
          ]
      }
      ```

## 3. /landing-credit-apply

* **POST**

    * **Request:**
        * documentType:
            * type: string
            * required: true
            * description: Tipo de documento.
        * documentNumber:
            * type: string
            * required: true
            * description: Número de documento.
        * phone:
            * type: string
            * required: false
            * description: Número de celular.
        * email:
            * type: string
            * required: false
            * description: Correo electrónico.
        * mode:
            * type: string
            * required: true
            * value: 1

    * **Response:**
        * code:
            * type: string
            * description: Codigo de respuesta
        * message:
            * type: string
            * description: Mensaje de respuesta.
        * token:
            * type: string
            * description: Token de seguridad.
        * tokenBT:
            * type: string
            * description: Token de seguridad.
        * existBT:
            * type: string
            * description: Existe en Ban Total.
        * nameCF:
            * type: string
            * description: Nombre cliente financiera.
        * adviserExists:
            * type: string
            * description: Existe asesor.
            * values: S, N
        * offerExists:
            * type: string
            * description: Existe oferta.
            * values: S, N
        * extensionExists:
            * type: string
            * description: Existe ampliación de la oferta.
            * values: S, N
        * extensionMessage:
            * type: string
            * description: Existe mensaje de la ampliación.
        * approvedLoan:
            * type: string
            * description: Monto del credito aprobado.
        * monthlyFee:
            * type: string
            * description: Cuota mensual.
        * tea:
            * type: string
            * description: Tasa efectiva anual.
        * tcea:
            * type: string
            * description: Tasa de costo efectivo anual.

    * **Examples:**
        * Path:
      ```
      https://bancamovil-des.confianza.net.pe/landing-credit-apply
      ```

        * **Nota: - Examples of Document Numbers:**
            * DNI - CLIENTE - CON OFERTA :
                * encrypted: zy2GtZTf5/CoLHS+wiJ3XQ==
                * decrypted: 43897294
            * DNI - NO CLIENTE :
                * encrypted: ULbiddTEwxzW/cOH3nONfA==
                * decrypted: 78634219

        * Request
      ```
      {
          "documentType": "21",
          "documentNumber": "K4PQT6p7KenZ5N0yDgETNA==",
          "phone": "BBcQcEd75ra4NNRvuume/A==",
          "email": "xqxed9ox96r74cAzOeCB4w==",
          "mode":"1"
      }
      ```
        * Response
      ```
      {
          "code": "0",
          "message": "CONSULTA EXITOSA ",
          "token": "oE3j6NLxOTHYFk4ku65YMQ==",
          "tokenBT": "4m92ocbjfIMjDAPgvtq24rQCUsatVwlUbAn7IsraXRU=",
          "existBT": "N",
          "nameCF": "",
          "adviserExists": "N",
          "offerExists": "N",
          "extensionExists": "N",
          "extensionMessage": "",
          "approvedLoan": "0.00",
          "monthlyFee": "0.00",
          "tea": "0.00",
          "tcea": "0.00"
      }
      ```
* **PUT**

    * **Request:**
        * token:
            * type: string
            * description: Token de seguridad.
        * tokenBT:
            * type: string
            * description: Token de seguridad.
        * names:
            * type: string
            * required: true
            * description: Nombres del cliente.
        * lastNames:
            * type: string
            * required: true
            * description: Apellidos del cliente.
        * ubigeoDepartment:
            * type: string
            * required: false
            * description: Ubigeo de departamento.
        * ubigeoProvince:
            * type: string
            * required: false
            * description: Ubigeo de provincia.
        * ubigeoDistrict:
            * type: string
            * required: true
            * description: Ubigeo de distrito.
        * agency:
            * type: string
            * required: true
            * description: Ubigeo de agencia.
        * amountRequested:
            * type: string
            * required: true
            * description: Importe solicitado.
        * mode:
            * type: string
            * required: true
            * description: Modo

    * **Response:**
        * code:
            * type: string
            * description: Codigo de respuesta
        * message:
            * type: string
            * description: Mensaje de respuesta.

    * **Examples:**
        * Path:
      ```
      https://bancamovil-des.confianza.net.pe/landing-credit-apply
      ```
        * Request
      ```
      {
          "token": "{{token}}",
          "tokenBT":"{{tokenBT}}",
          "names": "GwOh+LzCtP1Cnc5g0bP6MQ==",
          "lastNames": "RbS9TaiQKPtf+7dCSXmEhXRb7VSUeyvDZY1dM3jg9oQ=",
          "ubigeoDepartment": "{{ubigeoDepartamento}}",
          "ubigeoProvince": "{{ubigeoProvincia}}",
          "ubigeoDistrict": "{{ubigeoDitrito}}",
          "agency": "{{agencia}}",
          "amountRequested": "3000",
          "mode":"2"
      }
      ```
        * Response
      ```
      {
          "code": "0",
          "message": "GRACIAS POR REGISTRAR TUS DATOS. TU ASESOR DE NEGOCIOS SE COMUNICARÁ CONTIGO PARA ATENDER TU SOLICITUD."
      }
      ```

## ERROR CODES

* 00001
    * descripción: ERROR EN TOKEN GENERADO.
* 00002
    * descripción: REGISTRO DE DATOS YA EXISTENTE.
* 00003
    * CANTIDAD DE INTENTOS EXCEDIDO.
* 00004
    * CÓDIGO IDENTIFICADOR ÚNICO TRANSACCION YA EXISTE.
* 00005
    * IDENTIFICACIÓN DE CLIENTE NO ENVIADA.
* 00006
    * NOMBRES Y APELLIDOS ES OBLIGATORIO.
* 00007
    * AGENCIA NO EXISTE.
* 00008
    * CÓDIGO DE LA AGENCIA ES OBLIGATORIO.
* 00009
    * DATOS DE UBIGEO NO EXISTE.
* 00010
    * REGISTRO DE ACTUALIZACIÓN NO EXISTE.
* 00011
    * OPCIÓN NO VÁLIDA.
* 00012
    * FORMATO DE FECHA-HORA INVALIDO.
* 00013
    * NÚMERO DE PRODUCTO U OBLIGACIÓN INVALIDO.
* 00014
    * TELÉFONO DEBE EMPEZAR EN 9.
* 00015
    * TELÉFONO NO DEBE TENER LETRAS.
* 00016
    * ERROR EN NÚMERO DE TELÉFONO.
* 00017
    * SÓLO DEBE CONSIDERAR NÚMERO DE CELULAR, 9 DÍGITOS.
* 00018
    * DIRECCIÓN DE CORREO ELECTRÓNICO NO ENVIADA.
* 00019
    * DIRECCIÓN DE CORREO ELECTRÓNICO NO ES VÁLIDA.
* 00020
    * DATOS DE NOMBRES Y APELLIDOS SON INVÁLIDOS.
* 00021
    * LA PERSONA SE ENCUENTRA EN LISTA DE CONTROL RESTRICTIVA.
* 00022
    * ESTIMADO CLIENTE: POR AHORA NO PODEMOS ATENDERTE, POR FAVOR
* 00023
    * ACÉRCATE A UNA DE NUESTRAS OFICINAS.
* 00024
    * GRACIAS POR REGISTRAR TUS DATOS. PRONTO NOS COMUNICAREMOS
* 00025
    * CONTIGO PARA ATENDER TU SOLICITUD.
* 00026
    * TIEMPO DE TOKEN EXPIRADO.
* 00027
    * ESTIMADO(A) <NOMBRE>: YA CUENTAS CON UNA SOLICITUD INGRESADA,
* 00028
    * PRONTO NOS PONDREMOS EN CONTACTO CONTIGO PARA ATENDERTE.

## **Consideraciones Técnicas**

### **Seguridad**

- **Encriptación de datos sensibles**: El proyecto utiliza Crypto-JS para encriptar información personal de los usuarios antes de enviarla al servidor:
  - Número de documento
  - Teléfono
  - Email
  - Nombres
  - Apellidos

- **Sistema de tokens**: La API utiliza un sistema de doble token (`token` y `tokenBT`) para mantener la seguridad de las sesiones.

- **Validaciones**: Implementa validaciones tanto en el frontend (con Vee-Validate y Yup) como en el backend para asegurar la integridad de los datos.

### **Entornos de Despliegue**

El proyecto está configurado para funcionar en diferentes entornos mediante archivos de variables de entorno:

- `.env.dev`: Entorno de desarrollo
- `.env.qa`: Entorno de pruebas/QA
- `.env.production`: Entorno de producción

### **Compilación del Proyecto**

Se utilizan los siguientes comandos para compilar el proyecto:

```bash
# Desarrollo local
yarn dev

# Compilación para producción
yarn build

# Compilación para entorno QA
yarn build-qa

# Compilación para entorno de desarrollo
yarn build-dev
```

### **Analíticas**

El proyecto implementa Google Tag Manager (GTM-WSFPSZN) y Google Analytics (G-9VHNCZ9KSB) para el seguimiento de la interacción de los usuarios con la aplicación.

## **Mantenimiento**

### **Agregar Nuevos Productos**

Para agregar nuevos productos a la plataforma:

1. Actualizar las rutas en `src/router/index.js`
2. Crear los componentes necesarios en la carpeta `views`
3. Actualizar el store de Vuex si es necesario
4. Implementar las llamadas a la API correspondientes

### **Modificación de la API**

Si se realizan cambios en la API, será necesario actualizar:

1. La configuración de Axios en `src/axios.js`
2. Los métodos de encriptación según sea necesario
3. La documentación en este README