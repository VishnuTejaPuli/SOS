import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sos',
  template: `
    <button (click)="sendSOS()" [disabled]="isSending">
      {{ isSending ? 'Sending SOS...' : 'SOS' }}
    </button>
  `,
   styles: [`

      
       button:hover {
      
            background-color: gray;
        cursor: not-allowed;
     }

    button {
      background-color: red;
      color: white;
      padding: 15px 30px;
      font-size: 18px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    button:disabled {
      background-color: gray;
      cursor: not-allowed;
    }
  `]
})
export class SosComponent {
  isSending = false;

  constructor(private http: HttpClient) {}


    sendSos(){
      alert('SOS sent successfully!');
    }

  sendSOS() {
    if (navigator.geolocation) {
      this.isSending = true;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationRequest = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            phoneNumbers: ['+916281984822'] // Replace with actual phone numbers
          };

          this.http.post('http://localhost:3456/api/location/share', locationRequest)
            .subscribe(
              () => {
                console.log('SOS sent successfully');
                this.isSending = false;
              },
              (error) => {
                console.error('Error sending SOS', error);
                this.isSending = false;
              }
            );
        },
        (error) => {
          console.error('Error getting location', error);
          this.isSending = false;
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
}