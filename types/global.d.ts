declare interface AnyObject {
  [key: string]: unknown;
}

declare interface Window {
  $message: any;
  $dialog: any;
  $notification: any;
  $loading: any;
}

declare interface ResponseData {
  code: number;
  message: string;
  data: any;
}

declare interface PaginationQuery {
  pageNumber: number;
  pageSize: number;
  [key: string]: any;
}
