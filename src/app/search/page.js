"use client";
import axios from "axios";
import { TextInput } from "flowbite-react";
import { useEffect, useState } from "react";

export default function Search() {
  const [searchInput, setSearchInput] = useState("");
  const inputHandler = (e) => {
    const value = e.target.value; //  capture current input
    setSearchInput(value);
    
      console.log("search: ", { searchInput: value });
      axios
        .post("/api/search", searchInput)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err.message));
    }

  return (
    <div className="flex w-full flex-col gap-4 px-10 py-5">
      <TextInput
        className=""
        id="email1"
        type="text"
        value={searchInput}
        placeholder="Search"
        required
        onChange={inputHandler}
      />
    </div>
  );
}
 
