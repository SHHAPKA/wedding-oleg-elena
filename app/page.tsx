import { CouplePhotoSection } from "@/components/sections/CouplePhotoSection";
import { DressCodeSection } from "@/components/sections/DressCodeSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { GiftsSection } from "@/components/sections/GiftsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { InvitationSection } from "@/components/sections/InvitationSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { ReminderSection } from "@/components/sections/ReminderSection";
import { RSVPSection } from "@/components/sections/RSVPSection";
import { TimelineSection } from "@/components/sections/TimelineSection";

export default function Home() {
  return (
    <main className="wedding-page">
      <HeroSection />
      <InvitationSection />
      <CouplePhotoSection />
      <ReminderSection />
      <GiftsSection />
      <LocationSection />
      <DressCodeSection />
      <TimelineSection />
      <RSVPSection />
      <FooterSection />
    </main>
  );
}
