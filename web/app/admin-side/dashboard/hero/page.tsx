import HeroContentForm from "@/components/admin/HeroContentForm";
import { getSlides } from "@/services/slideService";

const HeroContentPage = async () => {
  try {
    const response = await getSlides();
    return <HeroContentForm slides={response.data} />;
  } catch (error) {
    return <HeroContentForm slides={[]} />;
  }
};

export default HeroContentPage;
