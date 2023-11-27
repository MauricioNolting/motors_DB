const RepairsServices = require("./repairs.services");




exports.findAll = async(req, res) => {

  
    const findAllRepairs = await RepairsServices.findAll()
  
    return res.status(200).json({
      findAllRepairs,
    });
  };
  
  exports.create = async(req, res) => {
    const {userId} = req.body;
   
  
   const date = new Date()

   const newRepair = await RepairsServices.create({date, userId});
  
   
     return res.status(201).json({
       data: newRepair,
     });
     
   };
  
   exports.findOne = async(req, res) => {
     const { id } = req.params;
  
     const findOne = await RepairsServices.findOne(id)
  
       if (!findOne){
           return res.status(404).json({
               status: 'error',
               message: `User id: ${id} not found`
           })
       }
  
     return res.status(200).json({
      findOne
     });
   };
  
   exports.update = async(req, res) => {
     const { id } = req.params;
     const status = "completed"
     
     const repairsFindOne = await RepairsServices.findOneCompleted(id)

  

    if (repairsFindOne.status === "completed"){
        return res.status(404).json({
            status: "error",
            message: `User id: ${id} status: "completed"`
        })
    }

    if (!repairsFindOne) {
        return res.status(404).json({
            status: "error",
            message: `User id: ${id} not found`
        })
    }
  
   const repairsUpdate = await RepairsServices.update(repairsFindOne, { status })
  
     return res.status(200).json({
       message: "method update(patch)",
        repairsUpdate
     });
   };
  
  
  
   exports.deleteUser = async(req, res) => {
     const { id } = req.params;
  
     const repairsFindOne = await RepairsServices.findOne(id)
  
     if (!repairsFindOne) {
       return res.status(404).json({
           status: "error",
           message: `User id: ${id} not found`
       })
   }
  
      await RepairsServices.delete(userFindOne)
    
     return res.status(204).json(null)
}
