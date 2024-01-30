import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs";
const CreateEvent = () => {
  const{sessionClaims}=auth();
  const userId=sessionClaims?.userId as string;
  
  return (
    <>
    <section>
      <h3>Create Event</h3>
    </section>
    <div>
      <EventForm userId={userId} type="Create"/>
    </div>
    
    </>
  )
}

export default CreateEvent;
