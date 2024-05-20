import { pool } from "./Conexion DB/conection-db.js";

// Sintaxis de una clase en javascript
class CD_Employee {

    //sintaxis de un metodo asincrono
    async getEmployees() {
        var message = "";
        var rows;
        try {
            // Tu código asíncrono aquí, por ejemplo, una operación de base de datos
            [rows] = await pool.query("SELECT * FROM employee");
        } catch (error) {
            message = "Algo salió mal en CD";
            rows = [];
        }
        return { message:message, rows:rows };
    }
}

// Exporta la clase CD_Employee para que pueda ser importada en otros archivos.
export default CD_Employee;

// export const getEmployees = async (req, res) => {
//   try {
//     const [rows] = await pool.query("SELECT * FROM employee");
//     res.json(rows);
//   } catch (error) {
//     return res.status(500).json({ message: "Something goes wrong" });
//   }
// };