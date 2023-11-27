const UsersServices = require("./user.service");

exports.findAll = async(req, res) => {


  const findAllUsers = await UsersServices.findAll()

  return res.status(200).json({
    findAllUsers,
  });
};

exports.create = async(req, res) => {
  const { name, email, password, role } = req.body;

  const existUserName = await UsersServices.findOneNameOrEmail(name)
  if (existUserName) {
    return res.status(409).json({
      status: 'error',
      message: `The name: ${name} already exist` 
  })
  
}

const existUserEmail = await UsersServices.findOneNameOrEmail(email)
  if (existUserEmail) {
    return res.status(409).json({
      status: 'error',
      message: `The email: ${email} already exist` 
  })
}


  if (role !== "client" && role !== "employee" ){
    return res.status(404).json({
        status: 'error',
        message: `The role: ${role} is not found. The role has to be "client" or "employee"` 
    })
  }
  const newUser = await UsersServices.create({name, email, password, role});



  return res.status(201).json({
    data: newUser
  });
};


exports.findOne = async(req, res) => {
  const { id } = req.params;

  const findOne = await UsersServices.findOne(id)

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
  const { name, email} = req.body 
  const userFindOne = await UsersServices.findOne(id)

  if (!userFindOne){
    return res.status(404).json({
        status: 'error',
        message: `User id: ${id} not found`
    })
}

const userUpdate = await UsersServices.update(userFindOne, { name, email})

  return res.status(200).json({
    message: "method update(patch)",
    userUpdate
  });
};



exports.deleteUser = async(req, res) => {
  const { id } = req.params;

  const userFindOne = await UsersServices.findOne(id)

  if (!userFindOne) {
    return res.status(404).json({
        status: "error",
        message: `User id: ${id} not found`
    })
}

   await UsersServices.delete(userFindOne)
  
  return res.status(204).json(null)
};
