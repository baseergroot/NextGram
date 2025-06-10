"use client"
import { FileInput, Label } from "flowbite-react";
import { useState } from "react";

export default function Create() {
  
  return (
    <>
      <Label className="mb-2 block" htmlFor="file-upload">
        Upload file
      </Label>
      <FileInput id="file-upload"/>
    </>
  );
}
