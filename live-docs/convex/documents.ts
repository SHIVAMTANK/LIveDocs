import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import { title } from "process";

//a write oparation function
//accepts tqo optional string argument
export const create = mutation({
    args:{
        title:v.optional(v.string()),
        initialContent:v.optional(v.string())
    },
    handler:async (ctx,args) => {
        const user = await ctx.auth.getUserIdentity();
        if(!user){
            throw new ConvexError("Unathorized")
        }

        const documentId = await ctx.db.insert("documents",{
            title:args.title ?? "Untitled Document",
            ownerId:user.subject,
            initialContent:args.initialContent,
        });
        return documentId;
    }
})

export const get = query({
    args:{paginationOpts:paginationOptsValidator,search:v.optional(v.string())},
    handler:async (ctx,{search,paginationOpts}) => {

        const user = await ctx.auth.getUserIdentity();

        if(!user){
            throw new ConvexError("unauthorized");
        }

        if(search){
            return await ctx.db
            .query("documents")
            .withSearchIndex("search_title",
                (q)=>q.search("title",search).
            eq("ownerId",user.subject)
        ).paginate(paginationOpts)
        }

        
        return await ctx.db.query("documents")
        .withIndex("by_owner_id",(q)=> q.eq("ownerId",user.subject))
        .paginate(paginationOpts);
    }
})

export const removeById = mutation({
    args:{
        id:v.id("documents")
    },
    handler:async (ctx,args) => {
        const user = await ctx.auth.getUserIdentity();

        if(!user){
            throw new ConvexError("Unathorized");
        }

        const document = await ctx.db.get(args.id);

        if(!document){
            throw new ConvexError("document not found");
        }

        const isOwner = document.ownerId === user.subject;

        if(!isOwner){
            throw new ConvexError("Unathorized");
        }

        return await ctx.db.delete(args.id);
    }
});



export const updateById = mutation({
    args:{
        id:v.id("documents"),
        title: v.string(),
    },
    handler:async (ctx,args) => {
        const user = await ctx.auth.getUserIdentity();

        if(!user){
            throw new ConvexError("Unathorized");
        }

        const document = await ctx.db.get(args.id);

        if(!document){
            throw new ConvexError("document not found");
        }

        const isOwner = document.ownerId === user.subject;

        if(!isOwner){
            throw new ConvexError("Unathorized");
        }

        return await ctx.db.patch(args.id, { title: args.title });

    },
});
