import React, { useState, useRef, useEffect } from "react";
import { uploadFile } from "./api/uploadFile";
import { saveAs } from "file-saver";

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [results, setResults] = useState<{ link: string; name: string }[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getFiles = () => {
      if (files) files.map((file) => appendFile(file));
    };
    getFiles();
  }, [files]);

  const appendFile = async (file: File) => {
    const data = new FormData();
    data.append("name", file.name);
    data.append("file", file);

    const response = await uploadFile(data);
    setResults((prev) => [
      ...prev,
      { link: response.path, name: response.name },
    ]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    setIsDragOver(false);
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      // console.log(selectedFiles.map((file) => file.size));
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  const copyToClipboard = (link: string) => {
    navigator.clipboard.writeText(link);
  };

  const formatName = (name: string): string => {
    return name.length > 10 ? name.substring(0, 10) + "..." : name;
  };

  const handleDownload = async (url: string, name: string) => {
    try {
      // const response = await fetch(url);
      // const blob = await response.blob();
      saveAs(url, name);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <main className="flex flex-col items-center mt-10 text-center poppins-regular">
      <h1 className="text-2xl font-semibold tracking-widest opacity-80 poppins-medium">
        FILE{"  "}SHARE
      </h1>
      {files.length === 0 ? (
        <div
          className="w-[20rem] h-[20rem] mt-20 border-2 flex justify-center items-center border-gray-400 border-dashed rounded-full cursor-pointer"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <p>
            {isDragOver ? "Drop it like its hot" : " Drag and drop files here"}
          </p>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <ul className="flex flex-col mt-20 space-y-4 w-[24rem]">
          {results.map(({ name, link }, index) => (
            <li
              key={index}
              className="flex items-center justify-between space-x-2"
            >
              <span> {formatName(name)} </span>
              <button onClick={() => handleDownload(link, name)}>
                Download
              </button>
              <span
                className="underline cursor-pointer"
                onClick={() => copyToClipboard(link)}
              >
                Copy
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
