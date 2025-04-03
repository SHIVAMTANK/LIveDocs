"use client"

import { cn } from "@/lib/utils";
import useEditorStore from "@/store/use-editor-store";
import { log } from "console";
import { on } from "events";
import { BoldIcon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquare, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon } from "lucide-react";
import { useState } from "react";
import { checkText } from "@/services/spell-checker";
import SpellCheckResults from "@/components/spell-check-results";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon:LucideIcon
}

const ToolbarButton = ({onClick, isActive, icon:Icon}: ToolbarButtonProps)=>{
    return(
        <button
            onClick={onClick}
           className={cn(
            "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
            isActive && "bg-neutral-200/80"
           )}
        >
            <Icon className="size-5"/>
        </button>
    )
}

export const Toolbar = () => {
    const {editor} = useEditorStore();
    const [misspelledWords, setMisspelledWords] = useState<Array<{
        word: string, 
        index: number, 
        suggestions: string[],
        isProperNoun: boolean
    }>>([]);
    const [isSpellCheckOpen, setIsSpellCheckOpen] = useState(false);

    const handleSpellCheck = () => {
        if (!editor) return;
        
        const content = editor.getHTML();
        // Remove HTML tags for spell checking
        const textContent = content.replace(/<[^>]*>/g, ' ');
        
        const results = checkText(textContent);
        setMisspelledWords(results);
        setIsSpellCheckOpen(true);
    };

    const handleReplaceWord = (originalWord: string, newWord: string) => {
        if (!editor) return;
        
        // Replace all occurrences of the word in the editor
        const content = editor.getHTML();
        const newContent = content.replace(new RegExp(originalWord, 'g'), newWord);
        editor.commands.setContent(newContent);
        
        // Update the misspelled words list
        setMisspelledWords(prev => 
            prev.filter(item => item.word !== originalWord)
        );
    };

    const handleIgnoreWord = (word: string) => {
        // Remove the word from the misspelled words list
        setMisspelledWords(prev => 
            prev.filter(item => item.word !== word)
        );
    };

    const section:{
        label:string,
        icon:LucideIcon,
        onClick:()=>void,
        isActive?:boolean
    } [][]= [
        [
            {
                label:"Undo",
                icon:Undo2Icon,
                onClick:()=>editor?.chain().focus().undo().run(),
            },
            {
                label:"Redo",
                icon:Redo2Icon,
                onClick:()=>editor?.chain().focus().redo().run(),
            }
            ,
            {
                label:"Print",
                icon:PrinterIcon,
                onClick:()=>window.print()
            },
            {
                label:"Spell Check",
                icon:SpellCheckIcon,
                onClick: handleSpellCheck
            }
        ],
        [
            {
                label:"Bold",
                icon:BoldIcon,
                isActive:editor?.isActive("bold"),
                onClick:()=>editor?.chain().focus().toggleBold().run(),
            },
            {
                label:"Italic",
                icon:ItalicIcon,
                isActive:editor?.isActive("italic"),
                onClick:()=>editor?.chain().focus().toggleItalic().run()
            },
            {
                label:"Underline",
                icon:UnderlineIcon,
                isActive:editor?.isActive("underline"),
                onClick:()=>editor?.chain().focus().toggleUnderline().run()
            },
        ],
        [
            {
                label:"Comment",
                icon:MessageSquarePlusIcon,
                isActive:false,
                onClick:()=>console.log("comment")
                
            },
            {
                label:"List Todo",
                icon:ListTodoIcon,
                isActive:editor?.isActive("taskList"),
                onClick:()=>editor?.chain().focus().toggleTaskList().run()   
            },
            {
                label:"Remove Formatting",
                icon:RemoveFormattingIcon,
                onClick:()=>editor?.chain().focus().unsetAllMarks().run(),
                
            }
        ]
    ];
    return (
        <>
            <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
                {section[0].map((item)=>(
                   <ToolbarButton key={item.label} {...item}/>
                ))}
                <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
                {/* TODO: font family */}
                <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
                {/* TODO: Heading */}
                <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
                {/* TODO: font size */}
                <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
               {section[1].map((item)=>(
                <ToolbarButton key={item.label} {...item}/>
               ))}
               {/* todo text color */}
               {/* todo highlight color */}
               <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
               {/* todo link */}
               {/* todo image */}
               {/* align */}
               {/* line height*/}
               {/* list */}
               {section[2].map((item)=>(
                <ToolbarButton key={item.label} {...item}/>
               ))}
             
              
              
            </div>
            
            <Dialog open={isSpellCheckOpen} onOpenChange={setIsSpellCheckOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <SpellCheckResults 
                        misspelledWords={misspelledWords}
                        onReplaceWord={handleReplaceWord}
                        onIgnoreWord={handleIgnoreWord}
                    />
                </DialogContent>
            </Dialog>

        </>
    )
}

export default Toolbar;