import AdditionalComponents from "../components/additionalComponents";
import SpotlightHero from "../components/hero2";
import PricingComponent from "../components/pricing";
import BentoServicesGrid from "../components/serviceGrid";
import SolutionsGrid from "../components/solutionGrid";

export default function LandingPage() {

    return (
        <>
            <SpotlightHero />
            <BentoServicesGrid />
            <SolutionsGrid />
            <PricingComponent />
            <AdditionalComponents />
        </>
    )
}
