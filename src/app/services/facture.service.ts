import { Injectable, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FactureService implements OnInit {
  public base: string = 'https://developper.impots.bj/sygmef-emcf/api/';
  public invoice: any
  constructor(private _http: HttpClient, private userservice: AuthService) {
  }

  ngOnInit(): void {

  }
  putFinalize(uid: string) {
    let headers = new HttpHeaders
      ({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer EYJHBGCIOIJIUZI1NIISINR5CCI6IKPXVCJ9.EYJ1BMLXDWVFBMFTZSI6IJAYMDIYMJU2MDY0NZZ8VFMWMTAWNDU1NSISINJVBGUIOIJUYXHWYXLLCIISIM5IZII6MTY2ODU4ODAWNSWIZXHWIJOXNJG0MJI2NDA1LCJPYXQIOJE2NJG1ODGWMDUSIMLZCYI6IMLTCG90CY5IAIISIMF1ZCI6IMLTCG90CY5IAIJ9.BUUF5IVSEVSMBWYNFAFBFEOPB6GSKNITRUNQ2IMZCMQ'
      });
    const options = { headers: headers };
    return this._http.put(`${this.base}invoice/` + uid + `/confirm`, options)
  }
  getInvoiceDetailsDto(uid: string) {
    let headers = new HttpHeaders
      ({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer EYJHBGCIOIJIUZI1NIISINR5CCI6IKPXVCJ9.EYJ1BMLXDWVFBMFTZSI6IJAYMDIYMJU2MDY0NZZ8VFMWMTAWNDU1NSISINJVBGUIOIJUYXHWYXLLCIISIM5IZII6MTY2ODU4ODAWNSWIZXHWIJOXNJG0MJI2NDA1LCJPYXQIOJE2NJG1ODGWMDUSIMLZCYI6IMLTCG90CY5IAIISIMF1ZCI6IMLTCG90CY5IAIJ9.BUUF5IVSEVSMBWYNFAFBFEOPB6GSKNITRUNQ2IMZCMQ',
      });
    const options = { headers: headers };
    return this._http.get(`${this.base}invoice/` + uid, options)
  }
  postInvoiceRequestDto(invoice: any) {
    let headers = new HttpHeaders
      ({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer EYJHBGCIOIJIUZI1NIISINR5CCI6IKPXVCJ9.EYJ1BMLXDWVFBMFTZSI6IJAYMDIYMJU2MDY0NZZ8VFMWMTAWNDU1NSISINJVBGUIOIJUYXHWYXLLCIISIM5IZII6MTY2ODU4ODAWNSWIZXHWIJOXNJG0MJI2NDA1LCJPYXQIOJE2NJG1ODGWMDUSIMLZCYI6IMLTCG90CY5IAIISIMF1ZCI6IMLTCG90CY5IAIJ9.BUUF5IVSEVSMBWYNFAFBFEOPB6GSKNITRUNQ2IMZCMQ',
      });
    const options = { headers: headers };
    return this._http.post(`${this.base}invoice`, invoice, options)
  }
  getStatusResponseDto() {
    let headers = new HttpHeaders
      ({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer EYJHBGCIOIJIUZI1NIISINR5CCI6IKPXVCJ9.EYJ1BMLXDWVFBMFTZSI6IJAYMDIYMJU2MDY0NZZ8VFMWMTAWNDU1NSISINJVBGUIOIJUYXHWYXLLCIISIM5IZII6MTY2ODU4ODAWNSWIZXHWIJOXNJG0MJI2NDA1LCJPYXQIOJE2NJG1ODGWMDUSIMLZCYI6IMLTCG90CY5IAIISIMF1ZCI6IMLTCG90CY5IAIJ9.BUUF5IVSEVSMBWYNFAFBFEOPB6GSKNITRUNQ2IMZCMQ',
      });
    const options = { headers: headers };
    return this._http.get(`${this.base}invoice`, options)
  }
  getInvoiceType() {
    let headers = new HttpHeaders
      ({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer EYJHBGCIOIJIUZI1NIISINR5CCI6IKPXVCJ9.EYJ1BMLXDWVFBMFTZSI6IJAYMDIYMJU2MDY0NZZ8VFMWMTAWNDU1NSISINJVBGUIOIJUYXHWYXLLCIISIM5IZII6MTY2ODU4ODAWNSWIZXHWIJOXNJG0MJI2NDA1LCJPYXQIOJE2NJG1ODGWMDUSIMLZCYI6IMLTCG90CY5IAIISIMF1ZCI6IMLTCG90CY5IAIJ9.BUUF5IVSEVSMBWYNFAFBFEOPB6GSKNITRUNQ2IMZCMQ',
      });
    const options = { headers: headers };
    return this._http.get(`${this.base}` + `info/invoiceTypes`, options)
  }
  getPaymentType() {
    let headers = new HttpHeaders
      ({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer EYJHBGCIOIJIUZI1NIISINR5CCI6IKPXVCJ9.EYJ1BMLXDWVFBMFTZSI6IJAYMDIYMJU2MDY0NZZ8VFMWMTAWNDU1NSISINJVBGUIOIJUYXHWYXLLCIISIM5IZII6MTY2ODU4ODAWNSWIZXHWIJOXNJG0MJI2NDA1LCJPYXQIOJE2NJG1ODGWMDUSIMLZCYI6IMLTCG90CY5IAIISIMF1ZCI6IMLTCG90CY5IAIJ9.BUUF5IVSEVSMBWYNFAFBFEOPB6GSKNITRUNQ2IMZCMQ',
      });
    const options = { headers: headers };
    return this._http.get(`${this.base}` + `info/paymentTypes`, options)
  }
  getTaxGroupsDto() {
    let headers = new HttpHeaders
      ({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer EYJHBGCIOIJIUZI1NIISINR5CCI6IKPXVCJ9.EYJ1BMLXDWVFBMFTZSI6IJAYMDIYMJU2MDY0NZZ8VFMWMTAWNDU1NSISINJVBGUIOIJUYXHWYXLLCIISIM5IZII6MTY2ODU4ODAWNSWIZXHWIJOXNJG0MJI2NDA1LCJPYXQIOJE2NJG1ODGWMDUSIMLZCYI6IMLTCG90CY5IAIISIMF1ZCI6IMLTCG90CY5IAIJ9.BUUF5IVSEVSMBWYNFAFBFEOPB6GSKNITRUNQ2IMZCMQ',
      });
    const options = { headers: headers };
    return this._http.get(`${this.base}` + `info/taxGroups`, options)
  }
  getInfoReponseDto() {
    let headers = new HttpHeaders
      ({
        'Content-Type': 'application/json',
      });
    const options = { headers: headers };
    return this._http.get(`${this.base}` + `info/status`, options)
  }
  generate(invoice: any) {
    console.log(invoice)
    this.postInvoiceRequestDto(invoice).subscribe(
      (res: any) => {
        this.userservice.setDataInLocalStorage('invoiceAmounts', JSON.stringify(res))
        console.log(res)
        var uid = res.uid
        this.getInvoiceDetailsDto(res.uid).subscribe(
          (res: any) => {
            this.userservice.setDataInLocalStorage('invoicePayement', JSON.stringify(res))
            console.log(res)
            this.putFinalize(uid).subscribe(
              (res: any) => {
                this.userservice.setDataInLocalStorage('invoiceSecurity', JSON.stringify(res))
                console.log(res)
              }
            )
          }
        );
      }
    )
  }
  init(){
    this.getInfoReponseDto().subscribe(
      (res: any) => {
        this.userservice.setDataInLocalStorage('invoiceHeader', JSON.stringify(res))
        this.getStatusResponseDto().subscribe(
          (res: any) => {
          }
        )
      }
    );
  };
}
