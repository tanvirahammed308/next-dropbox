import { useAppStore } from '@/store/store';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from './ui/input';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import toast, { Toaster } from 'react-hot-toast';



const RenameModal = () => {
  const {user}=useUser()
  

  const [fileName,setFileId,setFileName,isRenameModalOpen,setIsRenameModalOpen,fileId
]=useAppStore(state=>[state.fileName,state.setFileId,state.setFileName,state.isRenameModalOpen,state.setIsRenameModalOpen,state.fileId]);

  const [input,setInput]=useState('');

  const renameFile=async()=>{
    if (!user || ! fileId) {
      return;
      
    }
    const toastId=toast.loading('Renaming....')
    await updateDoc(doc(db,'user',user.id,'files',fileId),{
      fileName: input
    })
    toast.success('Renamed successfully',{
      id: toastId
    })
    setInput('')
    setIsRenameModalOpen(false)

  }

  return (
   
      <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen)=>{
        setIsRenameModalOpen(isOpen)
      }}
      
      >
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className='pb-2'>Remane the File</DialogTitle>
          <Input
          id='link'
          defaultValue={'fileName'}
          onChange={(e)=>setInput(e.target.value)}
          onKeyDownCapture={(e)=>{
            if (e.key === 'Enter') {
              renameFile();
              
            }
          }}
          
          />
          <div className='flex justify-end space-x-2 py-3'>
          <Button size={'sm'} className='px-3' variant={'ghost'} onClick={()=>setIsRenameModalOpen(false)}>
            <span className='sr-only'>
              Cancel

            </span>
            <span>
              Cancel
            </span>
          </Button>
          <Button type='submit' size={'sm'} className='px-3'  onClick={()=>renameFile()}>
            <span className='sr-only'>
              Rename

            </span>
            <span>
            Rename
            </span>
          </Button>

          </div>
        </DialogHeader>
        
        
      </DialogContent>
    </Dialog>
      
     
  )
}

export default RenameModal