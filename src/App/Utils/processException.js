function processException(dataObject) {
    
    let errorOccured = false;

    let data = dataObject || {};
    data.message = (typeof data.message === 'undefined') ? 'DEFAULT_MESSAGE' : data.message;
    data.methodName = (typeof data.methodName === 'undefined') ? 'DEFAULT_METHOD' : data.methodName;
    data.representError = (typeof data.representError === 'undefined') ?
        function (errorInfo) { alert(errorInfo); } :
        data.representError;

    if (data.message.indexOf('ERROR_FETCH') !== -1) {
        errorOccured = true;
        const errorInfo = data.message.split('|');
        data.representError('can\'t fetch data: ' + errorInfo[1]);
    } else if (data.message.indexOf('ERROR_HTTP') !== -1) {
        errorOccured = true;
        const errorInfo = data.message.split('|');
        data.representError('http error: ' + errorInfo[1]);
    } else {
        let messageObject = JSON.parse(data.message);
        if (messageObject.status === 'error') {
            errorOccured = true;
            const errorInfo = JSON.stringify(messageObject.message);
            data.representError(errorInfo);
        }
    }

    return errorOccured;
}

export default processException;