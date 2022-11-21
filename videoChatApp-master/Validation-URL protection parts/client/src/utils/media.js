export const getUserMediaPromise = (mediaConstraints) => {
    const navigatorExtended = navigator;
    const getUserMedia = navigatorExtended.getUserMedia
        || navigatorExtended.webkitGetUserMedia
        || navigatorExtended.mozGetUserMedia;
    return new Promise((resolve, reject) => {
        getUserMedia(mediaConstraints, resolve, reject);
    });
};
