import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class calendarioService {
  private apiUrl = 'https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1';
  
  // Tu token pegado exactamente
  private accessToken = 'ya29.a0AT3oNZ8Q_zOc3z2zZnHX9risHzj4ZvrRS90hcYmfmo0UOP2b7ng_FP9lhx1l4_bclLCpgPiS62jxc9xHZHUDzS2qpgKVQerwGRHdaHXz4wM_A2aStSrp0ZQl-F7UBubixwWLpOJK4RconU77FM2ISxKm4k8zVaTtXoTeoT3cblQllFZKN3Ln-72Ba-wMCGKbs7vJFV0aCgYKAX4SARISFQHGX2MirrV1Lx0wtBKXbhwmw_BGPQ0206'; 

  constructor(private http: HttpClient) { }

  // Actualiza los parámetros para recibir el rol
  crearCita(fechaInicio: string, fechaFin: string, rol: string): Observable<any> {
    const payload = {
      summary: `Cita con ${rol}`, // El título ahora será dinámico
      start: { dateTime: new Date(fechaInicio).toISOString() },
      end: { dateTime: new Date(fechaFin).toISOString() },
      conferenceData: {
        createRequest: { requestId: Math.random().toString(36).substring(7) }
      }
    };

    return new Observable(observer => {
      fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + this.accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(async response => {
        const data = await response.json();
        if (!response.ok) throw data;
        observer.next(data);
        observer.complete();
      })
      .catch(err => observer.error(err));
    });
  }
}