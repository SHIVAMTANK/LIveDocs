"use client";

import { cn } from "@/lib/utils";
import useEditorStore from "@/store/use-editor-store";

import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ChevronDownIcon,
  HighlighterIcon,
  ImageIcon,
  ItalicIcon,
  Link2Icon,
  ListCollapseIcon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  MinusIcon,
  PlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SearchIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
  UploadCloudIcon,
} from "lucide-react";
import React, { useState } from "react";
import { checkText } from "@/services/spell-checker";
import SpellCheckResults from "@/components/spell-check-results";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { type Level } from "@tiptap/extension-heading";
import { type ColorResult,SketchPicker } from "react-color";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LineHeightButton = () => {
  const { editor } = useEditorStore();
  const [open, setIsOpen] = useState(false);

  const lineHeights = [
    { label: "Default", value: "normal" },
    { label: "Single", value: "1" },
    { label: "1.15", value: "1.15" },
    { label: "1.5", value: "1.5" },
    { label: "Double", value: "2" },
  ];

  return (
    <DropdownMenu open={open} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="h-10 w-10 shrink-0 flex flex-col items-center justify-center rounded-md hover:bg-neutral-200/80 px-2 overflow-hidden text-base">
          <ListCollapseIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {lineHeights.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setLineHeight(value).run()}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.getAttributes("paragraph").lineHeight === value &&
                "bg-neutral-200/80"
            )}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontSizeButton = () => {
  const { editor } = useEditorStore();
  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

    // like 18px use only 18 that's why replace
  const [fontSize, setFontSize] = useState(currentFontSize);

  const [inputValue, setInputValue] = useState(fontSize);

  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  };
  const decrement = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  return (
    <div className="flex items-center gap-x-0.5">
      <button
        onClick={decrement}
        className="h-10 w-10 shrink-0 flex items-center justify-center rounded-md hover:bg-neutral-200/80"
      >
        <MinusIcon className="size-4" />
      </button>
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="h-10 w-10 text-sm border border-neutral-400 text-center rounded-sm bg-transparent focus:outline-none focus:ring-0"
        />
      ) : (
        <button
          onClick={() => {
            setIsEditing(true);
            setFontSize(currentFontSize);
          }}
          className="h-10 w-10 text-sm border border-neutral-400 text-center rounded-sm hover:bg-neutral-200/80"
        >
          {currentFontSize}
        </button>
      )}

      <button
        onClick={increment}
        className="h-10 w-10 shrink-0 flex items-center justify-center rounded-md hover:bg-neutral-200/80"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
};

