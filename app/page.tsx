import { CouplePhotoSection } from "@/components/sections/CouplePhotoSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { InvitationSection } from "@/components/sections/InvitationSection";
import { RSVPSection } from "@/components/sections/RSVPSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { WishesSection } from "@/components/sections/WishesSection";

export default function Home() {
  return (
    <main className="wedding-page">
      <HeroSection />
      <InvitationSection />
      <CouplePhotoSection />
      <WishesSection />
      <TimelineSection />
      <RSVPSection />
      <FooterSection />
    </main>
  );
}
