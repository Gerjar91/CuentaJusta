


export const addUser = (dataUser: {}) => {
   
   return {
      type: "ADD_USER",
      payload: dataUser
   }
}



export const removeUser = (user:String) => {
   return {
      type: "REMOVE_USER",
      payload: user
   }
}

export const calculateAcounts = () => {
   return {
      type: "CALCULATE_ACOUNTS",
   }
}
export const removeAllUsers = () => {
   return {
      type: "REMOVE_ALL_USERS",
   }
}