const ListButton = () => {
  const { editor } = useEditorStore();
  const [open, setIsOpen] = useState(false);

  const lists = [
    {
      label: "Bullet List",
      icon: ListIcon,
      isActive: () => editor?.isActive("bulletList"),
      onclick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Ordered List",
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive("orderedList"),
      onclick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ];

  return (
    <DropdownMenu open={open} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="h-10 w-10 shrink-0 flex flex-col items-center justify-center rounded-md hover:bg-neutral-200/80 px-2 overflow-hidden text-base">
          <ListIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {lists.map(({ label, icon: Icon, onclick, isActive }) => (
          <button
            key={label}
            onClick={onclick}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              isActive() && "bg-neutral-200/80"
            )}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const AlignButton = () => {
  const { editor } = useEditorStore();
  const [open, setIsOpen] = useState(false);

  const alignments = [
    {
      label: "Align Left",
      value: "left",
      icon: AlignLeftIcon,
    },
    {
      label: "Align Center",
      value: "center",
      icon: AlignCenterIcon,
    },
    {
      label: "Align Right",
      value: "right",
      icon: AlignRightIcon,
    },
    {
      label: "Align Justify",
      value: "justify",
      icon: AlignJustifyIcon,
    },
  ];

  return (
    <DropdownMenu open={open} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="h-10 w-10 shrink-0 flex flex-col items-center justify-center rounded-md hover:bg-neutral-200/80 px-2 overflow-hidden text-base">
          <AlignLeftIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {alignments.map(({ label, value, icon: Icon }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.isActive({ textAlign: value }) && "bg-neutral-200/80"
            )}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ImageButton = () => {
  const { editor } = useEditorStore();
  const [imgUrl, setImgUrl] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl);
      }
    };
    input.click();
  };

  const handleImageUrlSubmit = () => {
    if (imgUrl) {
      onChange(imgUrl);
      setImgUrl("");
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-10 w-10 shrink-0 flex flex-col items-center justify-center rounded-md hover:bg-neutral-200/80 px-2 overflow-hidden text-base">
            <ImageIcon className="size-4" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem onClick={onUpload}>
            <UploadCloudIcon className="size-4 mr-2" />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            <SearchIcon className="size-4 mr-2" />
            Paste image url
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert image URL</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Insert image URL"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleImageUrlSubmit();
              }
            }}
          />
          <DialogFooter>
            <Button onClick={handleImageUrlSubmit}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useState("");
  const [open, setIsOpen] = useState(false);

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue("");
  };

  return (
    <DropdownMenu
      open={open}
      onOpenChange={(isOpen) => {
        setIsOpen(isOpen);
        if (isOpen) {
          setValue(editor?.getAttributes("link").href || "");
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button className="h-10 w-10 shrink-0 flex flex-col items-center justify-center rounded-md hover:bg-neutral-200/80 px-2 overflow-hidden text-base">
          <Link2Icon className="size-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="px-2.5 py-3 flex items-center gap-x-2">
        <Input
          className="h-12"
          placeholder="https://example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          className="h-12"
          onClick={() => {
            onChange(value);
            setIsOpen(false);
          }}
        >
          Apply
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HighlightColorButton = () => {
  const { editor } = useEditorStore();
  const value = editor?.getAttributes("highlight").color || "#FFFFFF";
  const [open, setIsOpen] = useState(false);

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="h-10 w-10 shrink-0 flex flex-col items-center justify-center rounded-md hover:bg-neutral-200/80 px-2 overflow-hidden text-base">
          <HighlighterIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="border-none p-2">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TextColorButton = () => {
  const { editor } = useEditorStore();
  const value = editor?.getAttributes("textStyle").color || "#000000";
  const [open, setIsOpen] = useState(false);

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="h-10 w-10 shrink-0 flex flex-col items-center justify-center rounded-md hover:bg-neutral-200/80 px-2 overflow-hidden text-base">
          <span className="text-lg">A</span>
          <div className="h-1 w-6" style={{ backgroundColor: value }}></div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="border-none p-2">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HeadingLevelButton = () => {
  const { editor } = useEditorStore();
  const [isOpen, setIsOpen] = useState(false);

  const heading = [
    { label: "Normal", value: 0, fontSize: "16px" },
    { label: "Heading 1", value: 1, fontSize: "32px" },
    { label: "Heading 2", value: 2, fontSize: "24px" },
    { label: "Heading 3", value: 3, fontSize: "20px" },
    { label: "Heading 4", value: 4, fontSize: "18px" },
    { label: "Heading 5", value: 5, fontSize: "16px" },
  ];
  const getCUrrentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive(`heading${level}`)) {
        return `Heading ${level}`;
      }
    }
    return "Normal";
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex items-center justify-center  rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate">{getCUrrentHeading()}</span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {heading.map(({ label, value, fontSize }) => (
          <button
            key={value}
            style={{ fontSize }}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1  rounded-sm  hover:bg-neutral-200/80",
              (value === 0 && !editor?.isActive("heading")) ||
                (editor?.isActive("heading", { level: value }) &&
                  "bg-neutral-200/80")
            )}
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: value as Level })
                  .run();
              }
              setIsOpen(false);
            }}
          >
            {label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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
    { label: "Lucida Sans", value: "Lucida Sans" },
  ];

  return (
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
        {fonts.map(({ label, value }) => (
          <button
            onClick={() => {
              editor?.chain().focus().setFontFamily(value).run();
              setIsOpen(false);
            }}
            key={value}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1  rounded-sm  hover:bg-neutral-200/80",
              editor?.getAttributes("textStyle").fontFamily === value &&
                "bg-neutral-200/80"
            )}
            style={{ fontFamily: value }}
          >
            <span className="truncate">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
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
        onClick: () => editor?.chain().focus().addPendingComment().run(),
        isActive: editor?.isActive("liveblocksCommentMark"),
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
        <FontSizeButton />
        <Separator orientation="vertical" className="h-6 bg-neutral-300" />
        {section[1].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))}
        <TextColorButton />
        <HighlightColorButton />
        <Separator orientation="vertical" className="h-6 bg-neutral-300" />
        <LinkButton />
        <ImageButton />
        <AlignButton />
        <LineHeightButton />
        <ListButton />
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