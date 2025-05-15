import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateUser=mutation({
    args:{
        name:v.string(),
        email:v.string()
    },
    handler: async (ctx,args)=>{

        //if user already exist
        const userData = await ctx.db.query('users')
        .filter(q=>q.eq(q.field('email'),args.email))
        .collect();

        //if not exist (new user) add userData
        if(userData?.length==0)
        {
            const data = {
                name:args.name,
                email:args.email,
                credits:1000
            }
            const result=await ctx.db.insert('users',{
                ...data
            });
            
            return data;
        }
        return userData[0]
    }
})