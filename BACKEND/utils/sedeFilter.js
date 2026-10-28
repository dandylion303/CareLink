export const profileFilter = (user)=>{
    if(user.role==='admin'){
        return {}
    }else{
        return {sede:user.sede}
    }
}