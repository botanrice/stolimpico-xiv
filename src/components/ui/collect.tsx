import { Switch } from "radix-ui";
import { useState, useEffect } from "react";
import { Track } from "../../types";
import "../../styles/components.css";

interface CollectProps {
  track: Track;
  onCollect: (track: Track) => void;
  hasCollected: (trackId: number) => boolean;
}

export const Collect = ({ track, onCollect, hasCollected }: CollectProps) => {
  const [text, setText] = useState(hasCollected(track.id) ? "claimed" : "tap to claim");

  const handleCheckedChange = (checked: boolean) => {
    onCollect(track);
    setText(checked ? "claimed" : "tap to claim");
  };

  return (
    <div id="claim-wrapper" className="flex justify-center items-center md:justify-start">
      <div id="claim-collectible" className="flex my-4 h-12 max-w-[250px] w-full bg-slate-800 rounded-lg justify-center md:justify-start">
        <Switch.Root
          className="CollectSwitch"
          checked={hasCollected(track.id)}
          onCheckedChange={handleCheckedChange}
          disabled={hasCollected(track.id)}
        >
          <Switch.Thumb className="CollectThumb" />
          <p className="CollectText">{text.toUpperCase()}</p>
        </Switch.Root>
      </div>
    </div>
  );
};

export default Collect;
