import Event, { IEvent } from '@/lib/database/models/event.model';
import { formatDateTime } from '@/lib/utils';
import { auth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { DeleteConfirmation } from './DeleteConfirmation';

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const isEventCreator = userId === event.organizer?._id.toString();

  return (
    <div>
      {/* Corrected Link usage */}
      <Link href={`/events/${event._id}`}>
        {/* Added a container div for styling */}
        <div style={{ backgroundImage: `url(${event.image_url})` }}>
          {/* Add content inside the Link component if needed */}
        </div>
      </Link>

      {isEventCreator && !hidePrice && (
        <div>
          {/* Corrected Link usage */}
          <Link href={`/events/${event._id}`}>
            <Image src="/assets/icons/edit.svg" alt="edit" height={20} width={20} />
          </Link>
          <DeleteConfirmation eventId={event._id} />
        </div>
      )}

      <div>
        {!hidePrice && (
          <div>
            <span>{event.Free ? 'Free' : `$${event.price}`}</span>
            <p>{event.category?.name}</p>
          </div>
        )}
      </div>

      <div>
        <p>{event.Start_date_time && formatDateTime(event.Start_date_time).dateTime}</p>

        {/* Corrected Link usage */}
        <Link href={`/events/${event._id}`}>
          <p>{event.title}</p>
        </Link>

        <div>
          <p>
            {event.organizer?.firstName} {event.organizer?.lastName}
          </p>
          {hasOrderLink && (
            <Link href={`/orders?eventId=${event._id}`}>
              <p>Order Details</p>
              <Image src="/assets/icons/arrow.svg" alt="search" width={10} height={10} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
