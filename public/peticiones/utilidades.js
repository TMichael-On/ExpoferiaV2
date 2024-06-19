class Utilidades {

    async fetchResultGuardar(ruta, data, isFormData = false) {
        try {
            const headers = {};
            let bodyData

            if (isFormData) {
                // headers['Content-Type'] = 'multipart/form-data';
                bodyData = new FormData();
                for (const key in data) {
                    bodyData.append(key, data[key]);
                }
            } else {
                headers['Content-Type'] = 'application/json';
                bodyData = JSON.stringify(data);
            }

            const response = await fetch(`/${ruta}`, {
                method: 'POST',
                headers: headers,
                body: bodyData
            });
            if (response.redirected) {
                window.location.href = response.url;
            }
            const jsonResult = await response.json();
            console.log(jsonResult)
            return jsonResult;
        } catch (error) {
            console.error('Error al obtener respuesta de la API:', error);
            throw error;
        }
    };

    async fetchResultListar(ruta) {
        try {
            // const token = localStorage.getItem('token');
            const headers = { 'Content-Type': 'application/json' };

            // if (token) {
            //     headers['Authorization'] = `Bearer ${token}`;
            // }
            const response = await fetch(`/${ruta}`, {
                method: 'GET',
                headers: headers,
            });
            const jsonResult = await response.json();
            return jsonResult;
        } catch (error) {
            console.error('Error al obtener respuesta de la API:', error);
            throw error;
        }
    };

    async fetchResultVer(ruta, id) {
        try {
            // debugger
            // const token = localStorage.getItem('token');
            const headers = { 'Content-Type': 'application/json' };

            // if (token) {
            //     headers['Authorization'] = `Bearer ${token}`;
            // }
            const response = await fetch(`/${ruta}/${id}`, {
                method: 'GET',
                headers: headers
            });
            const jsonResult = await response.json();
            return jsonResult;
        } catch (error) {
            console.error('Error al procesar la petición:', error);
            throw error;
        }
    };

    async fetchResultEditar(ruta, id, data, isFormData = false) {
        try {
            const headers = {};
            let bodyData

            if (isFormData) {
                // headers['Content-Type'] = 'multipart/form-data';
                bodyData = new FormData();
                for (const key in data) {
                    bodyData.append(key, data[key]);
                }
            } else {
                headers['Content-Type'] = 'application/json';
                bodyData = JSON.stringify(data);
            }
            const response = await fetch(`/${ruta}/${id}`, {
                method: 'PATCH',
                headers: headers,
                body: bodyData
            });
            const jsonResult = await response.json();
            return jsonResult;
        } catch (error) {
            console.error('Error al procesar la petición:', error);
            throw error;
        }
    };

    async fetchResultEliminar(ruta, id) {
        try {
            // debugger
            // const token = localStorage.getItem('token');
            const headers = { 'Content-Type': 'application/json' };

            // if (token) {
            //     headers['Authorization'] = `Bearer ${token}`;
            // }
            const response = await fetch(`/${ruta}/${id}`, {
                method: 'DELETE',
                headers: headers
            });
            const jsonResult = await response.json();
            return jsonResult;
        } catch (error) {
            console.error('Error al procesar la petición:', error);
            throw error;
        }
    };
}

export default Utilidades