"use client"

import { db, storage } from '@/firebase';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import DropzoneComponent from 'react-dropzone';
import toast, { Toaster } from 'react-hot-toast';


const Dropzone = () => {
  const [loading, setLoading] = useState(false);
  const {isLoaded,isSignedIn,user}=useUser();
    const maxSize=20971520;
    // from drop zone
    const onDrop=(acceptedFiles: File[])=>{
      acceptedFiles.forEach(file=>{
        const reader =new FileReader();
        reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload =async () => {
        // Do whatever you want with the file contents
      
          await uploadPost(file)
          
        }
        reader.readAsArrayBuffer(file)
      })

    };
    // drop zone end
    const uploadPost=async(selectedFile : File)=>{
       // Check if 'loading' is true
      if (loading) {
            // If loading is true, return without performing any further actions

        return;
      }
      if (!user) {
        return;
        
      }
       // Set loading to true
       const toastId=toast.loading('Updating....')
      setLoading(true)
      // addDoc=>user/user12345/files
      // firebase
      const docRef= await addDoc(collection(db,"user",user.id,"files"),{
        userId:user.id,
        fileName:selectedFile.name,
        fullName:user.fullName,
        profileImg:user.imageUrl,
        timestamp:serverTimestamp(),
        type: selectedFile.type,
        size:selectedFile.size

        

      })
      // firebase end
      // firebase
      const imageRef=ref(storage,`users/${user.id}/files/${docRef.id}`);
      uploadBytes(imageRef,selectedFile).then(async(snapshot)=>{
        const downloadURL=await getDownloadURL(imageRef)
        await updateDoc(doc(db,"user",user.id,"files",docRef.id),{
          downloadURL:downloadURL,
        })

      })
      toast.success('Updating successfully',{
        id: toastId
      })
      // firebase end
      setLoading(false)

    }
    
    return (
        <DropzoneComponent minSize={0} maxSize={maxSize} onDrop={onDrop}>
  {({
    getRootProps,
     getInputProps,
     isDragActive,isDragReject,
     fileRejections}) => {
      // Check if there is at least one file rejection and if the size of the first rejected file is greater than maxSize.

    const isFileTooLarge=fileRejections.length > 0 && fileRejections[0].file.size> maxSize;
    return(
        <section className='m-4'>
          <div {...getRootProps()}  className={cn('w-full h-52 flex flex-col justify-between items-center p-5 cursor-pointer border border-dashed rounded-lg text-center',
          isDragActive ? "bg-blue-500 text-white animate-pulse" :"bg-slate-100/50 text-slate-400 dark:bg-slate-800/80"
          
          )}>
          <input {...getInputProps()} />
          
          {
            !isDragActive && 'click here or drop a file here to upload!!'
             
          }
          {
            isDragActive && !isDragReject && 'Drop a file here to upload!!'
             
          }
          {
            isDragReject && 'File type  not accepted ,sorry!!'
             
          }
          {
            isFileTooLarge && (
                <div className='text-red-500 mt-2 '>
                    File is too large
                </div>
            )
          }
          </div>
        </section>)
     
  }}
</DropzoneComponent>
    );
};

export default Dropzone;







