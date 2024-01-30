"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input";
import { eventFormSchema } from "@/lib/validator"
import * as z from 'zod'
import { eventDefaultValues } from "@/constants"
import Dropdown from "./Dropdown"
import { Textarea } from "@/components/ui/textarea"
import {FileUploader} from "./FileUploader"
import { useState } from "react"
import Image from "next/image"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "@/components/ui/checkbox"
import { start } from "repl"
import {useUploadThing} from '@/lib/uploadthing'
import { useRouter } from "next/navigation"
import { createEvent, updateEvent } from "@/lib/actions/event.actions"
import { IEvent } from "@/lib/database/models/event.model"
import './style.css';

type EventFormProps={
  userId:string,
  type:"Create"|"Update"
  event?:IEvent,
  eventId?:string
}

const EventForm = ({ userId, type,event,eventId }: EventFormProps) => {
  const initialValues = event && type==='Update'
  ? { ...event
    ,Start_date_time:new Date(event.Start_date_time || 0),
    endDateTime:new Date(event.end_date_time || 0)}
  : eventDefaultValues;
  const [files, setFiles] = useState<File[]>([]);

  const router = useRouter();

  const { startUpload } = useUploadThing('imageUploader');

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    let uploadedImageUrl = values.imageUrl;
    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }
      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === 'Create') {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: '/profile',
        });

        if (newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`);
        }
      } catch (error) {
        console.error("Error creating event:", error);
      }
    }
    if (type === 'Update') {
      if(!eventId){
        router.back();
        return;
      }
      try {
        const updatedEvent = await updateEvent({
          userId,
          event: { ...values, imageUrl: uploadedImageUrl,
            _id:eventId },
          
          path: '/events/${eventId}',
        });

        if (updatedEvent) {
          form.reset();
          router.push(`/events/${updatedEvent._id}`);
        }
      } catch (error) {
        console.error("Error creating event:", error);
      }
    }
  }
  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md" id="eventForm">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col formContainer"
        >
          <div className="spaceY4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Event Title"
                      {...field}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <br />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Dropdown
                      onChangeHandler={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="spaceY4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Add details about the event" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileUploader
                      onFieldChange={field.onChange}
                      imageUrl={field.value}
                      setFiles={setFiles}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="spaceY4">
            <FormField
            
              control={form.control}
              name="location"
              render={({ field }) => (
              <FormItem id="location" className="location-input">
                <FormControl>
                  <div className="input-with-icon">
                    <Image
                      src="/assets/icons/location-grey.svg"
                      alt="calendar"
                      width={24}
                      height={24}
                      className="input-icon"
                    />
                    <Input placeholder="        Event location or Online" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
              )}
            />
          </div>

          <div className="spaceY4">
            <FormField
              control={form.control}
              name="startDateTime"
              render={({ field }) => (
<FormItem className="date-input">
  <FormControl>
    <div className="date-input-container">
      <Image
        src="/assets/icons/calendar.svg"
        alt="calendar"
        width={24}
        height={24}
        className="date-icon"
      />
      <div className="date-picker-container">
        <p>Start Date:</p>
        <DatePicker
          selected={field.value}
          onChange={(date: Date) => field.onChange(date)}
          showTimeSelect
          timeInputLabel="Time:"
          dateFormat="MM/dd/yyyy h:mm aa"
          wrapperClassName="datePicker"
        />
      </div>
    </div>
  </FormControl>
  <FormMessage />
</FormItem>

              )}
            />

            <FormField
              control={form.control}
              name="endDateTime"
              render={({ field }) => (
              <FormItem className="date-input">
                <FormControl>
                  <div className="date-input-container">
                    <Image
                      src="/assets/icons/calendar.svg"
                      alt="calendar"
                      width={24}
                      height={24}
                      className="date-icon"
                    />
                    <div className="date-picker-container">
                      <p>End Date:</p>
                      <DatePicker
                        selected={field.value}
                        onChange={(date: Date) => field.onChange(date)}
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        wrapperClassName="datePicker"
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>

              )}
            />
          </div>

          <div className="spaceY4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <Image
                        src="/assets/icons/dollar.svg"
                        alt="price"
                        width={24}
                        height={24}
                      />
                      <input type="number" placeholder="price" />
                      <FormField
                        control={form.control}
                        name="isFree"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div>
                                <label htmlFor="isFree">Free Ticket</label>
                                <Checkbox
                                  onCheckedChange={field.onChange}
                                  checked={field.value}
                                  id="isFree"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <Image
                        src="/assets/icons/link.svg"
                        alt="link"
                        width={24}
                        height={24}
                      />
                      <Input placeholder="URL" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitted}
          >
            {form.formState.isSubmitting ? 'Submitting...' : `${type} Event`}
          </Button>
        </form>
      </Form>
    </div>
  );
};


export default EventForm;
