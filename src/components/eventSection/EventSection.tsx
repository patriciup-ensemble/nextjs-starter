export type EventItem = {
    title: string;
    date: string;
    description: string;
    image?: { url: string };
    images?: { url: string }[];
    url?: string;
    isFeatured?: boolean;
  };
  
  type Props = {
    title: string;
    events: EventItem[];
    layout?: 'stacked' | 'left-image' | 'right-image';
  };
  
'use client';

import { useState } from 'react';

export default function EventsSection({ title, events, layout = 'stacked' }: Props) {
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{ [key: number]: number }>({});
  
  // Sort events to put featured event first
  const sortedEvents = [...events].sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return 0;
  });
    const renderEventContent = (ev: EventItem) => (
      <div className="p-4">
        <h5 className="mb-2">{ev.title}</h5>
        <div className="text-muted mb-3">{ev.date}</div>
        <p className="mb-3">{ev.description}</p>
        {ev.url && (
          <a href={ev.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            Learn More
          </a>
        )}
      </div>
    );

    const renderImageSlider = (ev: EventItem, eventIndex: number) => {
      if (!ev.images || ev.images.length === 0) return null;

      const currentIndex = currentImageIndexes[eventIndex] || 0;

      const nextImage = () => {
        setCurrentImageIndexes(prev => ({
          ...prev,
          [eventIndex]: (currentIndex + 1) % ev.images!.length
        }));
      };

      const prevImage = () => {
        setCurrentImageIndexes(prev => ({
          ...prev,
          [eventIndex]: (currentIndex - 1 + ev.images!.length) % ev.images!.length
        }));
      };

      return (
        <div className="position-relative">
          <img 
            src={ev.images[currentIndex].url} 
            alt={ev.title} 
            className="img-fluid w-100 h-auto"
            style={{ objectFit: 'cover' }}
          />
          {ev.images.length > 1 && (
            <div className="position-absolute bottom-0 end-0 p-3">
              <div className="d-flex gap-2">
                <button 
                  className="btn btn-sm btn-dark opacity-75"
                  onClick={prevImage}
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span className="text-white">‹</span>
                </button>
                <button 
                  className="btn btn-sm btn-dark opacity-75"
                  onClick={nextImage}
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span className="text-white">›</span>
                </button>
              </div>
            </div>
          )}
        </div>
      );
    };

    const renderEventImage = (ev: EventItem, eventIndex: number) => {
      // Use slider for featured events with multiple images
      if (ev.isFeatured && ev.images && ev.images.length > 1) {
        return renderImageSlider(ev, eventIndex);
      }
      
      // For featured events with single image in images array, use first image
      if (ev.isFeatured && ev.images && ev.images.length === 1) {
        return (
          <img 
            src={ev.images[0].url} 
            alt={ev.title} 
            className="img-fluid w-100 h-auto"
            style={{ objectFit: 'cover' }}
          />
        );
      }
      
      // For featured events with no images array, fall back to single image
      if (ev.isFeatured && ev.image) {
        return (
          <img 
            src={ev.image.url} 
            alt={ev.title} 
            className="img-fluid w-100 h-auto"
            style={{ objectFit: 'cover' }}
          />
        );
      }
      
      // For non-featured events, use single image
      return ev.image && (
        <img 
          src={ev.image.url} 
          alt={ev.title} 
          className="img-fluid w-100 h-auto"
          style={{ objectFit: 'cover' }}
        />
      );
    };

    const renderEvent = (ev: EventItem, index: number) => {
      // Featured event always uses stacked layout
      if (ev.isFeatured) {
        return (
          <div className="col-12 mb-5" key={index}>
            <div className="bg-dark rounded overflow-hidden">
              {renderEventImage(ev, index)}
              {renderEventContent(ev)}
            </div>
          </div>
        );
      }
      
      // For non-featured events, alternate between left-image and right-image
      // Determine alternating pattern based on position among non-featured events
      const nonFeaturedEvents = sortedEvents.filter(event => !event.isFeatured);
      const nonFeaturedIndex = nonFeaturedEvents.findIndex(event => event === ev);
      const isLeftImage = nonFeaturedIndex % 2 === 0;
      
      if (isLeftImage) {
        // Left image layout
        return (
          <div className="col-12 mb-5" key={index}>
            <div className="row g-0 bg-dark rounded overflow-hidden">
              <div className="col-md-6">
                {renderEventImage(ev, index)}
              </div>
              <div className="col-md-6 d-flex align-items-center">
                {renderEventContent(ev)}
              </div>
            </div>
          </div>
        );
      } else {
        // Right image layout
        return (
          <div className="col-12 mb-5" key={index}>
            <div className="row g-0 bg-dark rounded overflow-hidden">
              <div className="col-md-6 d-flex align-items-center order-2 order-md-1">
                {renderEventContent(ev)}
              </div>
              <div className="col-md-6 order-1 order-md-2">
                {renderEventImage(ev, index)}
              </div>
            </div>
          </div>
        );
      }
    };

    return (
      <section id="events" className="p-5 bg-dark text-white">
        <div className="container">
          <h2 className="mb-4 text-center">{title}</h2>
          <div className="row">
            {sortedEvents.map((ev, i) => renderEvent(ev, i))}
          </div>
        </div>
      </section>
    );
  }
  