import {pool} from '../db.js'


//Metodo que devuelve todos los empleados
export const getEmployees = async(req,res)=> {
    try {
        const [rows] = await pool.query("SELECT * FROM employee")
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}


//Metodo que trae un empleado especifico
//Parametros: id
export const getEmployeeById = async(req,res)=>{
    try {
        const id = req.params.id
        const [rows] = await pool.query("SELECT * FROM employee WHERE id=?", id)
        res.send(rows[0])
    } catch (error) {
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}


//Metodo que crea un nuevo empleados
//Parametros: name, salary
export const createEmployee =  async(req,res)=> {
   try {
        const {name, salary} =req.body
        const [result] = await pool.query('INSERT INTO employee(name,salary) VALUES(?, ?) ', [name, salary])

        const [rows] = await pool.query("SELECT * FROM employee WHERE id=?",result.insertId)

        res.status(200).json({
            message:"Employee created",
            employee: rows[0]
        })
   } catch (error) {
        return res.status(500).json({
            message:'Something goes wrong'
        })
   }
}

//Metodo que actualiza un empleado
//Parametros: name, salary, id
export const updateEmployee = async(req,res)=>{
    try {
        const {name, salary} = req.body
        const {id} = req.params

        const [result] = await pool.query("UPDATE employee SET name=?, salary=? WHERE id=?", [name,salary,id])
    
        if (result.affectedRows ==0) return res.status(404).json({
            message:"Employee not found"
        })
    
        const [rows] = await pool.query("SELECT * FROM employee WHERE id=?",id)
        res.status(200).json({
            message: "Employee updated",
            employee: rows[0]
        })
    } catch (error) {
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}

    
//Metodo que elimina un empleado
//Parametros: id
export const deleteEmployee = async(req,res)=> {
    try {
        const {id} = req.params
        const [result]= await pool.query("DELETE FROM employee WHERE id=?", id)

        if(result.affectedRows==0) res.status(400).json({message: "Employee not found"})

        res.status(200).json({
            message:"Employee deleted"
        })
    } catch (error) {
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }

}