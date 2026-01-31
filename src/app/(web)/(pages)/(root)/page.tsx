import LandingFaq from "../../_components/landing/LandingFaq";
import LandingFeatures from "../../_components/landing/LandingFeatures";
import LandingFinalCta from "../../_components/landing/LandingFinalCta";
import LandingFooter from "../../_components/landing/LandingFooter";
import LandingHero from "../../_components/landing/LandingHero";
import LandingModes from "../../_components/landing/LandingModes";
import LandingNav from "../../_components/landing/LandingNav";
import LandingPreview from "../../_components/landing/LandingPreview";

function WebRoot() {
  return (
    <div className="min-h-screen">
      <LandingNav />
      <main>
        <LandingHero />
        <LandingModes />
        <LandingFeatures />
        <LandingPreview />
        <LandingFaq />
        <LandingFinalCta />
      </main>
      <LandingFooter />
    </div>
  );
}

export default WebRoot;
