declare interface AnyObject {
  [key: string]: unknown;
}

declare interface Window {
  $message: any;
  $dialog: any;
  $notification: any;
  $loading: any;
}
