import { Switch } from "radix-ui";
import { useState, useEffect } from "react";
import { Track } from "../../types";
import { useInventory } from "../../hooks/useInventory";
import "../../styles/components.css";

interface CollectProps {
  track: Track;
  onCollect: (track: Track) => void;
  hasCollected: (trackId: number) => boolean;
}

export const Collect = ({ track, onCollect, hasCollected }: CollectProps) => {
  const [text, setText] = useState("claim");

  const handleCheckedChange = (checked: boolean) => {
    onCollect(track);
    setText(checked ? "claimed" : "claim");
  };

  return (
    <div id="claim-wrapper" className="flex justify-center items-center md:justify-start">
      <div id="claim-collectible" className="flex my-4 h-12 max-w-[250px] w-full bg-slate-800 rounded-lg justify-center md:justify-start">
        <Switch.Root
          className="CollectSwitch"
          checked={hasCollected(track.id)}
          onCheckedChange={handleCheckedChange}
        >
          <Switch.Thumb className="CollectThumb" />
          <p className="CollectText">{text.toUpperCase()}</p>
        </Switch.Root>
      </div>
    </div>
  );
};

export default Collect;
