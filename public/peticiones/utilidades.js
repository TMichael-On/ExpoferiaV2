class Utilidades {    

    async fetchResultGuardar(ruta, data) {
        try {
            // const token = localStorage.getItem('token');
            const headers = { 'Content-Type': 'application/json' };

            // if (token) {
            //     headers['Authorization'] = `Bearer ${token}`;
            // }
            const response = await fetch(`/${ruta}`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            });
            const jsonResult = await response.json();
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
            const headers = {'Content-Type': 'application/json'};
    
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

    async fetchResultEditar(ruta, id, data) {        
        try {
            // debugger
            // const token = localStorage.getItem('token');
            const headers = {'Content-Type': 'application/json'};
    
            // if (token) {
            //     headers['Authorization'] = `Bearer ${token}`;
            // }
            const response = await fetch(`/${ruta}/${id}`, {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify(data)
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
            const headers = {'Content-Type': 'application/json'};
    
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