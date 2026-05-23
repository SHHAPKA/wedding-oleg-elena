import { CouplePhotoSection } from "@/components/sections/CouplePhotoSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { InvitationSection } from "@/components/sections/InvitationSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { MusicPlayer } from "@/components/MusicPlayer";
import { RSVPSection } from "@/components/sections/RSVPSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { WishesSection } from "@/components/sections/WishesSection";

export default function Home() {
  return (
    <main className="wedding-page">
      <MusicPlayer />
      <HeroSection />
      <InvitationSection />
      <CouplePhotoSection />
      <WishesSection />
      <TimelineSection />
      <RSVPSection />
      <LocationSection />
    </main>
  );
}
