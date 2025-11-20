import { HeroService } from "@/lib/heroService";
import HeroContentForm from "./components/HeroContentForm";

const HeroContentPage = async () => {
  try {
    const slides = await HeroService.getAll();
    return <HeroContentForm slides={slides} />;
  } catch (error) {
    
  }
};

export default HeroContentPage;
