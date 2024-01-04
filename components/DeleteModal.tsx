'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { db, storage } from "@/firebase";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import toast, { Toaster } from 'react-hot-toast';



export function DeleteModal() {
  const {user}=useUser()
    const [isDeleteModalOpen,setFileId,setFileName,setIsDeleteModalOpen,setIsRenameModalOpen,fileId
  
  
    ]=useAppStore(state=>[state.isDeleteModalOpen,state.setFileId,state.setFileName,state.setIsDeleteModalOpen,state.setIsRenameModalOpen,state.fileId]);

    async function deleteFile() {
      if (!user || !fileId) {
        return;
        
      }
      const toastId=toast.loading('Deleting....')
      const fileRef= ref(storage,`users/${user.id}/files/${fileId}`)
      try{
        await deleteObject(fileRef).then(async ()=>{
          console.log('Deleted File')
          toast.success('Deleted successfully',{
            id: toastId
          })
          deleteDoc(doc(db,'user',user.id,'files',fileId))
        })
        .finally(()=>{
          setIsDeleteModalOpen(false)

        })

      }
     
      catch(error){
       console.log(error)
      }
      setIsDeleteModalOpen(false)
        
    }
   
  
  return (
    <Dialog
    open={isDeleteModalOpen}
    onOpenChange={(isOpen)=>{
        setIsDeleteModalOpen(isOpen)
    }}
    
    >
      {/* <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          {/* <DialogTitle>Share link</DialogTitle> */}
          <DialogDescription className="text-red-500 text-center font-bold text-2xl">
            {/* Anyone who has this link will be able to view this. */}
            Are you sure ? to delete it
          </DialogDescription>
        </DialogHeader>
        {/* <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="https://ui.shadcn.com/docs/installation"
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div> */}
        <div className="flex  space-x-2 py-3">
            <Button 
            size={'sm'}
            className="px-3 flex-1"
            variant={'ghost'}
            onClick={()=>setIsDeleteModalOpen(false)}
            
            
            >
                <span className="sr-only">
                    Cancel
                </span>
                <span>
                    Cancel
                </span>

            </Button>
            <Button 
            type="submit"
            size={'sm'}
            className="flex flex-1"
            onClick={()=>deleteFile()}
            variant={'destructive'}
            
            >
                <span className="sr-only">
                    Delete
                </span>
                <span>Delete</span>

            </Button>
          
        </div>
        <DialogFooter className="sm:justify-start">
          {/* <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
