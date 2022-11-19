import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string = "EYJHBGCIOIJIUZI1NIISINR5CCI6IKPXVCJ9.EYJ1BMLXDWVFBMFTZSI6IJAYMDIYMJU2MDY0NZZ8VFMWMTAWNDU1NSISINJVBGUIOIJUYXHWYXLLCIISIM5IZII6MTY2ODU4ODAWNSWIZXHWIJOXNJG0MJI2NDA1LCJPYXQIOJE2NJG1ODGWMDUSIMLZCYI6IMLTCG90CY5IAIISIMF1ZCI6IMLTCG90CY5IAIJ9.BUUF5IVSEVSMBWYNFAFBFEOPB6GSKNITRUNQ2IMZCMQ"; // This retrieves a token from local storage
    request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });// This clones HttpRequest and Authorization header with Bearer token added
    request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
 
    return next.handle(request)
        .pipe(
           catchError((error: HttpErrorResponse) => {
                // Catching Error Stage
                if (error && error.status === 401) {
                    console.log("ERROR 401 UNAUTHORIZED") // in case of an error response the error message is displayed
                }
                const err = error.error.message || error.statusText;
                return throwError(error); // any further errors are returned to frontend                    
           })
        );
  }
}
