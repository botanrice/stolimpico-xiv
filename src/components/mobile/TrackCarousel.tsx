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
  toggleDrawer: () => void;
}

export const TrackCarousel = ({ tracks, onCollect, hasCollected, toggleDrawer }: TrackCarouselProps) => {
  return (
    <Carousel id="carousel" className="w-full max-w-xs" opts={{ align: "center", "loop": true}}>
      <CarouselContent id="carousel-content">
        {tracks.map((currentTrack, index) => (
          <CarouselItem key={index} id="carousel-item" className="flex flex-col justify-between">
            <TrackDisplay 
              track={currentTrack} 
              isActive={index === 0} 
              isMobile={true} 
              toggleDrawer={toggleDrawer}
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