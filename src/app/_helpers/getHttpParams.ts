import { HttpParams } from '@angular/common/http';


export const GetHttpParams = (params: Array<any>): HttpParams => {
  let res = new HttpParams();

  for (const item of params)
    res = res.append(item.key, item.value);

  return res;
};
