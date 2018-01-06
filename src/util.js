export function catchError(err) {
  window.console.warn(err);
  cc.device.notification.alert(err);
}

export function getMediaStream() {
  return navigator.mediaDevices.getUserMedia({
    // audio: true,
    video: true
  })
  .then(stream => {
    return stream;
  })
  .catch(err => catchError(err));
}

export function getDeviceCategry() {
  navigator.mediaDevices.enumerateDevices()
  .then(devicesObj => {
    return devicesObj;
  })
  .catch(err => catchError(err));
}
