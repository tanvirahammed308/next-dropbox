import Dropzone from '@/components/Dropzone';
import { db } from '@/firebase';
import { FileType } from '@/typings';
import { auth } from '@clerk/nextjs';
import { collection, getDocs } from 'firebase/firestore';
import Tablewrapper from '@/components/table/TableWrapper'

const Dashboard = async() => {
    const { userId } = auth();
    const docsResults=await getDocs(collection(db,"user",userId!,"files"));
    // console.log('docsResults',docsResults)
    const skeletonFiles: FileType[]=docsResults.docs.map(doc=>({
        id:doc.id,
            fileName:doc.data().fileName || doc.id,
            timestamp:new Date(doc.data().timestamp?.seconds*1000) || undefined,
            fullName:doc.data().fullName,
            downloadURL:doc.data().downloadURL,
            type:doc.data().type,
            size:doc.data().size
    }))
    
    // console.log(skeletonFiles)
    
    
    
    
   
    
   
    return (
        <div className='border-t'>
          {/* Dashboard(user is {userId}) */}
         <Dropzone/>
         <section className='container space-y-5'>
            <h2 className='font-bold'>All Files</h2>
            <div>
                <Tablewrapper skeletonFiles={skeletonFiles}/>

            </div>
         </section>
        </div>
    );
};

export default Dashboard;




