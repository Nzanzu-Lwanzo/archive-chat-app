import passport from "passport";
import { Strategy } from "passport-local";
import User from "../database/models/users.mjs";
import { validatePassword } from "../utils/passwordsHandler.mjs";

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser(async (uid,done)=>{

    try {

        const user = await User.findByPk(uid);
        if(!user) throw new Error("[404] User not found");
        done(null,{...user.dataValues,password:undefined});

    } catch(e) { done (e,null) }

})

export default passport.use(
    new Strategy({usernameField:"name"},async (username,password,done)=>{

        try {

            const user = await User.findOne({
                where : { name : username }
            })

            if(!user) throw new Error("[404] User not found");

            if(!validatePassword(password,user.password)) throw new Error("[401] Bad credentials");

            done(null,{...user.dataValues,password:undefined});

        } catch(e) { done (e,null) }

    })
)