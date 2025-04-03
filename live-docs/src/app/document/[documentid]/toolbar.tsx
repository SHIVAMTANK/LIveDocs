"use client";

import { cn } from "@/lib/utils";
import useEditorStore from "@/store/use-editor-store";
import { log } from "console";
import { on } from "events";
import {
  BoldIcon,
  ChevronDownIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquare,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { useState } from "react";
import { checkText } from "@/services/spell-checker";
import SpellCheckResults from "@/components/spell-check-results";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {type Level } from "@tiptap/extension-heading";

const HeadingLevelButton = () => {
  const {editor} = useEditorStore();
  const [isOpen, setIsOpen] = useState(false);
  
  const heading = [
    {label: "Normal", value: 0,fontSize: "16px"},
    {label: "Heading 1", value: 1,fontSize: "32px"},
    {label: "Heading 2", value: 2,fontSize: "24px"},
    {label: "Heading 3", value: 3,fontSize: "20px"},
    {label: "Heading 4", value: 4,fontSize: "18px"},
    {label: "Heading 5", value: 5,fontSize: "16px"},
  ]
  const getCUrrentHeading = () =>{
    for(let level = 1;level <= 5;level++){
      if(editor?.isActive(`heading${level}`)){
        return `Heading ${level}`;
      }
    }
    return "Normal";
  }

  return(
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex items-center justify-center  rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
            <span className="truncate">
              {getCUrrentHeading()}
            </span>
            <ChevronDownIcon className="ml-2 size-4 shrink-0" />
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
            {
                heading.map(({label,value,fontSize})=>(
                    <button 
                    key={value}
                    style={{fontSize}}
                    className={cn(
                        "flex items-center gap-x-2 px-2 py-1  rounded-sm  hover:bg-neutral-200/80",
                       (value === 0 && !editor?.isActive("heading")) || editor?.isActive("heading",{level:value}) && "bg-neutral-200/80"
                       )}
                     
                       
                       onClick={()=>{
                        if(value === 0){
                            editor?.chain().focus().setParagraph().run();
                        }
                        else{
                            editor?.chain().focus().toggleHeading({level:value as Level}).run();
                        }
                        setIsOpen(false);
                       }}
                    >
                        
                    {label}
                    </button>
                ))
            }
        </DropdownMenuContent>
    </DropdownMenu>
  )
}


const FontFamilyButton = () => {
  const { editor } = useEditorStore();
  const [isOpen, setIsOpen] = useState(false);

  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Courier New", value: "Courier New" },
    { label: "Verdana", value: "Verdana" },
    { label: "Georgia", value: "Georgia" },
    { label: "Garamond", value: "Garamond" },
    { label: "Palatino", value: "Palatino" },
    { label: "Bookman", value: "Bookman" },
    { label: "Comic Sans MS", value: "Comic Sans MS" },
    { label: "Impact", value: "Impact" },
    { label: "Lucida Sans Unicode", value: "Lucida Sans Unicode" },
    { label: "Geneva", value: "Geneva" },
    { label: "Lucida Console", value: "Lucida Console" },
    { label: "Monaco", value: "Monaco" },
    { label: "Brush Script MT", value: "Brush Script MT" },
    { label: "Trebuchet MS", value: "Trebuchet MS" },
    { label: "Helvetica", value: "Helvetica" },
    { label: "Tahoma", value: "Tahoma" },
    { label: "Arial Black", value: "Arial Black" },
    { label: "Gill Sans", value: "Gill Sans" },
    { label: "Lucida Sans", value: "Lucida Sans" }
  ];

  return(
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
            <button className="h-7 w-[120px] shrink-0 flex items-center justify-between  rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
            <span className="truncate">
               {editor?.getAttributes("textStyle").fontFamily || "Arial"}
            </span>
            <ChevronDownIcon className="ml-2 size-4 shrink-0" />
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
            {
                fonts.map(({label, value})=>(
                   <button 
                   onClick={()=>{
                    editor?.chain().focus().setFontFamily(value).run();
                    setIsOpen(false);
                   }}
                   key={value}
                   className={cn(
                    "flex items-center gap-x-2 px-2 py-1  rounded-sm  hover:bg-neutral-200/80",
                    editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80"
                   )}
                   style={{fontFamily: value}}
                   >
                    <span className="truncate">{label}</span>
                   </button>
                ))
            }
        </DropdownMenuContent>
    </DropdownMenu>
  )
};

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80"
      )}
    >
      <Icon className="size-5" />
    </button>
  );
};

export const Toolbar = () => {
  const { editor } = useEditorStore();
  const [misspelledWords, setMisspelledWords] = useState<
    Array<{
      word: string;
      index: number;
      suggestions: string[];
      isProperNoun: boolean;
    }>
  >([]);
  const [isSpellCheckOpen, setIsSpellCheckOpen] = useState(false);

  const handleSpellCheck = () => {
    if (!editor) return;

    const content = editor.getHTML();
    // Remove HTML tags for spell checking
    const textContent = content.replace(/<[^>]*>/g, " ");

    const results = checkText(textContent);
    setMisspelledWords(results);
    setIsSpellCheckOpen(true);
  };

  const handleReplaceWord = (originalWord: string, newWord: string) => {
    if (!editor) return;

    // Replace all occurrences of the word in the editor
    const content = editor.getHTML();
    const newContent = content.replace(new RegExp(originalWord, "g"), newWord);
    editor.commands.setContent(newContent);

    // Update the misspelled words list
    setMisspelledWords((prev) =>
      prev.filter((item) => item.word !== originalWord)
    );
  };

  const handleIgnoreWord = (word: string) => {
    // Remove the word from the misspelled words list
    setMisspelledWords((prev) => prev.filter((item) => item.word !== word));
  };

  const section: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: handleSpellCheck,
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        isActive: editor?.isActive("underline"),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        isActive: false,
        onClick: () => console.log("comment"),
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        isActive: editor?.isActive("taskList"),
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];
  return (
    <>
      <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
        {section[0].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))}
        <Separator orientation="vertical" className="h-6 bg-neutral-300" />
        <FontFamilyButton />
        <Separator orientation="vertical" className="h-6 bg-neutral-300" />
        <HeadingLevelButton />
        <Separator orientation="vertical" className="h-6 bg-neutral-300" />
        {/* TODO: font size */}
        <Separator orientation="vertical" className="h-6 bg-neutral-300" />
        {section[1].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))}
        {/* todo text color */}
        {/* todo highlight color */}
        <Separator orientation="vertical" className="h-6 bg-neutral-300" />
        {/* todo link */}
        {/* todo image */}
        {/* align */}
        {/* line height*/}
        {/* list */}
        {section[2].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))}
      </div>

      <Dialog open={isSpellCheckOpen} onOpenChange={setIsSpellCheckOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Spell Check</DialogTitle>
          <SpellCheckResults
            misspelledWords={misspelledWords}
            onReplaceWord={handleReplaceWord}
            onIgnoreWord={handleIgnoreWord}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Toolbar;
