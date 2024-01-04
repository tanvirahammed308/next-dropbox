import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main >
      
{/* <h1>Dropbox</h1> */}
<div className="flex flex-col lg:flex-row items-center  bg-slate-600 dark:bg-green-700">
<div className="text-center p-10 flex flex-col space-y-5 bg-slate-600 dark:bg-green-700">
  <h1 className="text-5xl font-bold py-2">Welcome to Dropbox</h1>
  <h5 className="pb-5">Storing everything for you and your bussiness needs.All in one place</h5>
  <p>Welcome to Dropbox – your all-in-one solution for seamless storage and collaboration. Store and access your files securely in one central hub, whether for personal organization or business collaboration. With an intuitive interface and robust features, Dropbox simplifies your digital life. Effortlessly sync files across devices and enhance productivity by collaborating with ease. Experience the convenience of having everything in one place, backed by strong security measures. Welcome to a more efficient and organized way of managing your files  welcome to Dropbox.</p>
  
  <Link href={'/dashboard'} className="flex bg-blue-500  w-fit p-2  rounded-md">Try it for free!!
  <ArrowRight className="ml-2"/>
  </Link>
  
  


</div>
<div className="p-10 h-full">
<video autoPlay loop muted className="rounded-lg">
  <source src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4" type="video/mp4" />
  
  Your browser does not support the video tag.
</video>


</div>
</div>



<p className="text-center font-bold text-xl pt-5">
Disclaimer:
</p>
<p className="text-center font-light p-2">
The information provided herein is for general informational purposes only and should not be considered as professional advice. While we strive to keep the information accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the content contained herein. Any reliance you place on such information is therefore strictly at your own risk.
</p>

      

      
    </main>
  )
}
