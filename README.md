# newshore-test - Prueba Frontend en Angular

Este es un proyecto de prueba frontend desarrollado en Angular. Proporciona una estructura base para comenzar a construir una aplicación web utilizando el framework Angular.

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado Angular CLI en tu entorno de desarrollo. Puedes instalarlo ejecutando el siguiente comando:
npm install -g @angular/cli

## Instalación

Sigue estos pasos para instalar y configurar el proyecto:

1. Clona este repositorio en tu máquina local:
 ```javascript
   git clone https://github.com/mvykool/newshore-test.git
 ```

3. Navega al directorio del proyecto:
```javascript
    cd test-app
```

3. Instala las dependencias del proyecto:
```javascript
    npm install
```
## Uso

Para ejecutar el proyecto, utiliza el siguiente comando:
```javascript
  ng serve
```
Esto iniciará la aplicación en modo de desarrollo y podrás acceder a ella a través de tu navegador web en [http://localhost:4200](http://localhost:4200).

## Pruebas unitarias

Puedes ejecutar las pruebas unitarias utilizando el siguiente comando:
```javascript
  ng test
```

Esto ejecutará los casos de prueba definidos en el proyecto y mostrará los resultados en la terminal.

## soluciones 

1 - problema: Modelado Clases
He creado este modelo para permitir la exportación de la clase Flight:
```typescript
export class Flight {
  departureStation: string;
  arrivalStation: string;
  flightCarrier: string;
  flightNumber: string;
  price: number;

  constructor(
    departureStation: string,
    arrivalStation: string,
    flightCarrier: string,
    flightNumber: string,
    price: number
  ) {
    this.departureStation = departureStation;
    this.arrivalStation = arrivalStation;
    this.flightCarrier = flightCarrier;
    this.flightNumber = flightNumber;
    this.price = price;
  }
}
```
Esta clase representa un vuelo y tiene las siguientes propiedades:

- departureStation: La estación de salida del vuelo (tipo string).
- arrivalStation: La estación de llegada del vuelo (tipo string).
- flightCarrier: La aerolínea del vuelo (tipo string).
- flightNumber: El número de vuelo (tipo string).
- price: El precio del vuelo (tipo number).
El constructor de la clase permite inicializar todas las propiedades al crear una nueva instancia de Flight.

Puedes utilizar esta clase para representar y trabajar con objetos de vuelo en tu aplicación. Asegúrate de importarla en los archivos donde la necesites.

#
2 - problema: Consumo REST API

Utilicé la primera URL por propositos de simplicidad, creé un servicio para llamar a la API:

Primero, importé las dependencias necesarias en mi servicio. Usé Injectable del paquete @angular/core para decorar mi servicio y poder inyectarlo en otros componentes de la aplicación.
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from '../models/flight.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private baseUrl = environment.apiUrl1;

  constructor(private http: HttpClient) { }

  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.baseUrl}/flights/0`);
  }
}
```
- Luego, utilicé un componente de formulario para obtener las entradas del usuario y realizar la llamada a la API basada en esas entradas.

