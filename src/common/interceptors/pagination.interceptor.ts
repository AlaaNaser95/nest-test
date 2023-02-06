import { ExecutionContext, Injectable, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class PaginationInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    return next.handle().pipe(
      map((response) => {
        const page = parseInt(req.query.page ?? 1);
        const limit = parseInt(req.query.limit ?? 10);
        const totalPages = Math.ceil(response.count / limit);
        const splitedUrl = req.url.split("?");
        const baseURL =
          (process.env.APP_HOST || "localhost:3000") + splitedUrl[0];
        const queryParams =
          splitedUrl.length > 1
            ? "&" +
              splitedUrl[1]
                .split("&")
                .filter(
                  (value: string) =>
                    !value.startsWith("page") && !value.startsWith("limit")
                )
                .join("&")
            : "";
        const res = {
          data: response.data,
          extraData: response.extraData ?? null,
          pageInfo: {
            totalCount: response.count,
            itemCount: response.length,
            itemsPerPage: limit,
            currentPage: page,
            totalPages: totalPages,
            links: {
              first: `${baseURL}?page=1&limit=${limit}${queryParams}`,
              last: `${baseURL}?page=${totalPages}&limit=${limit}${queryParams}`,
              next:
                page + 1 <= totalPages
                  ? `${baseURL}?page=${page + 1}&limit=${limit}${queryParams}`
                  : "",
              previous:
                page - 1
                  ? `${baseURL}?page=${page - 1}&limit=${limit}${queryParams}`
                  : "",
            },
          },
        };
        return res;
      })
    );
  }
}
