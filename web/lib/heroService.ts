import api from "./axiosConfig";

export interface HeroImage {
  _id?: string;
  imageUrl: string;
  isActive?: boolean;
}

export const HeroService = {
  getAll: async (): Promise<HeroImage[]> => {
    const res = await api.get("/hero");
    return res.data;
  },

  create: async (image: HeroImage): Promise<HeroImage> => {
    const res = await api.post("/hero", image);
    return res.data;
  },

  update: async (id: string, image: HeroImage): Promise<HeroImage> => {
    const res = await api.put(`/hero/${id}`, image);
    return res.data;
  },

  delete: async (id: string): Promise<{ message: string }> => {
    const res = await api.delete(`/hero/${id}`);
    return res.data;
  },
};
