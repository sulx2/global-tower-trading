import SmoothScrollVideoHero from "@/components/ui/smooth-scroll-video-hero";
import ServicesHighlight from "@/components/ServicesHighlight";
import About from "@/components/About";
import Services from "@/components/Services";
import ProductCategories from "@/components/ProductCategories";
import WhyChooseUs from "@/components/WhyChooseUs";
import Contact from "@/components/Contact";

export default function HomePage() {
  return (
    <>
      <SmoothScrollVideoHero
        scrollHeight={1100}
        initialClipPercentage={15}
        finalClipPercentage={85}
      />
      <ServicesHighlight />
      <About />
      <Services />
      <ProductCategories />
      <WhyChooseUs />
      <Contact />
    </>
  );
}
