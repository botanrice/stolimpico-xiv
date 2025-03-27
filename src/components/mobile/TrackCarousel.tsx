import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Track } from "@/types"
import { TrackDisplay } from '../desktop/TrackDisplay';
import Collect from "../ui/collect";

interface TrackCarouselProps {
  tracks: Track[];
  onCollect: (track: Track) => void;
  hasCollected: (trackId: number) => boolean;
}

export const TrackCarousel = ({ tracks, onCollect, hasCollected }: TrackCarouselProps) => {
  return (
    <Carousel id="carousel" className="w-full max-w-xs" opts={{ align: "center", "loop": true}}>
      <CarouselContent id="carousel-content">
        {tracks.map((currentTrack, index) => (
          <CarouselItem key={index} id="carousel-item">
            {/* If currentTrack is the full album (id: 99) then don't show Collect (& inventory?)
             and show extended links instead of typical track display */}
            <TrackDisplay 
              track={currentTrack} 
              isActive={index === 0} 
              isMobile={true} 
            />
            {/* Claim Collectible */}
            {currentTrack.id !== 99 && ( 
              <Collect 
                track={currentTrack}
                onCollect={() => onCollect(currentTrack)}
                hasCollected={() => hasCollected(currentTrack.id)}
              />
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};