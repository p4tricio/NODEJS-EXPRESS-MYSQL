import { pool } from '../db.js'

export const getEmployees = async (req,res)=> {
    try {
        const [rows] = await pool.query('SELECT * FROM employee')
        console.log("Se han obtenido todos los registros de la tabla 'employee'")
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    }
}

export const getEmployee = async (req,res)=>{
    try {
        const id = req.params.id
        console.log("Se ha consultado por el ID: "+ id)
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])
        if (rows.length <= 0) return res.status(404).json({
            "message" : "No se ha encontrado empleado"
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    } 
}

export const createEmployee = async (req,res)=> {
    try {
        const {name,salary} = req.body
        const [rows] = await pool.query('INSERT INTO employee (name,salary) VALUES(?,?)',[name,salary])
        console.log("Se creado un registro!")
        console.log("ID: " + rows.insertId + " NAME: " + name + " SALARY: " + salary)
        res.send({
            "message" : "Se ha creado un registro",
            "id" : rows.insertId,
            "name" : name,
            "salary" : salary
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    } 
}

export const updateEmployee = async (req,res)=> {
    try {
        const id = Number(req.params.id)
        const {name,salary} = req.body
        const [rows] = await pool.query('UPDATE employee SET name= IFNULL(?,name), salary=IFNULL(?,salary) WHERE id=?',[name,salary,id])
        if (rows.affectedRows == 0) return res.status(404).json({
            "message" : "No se ha encontrado empleado ID: " + id
        })
        res.send({
            "message" : "Se ha actualizado el registro",
            "id" : id,
            "name" : name,
            "salary": salary
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    }
}

export const deleteEmployee = async (req,res)=> {
    try {
        const id = req.params.id
        console.log("Se quiere eliminar el ID: "+id)
        const [rows] = await pool.query('DELETE FROM employee WHERE id = ?',[id])
        if (rows.affectedRows == 0) return res.status(404).json({
            "message" : "No se ha encontrado empleado ID: " + id
        })
        console.log("Se ha eliminado el ID: "+id)
        res.send({
            "message" : "Se ha eliminado un registro",
            "id" : id
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    }
}

