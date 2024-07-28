import { useFetchDocByUser } from "@/hooks/query.hook";
import { File } from "lucide-react";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Separator } from "../ui/separator";
import Link from "next/link";

const Search = () => {
  const { data: documents } = useFetchDocByUser();
  const [value, setValue] = useState();
  const onValueChange = (value) => {
    if (value.trim() === "") {
      setValue();
      return;
    }
    setValue(value);
  };
  return (
    <div className="relative w-[50%]">
      <Command
        className="rounded-lg border "
        onChange={(e) => onValueChange(e.target.value)}
      >
        <CommandInput placeholder="Type a command or search..." />

        <CommandList
          className={`absolute top-12 bg-white w-full border rounded-lg border-zinc-300 z-[9999]  ${
            value ? "" : "hidden"
          }`}
        >
          <CommandGroup heading="Documents">
            {documents?.map((document) => {
              return (
                <>
                  <CommandItem className={"relative z-[99999] cursor-pointer"}>
                    
                    <File className="mr-2 h-4 w-4" />
                    <span>{document.title}</span>
                
                  </CommandItem>
                  <Separator />
                </>
              );
            })}
          </CommandGroup>

          <CommandEmpty>No Documents to Show</CommandEmpty>
        </CommandList>
      </Command>
    </div>
  );
};

export default Search;
