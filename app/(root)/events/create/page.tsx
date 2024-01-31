import EventForm from "@/components/shared/EventForm"
import { auth } from "@clerk/nextjs";
import './style.css'
const CreateEvent = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  console.log(userId);
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h2 className="wrapper h3-bold text-center sm:text-left" >Create Event</h2>
      </section>

      <div className="wrapper my-8">
        <EventForm userId={userId} type="Create" />
      </div>
    </>
  )
}

export default CreateEvent