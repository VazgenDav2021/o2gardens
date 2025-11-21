import HeroContentForm from "@/components/admin/HeroContentForm";

const HeroContentPage = async () => {
  try {
    // const slides = await HeroService.getAll();
    return <HeroContentForm slides={[]} />;
  } catch (error) {
    
  }
};

export default HeroContentPage;
