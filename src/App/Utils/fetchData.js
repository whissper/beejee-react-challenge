async function fetchData(params) {

    const {url, action, data, sendMethod, searchParams} = params;

    let response = null;

    const getParams = (sendMethod === 'GET' ? searchParams : {developer: searchParams.developer});
    const urlSearchParams = new URLSearchParams(getParams);
    const completedURL = url + action + '?' + urlSearchParams.toString();

    const formData = new FormData();

    for (const name in data) {
        formData.append(name, data[name]);
    }

    try {
        if (sendMethod === 'GET') {
            response = await fetch(completedURL);
        } else {
            response = await fetch(completedURL, {
                method: 'POST',
                credentials: 'omit',
                body: formData
            });
        }
    } catch (error) {
        return 'ERROR_FETCH|' + error;
    }

    if (response.ok) {
        const text = await response.text();
        return text;
    } else {
        return 'ERROR_HTTP|' + response.status + ' -- ' + response.statusText;
    }
}

export default fetchData;
