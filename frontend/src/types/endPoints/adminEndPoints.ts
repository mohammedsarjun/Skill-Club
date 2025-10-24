const adminRouterEndPoints ={
    //auth
    adminLogin:"admin/login",
    me:"admin/me",
    logout:"admin/logout",
    //category
    adminCreateCategory:"/admin/categories",
    adminGetCategories:"/admin/categories",
    adminUpdateCategory:"/admin/categories",

    //Specialities
    adminCreateSpeciality:"/admin/speciality",
    adminGetSpeciality:"/admin/speciality",
    adminUpdateSpeciality:"/admin/speciality",

    //skills
    adminCreateSkills:"/admin/skill",
    adminGetSkills:"/admin/skill",
    adminUpdateSkill:"/admin/skill",

    //users
    adminGetUserStats:"/admin/users-stats",
    adminUser:"/admin/users",
    adminUserDetail:"/admin/user",
    adminUserStatusUpdate:"/admin/user/updateStatus"

}

export default adminRouterEndPoints