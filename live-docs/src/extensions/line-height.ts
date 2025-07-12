import { Extension } from "@tiptap/react";

//this tells typescript that we are adding new commands to the tiptap core
//setlineheight  and unsetlineheight are new commands
declare module "@tiptap/core"{
    interface Commands<ReturnType>{
        lineHeight:{
            setLineHeight : (lineHeight:string) => ReturnType
            unsetLineHeight:()=>ReturnType

        }
    }
}

export const LineHeightExtension = Extension.create({
    name:"lineHeight",
    //this extension is only use for paragraph and heading
    //and default line height is normal
    addOptions(){
        return{
            types:["paragraph","heading"],
            defaultLineHeight:"normal",
        }
    },
    addGlobalAttributes(){
        return[
            {
                // comes from addoptions
                types:this.options.types,
                attributes:{
                    lineHeight:{
                        default:this.options.defaultLineHeight,
                        renderHTML:attributes=>{
                            if(!attributes.lineHeight) return {}
                            return {
                                style:`line-height:${attributes.lineHeight}`,
                            }   
                        },
                        parseHTML:element=>{
                            return element.style.lineHeight || this.options.defaultLineHeight
                        }
                    }
                }
            }
        ]
    },
    // this all the proseMirror utilities
    // {tr,state,dispatch} is the arguments passed to the commands
    // tr is the transaction
    // state is the state of the document
    // dispatch is the function to dispatch the transaction
    addCommands(){
        return {
            setLineHeight:(lineHeight:string)=>({ tr,state,dispatch})=>{
                const {selection} = state;
                
                //grabs the current selection in the editor and applies it to the transaction
                tr = tr.setSelection(selection);

                //this is the range of the selection start and end
                const {from ,to} = selection;
                state.doc.nodesBetween(from,to,(node,pos)=>{
                    if(this.options.types.includes(node.type.name)){
                        tr = tr.setNodeMarkup(pos,undefined,{
                            ...node.attrs,
                            lineHeight
                        })
                    }
                })
                if(dispatch) dispatch(tr)
                    return true;
            },
            unsetLineHeight:()=>({tr,state,dispatch})=>{
                const {selection} = state;
                 tr = tr.setSelection(selection);


                 const {from ,to} = selection;
                 state.doc.nodesBetween(from,to,(node,pos)=>{
                    if(this.options.types.includes(node.type.name)){
                        tr = tr.setNodeMarkup(pos,undefined,{
                            ...node.attrs,
                            lineHeight:this.options.defaultLineHeight
                        })
                    }
                 })

                 if(dispatch) dispatch(tr)
                    return true;
            }
        }
    }
});