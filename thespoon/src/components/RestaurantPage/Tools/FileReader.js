// Taken from https://gist.github.com/iansinnott/3d0ba1e9edc3e6967bc51da7020926b0

import {Observable} from "rxjs";

/**
 * Read the text contents of a File or Blob using the FileReader interface.
 * This is an async interface so it makes sense to handle it with Rx.
 * @param {blob} File | Blob
 * @return Observable<string>
 */
export const readFileURL = (blob) => Observable.create((obs) => {
    if (!(blob instanceof Blob)) {
        obs.error(new Error("'blob' must be an instance of File or Blob."));
        return;
    }

    const reader = new FileReader();

    reader.onerror = (err) => {return obs.error(err)};
    reader.onabort = (err) => {return obs.error(err)};
    reader.onload = () => {return obs.next(reader.result)};
    reader.onloadend = () => {return obs.complete()};

    return reader.readAsDataURL(blob);
});