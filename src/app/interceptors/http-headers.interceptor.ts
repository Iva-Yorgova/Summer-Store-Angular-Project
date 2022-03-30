// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { Observable } from "rxjs";

// @Injectable()
// export class HttpHeadersInterceptor implements HttpInterceptor {
//   constructor() {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     req = req.clone({
//       setHeaders: {
//         'key': '563492ad6f917000010000019ec734fa89f0419482d235630e9dae52',
//         'host': 'api.pexels.com/v1',
//       }
//     });
//     return next.handle(req);
//   }
// }
