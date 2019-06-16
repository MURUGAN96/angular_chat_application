import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class TextAnalyse {

  reqUrl = 'https://api.aylien.com/api/v1/sentiment';
    constructor(private http: HttpClient) {}
    private setHeaders(): HttpHeaders {
      const headersConfig = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-AYLIEN-TextAPI-Application-Key': '0c26e88cba2755643170c120bd4ce3c0',
        'X-AYLIEN-TextAPI-Application-ID': '8a70e48c'
      };
      return new HttpHeaders(headersConfig);
    }

    public httpPost(data){
    let tempInfo = [];
    tempInfo['text'] = data;
    tempInfo['mode'] = 'document';


    return this.http.post(this.reqUrl, tempInfo, {
      headers: this.setHeaders(),
      withCredentials: true
    });
  }

}
