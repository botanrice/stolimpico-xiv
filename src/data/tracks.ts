import { Track } from '../types';

export const tracks: Track[] = [
  {
    id: 1,
    title: "c2c",
    audioFile: "https://boriceexposed.s3.us-east-1.amazonaws.com/stolimpico-xiv/c2c.mp3",
    coverArt: "/assets/images/cover_c2c.png",
    collectibleImage: "/assets/images/collectible_c2c.png"
  },
  {
    id: 2,
    title: "sayin",
    audioFile: "https://boriceexposed.s3.us-east-1.amazonaws.com/stolimpico-xiv/sayin.mp3",
    coverArt: "/assets/images/cover_sayin.png",
    collectibleImage: "/assets/images/collectible_sayin.png"
  },
  {
    id: 3,
    title: "spaace",
    audioFile: "https://boriceexposed.s3.us-east-1.amazonaws.com/stolimpico-xiv/spaace.mp3",
    coverArt: "/assets/images/cover_spaace.png",
    collectibleImage: "/assets/images/collectible_spaace.png"
  },
  {
    id: 4,
    title: "aimhigher",
    audioFile: "https://boriceexposed.s3.us-east-1.amazonaws.com/stolimpico-xiv/aimhigher.mp3",
    coverArt: "/assets/images/cover_aimhigher.png",
    collectibleImage: "/assets/images/collectible_aimhigher.png"
  }
];

export const albumTrack: Track = {
  id: 99,
  title: "STOLIMPICO XIV",
  audioFile: "",
  coverArt: "/assets/images/cover_sto45.png",
  collectibleImage: "/assets/images/collectible_sto45.png"
}

export const allTracks = [albumTrack, ...tracks];

export const albumArt = "/assets/images/cover_sto45.png";